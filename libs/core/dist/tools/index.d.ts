/**
 * 文件类型：工具集合
 * 文件作用：组织工具定义与序列化逻辑。
 * 主要职责：为 Flutter 环境提供可用工具列表与序列化能力。
 */
import { ConfigDependentToolParams, Tool } from "..";
export declare const getBaseToolDefinitions: () => Tool[];
export declare const getConfigDependentToolDefinitions: (params: ConfigDependentToolParams) => Promise<Tool[]>;
export declare function serializeTool(tool: Tool): {
    type: "function";
    function: {
        name: string;
        description?: string;
        parameters?: Record<string, any>;
        strict?: boolean | null;
    };
    displayTitle: string;
    wouldLikeTo?: string;
    isCurrently?: string;
    hasAlready?: string;
    readonly: boolean;
    isInstant?: boolean;
    uri?: string;
    faviconUrl?: string;
    group: string;
    originalFunctionName?: string;
    systemMessageDescription?: {
        prefix: string;
        exampleArgs?: Array<[string, string | number]>;
    };
    defaultToolPolicy?: import("@continuedev/terminal-security").ToolPolicy;
    toolCallIcon?: string;
    mcpMeta?: import("..").McpToolMeta;
};
//# sourceMappingURL=index.d.ts.map