import { Chunk, CompletionOptions, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class SiliconFlow extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    maxStopWords: number | undefined;
    supportsFim(): boolean;
    _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
}
export default SiliconFlow;
//# sourceMappingURL=SiliconFlow.d.ts.map