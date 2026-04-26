import { BedrockRuntimeClient, InvokeModelWithResponseStreamCommand, } from "@aws-sdk/client-bedrock-runtime";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { BaseLLM } from "../index.js";
class BedrockImport extends BaseLLM {
    static providerName = "bedrockimport";
    static defaultOptions = {
        region: "us-east-1",
    };
    // the BedRock imported custom model ARN
    modelArn;
    constructor(options) {
        super(options);
        if (!options.apiBase) {
            this.apiBase = `https://bedrock-runtime.${options.region}.amazonaws.com`;
        }
        if (options.modelArn) {
            this.modelArn = options.modelArn;
        }
        if (options.profile) {
            this.profile = options.profile;
        }
        else {
            this.profile = "bedrock";
        }
    }
    async *_streamComplete(prompt, signal, options) {
        const credentials = await this._getCredentials();
        const client = new BedrockRuntimeClient({
            region: this.region,
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken || "",
            },
        });
        const input = this._generateInvokeModelCommandInput(prompt, options);
        const command = new InvokeModelWithResponseStreamCommand(input);
        const response = await client.send(command, { abortSignal: signal });
        if (response.body) {
            for await (const item of response.body) {
                const decoder = new TextDecoder();
                const decoded = decoder.decode(item.chunk?.bytes);
                try {
                    const chunk = JSON.parse(decoded);
                    if (chunk.outputs[0].text) {
                        yield chunk.outputs[0].text;
                    }
                }
                catch (e) {
                    throw new Error(`Malformed JSON received from Bedrock: ${decoded}`);
                }
            }
        }
    }
    _generateInvokeModelCommandInput(prompt, options) {
        const payload = {
            prompt: prompt,
        };
        return {
            body: JSON.stringify(payload),
            modelId: this.modelArn,
            accept: "application/json",
            contentType: "application/json",
        };
    }
    async _getCredentials() {
        try {
            return await fromNodeProviderChain({
                profile: this.profile,
                ignoreCache: true,
            })();
        }
        catch (e) {
            console.warn(`AWS profile with name ${this.profile} not found in ~/.aws/credentials, using default profile`);
            return await fromNodeProviderChain()();
        }
    }
}
export default BedrockImport;
