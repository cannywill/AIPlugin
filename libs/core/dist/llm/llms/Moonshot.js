import { streamSse } from "@continuedev/fetch";
import { osModelsEditPrompt } from "../templates/edit.js";
import OpenAI from "./OpenAI.js";
class Moonshot extends OpenAI {
    static providerName = "moonshot";
    constructor(options) {
        super(options);
        this.supportsReasoningContentField =
            this.model?.startsWith("kimi") ?? false;
    }
    static defaultOptions = {
        apiBase: "https://api.moonshot.cn/v1/",
        model: "moonshot-v1-8k",
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
        const endpoint = new URL("v1/chat/completions", this.apiBase);
        const resp = await this.fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({
                model: options.model,
                messages: [
                    {
                        role: "user",
                        content: prefix + "[fill]" + suffix,
                    },
                ],
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
            yield chunk.choices[0].delta.content;
        }
    }
}
export default Moonshot;
