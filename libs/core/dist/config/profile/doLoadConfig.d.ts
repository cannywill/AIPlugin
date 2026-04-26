import { AssistantUnrolled, ConfigResult, PackageIdentifier } from "@continuedev/config-yaml";
import { ContinueConfig, IDE, ILLMLogger, SerializedContinueConfig } from "../../";
import { ControlPlaneClient } from "../../control-plane/client.js";
export default function doLoadConfig(options: {
    ide: IDE;
    controlPlaneClient: ControlPlaneClient;
    llmLogger: ILLMLogger;
    overrideConfigJson?: SerializedContinueConfig;
    overrideConfigYaml?: AssistantUnrolled;
    profileId: string;
    overrideConfigYamlByPath?: string;
    orgScopeId: string | null;
    packageIdentifier: PackageIdentifier;
}): Promise<ConfigResult<ContinueConfig>>;
//# sourceMappingURL=doLoadConfig.d.ts.map