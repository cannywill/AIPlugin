import { streamSse } from "@continuedev/fetch";
import { BaseLLM } from "../index.js";
class HuggingFaceTGI extends BaseLLM {
    static MAX_STOP_TOKENS = 4;
    static providerName = "huggingface-tgi";
    static defaultOptions = {
        apiBase: "http://localhost:8080/",
    };
    constructor(options) {
        super(options);
        this.fetch(new URL("info", this.apiBase), {
            method: "GET",
        })
            .then(async (response) => {
            if (response.status !== 200) {
                console.warn("Error calling Hugging Face TGI /info endpoint: ", await response.text());
                return;
            }
            const json = await response.json();
            this.model = json.model_id;
            this._contextLength = Number.parseInt(json.max_input_length);
        })
            .catch((e) => {
            console.log(`Failed to list models for HuggingFace TGI: ${e.message}`);
        });
    }
    _convertArgs(options, prompt) {
        const finalOptions = {
            max_new_tokens: options.maxTokens,
            best_of: 1,
            temperature: options.temperature,
            top_p: options.topP,
            top_k: options.topK,
            presence_penalty: options.presencePenalty,
            frequency_penalty: options.frequencyPenalty,
            stop: options.stop?.slice(0, this.maxStopWords ?? HuggingFaceTGI.MAX_STOP_TOKENS),
        };
        return finalOptions;
    }
    async *_streamComplete(prompt, signal, options) {
        const args = this._convertArgs(options, prompt);
        const response = await this.fetch(new URL("generate_stream", this.apiBase), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt, parameters: args }),
            signal,
        });
        for await (const value of streamSse(response)) {
            yield value.token.text;
        }
    }
}
export default HuggingFaceTGI;
