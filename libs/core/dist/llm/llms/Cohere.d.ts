import { ChatMessage, Chunk, CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class Cohere extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    static maxStopSequences: number;
    private _convertMessages;
    private _convertArgs;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    protected _embed(chunks: string[]): Promise<number[][]>;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
}
export default Cohere;
//# sourceMappingURL=Cohere.d.ts.map