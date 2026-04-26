import { ModelRole } from "@continuedev/config-yaml";
import { BaseLlmApi, ChatCompletionCreateParams } from "@continuedev/openai-adapters";
import { CacheBehavior, ChatMessage, Chunk, CompletionOptions, ILLM, ILLMLogger, LLMFullCompletionOptions, LLMOptions, MessageOption, ModelCapability, ModelInstaller, PromptLog, PromptTemplate, RequestOptions, TabAutocompleteOptions, TemplateType, ToolOverride } from "../index.js";
import { LLMConfigurationStatuses } from "./constants.js";
import { LlmApiRequestType } from "./openaiTypeConverters.js";
export declare class LLMError extends Error {
    llm: ILLM;
    constructor(message: string, llm: ILLM);
}
export declare function isModelInstaller(provider: any): provider is ModelInstaller;
export declare abstract class BaseLLM implements ILLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions> | undefined;
    protected supportsReasoningField: boolean;
    protected supportsReasoningDetailsField: boolean;
    protected supportsReasoningContentField: boolean;
    get providerName(): string;
    /**
     * This exists because for the continue-proxy, sometimes we want to get the value of the underlying provider that is used on the server
     * For example, the underlying provider should always be sent with dev data
     */
    get underlyingProviderName(): string;
    autocompleteOptions?: Partial<TabAutocompleteOptions>;
    supportsFim(): boolean;
    supportsImages(): boolean;
    supportsCompletions(): boolean;
    supportsPrefill(): boolean;
    uniqueId: string;
    model: string;
    title?: string;
    baseChatSystemMessage?: string;
    basePlanSystemMessage?: string;
    baseAgentSystemMessage?: string;
    _contextLength: number | undefined;
    maxStopWords?: number | undefined;
    completionOptions: CompletionOptions;
    requestOptions?: RequestOptions;
    template?: TemplateType;
    promptTemplates?: Record<string, PromptTemplate>;
    templateMessages?: (messages: ChatMessage[]) => string;
    logger?: ILLMLogger;
    llmRequestHook?: (model: string, prompt: string) => any;
    apiKey?: string;
    apiKeyLocation?: string;
    envSecretLocations?: Record<string, string>;
    apiBase?: string;
    orgScopeId?: string | null;
    onPremProxyUrl?: string | null;
    cacheBehavior?: CacheBehavior;
    capabilities?: ModelCapability;
    roles?: ModelRole[];
    deployment?: string;
    apiVersion?: string;
    apiType?: string;
    region?: string;
    projectId?: string;
    accountId?: string;
    aiGatewaySlug?: string;
    profile?: string | undefined;
    accessKeyId?: string;
    secretAccessKey?: string;
    deploymentId?: string;
    embeddingId: string;
    maxEmbeddingChunkSize: number;
    maxEmbeddingBatchSize: number;
    sourceFile?: string;
    isFromAutoDetect?: boolean;
    /** Tool overrides for this model */
    toolOverrides?: ToolOverride[];
    lastRequestId: string | undefined;
    private _llmOptions;
    protected openaiAdapter?: BaseLlmApi;
    constructor(_options: LLMOptions);
    get contextLength(): number;
    getConfigurationStatus(): LLMConfigurationStatuses;
    protected createOpenAiAdapter(): BaseLlmApi | undefined;
    listModels(): Promise<string[]>;
    private _templatePromptLikeMessages;
    private _logEnd;
    private parseError;
    fetch(url: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    private _parseCompletionOptions;
    private _formatChatMessages;
    private _formatChatMessage;
    protected _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string, PromptLog>;
    protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[];
    private shouldUseOpenAIAdapter;
    streamFim(prefix: string, suffix: string, signal: AbortSignal, options?: LLMFullCompletionOptions): AsyncGenerator<string>;
    streamComplete(_prompt: string, signal: AbortSignal, options?: LLMFullCompletionOptions): AsyncGenerator<string, {
        modelTitle: string;
        modelProvider: string;
        prompt: string;
        completion: string;
        completionOptions: CompletionOptions;
    }, unknown>;
    complete(_prompt: string, signal: AbortSignal, options?: LLMFullCompletionOptions): Promise<string>;
    chat(messages: ChatMessage[], signal: AbortSignal, options?: LLMFullCompletionOptions): Promise<{
        role: "assistant";
        content: string;
    }>;
    compileChatMessages(message: ChatMessage[], options: LLMFullCompletionOptions): import("../index.js").CompiledMessagesResult;
    protected modifyChatBody(body: ChatCompletionCreateParams): ChatCompletionCreateParams;
    private _modifyCompletionOptions;
    private processChatChunk;
    private canUseOpenAIResponses;
    private openAIAdapterStream;
    private openAIAdapterNonStream;
    private responsesStream;
    private responsesNonStream;
    streamChat(_messages: ChatMessage[], signal: AbortSignal, options?: LLMFullCompletionOptions, messageOptions?: MessageOption): AsyncGenerator<ChatMessage, PromptLog>;
    getBatchedChunks(chunks: string[]): string[][];
    embed(chunks: string[]): Promise<number[][]>;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    protected _complete(prompt: string, signal: AbortSignal, options: CompletionOptions): Promise<string>;
    protected _embed(chunks: string[]): Promise<number[][]>;
    countTokens(text: string): number;
    protected collectArgs(options: CompletionOptions): any;
    renderPromptTemplate(template: PromptTemplate, history: ChatMessage[], otherData: Record<string, string>, canPutWordsInModelsMouth?: boolean): string | ChatMessage[];
}
//# sourceMappingURL=index.d.ts.map