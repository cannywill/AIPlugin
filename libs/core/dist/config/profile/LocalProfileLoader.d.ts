/**
 * 文件类型：配置加载
 * 文件作用：加载本地 profile 并生成 Continue 配置。
 * 主要职责：包装本地配置文件读取与 doLoadConfig 调用。
 */
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