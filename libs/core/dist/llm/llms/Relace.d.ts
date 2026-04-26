import { LLMOptions } from "../..";
import { LLMConfigurationStatuses } from "../constants";
import { LlmApiRequestType } from "../openaiTypeConverters";
import OpenAI from "./OpenAI";
export declare class Relace extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions> | undefined;
    protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[];
    protected supportsPrediction(model: string): boolean;
    getConfigurationStatus(): LLMConfigurationStatuses.VALID | LLMConfigurationStatuses.MISSING_API_KEY;
}
//# sourceMappingURL=Relace.d.ts.map