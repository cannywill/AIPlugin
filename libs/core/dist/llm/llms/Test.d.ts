import { ChatMessage, CompletionOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class TestLLM extends BaseLLM {
    static providerName: string;
    private findResponse;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
}
export default TestLLM;
//# sourceMappingURL=Test.d.ts.map