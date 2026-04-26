import { ChatCompletionCreateParams } from "openai/resources/index";
import { ResponseCreateParamsBase } from "openai/resources/responses/responses.mjs";
import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
import { LlmApiRequestType } from "../openaiTypeConverters.js";
declare class OpenAI extends BaseLLM {
    useLegacyCompletionsEndpoint: boolean | undefined;
    constructor(options: LLMOptions);
    static providerName: string;
    static defaultOptions: Partial<LLMOptions> | undefined;
    protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[];
    protected _convertModelName(model: string): string;
    isOSeriesOrGpt5Model(model?: string): boolean;
    private isFireworksAiModel;
    protected supportsPrediction(model: string): boolean;
    private convertTool;
    protected extraBodyProperties(): Record<string, any>;
    protected getMaxStopWords(): number;
    protected _convertArgs(options: CompletionOptions, messages: ChatMessage[]): ChatCompletionCreateParams;
    protected _convertArgsResponses(options: CompletionOptions, messages: ChatMessage[]): ResponseCreateParamsBase;
    protected _getHeaders(): {
        "api-key": string;
        Authorization?: string | undefined;
        "Content-Type": string;
    };
    protected _complete(prompt: string, signal: AbortSignal, options: CompletionOptions): Promise<string>;
    protected _getEndpoint(endpoint: "chat/completions" | "completions" | "models" | "responses"): URL;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected modifyChatBody(body: ChatCompletionCreateParams): ChatCompletionCreateParams;
    protected _legacystreamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    protected _streamResponses(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    protected _responses(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): Promise<ChatMessage | ChatMessage[]>;
    protected _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    listModels(): Promise<string[]>;
    private _getEmbedEndpoint;
    protected _embed(chunks: string[]): Promise<number[][]>;
}
export default OpenAI;
//# sourceMappingURL=OpenAI.d.ts.map