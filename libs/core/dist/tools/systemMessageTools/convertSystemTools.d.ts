import { AssistantChatMessage, ToolCallState, UserChatMessage } from "../..";
import { SystemMessageToolsFramework } from "./types";
export declare function convertToolCallStatesToSystemCallsAndOutput(originalAssistantMessage: AssistantChatMessage, toolCallStates: ToolCallState[], framework: SystemMessageToolsFramework): {
    assistantMessage: AssistantChatMessage;
    userMessage: UserChatMessage;
};
//# sourceMappingURL=convertSystemTools.d.ts.map