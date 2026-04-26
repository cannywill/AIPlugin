import { Tool } from "../..";
import { SystemMessageToolsFramework } from "./types";
export declare const TOOL_INSTRUCTIONS_TAG = "<tool_use_instructions>";
export declare const generateToolsSystemMessage: (tools: Tool[], framework: SystemMessageToolsFramework) => string;
export declare function addSystemMessageToolsToSystemMessage(framework: SystemMessageToolsFramework, baseSystemMessage: string, systemMessageTools: Tool[]): string;
//# sourceMappingURL=buildToolsSystemMessage.d.ts.map