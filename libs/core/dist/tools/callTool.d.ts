import { ContextItem, McpUiState, Tool, ToolCall, ToolExtras } from "..";
import { ContinueErrorReason } from "../util/errors";
export declare function encodeMCPToolUri(mcpId: string, toolName: string): string;
export declare function decodeMCPToolUri(uri: string): [string, string] | null;
export declare function callBuiltInTool(functionName: string, args: any, extras: ToolExtras): Promise<ContextItem[]>;
export declare function callTool(tool: Tool, toolCall: ToolCall, extras: ToolExtras): Promise<{
    contextItems: ContextItem[];
    errorMessage: string | undefined;
    errorReason?: ContinueErrorReason;
    mcpUiState?: McpUiState;
}>;
//# sourceMappingURL=callTool.d.ts.map