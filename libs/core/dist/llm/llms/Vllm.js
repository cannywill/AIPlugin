import OpenAI from "./OpenAI.js";
class Vllm extends OpenAI {
    static providerName = "vllm";
    _userExplicitContextLength;
    _userExplicitModel;
    constructor(options) {
        super(options);
        this._userExplicitContextLength = options.contextLength !== undefined;
        this._userExplicitModel =
            options.model !== undefined && options.model !== "";
        if (options.isFromAutoDetect) {
            this._setupCompletionOptions();
        }
    }
    supportsFim() {
        return false;
    }
    async rerank(query, chunks) {
        if (this.useOpenAIAdapterFor.includes("rerank") && this.openaiAdapter) {
            const results = (await this.openaiAdapter.rerank({
                model: this.model,
                query,
                documents: chunks.map((chunk) => chunk.content),
            }));
            // vLLM uses 'results' array instead of 'data'
            if (results.results && Array.isArray(results.results)) {
                const sortedResults = results.results.sort((a, b) => a.index - b.index);
                return sortedResults.map((result) => result.relevance_score);
            }
            throw new Error(`vLLM rerank response missing 'results' array. Got: ${JSON.stringify(Object.keys(results))}`);
        }
        throw new Error("vLLM rerank requires OpenAI adapter");
    }
    _setupCompletionOptions() {
        this.fetch(this._getEndpoint("models"), {
            method: "GET",
            headers: this._getHeaders(),
        })
            .then(async (response) => {
            if (response.status !== 200) {
                console.warn("Error calling vLLM /models endpoint: ", await response.text());
                return;
            }
            const json = await response.json();
            const data = json.data[0];
            if (!this._userExplicitModel) {
                this.model = data.id;
            }
            if (!this._userExplicitContextLength) {
                this._contextLength = Number.parseInt(data.max_model_len);
            }
        })
            .catch((e) => {
            console.log(`Failed to list models for vLLM: ${e.message}`);
        });
    }
}
export default Vllm;
