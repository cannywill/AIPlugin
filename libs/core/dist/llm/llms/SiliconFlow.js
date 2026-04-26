import { streamSse } from "@continuedev/fetch";
import { osModelsEditPrompt } from "../templates/edit.js";
import OpenAI from "./OpenAI.js";
class SiliconFlow extends OpenAI {
    static providerName = "siliconflow";
    static defaultOptions = {
        apiBase: "https://api.siliconflow.cn/v1/",
        model: "Qwen/Qwen2.5-Coder-32B-Instruct",
        promptTemplates: {
            edit: osModelsEditPrompt,
        },
        useLegacyCompletionsEndpoint: false,
    };
    maxStopWords = 16;
    supportsFim() {
        return true;
    }
    async *_streamFim(prefix, suffix, signal, options) {
        const endpoint = new URL("completions", this.apiBase);
        const resp = await this.fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({
                model: options.model,
                prompt: prefix,
                suffix,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                top_p: options.topP,
                frequency_penalty: options.frequencyPenalty,
                presence_penalty: options.presencePenalty,
                stop: options.stop,
                stream: true,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            signal,
        });
        for await (const chunk of streamSse(resp)) {
            yield chunk.choices[0].text;
        }
    }
    async rerank(query, chunks) {
        if (!query || query.trim() === "") {
            console.warn("[SiliconFlow] rerank: query is empty");
            return [];
        }
        if (!chunks || chunks.length === 0) {
            console.warn("[SiliconFlow] rerank: chunks is empty");
            return [];
        }
        const endpoint = new URL("rerank", this.apiBase);
        const resp = await this.fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                model: this.model,
                query,
                documents: chunks.map((chunk) => chunk.content),
            }),
        });
        if (!resp.ok) {
            throw new Error(await resp.text());
        }
        const data = (await resp.json());
        const results = data.results.sort((a, b) => a.index - b.index);
        return results.map((result) => result.relevance_score);
    }
}
export default SiliconFlow;
