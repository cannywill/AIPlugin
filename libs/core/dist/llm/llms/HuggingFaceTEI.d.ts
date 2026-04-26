import { Chunk, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class HuggingFaceTEIEmbeddingsProvider extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions> | undefined;
    constructor(options: LLMOptions);
    _embed(batch: string[]): Promise<number[][]>;
    doInfoRequest(): Promise<TEIInfoResponse>;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
}
type TEIInfoResponse = {
    model_id: string;
    model_sha: string;
    model_dtype: string;
    model_type: {
        embedding: {
            pooling: string;
        };
    };
    max_concurrent_requests: number;
    max_input_length: number;
    max_batch_tokens: number;
    max_batch_requests: number;
    max_client_batch_size: number;
    auto_truncate: boolean;
    tokenization_workers: number;
    version: string;
    sha: string;
    docker_label: string;
};
export default HuggingFaceTEIEmbeddingsProvider;
//# sourceMappingURL=HuggingFaceTEI.d.ts.map