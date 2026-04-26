import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Nvidia extends OpenAI {
    maxStopWords: number;
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    protected _embed(chunks: string[]): Promise<number[][]>;
}
export default Nvidia;
//# sourceMappingURL=Nvidia.d.ts.map