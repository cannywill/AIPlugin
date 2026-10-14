/**
 * 文件类型：配置加载
 * 文件作用：解析 config.yaml 并转换为 Continue 运行时配置。
 * 主要职责：处理 YAML 配置、模型与工具构建，以及上下文提供者加载。
 */
import { BLOCK_TYPES, mergeConfigYamlRequestOptions, mergeUnrolledAssistants, RegistryClient, unrollAssistant, validateConfigYaml, } from "@continuedev/config-yaml";
import { dirname } from "node:path";
import { MCPManagerSingleton } from "../../context/mcp/MCPManagerSingleton";
import TransformersJsEmbeddingsProvider from "../../llm/llms/TransformersJsEmbeddingsProvider";
import { getAllPromptFiles } from "../../promptFiles/getPromptFiles";
import { GlobalContext } from "../../util/GlobalContext";
import { modifyAnyConfigWithSharedConfig } from "../sharedConfig";
import { convertPromptBlockToSlashCommand } from "../../commands/slash/promptBlockSlashCommand";
import { slashCommandFromPromptFile } from "../../commands/slash/promptFileSlashCommand";
import { loadJsonMcpConfigs } from "../../context/mcp/json/loadJsonMcpConfigs";
import { getControlPlaneEnvSync } from "../../control-plane/env";
import { PolicySingleton } from "../../control-plane/PolicySingleton";
import { getBaseToolDefinitions } from "../../tools";
import { getCleanUriPath } from "../../util/uri";
import { loadConfigContextProviders } from "../loadContextProviders";
import { getAllDotContinueDefinitionFiles } from "../loadLocalAssistants";
import { unrollLocalYamlBlocks } from "./loadLocalYamlBlocks";
import { LocalPlatformClient } from "./LocalPlatformClient";
import { llmsFromModelConfig } from "./models";
import { convertYamlMcpConfigToInternalMcpOptions, convertYamlRuleToContinueRule, } from "./yamlToContinueConfig";
/**
 * 功能：加载并解析 config.yaml，同时合并本地 block 与远端配置。
 * 入参：options 包含 IDE、控制面客户端与包定位信息。
 * 返回：合并后的 YAML 配置结果与错误列表。
 */
async function loadConfigYaml(options) {
    const { overrideConfigYaml, controlPlaneClient, orgScopeId, ideSettings, ide, packageIdentifier, } = options;
    // Add local .continue blocks
    // Use "content" field to pass pre-read content directly，避免重复读取文件
    const localBlockPromises = BLOCK_TYPES.map(async (blockType) => {
        const localBlocks = await getAllDotContinueDefinitionFiles(ide, { includeGlobal: true, includeWorkspace: true, fileExtType: "yaml" }, blockType);
        return localBlocks.map((b) => ({
            uriType: "file",
            fileUri: b.path,
            content: b.content,
        }));
    });
    const localPackageIdentifiers = (await Promise.all(localBlockPromises)).flat();
    // logger.info(
    //   `Loading config.yaml from ${JSON.stringify(packageIdentifier)} with root path ${rootPath}`,
    // );
    // Registry client is only used if local blocks are present, but logic same for hub/local assistants
    const getRegistryClient = async () => {
        const rootPath = packageIdentifier.uriType === "file"
            ? dirname(getCleanUriPath(packageIdentifier.fileUri))
            : undefined;
        return new RegistryClient({
            accessToken: await controlPlaneClient.getAccessToken(),
            apiBase: getControlPlaneEnvSync(ideSettings.continueTestEnvironment)
                .CONTROL_PLANE_URL,
            rootPath,
        });
    };
    const errors = [];
    let config;
    if (overrideConfigYaml) {
        config = overrideConfigYaml;
        if (localPackageIdentifiers.length > 0) {
            const unrolledLocal = await unrollLocalYamlBlocks(localPackageIdentifiers, ide, await getRegistryClient(), orgScopeId, controlPlaneClient);
            if (unrolledLocal.errors) {
                errors.push(...unrolledLocal.errors);
            }
            if (unrolledLocal.config) {
                config = mergeUnrolledAssistants(config, unrolledLocal.config);
            }
        }
    }
    else {
        // This is how we allow use of blocks locally
        const unrollResult = await unrollAssistant(packageIdentifier, await getRegistryClient(), {
            renderSecrets: true,
            currentUserSlug: "",
            onPremProxyUrl: null,
            orgScopeId,
            platformClient: new LocalPlatformClient(orgScopeId, controlPlaneClient, ide),
            injectBlocks: localPackageIdentifiers,
        });
        config = unrollResult.config;
        if (unrollResult.errors) {
            errors.push(...unrollResult.errors);
        }
    }
    if (config) {
        errors.push(...validateConfigYaml(nonNullifyConfigYaml(config)));
    }
    if (errors?.some((error) => error.fatal)) {
        return {
            errors,
            config: undefined,
            configLoadInterrupted: true,
        };
    }
    // Set defaults if undefined (this lets us keep config.json uncluttered for new users)
    return {
        config,
        errors,
        configLoadInterrupted: false,
    };
}
function nonNullifyConfigYaml(unrolledAssistant) {
    return {
        ...unrolledAssistant,
        data: unrolledAssistant.data?.filter((k) => !!k),
        context: unrolledAssistant.context?.filter((k) => !!k),
        docs: unrolledAssistant.docs?.filter((k) => !!k),
        mcpServers: unrolledAssistant.mcpServers?.filter((k) => !!k),
        models: unrolledAssistant.models?.filter((k) => !!k),
        prompts: unrolledAssistant.prompts?.filter((k) => !!k),
        rules: unrolledAssistant.rules?.filter((k) => !!k).map((k) => k),
    };
}
export async function configYamlToContinueConfig(options) {
    let { unrolledAssistant, ide, ideInfo, uniqueId, llmLogger } = options;
    const localErrors = [];
    const continueConfig = {
        slashCommands: [],
        tools: getBaseToolDefinitions(),
        mcpServerStatuses: [],
        contextProviders: [],
        modelsByRole: {
            chat: [],
            edit: [],
            apply: [],
            embed: [],
            autocomplete: [],
            rerank: [],
            summarize: [],
            subagent: [],
        },
        selectedModelByRole: {
            chat: null,
            edit: null, // not currently used
            apply: null,
            embed: null,
            autocomplete: null,
            rerank: null,
            summarize: null,
            subagent: null,
        },
        rules: [],
        requestOptions: { ...unrolledAssistant.requestOptions },
    };
    const config = nonNullifyConfigYaml(unrolledAssistant);
    for (const rule of config.rules ?? []) {
        const convertedRule = convertYamlRuleToContinueRule(rule);
        continueConfig.rules.push(convertedRule);
    }
    continueConfig.data = config.data?.map((d) => ({
        ...d,
        requestOptions: mergeConfigYamlRequestOptions(d.requestOptions, continueConfig.requestOptions),
    }));
    continueConfig.docs = config.docs?.map((doc) => ({
        title: doc.name,
        startUrl: doc.startUrl,
        rootUrl: doc.rootUrl,
        faviconUrl: doc.faviconUrl,
        useLocalCrawling: doc.useLocalCrawling,
        sourceFile: doc.sourceFile,
    }));
    // Prompt files -
    try {
        const promptFiles = await getAllPromptFiles(ide, undefined, true);
        promptFiles.forEach((file) => {
            try {
                const slashCommand = slashCommandFromPromptFile(file.path, file.content);
                if (slashCommand) {
                    continueConfig.slashCommands?.push(slashCommand);
                }
            }
            catch (e) {
                // If the file is in a rules directory, we can provide a more helpful error message
                // because we know it's likely a rule definition
                const isRuleFile = file.path.toLowerCase().includes("/rules/") ||
                    file.path.toLowerCase().includes("\\rules\\");
                let message = `Failed to convert prompt file ${file.path} to slash command: ${e instanceof Error ? e.message : e}`;
                if (isRuleFile) {
                    const isYamlError = e instanceof Error &&
                        (e.name?.includes("YAML") || e.message.includes("flow sequence"));
                    const prefix = isYamlError
                        ? "Failed to parse rule definition"
                        : "Failed to process rule definition";
                    const errorDetails = e instanceof Error ? e.message : String(e);
                    message = `${prefix} ${file.path}: ${errorDetails}`;
                }
                localErrors.push({
                    fatal: false,
                    message,
                });
            }
        });
    }
    catch (e) {
        localErrors.push({
            fatal: false,
            message: `Error loading local prompt files: ${e instanceof Error ? e.message : e}`,
        });
    }
    config.prompts?.forEach((prompt) => {
        try {
            const slashCommand = convertPromptBlockToSlashCommand(prompt);
            continueConfig.slashCommands?.push(slashCommand);
        }
        catch (e) {
            localErrors.push({
                message: `Error loading prompt ${prompt.name}: ${e instanceof Error ? e.message : e}`,
                fatal: false,
            });
        }
    });
    // Models
    let warnAboutFreeTrial = false;
    const defaultModelRoles = ["chat", "summarize", "apply", "edit"];
    for (const model of config.models ?? []) {
        model.roles = model.roles ?? defaultModelRoles; // Default to all 4 chat-esque roles if not specified
        if (model.provider === "free-trial") {
            warnAboutFreeTrial = true;
        }
        try {
            const llms = await llmsFromModelConfig({
                model,
                uniqueId,
                llmLogger,
                config: continueConfig,
            });
            if (model.roles?.includes("chat")) {
                continueConfig.modelsByRole.chat.push(...llms);
            }
            if (model.roles?.includes("summarize")) {
                continueConfig.modelsByRole.summarize.push(...llms);
            }
            if (model.roles?.includes("apply")) {
                continueConfig.modelsByRole.apply.push(...llms);
            }
            if (model.roles?.includes("edit")) {
                continueConfig.modelsByRole.edit.push(...llms);
            }
            if (model.roles?.includes("autocomplete")) {
                continueConfig.modelsByRole.autocomplete.push(...llms);
            }
            if (model.roles?.includes("embed")) {
                const { provider } = model;
                if (provider === "transformers.js") {
                    continueConfig.modelsByRole.embed.push(new TransformersJsEmbeddingsProvider());
                }
                else {
                    continueConfig.modelsByRole.embed.push(...llms);
                }
            }
            if (model.roles?.includes("rerank")) {
                continueConfig.modelsByRole.rerank.push(...llms);
            }
            if (model.roles?.includes("subagent")) {
                continueConfig.modelsByRole.subagent.push(...llms);
            }
        }
        catch (e) {
            localErrors.push({
                fatal: false,
                message: `Failed to load model:\nName: ${model.name}\nModel: ${model.model}\nProvider: ${model.provider}\n${e instanceof Error ? e.message : e}`,
            });
        }
    }
    if (warnAboutFreeTrial) {
        localErrors.push({
            fatal: false,
            message: "Model provider 'free-trial' is no longer supported, will be ignored.",
        });
    }
    const { providers, errors: contextErrors } = loadConfigContextProviders(config.context, !!config.docs?.length, ideInfo.ideType);
    continueConfig.contextProviders = providers;
    localErrors.push(...contextErrors);
    // Trigger MCP server refreshes (Config is reloaded again once connected!)
    const mcpManager = MCPManagerSingleton.getInstance();
    const orgPolicy = PolicySingleton.getInstance().policy;
    if (orgPolicy?.policy?.allowMcpServers === false) {
        await mcpManager.shutdown();
    }
    else {
        const mcpOptions = (config.mcpServers ?? []).map((server) => convertYamlMcpConfigToInternalMcpOptions(server, config.requestOptions));
        const { errors: jsonMcpErrors, mcpServers } = await loadJsonMcpConfigs(ide, true, config.requestOptions);
        localErrors.push(...jsonMcpErrors);
        mcpOptions.push(...mcpServers);
        mcpManager.setConnections(mcpOptions, false, { ide });
    }
    return { config: continueConfig, errors: localErrors };
}
export async function loadContinueConfigFromYaml(options) {
    const { ide, ideSettings, ideInfo, uniqueId, llmLogger, workOsAccessToken, overrideConfigYaml, controlPlaneClient, orgScopeId, packageIdentifier, } = options;
    const configYamlResult = await loadConfigYaml({
        overrideConfigYaml,
        controlPlaneClient,
        orgScopeId,
        ideSettings,
        ide,
        packageIdentifier,
    });
    if (!configYamlResult.config || configYamlResult.configLoadInterrupted) {
        return {
            errors: configYamlResult.errors,
            config: undefined,
            configLoadInterrupted: true,
            configName: configYamlResult.configName,
        };
    }
    const { config: continueConfig, errors: localErrors } = await configYamlToContinueConfig({
        unrolledAssistant: configYamlResult.config,
        ide,
        ideInfo,
        uniqueId,
        llmLogger,
        workOsAccessToken,
    });
    // Apply shared config
    // TODO: override several of these values with user/org shared config
    // Don't try catch this - has security implications and failure should be fatal
    const sharedConfig = new GlobalContext().getSharedConfig();
    const withShared = modifyAnyConfigWithSharedConfig(continueConfig, sharedConfig);
    if (withShared.allowAnonymousTelemetry === undefined) {
        withShared.allowAnonymousTelemetry = true;
    }
    return {
        config: withShared,
        errors: [...(configYamlResult.errors ?? []), ...localErrors],
        configLoadInterrupted: false,
        configName: configYamlResult.configName,
    };
}
