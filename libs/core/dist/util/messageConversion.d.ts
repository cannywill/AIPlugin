/**
 * Message conversion utilities for transitioning to unified ChatHistoryItem type.
 *
 * This module provides conversion functions between the OpenAI ChatCompletionMessageParam
 * format and the unified ChatHistoryItem format from the core package.
 */
import type { ChatCompletionMessageParam } from "openai/resources.mjs";
import type { ChatHistoryItem, ChatMessage, ContextItemWithId, ToolCall, ToolCallState } from "../index.js";
/**
 * Convert ChatCompletionMessageParam to ChatMessage
 */
export declare function convertToUnifiedMessage(message: ChatCompletionMessageParam): ChatMessage;
/**
 * Convert ChatMessage to ChatCompletionMessageParam
 */
export declare function convertFromUnifiedMessage(message: ChatMessage): ChatCompletionMessageParam;
/**
 * Create a ChatHistoryItem from a ChatMessage
 */
export declare function createHistoryItem(message: ChatMessage, contextItems?: ContextItemWithId[], toolCallStates?: ToolCallState[]): ChatHistoryItem;
/**
 * Convert array of ChatCompletionMessageParam to ChatHistoryItem array
 */
export declare function convertToUnifiedHistory(messages: ChatCompletionMessageParam[]): ChatHistoryItem[];
/**
 * Convert ChatHistoryItem array to ChatCompletionMessageParam array
 */
export declare function convertFromUnifiedHistory(historyItems: ChatHistoryItem[]): ChatCompletionMessageParam[];
/**
 * Convert ChatHistoryItem array to ChatCompletionMessageParam array with injected system message
 * @param historyItems - The chat history items
 * @param systemMessage - The system message to inject at the beginning
 */
export declare function convertFromUnifiedHistoryWithSystemMessage(historyItems: ChatHistoryItem[], systemMessage: string): ChatCompletionMessageParam[];
/**
 * Extract tool call information from a ChatHistoryItem
 */
export declare function extractToolCallInfo(historyItem: ChatHistoryItem): {
    hasToolCalls: boolean;
    toolCalls?: ToolCall[];
    toolStates?: ToolCallState[];
};
//# sourceMappingURL=messageConversion.d.ts.map