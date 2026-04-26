/**
 * Converts Vercel AI SDK stream events to OpenAI ChatCompletionChunk format
 */
import { chatChunk, chatChunkFromDelta, usageChatChunk } from "./util.js";
/**
 * Converts a Vercel AI SDK stream event to OpenAI ChatCompletionChunk format.
 * Returns null for events that don't map to OpenAI chunks (like step-start, step-finish, etc.)
 */
export function convertVercelStreamPart(part, options) {
    const { model } = options;
    switch (part.type) {
        case "text-delta":
            return chatChunk({
                content: part.text,
                model,
            });
        case "reasoning-delta":
            return chatChunkFromDelta({
                delta: {
                    role: "assistant",
                    reasoning_content: part.text,
                },
                model,
            });
        case "tool-input-start":
            // Emit the initial chunk with id and function name, matching OpenAI's
            // streaming format where the first tool call chunk carries the id/name.
            return chatChunkFromDelta({
                delta: {
                    tool_calls: [
                        {
                            index: 0,
                            id: part.id,
                            type: "function",
                            function: {
                                name: part.toolName,
                                arguments: "",
                            },
                        },
                    ],
                },
                model,
            });
        case "tool-input-delta":
            return chatChunkFromDelta({
                delta: {
                    tool_calls: [
                        {
                            index: 0,
                            function: {
                                arguments: part.delta,
                            },
                        },
                    ],
                },
                model,
            });
        case "tool-call": {
            const thoughtSignature = part.providerMetadata?.google?.thoughtSignature ??
                part.providerMetadata?.vertex?.thoughtSignature;
            if (!thoughtSignature) {
                return null;
            }
            // Emit only extra_content; args were already streamed via tool-input-delta.
            return chatChunkFromDelta({
                delta: {
                    tool_calls: [
                        {
                            index: 0,
                            extra_content: {
                                google: { thought_signature: thoughtSignature },
                            },
                        },
                    ],
                },
                model,
            });
        }
        case "finish":
            if (part.totalUsage) {
                const inputTokens = typeof part.totalUsage.inputTokens === "number"
                    ? part.totalUsage.inputTokens
                    : 0;
                const outputTokens = typeof part.totalUsage.outputTokens === "number"
                    ? part.totalUsage.outputTokens
                    : 0;
                const totalTokens = typeof part.totalUsage.totalTokens === "number"
                    ? part.totalUsage.totalTokens
                    : inputTokens + outputTokens;
                const inputTokenDetails = part.totalUsage.inputTokenDetails?.cacheReadTokens !==
                    undefined
                    ? {
                        cached_tokens: part.totalUsage.inputTokenDetails.cacheReadTokens ??
                            0,
                        cache_read_tokens: part.totalUsage.inputTokenDetails.cacheReadTokens ??
                            0,
                        cache_write_tokens: part.totalUsage.inputTokenDetails.cacheWriteTokens ??
                            0,
                    }
                    : undefined;
                return usageChatChunk({
                    model,
                    usage: {
                        prompt_tokens: inputTokens,
                        completion_tokens: outputTokens,
                        total_tokens: totalTokens,
                        ...(inputTokenDetails
                            ? { prompt_tokens_details: inputTokenDetails }
                            : {}),
                    },
                });
            }
            return null;
        case "error":
            throw part.error;
        case "text-start":
        case "text-end":
        case "reasoning-start":
        case "reasoning-end":
        case "source":
        case "file":
        case "tool-input-end":
        case "tool-result":
        case "start-step":
        case "finish-step":
        case "start":
        case "abort":
        case "raw":
            return null;
        default:
            const _exhaustive = part;
            return null;
    }
}
/**
 * Async generator that converts Vercel AI SDK stream to OpenAI ChatCompletionChunk stream
 */
export async function* convertVercelStream(stream, options) {
    for await (const part of stream) {
        const chunk = convertVercelStreamPart(part, options);
        if (chunk !== null) {
            yield chunk;
        }
    }
}
//# sourceMappingURL=vercelStreamConverter.js.map