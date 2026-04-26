import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class SageMaker extends BaseLLM {
    private static DEFAULT_PROFILE_NAME;
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    constructor(options: LLMOptions);
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    private _getCredentials;
    _embed(chunks: string[]): Promise<any>;
    private _generateInvokeModelCommandInput;
}
export default SageMaker;
//# sourceMappingURL=SageMaker.d.ts.map