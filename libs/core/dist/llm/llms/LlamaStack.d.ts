import { CompletionOptions, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class LlamaStack extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    maxStopWords: number | undefined;
    supportsFim(): boolean;
    _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
export default LlamaStack;
//# sourceMappingURL=LlamaStack.d.ts.map