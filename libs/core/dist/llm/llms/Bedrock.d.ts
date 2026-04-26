import type { CompletionOptions } from "../../index.js";
import { ChatMessage, Chunk, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class Bedrock extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private _promptCachingMetrics;
    requestOptions: {
        region?: string;
        credentials?: any;
        headers?: Record<string, string>;
    };
    constructor(options: LLMOptions);
    private _getClient;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    /**
     * Generates the input payload for the Bedrock Converse API
     * @param messages - Array of chat messages
     * @param options - Completion options
     * @returns Formatted input payload for the API
     */
    private _generateConverseInput;
    private _convertMessages;
    private _addCachingToLastTwoUserMessages;
    private _convertMessageContentToBlocks;
    private _getCredentials;
    _embed(chunks: string[]): Promise<number[][]>;
    private _generateInvokeModelCommandInput;
    private _extractEmbeddings;
    private _getModelConfig;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
}
export default Bedrock;
//# sourceMappingURL=Bedrock.d.ts.map