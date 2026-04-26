/**
 * Converts OpenAI ChatCompletionMessageParam format to Vercel AI SDK CoreMessage format
 */
import type { ChatCompletionMessageParam } from "openai/resources/index.js";
export interface VercelCoreMessage {
    role: "system" | "user" | "assistant" | "tool";
    content: string | Array<any>;
}
/**
 * Converts OpenAI messages to Vercel AI SDK CoreMessage format.
 *
 * Key differences:
 * - OpenAI tool calls: { role: "assistant", tool_calls: [{ id, function: { name, arguments } }] }
 * - Vercel tool calls: { role: "assistant", content: [{ type: "tool-call", toolCallId, toolName, input }] }
 * - OpenAI tool results: { role: "tool", tool_call_id: "...", content: "string" }
 * - Vercel tool results: { role: "tool", content: [{ type: "tool-result", toolCallId: "...", toolName: "...", result: any }] }
 *
 * IMPORTANT: For multi-turn conversations with tools:
 * - We include assistant messages with tool_calls converted to Vercel format
 */
export declare function convertOpenAIMessagesToVercel(messages: ChatCompletionMessageParam[]): VercelCoreMessage[];
