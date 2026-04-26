import { ChatMessage, Chunk, CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class WatsonX extends BaseLLM {
    static defaultOptions: Partial<LLMOptions> | undefined;
    constructor(options: LLMOptions);
    getBearerToken(): Promise<{
        token: string;
        expiration: number;
    }>;
    _getEndpoint(endpoint: string): string;
    static providerName: string;
    protected _convertMessage(message: ChatMessage): any;
    protected _convertArgs(options: any, messages: ChatMessage[]): {
        messages: any[];
        model: any;
        max_tokens: any;
        temperature: any;
        top_p: any;
        frequency_penalty: any;
        presence_penalty: any;
    };
    protected _getHeaders(): {
        "Content-Type": string;
        Authorization: string;
    };
    protected updateWatsonxToken(): Promise<void>;
    protected _complete(prompt: string, signal: AbortSignal, options: CompletionOptions): Promise<string>;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    protected _embed(chunks: string[]): Promise<number[][]>;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
}
export default WatsonX;
//# sourceMappingURL=WatsonX.d.ts.map