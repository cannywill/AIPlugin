import { OpenAIApi } from "./OpenAI.js";
import { applyAnthropicCachingToOpenRouterBody } from "./OpenRouterCaching.js";
// TODO: Extract detailed error info from OpenRouter's error.metadata.raw to surface better messages
export const OPENROUTER_HEADERS = {
    "HTTP-Referer": "https://www.continue.dev/",
    "X-OpenRouter-Title": "Continue",
    "X-OpenRouter-Categories": "ide-extension",
};
export class OpenRouterApi extends OpenAIApi {
    constructor(config) {
        super({
            ...config,
            apiBase: config.apiBase ?? "https://openrouter.ai/api/v1/",
            requestOptions: {
                ...config.requestOptions,
                headers: {
                    ...OPENROUTER_HEADERS,
                    ...config.requestOptions?.headers,
                },
            },
        });
    }
    isAnthropicModel(model) {
        if (!model) {
            return false;
        }
        const modelLower = model.toLowerCase();
        return modelLower.includes("claude");
    }
    modifyChatBody(body) {
        const modifiedBody = super.modifyChatBody(body);
        if (!this.isAnthropicModel(modifiedBody.model)) {
            return modifiedBody;
        }
        applyAnthropicCachingToOpenRouterBody(modifiedBody, this.config.cachingStrategy ?? "systemAndTools");
        return modifiedBody;
    }
}
export default OpenRouterApi;
//# sourceMappingURL=OpenRouter.js.map