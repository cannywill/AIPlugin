import { CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class BedrockImport extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    modelArn?: string | undefined;
    constructor(options: LLMOptions);
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    private _generateInvokeModelCommandInput;
    private _getCredentials;
}
export default BedrockImport;
//# sourceMappingURL=BedrockImport.d.ts.map