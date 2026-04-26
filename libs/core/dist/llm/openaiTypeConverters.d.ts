import { FimCreateParamsStreaming } from "@continuedev/openai-adapters/dist/apis/base";
import { ChatCompletion, ChatCompletionChunk, ChatCompletionCreateParams, ChatCompletionMessageParam, CompletionCreateParams } from "openai/resources/index";
import type { Response as OpenAIResponse, ResponseInput, ResponseInputItem, ResponseStreamEvent } from "openai/resources/responses/responses.mjs";
import { ChatMessage, CompletionOptions } from "..";
export declare function toChatMessage(message: ChatMessage, options: CompletionOptions, prevMessage?: ChatMessage, providerFlags?: {
    includeReasoningField?: boolean;
    includeReasoningDetailsField?: boolean;
    includeReasoningContentField?: boolean;
}): ChatCompletionMessageParam | null;
export declare function toChatBody(messages: ChatMessage[], options: CompletionOptions, providerFlags?: {
    includeReasoningField?: boolean;
    includeReasoningDetailsField?: boolean;
    includeReasoningContentField?: boolean;
}): ChatCompletionCreateParams;
export declare function toCompleteBody(prompt: string, options: CompletionOptions): CompletionCreateParams;
export declare function toFimBody(prefix: string, suffix: string, options: CompletionOptions): FimCreateParamsStreaming;
export declare function fromChatResponse(response: ChatCompletion): ChatMessage[];
export declare function fromChatCompletionChunk(chunk: ChatCompletionChunk): ChatMessage | undefined;
export declare function fromResponsesChunk(event: ResponseStreamEvent | OpenAIResponse): ChatMessage | ChatMessage[] | undefined;
export declare function mergeReasoningDetails(existing: any[] | undefined, delta: any[] | undefined): any[] | undefined;
export declare function isItemType<T extends ResponseInputItem & {
    type: string;
}>(item: ResponseInputItem, type: T["type"]): item is T;
export declare function toResponsesInput(messages: ChatMessage[]): ResponseInput;
export type LlmApiRequestType = "chat" | "streamChat" | "complete" | "streamComplete" | "streamFim" | "embed" | "rerank" | "list";
//# sourceMappingURL=openaiTypeConverters.d.ts.map