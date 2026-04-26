import { ChatMessage, ContextItem, MessageContent, MessagePart } from "../index";
export declare function stripImages(messageContent: MessageContent): string;
export declare function renderChatMessage(message: ChatMessage): string;
export declare function renderContextItems(contextItems: ContextItem[]): string;
export declare function renderContextItemsWithStatus(contextItems: any[]): string;
export declare function normalizeToMessageParts(message: ChatMessage): MessagePart[];
//# sourceMappingURL=messageContent.d.ts.map