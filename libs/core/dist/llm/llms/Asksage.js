import FormData from "form-data";
import { BaseLLM } from "../index.js";
const DEFAULT_API_URL = "https://api.asksage.ai/server";
const DEFAULT_USER_API_URL = "https://api.asksage.ai/user";
const TOKEN_TTL = 3600000; // 1 hour in milliseconds
class Asksage extends BaseLLM {
    static providerName = "askSage";
    static defaultOptions = {
        apiBase: DEFAULT_API_URL,
        model: "gpt-4o",
    };
    sessionTokenPromise = null;
    tokenTimestamp = 0;
    email;
    userApiUrl;
    constructor(options) {
        super(options);
        this.apiVersion = options.apiVersion ?? "v1.2.4";
        this.email = process.env.ASKSAGE_EMAIL;
        this.userApiUrl = process.env.ASKSAGE_USER_API_URL || DEFAULT_USER_API_URL;
    }
    async getSessionToken() {
        if (!this.apiKey) {
            throw new Error("AskSage adapter: missing ASKSAGE_API_KEY. Provide it in your environment variables or .env file.");
        }
        // If no email, use API key directly
        if (!this.email || this.email.length === 0) {
            return this.apiKey;
        }
        const url = this.userApiUrl.replace(/\/$/, "") + "/get-token-with-api-key";
        const res = await this.fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: this.email, api_key: this.apiKey }),
        });
        const data = (await res.json());
        if (parseInt(String(data.status)) !== 200) {
            throw new Error("Error getting access token: " + JSON.stringify(data));
        }
        return data.response.access_token;
    }
    async getToken() {
        // Check if token needs refresh
        if (!this.sessionTokenPromise ||
            Date.now() - this.tokenTimestamp > TOKEN_TTL) {
            this.sessionTokenPromise = this.getSessionToken();
            this.tokenTimestamp = Date.now();
        }
        return this.sessionTokenPromise;
    }
    isFileLike(val) {
        return (val !== null &&
            val !== undefined &&
            ((typeof File !== "undefined" && val instanceof File) ||
                (typeof Buffer !== "undefined" && val instanceof Buffer) ||
                (typeof val === "object" &&
                    ("path" in val || "name" in val || "type" in val))));
    }
    toFormData(args) {
        const form = new FormData();
        for (const [key, value] of Object.entries(args)) {
            if (value === undefined || value === null)
                continue;
            if (key === "file" && value) {
                if (Buffer.isBuffer(value)) {
                    form.append("file", value, "file");
                }
                else if (typeof value === "string") {
                    form.append("file", value);
                }
                else {
                    form.append("file", value);
                }
            }
            else if (Array.isArray(value) || typeof value === "object") {
                form.append(key, JSON.stringify(value));
            }
            else {
                form.append(key, String(value));
            }
        }
        return form;
    }
    _convertMessage(message) {
        return {
            user: message.role === "assistant" ? "gpt" : "me",
            message: typeof message.content === "string"
                ? message.content
                : message.content
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join(""),
        };
    }
    _convertToolToAskSageTool(tool) {
        return {
            type: tool.type,
            function: {
                name: tool.function.name,
                description: tool.function.description,
                parameters: tool.function.parameters,
            },
        };
    }
    _convertArgs(options, messages) {
        let formattedMessage;
        if (messages.length === 1) {
            formattedMessage = messages[0].content;
        }
        else {
            formattedMessage = messages.map(this._convertMessage);
        }
        // Convert standard tools to AskSage format, or use askSageTools if provided
        const tools = options.tools?.map((tool) => this._convertToolToAskSageTool(tool)) ??
            options.askSageTools;
        // Map standard toolChoice to AskSage format, or use askSageToolChoice if provided
        const toolChoice = options.toolChoice ?? options.askSageToolChoice;
        const args = {
            message: formattedMessage,
            model: options.model,
            temperature: options.temperature ?? 0.0,
            mode: "chat", // Always use chat mode
            limit_references: 0, // Always use 0
            persona: options.persona,
            system_prompt: options.systemPrompt ??
                process.env.ASKSAGE_SYSTEM_PROMPT ??
                "You are an expert software developer. You give helpful and concise responses.",
            tools,
            tool_choice: toolChoice,
            reasoning_effort: options.reasoningEffort,
            deep_agent_id: options.deepAgentId,
            streaming: options.streaming,
            file: options.file,
        };
        // Remove undefined values
        Object.keys(args).forEach((key) => args[key] === undefined &&
            delete args[key]);
        return args;
    }
    async _getHeaders(hasFile = false) {
        const token = await this.getToken();
        const headers = {
            accept: "application/json",
            "x-access-tokens": token,
        };
        if (!hasFile) {
            headers["Content-Type"] = "application/json";
        }
        return headers;
    }
    _getEndpoint(endpoint) {
        if (!this.apiBase) {
            throw new Error("No API base URL provided. Please set the 'apiBase' option.");
        }
        return new URL(endpoint, this.apiBase);
    }
    async _complete(prompt, signal, options) {
        if (typeof prompt !== "string" || prompt.trim() === "") {
            throw new Error("Prompt must be a non-empty string.");
        }
        const messages = [{ role: "user", content: prompt }];
        const args = this._convertArgs(options, messages);
        const hasFile = this.isFileLike(args.file);
        const endpoint = hasFile ? "query_with_file" : "query";
        try {
            let response;
            if (hasFile) {
                const form = this.toFormData(args);
                const headers = await this._getHeaders(true);
                response = await this.fetch(this._getEndpoint(endpoint), {
                    method: "POST",
                    headers: {
                        ...headers,
                        ...form.getHeaders(),
                    },
                    body: form,
                    signal,
                });
            }
            else {
                const headers = await this._getHeaders(false);
                response = await this.fetch(this._getEndpoint(endpoint), {
                    method: "POST",
                    headers,
                    body: JSON.stringify(args),
                    signal,
                });
            }
            if (response.status === 499) {
                return ""; // Aborted by user
            }
            if (!response.ok) {
                const errText = await response.text();
                // Clear token cache on 401
                if (response.status === 401) {
                    this.sessionTokenPromise = null;
                    this.tokenTimestamp = 0;
                }
                throw new Error(`AskSage API error: ${response.status} ${response.statusText}: ${errText}`);
            }
            const data = (await response.json());
            return (data.text ||
                data.answer ||
                data.message ||
                data.choices?.[0]?.message?.content ||
                "");
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`AskSage client error: ${error.message}`);
            }
            throw error;
        }
    }
    async *_streamComplete(prompt, signal, options) {
        const completion = await this._complete(prompt, signal, options);
        yield completion;
    }
    async *_streamChat(messages, signal, options) {
        const args = this._convertArgs(options, messages);
        const hasFile = this.isFileLike(args.file);
        const endpoint = hasFile ? "query_with_file" : "query";
        try {
            let response;
            if (hasFile) {
                const form = this.toFormData(args);
                const headers = await this._getHeaders(true);
                response = await this.fetch(this._getEndpoint(endpoint), {
                    method: "POST",
                    headers: {
                        ...headers,
                        ...form.getHeaders(),
                    },
                    body: form,
                    signal,
                });
            }
            else {
                const headers = await this._getHeaders(false);
                response = await this.fetch(this._getEndpoint(endpoint), {
                    method: "POST",
                    headers,
                    body: JSON.stringify(args),
                    signal,
                });
            }
            if (response.status === 499) {
                return; // Aborted by user
            }
            if (!response.ok) {
                const errText = await response.text();
                // Clear token cache on 401
                if (response.status === 401) {
                    this.sessionTokenPromise = null;
                    this.tokenTimestamp = 0;
                }
                throw new Error(`AskSage API error: ${response.status} ${response.statusText}: ${errText}`);
            }
            const data = (await response.json());
            // Extract tool calls from response (check both top-level and choices format)
            const rawToolCalls = data.tool_calls || data.choices?.[0]?.message?.tool_calls;
            // Convert to ToolCallDelta format if present
            const toolCalls = rawToolCalls?.map((tc) => ({
                id: tc.id,
                type: tc.type,
                function: {
                    name: tc.function.name,
                    arguments: tc.function.arguments,
                },
            }));
            const assistantMessage = {
                role: "assistant",
                content: data.text ||
                    data.answer ||
                    data.message ||
                    data.choices?.[0]?.message?.content ||
                    "",
                ...(toolCalls && toolCalls.length > 0 ? { toolCalls } : {}),
            };
            yield assistantMessage;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`AskSage client error: ${error.message}`);
            }
            throw error;
        }
    }
    async listModels() {
        return [];
    }
}
export default Asksage;
