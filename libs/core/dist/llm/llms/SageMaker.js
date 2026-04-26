import { InvokeEndpointCommand, InvokeEndpointWithResponseStreamCommand, SageMakerRuntimeClient, } from "@aws-sdk/client-sagemaker-runtime";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
// @ts-ignore
import jinja from "jinja-js";
import { BaseLLM } from "../index.js";
class SageMaker extends BaseLLM {
    static DEFAULT_PROFILE_NAME = "sagemaker";
    static providerName = "sagemaker";
    static defaultOptions = {
        region: "us-west-2",
        contextLength: 200_000,
        maxEmbeddingBatchSize: 1,
    };
    constructor(options) {
        super(options);
        if (!options.apiBase) {
            this.apiBase = `https://runtime.sagemaker.${options.region}.amazonaws.com`;
        }
        this.profile ??= SageMaker.DEFAULT_PROFILE_NAME;
    }
    async *_streamComplete(prompt, signal, options) {
        const credentials = await this._getCredentials();
        const client = new SageMakerRuntimeClient({
            region: this.region,
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken || "",
            },
        });
        const toolkit = new CompletionAPIToolkit(this);
        const command = toolkit.generateCommand([], prompt, options);
        const response = await client.send(command, { abortSignal: signal });
        if (response.Body) {
            let buffer = "";
            for await (const rawValue of response.Body) {
                const binaryChunk = rawValue.PayloadPart?.Bytes;
                let value = new TextDecoder().decode(binaryChunk);
                buffer += value;
                let position;
                while ((position = buffer.indexOf("\n")) >= 0) {
                    const line = buffer.slice(0, position);
                    try {
                        const data = JSON.parse(line.replace(/^data:/, ""));
                        let text = undefined;
                        if ("choices" in data) {
                            if ("delta" in data.choices[0]) {
                                text = data.choices[0].delta.content;
                            }
                            else {
                                text = data.choices[0].text;
                            }
                        }
                        else if ("token" in data) {
                            text = data.token.text;
                        }
                        if (text !== undefined) {
                            yield text;
                        }
                    }
                    catch (e) { }
                    buffer = buffer.slice(position + 1);
                }
            }
        }
    }
    async *_streamChat(messages, signal, options) {
        const credentials = await this._getCredentials();
        const client = new SageMakerRuntimeClient({
            region: this.region,
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken || "",
            },
        });
        const toolkit = new MessageAPIToolkit(this);
        const command = toolkit.generateCommand(messages, "", options);
        const response = await client.send(command, { abortSignal: signal });
        if (response.Body) {
            let buffer = "";
            for await (const rawValue of response.Body) {
                const binaryChunk = rawValue.PayloadPart?.Bytes;
                let value = new TextDecoder().decode(binaryChunk);
                buffer += value;
                let position;
                while ((position = buffer.indexOf("\n")) >= 0) {
                    const line = buffer.slice(0, position);
                    try {
                        const data = JSON.parse(line.replace(/^data:/, ""));
                        let text = undefined;
                        if ("choices" in data) {
                            if ("delta" in data.choices[0]) {
                                text = data.choices[0].delta.content;
                            }
                            else {
                                text = data.choices[0].text;
                            }
                        }
                        else if ("token" in data) {
                            text = data.token.text;
                        }
                        if (text !== undefined) {
                            yield { role: "assistant", content: text };
                        }
                    }
                    catch (e) { }
                    buffer = buffer.slice(position + 1);
                }
            }
        }
    }
    async _getCredentials() {
        try {
            return await fromNodeProviderChain({
                profile: this.profile,
            })();
        }
        catch (e) {
            console.warn(`AWS profile with name ${this.profile} not found in ~/.aws/credentials, using default profile`);
            return await fromNodeProviderChain()();
        }
    }
    async _embed(chunks) {
        const credentials = await this._getCredentials();
        const client = new SageMakerRuntimeClient({
            region: this.region,
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken || "",
            },
        });
        const input = this._generateInvokeModelCommandInput(chunks);
        const command = new InvokeEndpointCommand(input);
        const response = await client.send(command);
        if (response.Body) {
            const decoder = new TextDecoder();
            const decoded = decoder.decode(response.Body);
            try {
                const responseBody = JSON.parse(decoded);
                // If the body contains a key called "embedding" or "embeddings", return the value, otherwise return the whole body
                if (responseBody.embedding) {
                    return responseBody.embedding;
                }
                else if (responseBody.embeddings) {
                    return responseBody.embeddings;
                }
                else {
                    return responseBody;
                }
            }
            catch (e) {
                let message = e instanceof Error ? e.message : String(e);
                throw new Error(`Failed to parse response from SageMaker:\n${decoded}\nError: ${message}`);
            }
        }
    }
    _generateInvokeModelCommandInput(prompts) {
        const payload = {
            inputs: prompts,
            normalize: true,
            // ...(options.requestOptions?.extraBodyProperties || {}),
        };
        if (this.requestOptions?.extraBodyProperties) {
            Object.assign(payload, this.requestOptions.extraBodyProperties);
        }
        return {
            EndpointName: this.model,
            Body: JSON.stringify(payload),
            ContentType: "application/json",
            CustomAttributes: "accept_eula=false",
        };
    }
}
class MessageAPIToolkit {
    sagemaker;
    constructor(sagemaker) {
        this.sagemaker = sagemaker;
    }
    generateCommand(messages, prompt, options) {
        if ("chat_template" in this.sagemaker.completionOptions) {
            // for some model you can apply chat_template to the model
            let prompt = jinja
                .compile(this.sagemaker.completionOptions.chat_template)
                .render({ messages: messages, add_generation_prompt: true }, { autoEscape: false });
            const payload = {
                inputs: prompt,
                parameters: this.sagemaker.completionOptions,
                stream: true,
            };
            return new InvokeEndpointWithResponseStreamCommand({
                EndpointName: options.model,
                Body: new TextEncoder().encode(JSON.stringify(payload)),
                ContentType: "application/json",
                CustomAttributes: "accept_eula=false",
            });
        }
        else {
            const payload = {
                messages: messages,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                top_p: options.topP,
                top_k: options.topK,
                stop: options.stop,
                frequencyPenalty: options.frequencyPenalty,
                presencePenalty: options.presencePenalty,
                stream: true,
            };
            return new InvokeEndpointWithResponseStreamCommand({
                EndpointName: options.model,
                Body: new TextEncoder().encode(JSON.stringify(payload)),
                ContentType: "application/json",
                CustomAttributes: "accept_eula=false",
            });
        }
    }
}
class CompletionAPIToolkit {
    sagemaker;
    constructor(sagemaker) {
        this.sagemaker = sagemaker;
    }
    generateCommand(messages, prompt, options) {
        const payload = {
            inputs: prompt,
            prompt: prompt,
            parameters: this.sagemaker.completionOptions,
            stream: true,
        };
        return new InvokeEndpointWithResponseStreamCommand({
            EndpointName: options.model,
            Body: new TextEncoder().encode(JSON.stringify(payload)),
            ContentType: "application/json",
            CustomAttributes: "accept_eula=false",
        });
    }
}
export default SageMaker;
