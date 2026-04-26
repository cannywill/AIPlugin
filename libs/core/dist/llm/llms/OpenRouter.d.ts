import { ChatCompletionCreateParams } from "openai/resources/index";
import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class OpenRouter extends OpenAI {
    static providerName: string;
    protected supportsReasoningField: boolean;
    protected supportsReasoningDetailsField: boolean;
    static defaultOptions: Partial<LLMOptions>;
    constructor(options: LLMOptions);
    private isAnthropicModel;
    private isGeminiModel;
    /**
     * Add thought_signature fallback to Gemini tool calls that don't already
     * have one, preventing 400 errors from missing thought_signature.
     * See: https://ai.google.dev/gemini-api/docs/thought-signatures
     */
    private addGeminiThoughtSignatures;
    private addCacheControlToContent;
    protected modifyChatBody(body: ChatCompletionCreateParams): ChatCompletionCreateParams;
}
export default OpenRouter;
//# sourceMappingURL=OpenRouter.d.ts.map