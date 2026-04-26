import { ChatMessage, CompletionOptions, LLMOptions, ModelInstaller } from "../../index.js";
import { BaseLLM } from "../index.js";
declare class Ollama extends BaseLLM implements ModelInstaller {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private static modelsBeingInstalled;
    private static modelsBeingInstalledMutex;
    private fimSupported;
    private modelInfoPromise;
    private explicitContextLength;
    constructor(options: LLMOptions);
    private ensureModelInfo;
    private modelMap;
    private _getModel;
    get contextLength(): number;
    private _getModelFileParams;
    private _convertToOllamaMessage;
    private _getGenerateOptions;
    private getEndpoint;
    protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    /**
     * Reorder messages so that system messages never appear directly after tool
     * messages. Some Ollama models (Mistral, Ministral) reject the sequence
     * `tool → system` with "Unexpected role 'system' after role 'tool'".
     * This moves such system messages to just before the preceding
     * assistant+tool block.
     */
    private _reorderMessagesForToolCompat;
    protected _streamChat(messages: ChatMessage[], signal: AbortSignal, options: CompletionOptions): AsyncGenerator<ChatMessage>;
    supportsFim(): boolean;
    protected _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
    listModels(): Promise<string[]>;
    protected _embed(chunks: string[]): Promise<number[][]>;
    installModel(modelName: string, signal: AbortSignal, progressReporter?: (task: string, increment: number, total: number) => void): Promise<any>;
    isInstallingModel(modelName: string): Promise<boolean>;
}
export default Ollama;
//# sourceMappingURL=Ollama.d.ts.map