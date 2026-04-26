import { CompletionOptions, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Moonshot extends OpenAI {
    static providerName: string;
    constructor(options: LLMOptions);
    static defaultOptions: Partial<LLMOptions>;
    maxStopWords: number | undefined;
    supportsFim(): boolean;
    _streamFim(prefix: string, suffix: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>;
}
export default Moonshot;
//# sourceMappingURL=Moonshot.d.ts.map