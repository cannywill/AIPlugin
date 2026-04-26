import { ConfigResult } from "@continuedev/config-yaml";
import { ControlPlaneClient } from "../../control-plane/client.js";
import { ContinueConfig, IDE, ILLMLogger } from "../../index.js";
import { ProfileDescription } from "../ProfileLifecycleManager.js";
import { IProfileLoader } from "./IProfileLoader.js";
export default class LocalProfileLoader implements IProfileLoader {
    private ide;
    private controlPlaneClient;
    private llmLogger;
    private overrideAssistantFile?;
    static ID: string;
    description: ProfileDescription;
    constructor(ide: IDE, controlPlaneClient: ControlPlaneClient, llmLogger: ILLMLogger, overrideAssistantFile?: {
        path: string;
        content: string;
    } | undefined);
    doLoadConfig(): Promise<ConfigResult<ContinueConfig>>;
    setIsActive(isActive: boolean): void;
}
//# sourceMappingURL=LocalProfileLoader.d.ts.map