import { ChatMessage, CompletionOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
export default class Cloudflare extends BaseLLM {
    static providerName: string;
    private _convertArgs;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage, any, unknown>;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
//# sourceMappingURL=Cloudflare.d.ts.map