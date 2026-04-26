import { Chunk, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Voyage extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions> | undefined;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
}
export default Voyage;
//# sourceMappingURL=Voyage.d.ts.map