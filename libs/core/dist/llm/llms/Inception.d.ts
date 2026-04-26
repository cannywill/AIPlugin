import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import { ChatCompletionCreateParams } from "@continuedev/openai-adapters";
import OpenAI from "./OpenAI.js";
/**
 * Inception Labs provider
 *
 * Integrates with Inception Labs' OpenAI-compatible API endpoints.
 * Provides access to Mercury models for autocomplete and other tasks.
 *
 * Different models use different API endpoints:
 * - mercury-editor-mini-experimental: zaragoza.api.inceptionlabs.ai
 * - mercury-editor-small-experimental: copenhagen.api.inceptionlabs.ai
 *
 * More information at: https://docs.inceptionlabs.ai/
 */
declare class Inception extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    supportsFim(): boolean;
    protected modifyChatBody(body: ChatCompletionCreateParams): ChatCompletionCreateParams;
    _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    private isNextEdit;
    private isApply;
    private removeToken;
    private streamSpecialEndpoint;
}
export default Inception;
//# sourceMappingURL=Inception.d.ts.map