import { Tool, ToolCallState } from "../../..";
import { SystemMessageToolsFramework } from "../types";
import { handleToolCallBuffer } from "./parseSystemToolCall";
export declare class SystemMessageToolCodeblocksFramework implements SystemMessageToolsFramework {
    acceptedToolCallStarts: [string, string][];
    toolCallStateToSystemToolCall(state: ToolCallState): string;
    handleToolCallBuffer: typeof handleToolCallBuffer;
    toolToSystemToolDefinition(tool: Tool): string;
    systemMessagePrefix: string;
    systemMessageSuffix: string;
    exampleDynamicToolDefinition: string;
    exampleDynamicToolCall: string;
    createSystemMessageExampleCall(toolName: string, prefix: string, exampleArgs?: Array<[string, string | number]>): string;
}
//# sourceMappingURL=index.d.ts.map