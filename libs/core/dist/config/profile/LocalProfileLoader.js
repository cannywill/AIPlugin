import { getPrimaryConfigFilePath } from "../../util/paths.js";
import { localPathToUri } from "../../util/pathToUri.js";
import { getUriPathBasename } from "../../util/uri.js";
import doLoadConfig from "./doLoadConfig.js";
export default class LocalProfileLoader {
    ide;
    controlPlaneClient;
    llmLogger;
    overrideAssistantFile;
    static ID = "local";
    description;
    constructor(ide, controlPlaneClient, llmLogger, overrideAssistantFile) {
        this.ide = ide;
        this.controlPlaneClient = controlPlaneClient;
        this.llmLogger = llmLogger;
        this.overrideAssistantFile = overrideAssistantFile;
        this.description = {
            id: overrideAssistantFile?.path ?? LocalProfileLoader.ID,
            profileType: "local",
            fullSlug: {
                ownerSlug: "",
                packageSlug: "",
                versionSlug: "",
            },
            iconUrl: "",
            title: overrideAssistantFile?.path
                ? getUriPathBasename(overrideAssistantFile.path)
                : "Local Config",
            errors: undefined,
            uri: overrideAssistantFile?.path ??
                localPathToUri(getPrimaryConfigFilePath()),
            rawYaml: undefined,
        };
    }
    async doLoadConfig() {
        const result = await doLoadConfig({
            ide: this.ide,
            controlPlaneClient: this.controlPlaneClient,
            llmLogger: this.llmLogger,
            profileId: this.description.id,
            overrideConfigYamlByPath: this.overrideAssistantFile?.path,
            orgScopeId: null,
            packageIdentifier: {
                uriType: "file",
                fileUri: this.overrideAssistantFile?.path ?? getPrimaryConfigFilePath(),
                // 直接传入预读取内容，避免重复读取与路径差异问题
                content: this.overrideAssistantFile?.content,
            },
        });
        this.description.errors = result.errors;
        // Use the config name from the loaded config (avoids duplicate file reads
        // and works in environments like WSL where paths may differ)
        if (result.configName) {
            this.description.title = result.configName;
        }
        return result;
    }
    setIsActive(isActive) { }
}
