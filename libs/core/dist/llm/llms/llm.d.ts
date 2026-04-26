import { Chunk } from "../../index.js";
import { BaseLLM } from "../index.js";
export declare class LLMReranker extends BaseLLM {
    static providerName: string;
    scoreChunk(chunk: Chunk, query: string): Promise<number>;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
}
//# sourceMappingURL=llm.d.ts.map