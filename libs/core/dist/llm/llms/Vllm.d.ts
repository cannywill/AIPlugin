import { Chunk, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Vllm extends OpenAI {
    static providerName: string;
    private _userExplicitContextLength;
    private _userExplicitModel;
    constructor(options: LLMOptions);
    supportsFim(): boolean;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
    private _setupCompletionOptions;
}
export default Vllm;
//# sourceMappingURL=Vllm.d.ts.map