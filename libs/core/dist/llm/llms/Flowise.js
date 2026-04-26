import socketIOClient from "socket.io-client";
import { renderChatMessage } from "../../util/messageContent.js";
import { BaseLLM } from "../index.js";
class Flowise extends BaseLLM {
    static providerName = "flowise";
    static defaultOptions = {
        apiBase: "http://localhost:3000",
    };
    static FlowiseMessageType = {
        User: "userMessage",
        Assistant: "apiMessage",
    };
    additionalFlowiseConfiguration = [];
    timeout = 5000;
    additionalHeaders = [];
    constructor(options) {
        super(options);
        this.timeout = options.timeout ?? 5000;
        this.additionalHeaders = options.additionalHeaders ?? [];
        this.additionalFlowiseConfiguration =
            options.additionalFlowiseConfiguration ?? [];
    }
    _getChatUrl() {
        return String(this.apiBase);
    }
    _getSocketUrl() {
        return new URL(this._getChatUrl()).origin;
    }
    _getHeaders() {
        const headers = {
            "Content-Type": "application/json",
        };
        if (this.apiKey) {
            headers.Authorization = `Bearer ${this.apiKey}`;
        }
        for (const additionalHeader of this.additionalHeaders) {
            headers[additionalHeader.key] = additionalHeader.value;
        }
        return headers;
    }
    _convertArgs(options) {
        const finalOptions = {
            temperature: options.temperature,
            maxTokens: options.maxTokens,
            topP: options.topP,
            topK: options.topK,
            presencePenalty: options.presencePenalty,
            frequencyPenalty: options.frequencyPenalty,
        };
        for (const additionalConfig of this.additionalFlowiseConfiguration) {
            finalOptions[additionalConfig.key] = additionalConfig.value;
        }
        return finalOptions;
    }
    async *_streamComplete(prompt, signal, options) {
        const message = { role: "user", content: prompt };
        for await (const chunk of this._streamChat([message], signal, options)) {
            yield renderChatMessage(chunk);
        }
    }
    async *_streamChat(messages, signal, options) {
        const requestBody = this._getRequestBody(messages, options);
        const { socket, socketInfo } = await this._initializeSocket();
        const response = await this.fetch(this._getChatUrl(), {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify({ ...requestBody, socketIOClientId: socket.id }),
            signal,
        });
        if (response.status === 499) {
            return; // Aborted by user
        }
        while (await socketInfo.hasNextToken()) {
            yield { role: "assistant", content: socketInfo.getCurrentMessage() };
        }
        if (socketInfo.error) {
            socket.disconnect();
            try {
                yield { role: "assistant", content: await response.text() };
            }
            catch (error) {
                yield { role: "assistant", content: error.message ?? error };
            }
        }
        socket.disconnect();
    }
    _getRequestBody(messages, options) {
        const lastMessage = messages[messages.length - 1];
        const history = messages
            .filter((m) => m !== lastMessage)
            .map((m) => ({
            type: m.role === "user"
                ? Flowise.FlowiseMessageType.User
                : Flowise.FlowiseMessageType.Assistant,
            message: m.content,
        }));
        const requestBody = {
            question: lastMessage.content,
            history: history,
            overrideConfig: this._convertArgs(options),
        };
        return requestBody;
    }
    _initializeSocket() {
        return new Promise((res, rej) => {
            const socket = socketIOClient(this._getSocketUrl());
            const socketInfo = {
                isConnected: false,
                hasNextToken: () => Promise.resolve(false),
                internal: {
                    hasNextTokenPromiseResolve: () => { },
                    hasNextTokenPromiseReject: () => { },
                    messageHistory: [],
                },
                getCurrentMessage: () => "",
            };
            socketInfo.getCurrentMessage = () => socketInfo.internal.messageHistory.shift() ?? "";
            socketInfo.hasNextToken = () => {
                return new Promise((hasNextTokenResolve, hasNextTokenReject) => {
                    socketInfo.internal.hasNextTokenPromiseResolve =
                        hasNextTokenResolve;
                    socketInfo.internal.hasNextTokenPromiseReject = hasNextTokenReject;
                });
            };
            const resetTimeout = () => {
                clearTimeout(socketInfo.internal.timeout);
                socketInfo.internal.timeout = setTimeout(() => {
                    socketInfo.error = new Error("Timeout occurred");
                    socketInfo.internal.hasNextTokenPromiseResolve(false);
                    rej(`Timeout trying to connect to socket: ${this._getSocketUrl()}`);
                }, this.timeout);
            };
            resetTimeout();
            socket.on("connect", () => {
                socketInfo.isConnected = true;
                resetTimeout();
                res({ socket, socketInfo });
            });
            socket.on("token", (token) => {
                if (socketInfo.isConnected) {
                    socketInfo.internal.messageHistory.push(token);
                    resetTimeout();
                    socketInfo.internal.hasNextTokenPromiseResolve(true);
                }
            });
            socket.on("error", (error) => {
                clearTimeout(socketInfo.internal.timeout);
                socketInfo.error = error;
                socketInfo.internal.hasNextTokenPromiseResolve(false);
                rej(`Error trying to connect to socket: ${this._getSocketUrl()}`);
            });
            socket.on("end", () => {
                clearTimeout(socketInfo.internal.timeout);
                socketInfo.hasNextToken = () => Promise.resolve(Boolean(socketInfo.internal.messageHistory.length));
            });
            socket.on("disconnect", () => {
                socketInfo.isConnected = false;
                clearTimeout(socketInfo.internal.timeout);
                socketInfo.internal.hasNextTokenPromiseResolve(false);
            });
        });
    }
}
export default Flowise;
