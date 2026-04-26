import { CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class HuggingFaceTGI extends BaseLLM {
    private static MAX_STOP_TOKENS;
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    constructor(options: LLMOptions);
    private _convertArgs;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
export default HuggingFaceTGI;
//# sourceMappingURL=HuggingFaceTGI.d.ts.map