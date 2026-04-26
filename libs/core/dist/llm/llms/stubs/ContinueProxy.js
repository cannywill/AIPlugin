import { decodeSecretLocation, parseProxyModelName, SecretType, } from "@continuedev/config-yaml";
import { Telemetry } from "../../../util/posthog.js";
import OpenAI from "../OpenAI.js";
import { LLMConfigurationStatuses } from "../../constants.js";
class ContinueProxy extends OpenAI {
    set controlPlaneProxyInfo(value) {
        this.apiKey = value.workOsAccessToken;
        if (!this.onPremProxyUrl) {
            this.apiBase = new URL("model-proxy/v1/", value.controlPlaneProxyUrl).toString();
        }
    }
    useOpenAIAdapterFor = [];
    // The apiKey and apiBase are set to the values for the proxy,
    // but we need to keep track of the actual values that the proxy will use
    // to call whatever LLM API is chosen
    actualApiBase;
    // Contains extra properties that we pass along to the proxy. Originally from `env` property on LLMOptions
    configEnv;
    constructor(options) {
        super(options);
        this.configEnv = options.env;
        // This it set to `undefined` to handle the case where we are proxying requests to Azure. We pass the correct env vars
        // needed to do this in `extraBodyProperties` below, but if we don't set `apiType` to `undefined`, we end up proxying to
        // `/openai/deployments/` which is invalid since that URL construction happens on the proxy.
        this.apiType = undefined;
        this.actualApiBase = options.apiBase;
        this.apiKeyLocation = options.apiKeyLocation;
        this.envSecretLocations = options.envSecretLocations;
        this.orgScopeId = options.orgScopeId;
        this.onPremProxyUrl = options.onPremProxyUrl;
        if (this.onPremProxyUrl) {
            this.apiBase = new URL("model-proxy/v1/", this.onPremProxyUrl).toString();
        }
    }
    static providerName = "continue-proxy";
    static defaultOptions = {
        useLegacyCompletionsEndpoint: false,
    };
    get underlyingProviderName() {
        const { provider } = parseProxyModelName(this.model);
        return provider;
    }
    extraBodyProperties() {
        const continueProperties = {
            apiKeyLocation: this.apiKeyLocation,
            envSecretLocations: this.envSecretLocations,
            apiBase: this.actualApiBase,
            orgScopeId: this.orgScopeId ?? null,
            env: this.configEnv,
        };
        return {
            continueProperties,
        };
    }
    getConfigurationStatus() {
        if (!this.apiKeyLocation && !this.envSecretLocations) {
            return LLMConfigurationStatuses.VALID;
        }
        if (this.apiKeyLocation) {
            const secretLocation = decodeSecretLocation(this.apiKeyLocation);
            if (secretLocation.secretType === SecretType.NotFound) {
                return LLMConfigurationStatuses.MISSING_API_KEY;
            }
        }
        if (this.envSecretLocations) {
            for (const secretLocation of Object.values(this.envSecretLocations)) {
                const decoded = decodeSecretLocation(secretLocation);
                if (decoded.secretType === SecretType.NotFound) {
                    return LLMConfigurationStatuses.MISSING_ENV_SECRET;
                }
            }
        }
        return LLMConfigurationStatuses.VALID;
    }
    _getHeaders() {
        const headers = super._getHeaders();
        headers["x-continue-unique-id"] = Telemetry.uniqueId;
        headers["user-agent"] = this._getUserAgent();
        return headers;
    }
    _getUserAgent() {
        const ideInfo = Telemetry.ideInfo;
        const extensionVersion = ideInfo?.extensionVersion ?? "unknown";
        const ideName = ideInfo?.name ?? "unknown";
        const ideType = ideInfo?.ideType ?? "unknown";
        return `Continue/${extensionVersion} (${ideName}; ${ideType})`;
    }
    supportsCompletions() {
        // This was a hotfix and contains duplicate logic from class-specific completion support methods
        if (this.underlyingProviderName === "vllm") {
            return true;
        }
        // other providers that don't support completions include groq, mistral, nvidia, deepseek, etc.
        // For now disabling all except vllm
        return false;
    }
    supportsFim() {
        const { provider } = parseProxyModelName(this.model);
        if (provider === "vllm") {
            return false;
        }
        return true;
    }
    async rerank(query, chunks) {
        const url = new URL("rerank", this.apiBase);
        const resp = await this.fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
                "user-agent": this._getUserAgent(),
            },
            body: JSON.stringify({
                query,
                documents: chunks.map((chunk) => chunk.content),
                model: this.model,
                ...this.extraBodyProperties(),
            }),
        });
        const data = await resp.json();
        const results = data.data.sort((a, b) => a.index - b.index);
        return results.map((result) => result.relevance_score);
    }
}
export default ContinueProxy;
