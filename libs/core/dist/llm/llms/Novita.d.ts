import OpenAI from "./OpenAI.js";
import type { CompletionOptions, LLMOptions } from "../../index.js";
declare class Novita extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private static MODEL_IDS;
    protected _convertModelName(model: string): string;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
export default Novita;
//# sourceMappingURL=Novita.d.ts.map