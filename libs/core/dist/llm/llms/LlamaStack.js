import { streamSse } from "@continuedev/fetch";
import { osModelsEditPrompt } from "../templates/edit.js";
import OpenAI from "./OpenAI.js";
class LlamaStack extends OpenAI {
    static providerName = "llamastack";
    static defaultOptions = {
        apiBase: "http://localhost:8321/v1/openai/v1/",
        model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
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
}
export default LlamaStack;
