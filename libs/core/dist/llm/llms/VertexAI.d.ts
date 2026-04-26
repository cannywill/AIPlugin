import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
import { LlmApiRequestType } from "../openaiTypeConverters.js";
import Anthropic from "./Anthropic.js";
import Gemini from "./Gemini.js";
declare class VertexAI extends BaseLLM {
    static providerName: string;
    apiBase: string;
    vertexProvider: "mistral" | "anthropic" | "gemini" | "unknown";
    anthropicInstance: Anthropic;
    geminiInstance: Gemini;
    static AUTH_SCOPES: string;
    static defaultOptions: Partial<LLMOptions> | undefined;
    private clientPromise;
    protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[];
    constructor(_options: LLMOptions);
    fetch(url: URL, init?: RequestInit): Promise<Response>;
    private _anthropicConvertArgs;
    protected StreamChatAnthropic(messages: ChatMessage[], options: CompletionOptions, signal: AbortSignal): AsyncGenerator<ChatMessage>;
    private streamChatGemini;
    private streamChatBison;
    protected StreamChatMistral(messages: ChatMessage[], options: CompletionOptions, signal: AbortSignal): AsyncGenerator<ChatMessage>;
    protected StreamFimMistral(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected streamFimGecko(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    supportsFim(): boolean;
    protected _embed(chunks: string[]): Promise<number[][]>;
}
export default VertexAI;
//# sourceMappingURL=VertexAI.d.ts.map