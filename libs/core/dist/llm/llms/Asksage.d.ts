import { ChatMessage, CompletionOptions, LLMOptions, Tool } from "../../index.js";
import { BaseLLM } from "../index.js";
import { AskSageTool, AskSageToolChoice } from "@continuedev/openai-adapters";
interface AskSageCompletionOptions extends CompletionOptions {
    mode?: "chat" | "deep_agent";
    limitReferences?: 0 | 1;
    persona?: number;
    systemPrompt?: string;
    askSageTools?: AskSageTool[];
    enabledMcpTools?: string[];
    toolsToExecute?: string[];
    askSageToolChoice?: AskSageToolChoice;
    reasoningEffort?: "low" | "medium" | "high";
    deepAgentId?: number;
    streaming?: boolean;
    file?: unknown;
}
interface AskSageRequestArgs {
    model?: string;
    temperature?: number;
    mode?: "chat" | "deep_agent";
    message?: string | {
        user: string;
        message: string;
    }[];
    live?: 0 | 1 | 2;
    dataset?: string | string[];
    limit_references?: 0 | 1;
    persona?: number;
    system_prompt?: string;
    tools?: AskSageTool[];
    enabled_mcp_tools?: string[];
    tools_to_execute?: string[];
    tool_choice?: AskSageToolChoice;
    reasoning_effort?: "low" | "medium" | "high";
    deep_agent_id?: number;
    streaming?: boolean;
    file?: unknown;
}
declare class Asksage extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private sessionTokenPromise;
    private tokenTimestamp;
    private email?;
    private userApiUrl;
    constructor(options: LLMOptions);
    private getSessionToken;
    private getToken;
    private isFileLike;
    private toFormData;
    protected _convertMessage(message: ChatMessage): {
        user: string;
        message: string;
    };
    protected _convertToolToAskSageTool(tool: Tool): AskSageTool;
    protected _convertArgs(options: AskSageCompletionOptions, messages: ChatMessage[]): AskSageRequestArgs;
    protected _getHeaders(hasFile?: boolean): Promise<Record<string, string>>;
    protected _getEndpoint(endpoint: string): URL;
    protected _complete(prompt: string, signal: AbortSignal, options: CompletionOptions): Promise<string>;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    listModels(): Promise<string[]>;
}
export default Asksage;
//# sourceMappingURL=Asksage.d.ts.map