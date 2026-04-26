import { LLMOptions } from "../../index.js";
import { BaseLLM } from "../../llm/index.js";
export declare class TransformersJsEmbeddingsProvider extends BaseLLM {
    static providerName: string;
    static maxGroupSize: number;
    static model: string;
    static mockVector: number[];
    static defaultOptions: Partial<LLMOptions> | undefined;
    constructor();
    embed(chunks: string[]): Promise<any[]>;
}
export default TransformersJsEmbeddingsProvider;
//# sourceMappingURL=TransformersJsEmbeddingsProvider.d.ts.map