import { CompletionOptions, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Deepseek extends OpenAI {
    static providerName: string;
    protected supportsReasoningField: boolean;
    protected supportsReasoningDetailsField: boolean;
    protected supportsReasoningContentField: boolean;
    static defaultOptions: Partial<LLMOptions>;
    maxStopWords: number | undefined;
    supportsFim(): boolean;
    _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
export default Deepseek;
//# sourceMappingURL=Deepseek.d.ts.map