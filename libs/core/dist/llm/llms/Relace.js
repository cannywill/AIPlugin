import { LLMConfigurationStatuses } from "../constants";
import OpenAI from "./OpenAI";
export class Relace extends OpenAI {
    static providerName = "relace";
    static defaultOptions = {
        apiBase: "https://instantapply.endpoint.relace.run/v1/",
    };
    useOpenAIAdapterFor = ["*"];
    supportsPrediction(model) {
        return true;
    }
    getConfigurationStatus() {
        if (!this.apiKey) {
            return LLMConfigurationStatuses.MISSING_API_KEY;
        }
        return LLMConfigurationStatuses.VALID;
    }
}
