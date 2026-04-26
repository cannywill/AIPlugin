import { CompletionOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class HuggingFaceInferenceAPI extends BaseLLM {
    static providerName: string;
    private _convertArgs;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
export default HuggingFaceInferenceAPI;
//# sourceMappingURL=HuggingFaceInferenceAPI.d.ts.map