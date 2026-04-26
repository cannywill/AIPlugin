import OpenAI from "./OpenAI.js";
export class OVHcloud extends OpenAI {
    static providerName = "ovhcloud";
    static defaultOptions = {
        apiBase: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/",
        model: "Qwen2.5-Coder-32B-Instruct",
        useLegacyCompletionsEndpoint: false,
    };
    static MODEL_IDS = {
        "llama3.1-8b": "Llama-3.1-8B-Instruct",
        "llama3.1-70b": "Meta-Llama-3_1-70B-Instruct",
        "llama3.3-70b": "Meta-Llama-3_3-70B-Instruct",
        "qwen2.5-coder-32b": "Qwen2.5-Coder-32B-Instruct",
        "qwen3-32b": "Qwen3-32B",
        "qwen3-coder-30b-a3b": "Qwen3-Coder-30B-A3B-Instruct",
        "qwen2.5-vl-72b": "Qwen2.5-VL-72B-Instruct",
        "codestral-mamba-latest": "mamba-codestral-7B-v0.1",
        "mistral-7b": "Mistral-7B-Instruct-v0.3",
        "mistral-8x7b": "Mixtral-8x7B-Instruct-v0.1",
        "mistral-nemo": "Mistral-Nemo-Instruct-2407",
        "mistral-small-3.2-24b": "Mistral-Small-3.2-24B-Instruct-2506",
        "gpt-oss-20b": "gpt-oss-20b",
        "gpt-oss-120b": "gpt-oss-120b",
        "DeepSeek-R1-Distill-Llama-70B": "DeepSeek-R1-Distill-Llama-70B",
    };
    _convertModelName(model) {
        return OVHcloud.MODEL_IDS[model] || this.model;
    }
    _convertArgs(options, messages) {
        const modifiedOptions = {
            ...options,
            model: this._convertModelName(options.model),
        };
        return super._convertArgs(modifiedOptions, messages);
    }
}
export default OVHcloud;
