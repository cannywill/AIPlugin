import { Socket } from "socket.io-client";
import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import { BaseLLM } from "../index.js";
interface IFlowiseApiOptions {
    /** Sampling temperature to use */
    temperature?: number;
    /**
     * Maximum number of tokens to generate in the completion.
     */
    maxTokens?: number;
    /** Total probability mass of tokens to consider at each step */
    topP?: number;
    /** Integer to define the top tokens considered within the sample operation to create new text. */
    topK?: number;
    presencePenalty?: number;
    /** Penalizes repeated tokens according to frequency */
    frequencyPenalty?: number;
    [key: string]: any;
}
interface IFlowiseSocketManager {
    isConnected: boolean;
    hasNextToken: () => Promise<boolean>;
    internal: {
        timeout?: NodeJS.Timeout;
        hasNextTokenPromiseResolve: (value: boolean | PromiseLike<boolean>) => void;
        hasNextTokenPromiseReject: (reason?: any) => void;
        messageHistory: string[];
    };
    error?: Error;
    getCurrentMessage: () => string;
}
interface IFlowiseKeyValueProperty {
    key: string;
    value: any;
}
interface IFlowiseProviderLLMOptions extends LLMOptions {
    timeout?: number;
    additionalHeaders?: IFlowiseKeyValueProperty[];
    additionalFlowiseConfiguration?: IFlowiseKeyValueProperty[];
}
declare class Flowise extends BaseLLM {
    static providerName: string;
    static defaultOptions: Partial<IFlowiseProviderLLMOptions>;
    static FlowiseMessageType: {
        User: string;
        Assistant: string;
    };
    protected additionalFlowiseConfiguration: IFlowiseKeyValueProperty[];
    protected timeout: number;
    protected additionalHeaders: IFlowiseKeyValueProperty[];
    constructor(options: IFlowiseProviderLLMOptions);
    private _getChatUrl;
    private _getSocketUrl;
    private _getHeaders;
    protected _convertArgs(options: CompletionOptions): IFlowiseApiOptions;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    protected _getRequestBody(messages: ChatMessage[], options: CompletionOptions): any;
    protected _initializeSocket(): Promise<{
        socket: Socket;
        socketInfo: IFlowiseSocketManager;
    }>;
}
export default Flowise;
//# sourceMappingURL=Flowise.d.ts.map