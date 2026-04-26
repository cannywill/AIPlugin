import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class DeepInfra extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    maxStopWords: number | undefined;
    protected _embed(chunks: string[]): Promise<number[][]>;
}
export default DeepInfra;
//# sourceMappingURL=DeepInfra.d.ts.map