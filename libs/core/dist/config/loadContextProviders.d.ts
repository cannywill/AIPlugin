/**
 * 文件类型：配置加载
 * 文件作用：根据配置与默认项加载上下文提供者。
 * 主要职责：输出 Flutter 环境可用的上下文提供者列表与错误信息。
 */
import { AssistantUnrolledNonNullable, ConfigValidationError } from "@continuedev/config-yaml";
import { IContextProvider, IdeType } from "..";
/**
 * 功能：根据配置与默认列表生成上下文提供者集合。
 * 入参：configContext 为配置项，hasDocs 表示是否启用 docs，ideType 为当前 IDE 类型。
 * 返回：提供者列表与配置错误集合。
 */
export declare function loadConfigContextProviders(configContext: AssistantUnrolledNonNullable["context"], hasDocs: boolean, _ideType: IdeType): {
    providers: IContextProvider[];
    errors: ConfigValidationError[];
};
//# sourceMappingURL=loadContextProviders.d.ts.map