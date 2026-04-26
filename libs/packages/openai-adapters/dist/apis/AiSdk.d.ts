import { ChatCompletion, ChatCompletionChunk, ChatCompletionCreateParamsNonStreaming, ChatCompletionCreateParamsStreaming, Completion, CompletionCreateParamsNonStreaming, CompletionCreateParamsStreaming, CreateEmbeddingResponse, EmbeddingCreateParams, Model } from "openai/resources/index";
import { AiSdkConfig } from "../types.js";
import { BaseLlmApi, CreateRerankResponse, FimCreateParamsStreaming, RerankCreateParams } from "./base.js";
export declare class AiSdkApi implements BaseLlmApi {
    private provider?;
    private config;
    private providerId;
    private modelId;
    constructor(config: AiSdkConfig);
    private initializeProvider;
    chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>;
    chatCompletionStream(body: ChatCompletionCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<ChatCompletionChunk>;
    completionNonStream(_body: CompletionCreateParamsNonStreaming, _signal: AbortSignal): Promise<Completion>;
    completionStream(_body: CompletionCreateParamsStreaming, _signal: AbortSignal): AsyncGenerator<Completion>;
    fimStream(_body: FimCreateParamsStreaming, _signal: AbortSignal): AsyncGenerator<ChatCompletionChunk>;
    embed(body: EmbeddingCreateParams): Promise<CreateEmbeddingResponse>;
    rerank(_body: RerankCreateParams): Promise<CreateRerankResponse>;
    list(): Promise<Model[]>;
}
