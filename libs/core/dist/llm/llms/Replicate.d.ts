import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class Replicate extends BaseLLM {
    private static MODEL_IDS;
    static providerName: string;
    private _replicate;
    private _convertArgs;
    private _convertChatArgs;
    constructor(options: LLMOptions);
    protected _complete(prompt: string, signal: AbortSignal, options: CompletionOptions): Promise<string>;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
}
export default Replicate;
//# sourceMappingURL=Replicate.d.ts.map