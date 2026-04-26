import { ChatMessage, CompletionOptions, CustomLLM } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class CustomLLMClass extends BaseLLM {
    get providerName(): string;
    private customStreamCompletion?;
    private customStreamChat?;
    constructor(custom: CustomLLM);
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
export default CustomLLMClass;
//# sourceMappingURL=CustomLLM.d.ts.map