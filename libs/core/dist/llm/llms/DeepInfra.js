import OpenAI from "./OpenAI.js";
class DeepInfra extends OpenAI {
    static providerName = "deepinfra";
    static defaultOptions = {
        apiBase: "https://api.deepinfra.com/v1/openai/",
    };
    maxStopWords = 16;
    async _embed(chunks) {
        const resp = await this.fetch(`https://api.deepinfra.com/v1/inference/${this.model}`, {
            method: "POST",
            headers: {
                Authorization: `bearer ${this.apiKey}`,
            },
            body: JSON.stringify({ inputs: chunks }),
        });
        const data = await resp.json();
        return data.embeddings;
    }
}
export default DeepInfra;
