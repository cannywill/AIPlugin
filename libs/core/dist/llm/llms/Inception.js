import { streamSse } from "@continuedev/fetch";
import { APPLY_UNIQUE_TOKEN } from "../../edit/constants.js";
import { UNIQUE_TOKEN } from "../../nextEdit/constants.js";
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
class Inception extends OpenAI {
    static providerName = "inception";
    static defaultOptions = {
        apiBase: "https://api.inceptionlabs.ai/v1/",
        model: "mercury-coder-small",
        completionOptions: {
            temperature: 0.0,
            presencePenalty: 1.5,
            stop: ["<|endoftext|>"],
            model: "mercury-editor-small-experimental", // Added model to fix TypeScript error
        },
    };
    supportsFim() {
        return true;
    }
    // It seems like this should be inherited automatically from the parent OpenAI class, but it sometimes doesn't.
    // protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[] = [
    //   "chat",
    //   "embed",
    //   "list",
    //   "rerank",
    //   "streamChat",
    //   "streamFim",
    // ];
    modifyChatBody(body) {
        const hasNextEditCapability = this.capabilities?.nextEdit ?? false;
        // Add the nextEdit parameter for Inception-specific routing.
        body.nextEdit = hasNextEditCapability;
        return body;
    }
    async *_streamFim(prefix, suffix, signal, options) {
        const endpoint = new URL("completions", this.apiBase);
        const resp = await this.fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({
                model: options.model,
                prompt: prefix,
                suffix: suffix.trim() === "" ? "<|endoftext|>" : suffix,
                max_tokens: options.maxTokens ?? 150, // Only want this for /fim, not chat
                temperature: options.temperature,
                top_p: options.topP,
                frequency_penalty: options.frequencyPenalty,
                presence_penalty: options.presencePenalty,
                stop: [...(options.stop ?? []), "\n\n", "\n \n"],
                stream: true,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            signal,
        });
        for await (const chunk of streamSse(resp)) {
            if (!chunk.choices[0]) {
                continue;
            }
            yield chunk.choices[0].text;
        }
    }
    async *_streamChat(messages, signal, options) {
        if (this.isNextEdit(messages)) {
            messages = this.removeToken(messages, UNIQUE_TOKEN);
            yield* this.streamSpecialEndpoint("edit/completions", messages, signal, options);
        }
        else if (this.isApply(messages)) {
            messages = this.removeToken(messages, APPLY_UNIQUE_TOKEN);
            yield* this.streamSpecialEndpoint("apply/completions", messages, signal, options);
        }
        else {
            // Use regular chat/completions endpoint - call parent OpenAI implementation.
            yield* super._streamChat(messages, signal, options);
        }
    }
    isNextEdit(messages) {
        // Check if any message contains the unique next edit token.
        return messages.some((message) => typeof message.content === "string" &&
            message.content.endsWith(UNIQUE_TOKEN));
    }
    isApply(messages) {
        return messages.some((message) => typeof message.content === "string" &&
            message.content.endsWith(APPLY_UNIQUE_TOKEN));
    }
    removeToken(messages, token) {
        const lastMessage = messages[messages.length - 1];
        if (typeof lastMessage?.content === "string" &&
            lastMessage.content.endsWith(token)) {
            const cleanedMessages = [...messages];
            cleanedMessages[cleanedMessages.length - 1] = {
                ...lastMessage,
                content: lastMessage.content.slice(0, -token.length),
            };
            return cleanedMessages;
        }
        return messages;
    }
    async *streamSpecialEndpoint(path, messages, signal, options) {
        const endpoint = new URL(path, this.apiBase);
        const resp = await this.fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({
                model: options.model,
                messages,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                top_p: options.topP,
                frequency_penalty: options.frequencyPenalty,
                presence_penalty: options.presencePenalty,
                stop: options.stop,
                stream: true,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            signal,
        });
        for await (const chunk of streamSse(resp)) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
                yield { role: "assistant", content };
            }
        }
    }
}
export default Inception;
