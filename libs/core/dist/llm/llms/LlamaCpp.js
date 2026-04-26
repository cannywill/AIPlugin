import { streamSse } from "@continuedev/fetch";
import { BaseLLM } from "../index.js";
class LlamaCpp extends BaseLLM {
    static providerName = "llama.cpp";
    static defaultOptions = {
        apiBase: "http://127.0.0.1:8080/",
    };
    _convertArgs(options, prompt) {
        const finalOptions = {
            n_predict: options.maxTokens,
            frequency_penalty: options.frequencyPenalty,
            presence_penalty: options.presencePenalty,
            min_p: options.minP,
            mirostat: options.mirostat,
            stop: options.stop,
            top_k: options.topK,
            top_p: options.topP,
            temperature: options.temperature,
        };
        return finalOptions;
    }
    async *_streamComplete(prompt, signal, options) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
            ...this.requestOptions?.headers,
        };
        const resp = await this.fetch(new URL("completion", this.apiBase), {
            method: "POST",
            headers,
            body: JSON.stringify({
                model: this.model,
                prompt,
                stream: true,
                ...this._convertArgs(options, prompt),
            }),
            signal,
        });
        for await (const value of streamSse(resp)) {
            if (value.content) {
                yield value.content;
            }
        }
    }
}
export default LlamaCpp;
