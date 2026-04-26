import { ChatCompletion, ChatCompletionChunk, ChatCompletionCreateParamsNonStreaming, ChatCompletionCreateParamsStreaming, Completion, CompletionCreateParamsNonStreaming, CompletionCreateParamsStreaming, CreateEmbeddingResponse, EmbeddingCreateParams, Model } from "openai/resources/index";
import { AskSageConfig } from "../types.js";
import { BaseLlmApi, CreateRerankResponse, FimCreateParamsStreaming, RerankCreateParams } from "./base.js";
export declare class AskSageApi implements BaseLlmApi {
    private config;
    private apiBase;
    private userApiUrl;
    private apiKey?;
    private email?;
    private sessionTokenPromise;
    private tokenTimestamp;
    private fetchFn;
    constructor(config: AskSageConfig);
    /**
     * Get session token from API key + email, or use API key directly
     */
    private getSessionToken;
    /**
     * Get cached token or refresh if expired
     */
    private getToken;
    /**
     * Clear token cache (e.g., on 401 errors)
     */
    private clearTokenCache;
    /**
     * Get request headers with auth token
     */
    private getHeaders;
    /**
     * Convert OpenAI messages to AskSage format
     */
    private convertMessages;
    /**
     * Convert OpenAI tools to AskSage format
     */
    private convertTools;
    /**
     * Convert OpenAI tool_choice to AskSage format
     */
    private convertToolChoice;
    /**
     * Build AskSage request body from OpenAI params
     */
    private buildRequestBody;
    /**
     * Parse AskSage response into OpenAI ChatCompletion format
     */
    private parseResponse;
    chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>;
    chatCompletionStream(body: ChatCompletionCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<ChatCompletionChunk>;
    completionNonStream(_body: CompletionCreateParamsNonStreaming, _signal: AbortSignal): Promise<Completion>;
    completionStream(_body: CompletionCreateParamsStreaming, _signal: AbortSignal): AsyncGenerator<Completion>;
    fimStream(_body: FimCreateParamsStreaming, _signal: AbortSignal): AsyncGenerator<ChatCompletionChunk>;
    embed(_body: EmbeddingCreateParams): Promise<CreateEmbeddingResponse>;
    rerank(_body: RerankCreateParams): Promise<CreateRerankResponse>;
    list(): Promise<Model[]>;
}
