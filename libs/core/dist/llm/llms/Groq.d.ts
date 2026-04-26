import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Groq extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    maxStopWords: number | undefined;
    private static modelConversion;
    protected _convertModelName(model: string): string;
}
export default Groq;
//# sourceMappingURL=Groq.d.ts.map