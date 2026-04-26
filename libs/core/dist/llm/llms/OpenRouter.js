import { OPENROUTER_HEADERS } from "@continuedev/openai-adapters";
import { osModelsEditPrompt } from "../templates/edit.js";
import OpenAI from "./OpenAI.js";
class OpenRouter extends OpenAI {
    static providerName = "openrouter";
    supportsReasoningField = true;
    supportsReasoningDetailsField = true;
    static defaultOptions = {
        apiBase: "https://openrouter.ai/api/v1/",
        model: "gpt-4o-mini",
        promptTemplates: {
            edit: osModelsEditPrompt,
        },
        useLegacyCompletionsEndpoint: false,
    };
    constructor(options) {
        super({
            ...options,
            requestOptions: {
                ...options.requestOptions,
                headers: {
                    ...OPENROUTER_HEADERS,
                    ...options.requestOptions?.headers,
                },
            },
        });
    }
    isAnthropicModel(model) {
        if (!model)
            return false;
        const modelLower = model.toLowerCase();
        return modelLower.includes("claude");
    }
    isGeminiModel(model) {
        if (!model)
            return false;
        return model.toLowerCase().startsWith("google/");
    }
    /**
     * Add thought_signature fallback to Gemini tool calls that don't already
     * have one, preventing 400 errors from missing thought_signature.
     * See: https://ai.google.dev/gemini-api/docs/thought-signatures
     */
    addGeminiThoughtSignatures(body) {
        body.messages = body.messages.map((message) => {
            if (message.role === "assistant" && message.tool_calls?.length) {
                return {
                    ...message,
                    tool_calls: message.tool_calls.map((toolCall, index) => {
                        if (index !== 0)
                            return toolCall;
                        if (toolCall.extra_content?.google?.thought_signature) {
                            return toolCall;
                        }
                        return {
                            ...toolCall,
                            extra_content: {
                                ...toolCall.extra_content,
                                google: {
                                    ...toolCall.extra_content?.google,
                                    thought_signature: "skip_thought_signature_validator",
                                },
                            },
                        };
                    }),
                };
            }
            return message;
        });
        return body;
    }
    addCacheControlToContent(content, addCaching) {
        if (!addCaching)
            return content;
        if (typeof content === "string") {
            return [
                {
                    type: "text",
                    text: content,
                    cache_control: { type: "ephemeral" },
                },
            ];
        }
        if (Array.isArray(content)) {
            // For array content, add cache_control to the last text item
            return content.map((part, idx) => {
                if (part.type === "text" && idx === content.length - 1) {
                    return {
                        ...part,
                        cache_control: { type: "ephemeral" },
                    };
                }
                return part;
            });
        }
        return content;
    }
    modifyChatBody(body) {
        body = super.modifyChatBody(body);
        if (this.isGeminiModel(body.model)) {
            body = this.addGeminiThoughtSignatures(body);
        }
        if (!this.isAnthropicModel(body.model) ||
            (!this.cacheBehavior && !this.completionOptions.promptCaching)) {
            return body;
        }
        const shouldCacheConversation = this.cacheBehavior?.cacheConversation ||
            this.completionOptions.promptCaching;
        const shouldCacheSystemMessage = this.cacheBehavior?.cacheSystemMessage ||
            this.completionOptions.promptCaching;
        if (!shouldCacheConversation && !shouldCacheSystemMessage) {
            return body;
        }
        // Follow the same logic as Anthropic.ts: filter out system messages first
        const filteredMessages = body.messages.filter((m) => m.role !== "system" && !!m.content);
        // Find the last two user message indices from the filtered array
        const lastTwoUserMsgIndices = filteredMessages
            .map((msg, index) => (msg.role === "user" ? index : -1))
            .filter((index) => index !== -1)
            .slice(-2);
        // Create a mapping from filtered indices to original indices
        let filteredIndex = 0;
        const filteredToOriginalIndexMap = [];
        body.messages.forEach((msg, originalIndex) => {
            if (msg.role !== "system" && !!msg.content) {
                filteredToOriginalIndexMap[filteredIndex] = originalIndex;
                filteredIndex++;
            }
        });
        // Modify messages to add cache_control
        body.messages = body.messages.map((message, idx) => {
            // Handle system message caching
            if (message.role === "system" && shouldCacheSystemMessage) {
                return {
                    ...message,
                    content: this.addCacheControlToContent(message.content, true),
                };
            }
            // Handle conversation caching for last two user messages
            // Check if this message's index (in filtered array) is one of the last two user messages
            const filteredIdx = filteredToOriginalIndexMap.indexOf(idx);
            if (message.role === "user" &&
                shouldCacheConversation &&
                filteredIdx !== -1 &&
                lastTwoUserMsgIndices.includes(filteredIdx)) {
                return {
                    ...message,
                    content: this.addCacheControlToContent(message.content, true),
                };
            }
            return message;
        });
        return body;
    }
}
export default OpenRouter;
