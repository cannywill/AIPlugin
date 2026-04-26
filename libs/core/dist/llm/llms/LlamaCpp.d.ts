import { CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class LlamaCpp extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private _convertArgs;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
export default LlamaCpp;
//# sourceMappingURL=LlamaCpp.d.ts.map