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