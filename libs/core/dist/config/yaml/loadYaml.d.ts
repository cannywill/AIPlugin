/**
 * 文件类型：配置加载
 * 文件作用：解析 config.yaml 并转换为 Continue 运行时配置。
 * 主要职责：处理 YAML 配置、模型与工具构建，以及上下文提供者加载。
 */
import { AssistantUnrolled, ConfigResult, ConfigValidationError, PackageIdentifier } from "@continuedev/config-yaml";
import { ContinueConfig, IDE, IdeInfo, IdeSettings, ILLMLogger } from "../..";
import { ControlPlaneClient } from "../../control-plane/client";
export declare function configYamlToContinueConfig(options: {
    unrolledAssistant: AssistantUnrolled;
    ide: IDE;
    ideInfo: IdeInfo;
    uniqueId: string;
    llmLogger: ILLMLogger;
    workOsAccessToken: string | undefined;
}): Promise<{
    config: ContinueConfig;
    errors: ConfigValidationError[];
}>;
export declare function loadContinueConfigFromYaml(options: {
    ide: IDE;
    ideSettings: IdeSettings;
    ideInfo: IdeInfo;
    uniqueId: string;
    llmLogger: ILLMLogger;
    workOsAccessToken: string | undefined;
    overrideConfigYaml: AssistantUnrolled | undefined;
    controlPlaneClient: ControlPlaneClient;
    orgScopeId: string | null;
    packageIdentifier: PackageIdentifier;
}): Promise<ConfigResult<ContinueConfig>>;
//# sourceMappingURL=loadYaml.d.ts.map