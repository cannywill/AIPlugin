/**
 * Converts Vercel AI SDK stream events to OpenAI ChatCompletionChunk format
 */
import type { ChatCompletionChunk } from "openai/resources/index";
export type VercelStreamPart = {
    type: "text-start";
    id: string;
} | {
    type: "text-delta";
    id: string;
    text: string;
} | {
    type: "text-end";
    id: string;
} | {
    type: "reasoning-start";
    id: string;
} | {
    type: "reasoning-delta";
    id: string;
    text: string;
} | {
    type: "reasoning-end";
    id: string;
} | ({
    type: "source";
    source?: any;
} & Record<string, any>) | {
    type: "file";
    file: any;
} | {
    type: "tool-call";
    toolCallId: string;
    toolName: string;
    input: Record<string, unknown>;
    providerMetadata?: {
        google?: {
            thoughtSignature?: string;
        };
        vertex?: {
            thoughtSignature?: string;
        };
    };
} | {
    type: "tool-input-start";
    id: string;
    toolName: string;
} | {
    type: "tool-input-delta";
    id: string;
    delta: string;
} | {
    type: "tool-input-end";
    id: string;
} | {
    type: "tool-result";
    toolCallId: string;
    result: unknown;
} | {
    type: "start-step";
} | {
    type: "finish-step";
    response: any;
    usage: {
        inputTokens: number;
        outputTokens: number;
        totalTokens?: number;
    };
    finishReason: string;
} | {
    type: "start";
} | {
    type: "finish";
    finishReason: string;
    totalUsage: {
        inputTokens: number;
        outputTokens: number;
        totalTokens?: number;
    };
} | {
    type: "abort";
    reason?: string;
} | {
    type: "error";
    error: unknown;
} | {
    type: "raw";
    rawValue: unknown;
};
export interface VercelStreamConverterOptions {
    model: string;
}
/**
 * Converts a Vercel AI SDK stream event to OpenAI ChatCompletionChunk format.
 * Returns null for events that don't map to OpenAI chunks (like step-start, step-finish, etc.)
 */
export declare function convertVercelStreamPart(part: VercelStreamPart, options: VercelStreamConverterOptions): ChatCompletionChunk | null;
/**
 * Async generator that converts Vercel AI SDK stream to OpenAI ChatCompletionChunk stream
 */
export declare function convertVercelStream(stream: AsyncIterable<VercelStreamPart>, options: VercelStreamConverterOptions): AsyncGenerator<ChatCompletionChunk, void, unknown>;
