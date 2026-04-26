import { ChatMessage } from "..";
export declare function messageHasToolCalls(msg: ChatMessage): boolean;
export declare function messageIsEmpty(message: ChatMessage): boolean;
export declare function addSpaceToAnyEmptyMessages(messages: ChatMessage[]): ChatMessage[];
export declare function isUserOrToolMsg(msg: ChatMessage | undefined): boolean;
export declare function isToolMessageForId(msg: ChatMessage | undefined, toolCallId: string): boolean;
export declare function messageHasToolCallId(msg: ChatMessage | undefined, toolCallId: string): boolean;
export declare function chatMessageIsEmpty(message: ChatMessage): boolean;
//# sourceMappingURL=messages.d.ts.map