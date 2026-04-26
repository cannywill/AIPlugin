import { MessageCreateParams, MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class Anthropic extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private convertToolToAnthropicTool;
    convertArgs(options: CompletionOptions): Omit<MessageCreateParams, "messages">;
    private convertMessageContentToBlocks;
    private convertToolCallsToBlocks;
    private getContentBlocksFromChatMessage;
    convertMessages(msgs: ChatMessage[], cachePrompt: boolean): MessageParam[];
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    handleResponse(response: any, stream: boolean | undefined): AsyncGenerator<ChatMessage>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
}
export default Anthropic;
//# sourceMappingURL=Anthropic.d.ts.map