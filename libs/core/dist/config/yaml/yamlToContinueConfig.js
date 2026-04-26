import { mergeConfigYamlRequestOptions, } from "@continuedev/config-yaml";
export function convertYamlRuleToContinueRule(rule) {
    if (typeof rule === "string") {
        return {
            rule: rule,
            source: "rules-block",
        };
    }
    else {
        return {
            source: "rules-block",
            rule: rule.rule,
            globs: rule.globs,
            name: rule.name,
            description: rule.description,
            sourceFile: rule.sourceFile,
            alwaysApply: rule.alwaysApply,
            invokable: rule.invokable ?? false,
        };
    }
}
export function convertYamlMcpConfigToInternalMcpOptions(config, globalRequestOptions) {
    const { connectionTimeout, faviconUrl, name, sourceFile } = config;
    const shared = {
        id: name,
        name,
        faviconUrl: faviconUrl,
        timeout: connectionTimeout,
        sourceFile,
    };
    // Stdio
    if ("command" in config) {
        const { args, command, cwd, env, type } = config;
        const stdioOptions = {
            ...shared,
            type,
            command,
            args,
            cwd,
            env,
        };
        return stdioOptions;
    }
    // HTTP/SSE
    const { type, url, apiKey, requestOptions } = config;
    const httpSseConfig = {
        ...shared,
        type,
        url,
        apiKey,
        requestOptions: mergeConfigYamlRequestOptions(requestOptions, globalRequestOptions),
    };
    return httpSseConfig;
}
