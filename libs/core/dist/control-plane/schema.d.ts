import { z } from "zod";
declare const analyticsSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    clientKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    clientKey?: string | undefined;
}, {
    url?: string | undefined;
    clientKey?: string | undefined;
}>;
export type ControlPlaneAnalytics = z.infer<typeof analyticsSchema>;
export declare const controlPlaneSettingsSchema: z.ZodObject<{
    models: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        provider: z.ZodEnum<["openai", "anthropic", "cohere", "ollama", "huggingface-tgi", "huggingface-inference-api", "replicate", "gemini", "mistral", "bedrock", "sagemaker", "cloudflare", "azure", "ovhcloud", "nebius", "siliconflow", "tensorix", "scaleway", "watsonx"]>;
        model: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        apiBase: z.ZodOptional<z.ZodString>;
        contextLength: z.ZodOptional<z.ZodNumber>;
        maxStopWords: z.ZodOptional<z.ZodNumber>;
        template: z.ZodOptional<z.ZodEnum<["llama2", "alpaca", "zephyr", "phi2", "phind", "anthropic", "chatml", "none", "openchat", "deepseek", "xwin-coder", "neural-chat", "codellama-70b", "llava", "gemma", "llama3", "codestral"]>>;
        completionOptions: z.ZodOptional<z.ZodObject<{
            temperature: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
            minP: z.ZodOptional<z.ZodNumber>;
            presencePenalty: z.ZodOptional<z.ZodNumber>;
            frequencyPenalty: z.ZodOptional<z.ZodNumber>;
            mirostat: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            maxTokens: z.ZodOptional<z.ZodNumber>;
            numThreads: z.ZodOptional<z.ZodNumber>;
            useMmap: z.ZodOptional<z.ZodBoolean>;
            keepAlive: z.ZodOptional<z.ZodNumber>;
            numGpu: z.ZodOptional<z.ZodNumber>;
            raw: z.ZodOptional<z.ZodBoolean>;
            stream: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        }, {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        }>>;
        systemMessage: z.ZodOptional<z.ZodString>;
        requestOptions: z.ZodOptional<z.ZodObject<{
            timeout: z.ZodOptional<z.ZodNumber>;
            verifySsl: z.ZodOptional<z.ZodBoolean>;
            caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            proxy: z.ZodOptional<z.ZodString>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        }, {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        }>>;
        promptTemplates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        model: string;
        provider: "openai" | "ollama" | "anthropic" | "bedrock" | "cohere" | "sagemaker" | "mistral" | "watsonx" | "nebius" | "gemini" | "tensorix" | "azure" | "scaleway" | "ovhcloud" | "huggingface-inference-api" | "huggingface-tgi" | "replicate" | "cloudflare" | "siliconflow";
        title: string;
        template?: "anthropic" | "deepseek" | "llama2" | "alpaca" | "zephyr" | "phi2" | "phind" | "chatml" | "none" | "openchat" | "xwin-coder" | "neural-chat" | "codellama-70b" | "llava" | "gemma" | "llama3" | "codestral" | undefined;
        completionOptions?: {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        } | undefined;
        contextLength?: number | undefined;
        maxStopWords?: number | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        promptTemplates?: Record<string, string> | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        systemMessage?: string | undefined;
    }, {
        model: string;
        provider: "openai" | "ollama" | "anthropic" | "bedrock" | "cohere" | "sagemaker" | "mistral" | "watsonx" | "nebius" | "gemini" | "tensorix" | "azure" | "scaleway" | "ovhcloud" | "huggingface-inference-api" | "huggingface-tgi" | "replicate" | "cloudflare" | "siliconflow";
        title: string;
        template?: "anthropic" | "deepseek" | "llama2" | "alpaca" | "zephyr" | "phi2" | "phind" | "chatml" | "none" | "openchat" | "xwin-coder" | "neural-chat" | "codellama-70b" | "llava" | "gemma" | "llama3" | "codestral" | undefined;
        completionOptions?: {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        } | undefined;
        contextLength?: number | undefined;
        maxStopWords?: number | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        promptTemplates?: Record<string, string> | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        systemMessage?: string | undefined;
    }>, "many">;
    tabAutocompleteModel: z.ZodObject<{
        title: z.ZodString;
        provider: z.ZodEnum<["openai", "anthropic", "cohere", "ollama", "huggingface-tgi", "huggingface-inference-api", "replicate", "gemini", "mistral", "bedrock", "sagemaker", "cloudflare", "azure", "ovhcloud", "nebius", "siliconflow", "tensorix", "scaleway", "watsonx"]>;
        model: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        apiBase: z.ZodOptional<z.ZodString>;
        contextLength: z.ZodOptional<z.ZodNumber>;
        maxStopWords: z.ZodOptional<z.ZodNumber>;
        template: z.ZodOptional<z.ZodEnum<["llama2", "alpaca", "zephyr", "phi2", "phind", "anthropic", "chatml", "none", "openchat", "deepseek", "xwin-coder", "neural-chat", "codellama-70b", "llava", "gemma", "llama3", "codestral"]>>;
        completionOptions: z.ZodOptional<z.ZodObject<{
            temperature: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
            minP: z.ZodOptional<z.ZodNumber>;
            presencePenalty: z.ZodOptional<z.ZodNumber>;
            frequencyPenalty: z.ZodOptional<z.ZodNumber>;
            mirostat: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            maxTokens: z.ZodOptional<z.ZodNumber>;
            numThreads: z.ZodOptional<z.ZodNumber>;
            useMmap: z.ZodOptional<z.ZodBoolean>;
            keepAlive: z.ZodOptional<z.ZodNumber>;
            numGpu: z.ZodOptional<z.ZodNumber>;
            raw: z.ZodOptional<z.ZodBoolean>;
            stream: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        }, {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        }>>;
        systemMessage: z.ZodOptional<z.ZodString>;
        requestOptions: z.ZodOptional<z.ZodObject<{
            timeout: z.ZodOptional<z.ZodNumber>;
            verifySsl: z.ZodOptional<z.ZodBoolean>;
            caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            proxy: z.ZodOptional<z.ZodString>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        }, {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        }>>;
        promptTemplates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        model: string;
        provider: "openai" | "ollama" | "anthropic" | "bedrock" | "cohere" | "sagemaker" | "mistral" | "watsonx" | "nebius" | "gemini" | "tensorix" | "azure" | "scaleway" | "ovhcloud" | "huggingface-inference-api" | "huggingface-tgi" | "replicate" | "cloudflare" | "siliconflow";
        title: string;
        template?: "anthropic" | "deepseek" | "llama2" | "alpaca" | "zephyr" | "phi2" | "phind" | "chatml" | "none" | "openchat" | "xwin-coder" | "neural-chat" | "codellama-70b" | "llava" | "gemma" | "llama3" | "codestral" | undefined;
        completionOptions?: {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        } | undefined;
        contextLength?: number | undefined;
        maxStopWords?: number | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        promptTemplates?: Record<string, string> | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        systemMessage?: string | undefined;
    }, {
        model: string;
        provider: "openai" | "ollama" | "anthropic" | "bedrock" | "cohere" | "sagemaker" | "mistral" | "watsonx" | "nebius" | "gemini" | "tensorix" | "azure" | "scaleway" | "ovhcloud" | "huggingface-inference-api" | "huggingface-tgi" | "replicate" | "cloudflare" | "siliconflow";
        title: string;
        template?: "anthropic" | "deepseek" | "llama2" | "alpaca" | "zephyr" | "phi2" | "phind" | "chatml" | "none" | "openchat" | "xwin-coder" | "neural-chat" | "codellama-70b" | "llava" | "gemma" | "llama3" | "codestral" | undefined;
        completionOptions?: {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        } | undefined;
        contextLength?: number | undefined;
        maxStopWords?: number | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        promptTemplates?: Record<string, string> | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        systemMessage?: string | undefined;
    }>;
    embeddingsModel: z.ZodObject<{
        provider: z.ZodEnum<["transformers.js", "ollama", "openai", "cohere", "gemini", "ovhcloud", "nebius", "siliconflow", "tensorix", "scaleway", "watsonx"]>;
        apiBase: z.ZodOptional<z.ZodString>;
        apiKey: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodString>;
        deployment: z.ZodOptional<z.ZodString>;
        apiType: z.ZodOptional<z.ZodString>;
        apiVersion: z.ZodOptional<z.ZodString>;
        requestOptions: z.ZodOptional<z.ZodObject<{
            timeout: z.ZodOptional<z.ZodNumber>;
            verifySsl: z.ZodOptional<z.ZodBoolean>;
            caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            proxy: z.ZodOptional<z.ZodString>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        }, {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        provider: "openai" | "ollama" | "cohere" | "watsonx" | "nebius" | "gemini" | "tensorix" | "scaleway" | "ovhcloud" | "transformers.js" | "siliconflow";
        model?: string | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        deployment?: string | undefined;
        apiVersion?: string | undefined;
        apiType?: string | undefined;
    }, {
        provider: "openai" | "ollama" | "cohere" | "watsonx" | "nebius" | "gemini" | "tensorix" | "scaleway" | "ovhcloud" | "transformers.js" | "siliconflow";
        model?: string | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        deployment?: string | undefined;
        apiVersion?: string | undefined;
        apiType?: string | undefined;
    }>;
    reranker: z.ZodObject<{
        name: z.ZodEnum<["cohere", "voyage", "llm", "watsonx"]>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        name: "cohere" | "watsonx" | "llm" | "voyage";
        params?: Record<string, any> | undefined;
    }, {
        name: "cohere" | "watsonx" | "llm" | "voyage";
        params?: Record<string, any> | undefined;
    }>;
    analytics: z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        clientKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        clientKey?: string | undefined;
    }, {
        url?: string | undefined;
        clientKey?: string | undefined;
    }>;
    devData: z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
    }, {
        url?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    models: {
        model: string;
        provider: "openai" | "ollama" | "anthropic" | "bedrock" | "cohere" | "sagemaker" | "mistral" | "watsonx" | "nebius" | "gemini" | "tensorix" | "azure" | "scaleway" | "ovhcloud" | "huggingface-inference-api" | "huggingface-tgi" | "replicate" | "cloudflare" | "siliconflow";
        title: string;
        template?: "anthropic" | "deepseek" | "llama2" | "alpaca" | "zephyr" | "phi2" | "phind" | "chatml" | "none" | "openchat" | "xwin-coder" | "neural-chat" | "codellama-70b" | "llava" | "gemma" | "llama3" | "codestral" | undefined;
        completionOptions?: {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        } | undefined;
        contextLength?: number | undefined;
        maxStopWords?: number | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        promptTemplates?: Record<string, string> | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        systemMessage?: string | undefined;
    }[];
    reranker: {
        name: "cohere" | "watsonx" | "llm" | "voyage";
        params?: Record<string, any> | undefined;
    };
    tabAutocompleteModel: {
        model: string;
        provider: "openai" | "ollama" | "anthropic" | "bedrock" | "cohere" | "sagemaker" | "mistral" | "watsonx" | "nebius" | "gemini" | "tensorix" | "azure" | "scaleway" | "ovhcloud" | "huggingface-inference-api" | "huggingface-tgi" | "replicate" | "cloudflare" | "siliconflow";
        title: string;
        template?: "anthropic" | "deepseek" | "llama2" | "alpaca" | "zephyr" | "phi2" | "phind" | "chatml" | "none" | "openchat" | "xwin-coder" | "neural-chat" | "codellama-70b" | "llava" | "gemma" | "llama3" | "codestral" | undefined;
        completionOptions?: {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        } | undefined;
        contextLength?: number | undefined;
        maxStopWords?: number | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        promptTemplates?: Record<string, string> | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        systemMessage?: string | undefined;
    };
    analytics: {
        url?: string | undefined;
        clientKey?: string | undefined;
    };
    embeddingsModel: {
        provider: "openai" | "ollama" | "cohere" | "watsonx" | "nebius" | "gemini" | "tensorix" | "scaleway" | "ovhcloud" | "transformers.js" | "siliconflow";
        model?: string | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        deployment?: string | undefined;
        apiVersion?: string | undefined;
        apiType?: string | undefined;
    };
    devData: {
        url?: string | undefined;
    };
}, {
    models: {
        model: string;
        provider: "openai" | "ollama" | "anthropic" | "bedrock" | "cohere" | "sagemaker" | "mistral" | "watsonx" | "nebius" | "gemini" | "tensorix" | "azure" | "scaleway" | "ovhcloud" | "huggingface-inference-api" | "huggingface-tgi" | "replicate" | "cloudflare" | "siliconflow";
        title: string;
        template?: "anthropic" | "deepseek" | "llama2" | "alpaca" | "zephyr" | "phi2" | "phind" | "chatml" | "none" | "openchat" | "xwin-coder" | "neural-chat" | "codellama-70b" | "llava" | "gemma" | "llama3" | "codestral" | undefined;
        completionOptions?: {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        } | undefined;
        contextLength?: number | undefined;
        maxStopWords?: number | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        promptTemplates?: Record<string, string> | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        systemMessage?: string | undefined;
    }[];
    reranker: {
        name: "cohere" | "watsonx" | "llm" | "voyage";
        params?: Record<string, any> | undefined;
    };
    tabAutocompleteModel: {
        model: string;
        provider: "openai" | "ollama" | "anthropic" | "bedrock" | "cohere" | "sagemaker" | "mistral" | "watsonx" | "nebius" | "gemini" | "tensorix" | "azure" | "scaleway" | "ovhcloud" | "huggingface-inference-api" | "huggingface-tgi" | "replicate" | "cloudflare" | "siliconflow";
        title: string;
        template?: "anthropic" | "deepseek" | "llama2" | "alpaca" | "zephyr" | "phi2" | "phind" | "chatml" | "none" | "openchat" | "xwin-coder" | "neural-chat" | "codellama-70b" | "llava" | "gemma" | "llama3" | "codestral" | undefined;
        completionOptions?: {
            keepAlive?: number | undefined;
            maxTokens?: number | undefined;
            stop?: string[] | undefined;
            raw?: boolean | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            mirostat?: number | undefined;
            numThreads?: number | undefined;
            useMmap?: boolean | undefined;
            numGpu?: number | undefined;
            stream?: boolean | undefined;
        } | undefined;
        contextLength?: number | undefined;
        maxStopWords?: number | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        promptTemplates?: Record<string, string> | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        systemMessage?: string | undefined;
    };
    analytics: {
        url?: string | undefined;
        clientKey?: string | undefined;
    };
    embeddingsModel: {
        provider: "openai" | "ollama" | "cohere" | "watsonx" | "nebius" | "gemini" | "tensorix" | "scaleway" | "ovhcloud" | "transformers.js" | "siliconflow";
        model?: string | undefined;
        requestOptions?: {
            headers?: Record<string, string> | undefined;
            proxy?: string | undefined;
            timeout?: number | undefined;
            extraBodyProperties?: Record<string, any> | undefined;
            verifySsl?: boolean | undefined;
            caBundlePath?: string | string[] | undefined;
            noProxy?: string[] | undefined;
        } | undefined;
        apiKey?: string | undefined;
        apiBase?: string | undefined;
        deployment?: string | undefined;
        apiVersion?: string | undefined;
        apiType?: string | undefined;
    };
    devData: {
        url?: string | undefined;
    };
}>;
export type ControlPlaneSettings = z.infer<typeof controlPlaneSettingsSchema>;
export {};
//# sourceMappingURL=schema.d.ts.map