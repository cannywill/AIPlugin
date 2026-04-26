import { ChatMessage, CompletionOptions, LLMOptions, MessagePart } from "../../index.js";
import { BaseLLM } from "../index.js";
import { LlmApiRequestType } from "../openaiTypeConverters.js";
import { GeminiChatContentPart, GeminiChatRequestBody, GeminiGenerationConfig } from "./gemini-types";
declare class Gemini extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[];
    convertArgs(options: CompletionOptions): GeminiGenerationConfig;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    /**
     * Removes the system message and merges it with the next user message if present.
     * @param messages Array of chat messages
     * @returns Modified array with system message merged into user message if applicable
     */
    removeSystemMessage(messages: ChatMessage[]): ChatMessage[];
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    continuePartToGeminiPart(part: MessagePart): GeminiChatContentPart;
    prepareBody(messages: ChatMessage[], options: CompletionOptions, isV1API: boolean, includeToolIds: boolean): GeminiChatRequestBody;
    processGeminiResponse(stream: AsyncIterable<string>): AsyncGenerator<ChatMessage>;
    private streamChatGemini;
    private streamChatBison;
    _embed(batch: string[]): Promise<number[][]>;
}
export default Gemini;
//# sourceMappingURL=Gemini.d.ts.map