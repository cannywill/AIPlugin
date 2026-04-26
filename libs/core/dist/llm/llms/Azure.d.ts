import { LLMOptions } from "../../index.js";
import { LlmApiRequestType } from "../openaiTypeConverters.js";
import OpenAI from "./OpenAI.js";
declare class Azure extends OpenAI {
    static providerName: string;
    protected supportsPrediction(model: string): boolean;
    protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[];
    static defaultOptions: Partial<LLMOptions>;
    constructor(options: LLMOptions);
}
export default Azure;
//# sourceMappingURL=Azure.d.ts.map