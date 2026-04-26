import OpenAI from "./OpenAI.js";
class Novita extends OpenAI {
    static providerName = "novita";
    static defaultOptions = {
        apiBase: "https://api.novita.ai/v3/openai/",
    };
    static MODEL_IDS = {
        "deepseek-r1": "deepseek/deepseek-r1",
        deepseek_v3: "deepseek/deepseek_v3",
        "llama3-8b": "meta-llama/llama-3-8b-instruct",
        "llama3-70b": "meta-llama/llama-3-70b-instruct",
        "llama3.1-8b": "meta-llama/llama-3.1-8b-instruct",
        "llama3.1-70b": "meta-llama/llama-3.1-70b-instruct",
        "llama3.1-405b": "meta-llama/llama-3.1-405b-instruct",
        "llama3.2-1b": "meta-llama/llama-3.2-1b-instruct",
        "llama3.2-3b": "meta-llama/llama-3.2-3b-instruct",
        "llama3.2-11b": "meta-llama/llama-3.2-11b-vision-instruct",
        "llama3.3-70b": "meta-llama/llama-3.3-70b-instruct",
        "mistral-nemo": "mistralai/mistral-nemo",
        "mistral-7b": "mistralai/mistral-7b-instruct",
    };
    _convertModelName(model) {
        return Novita.MODEL_IDS[model] || this.model;
    }
    async *_streamComplete(prompt, signal, options) {
        for await (const chunk of this._legacystreamComplete(prompt, signal, options)) {
            yield chunk;
        }
    }
}
export default Novita;
