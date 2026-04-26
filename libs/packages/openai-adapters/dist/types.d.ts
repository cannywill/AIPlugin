import * as z from "zod";
export declare const ClientCertificateOptionsSchema: z.ZodObject<{
    cert: z.ZodString;
    key: z.ZodString;
    passphrase: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    key: string;
    cert: string;
    passphrase?: string | undefined;
}, {
    key: string;
    cert: string;
    passphrase?: string | undefined;
}>;
export declare const RequestOptionsSchema: z.ZodObject<{
    timeout: z.ZodOptional<z.ZodNumber>;
    verifySsl: z.ZodOptional<z.ZodBoolean>;
    caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    proxy: z.ZodOptional<z.ZodString>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        cert: z.ZodString;
        key: z.ZodString;
        passphrase: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        cert: string;
        passphrase?: string | undefined;
    }, {
        key: string;
        cert: string;
        passphrase?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    timeout?: number | undefined;
    verifySsl?: boolean | undefined;
    caBundlePath?: string | string[] | undefined;
    proxy?: string | undefined;
    headers?: Record<string, string> | undefined;
    extraBodyProperties?: Record<string, unknown> | undefined;
    noProxy?: string[] | undefined;
    clientCertificate?: {
        key: string;
        cert: string;
        passphrase?: string | undefined;
    } | undefined;
}, {
    timeout?: number | undefined;
    verifySsl?: boolean | undefined;
    caBundlePath?: string | string[] | undefined;
    proxy?: string | undefined;
    headers?: Record<string, string> | undefined;
    extraBodyProperties?: Record<string, unknown> | undefined;
    noProxy?: string[] | undefined;
    clientCertificate?: {
        key: string;
        cert: string;
        passphrase?: string | undefined;
    } | undefined;
}>;
export declare const BaseConfig: z.ZodObject<{
    provider: z.ZodString;
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    provider: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const BasePlusConfig: z.ZodObject<{
    provider: z.ZodString;
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
} & {
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    provider: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}, {
    provider: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}>;
export declare const OpenAIConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    provider: z.ZodUnion<[z.ZodLiteral<"openai">, z.ZodLiteral<"mistral">, z.ZodLiteral<"voyage">, z.ZodLiteral<"deepinfra">, z.ZodLiteral<"groq">, z.ZodLiteral<"nvidia">, z.ZodLiteral<"ovhcloud">, z.ZodLiteral<"fireworks">, z.ZodLiteral<"together">, z.ZodLiteral<"novita">, z.ZodLiteral<"nebius">, z.ZodLiteral<"function-network">, z.ZodLiteral<"llama.cpp">, z.ZodLiteral<"llamafile">, z.ZodLiteral<"lmstudio">, z.ZodLiteral<"ollama">, z.ZodLiteral<"cerebras">, z.ZodLiteral<"kindo">, z.ZodLiteral<"msty">, z.ZodLiteral<"openrouter">, z.ZodLiteral<"clawrouter">, z.ZodLiteral<"sambanova">, z.ZodLiteral<"text-gen-webui">, z.ZodLiteral<"vllm">, z.ZodLiteral<"xAI">, z.ZodLiteral<"zAI">, z.ZodLiteral<"scaleway">, z.ZodLiteral<"tensorix">, z.ZodLiteral<"ncompass">, z.ZodLiteral<"relace">, z.ZodLiteral<"huggingface-inference-api">]>;
}, "strip", z.ZodTypeAny, {
    provider: "openai" | "mistral" | "voyage" | "deepinfra" | "groq" | "nvidia" | "ovhcloud" | "fireworks" | "together" | "novita" | "nebius" | "function-network" | "llama.cpp" | "llamafile" | "lmstudio" | "ollama" | "cerebras" | "kindo" | "msty" | "openrouter" | "clawrouter" | "sambanova" | "text-gen-webui" | "vllm" | "xAI" | "zAI" | "scaleway" | "tensorix" | "ncompass" | "relace" | "huggingface-inference-api";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "openai" | "mistral" | "voyage" | "deepinfra" | "groq" | "nvidia" | "ovhcloud" | "fireworks" | "together" | "novita" | "nebius" | "function-network" | "llama.cpp" | "llamafile" | "lmstudio" | "ollama" | "cerebras" | "kindo" | "msty" | "openrouter" | "clawrouter" | "sambanova" | "text-gen-webui" | "vllm" | "xAI" | "zAI" | "scaleway" | "tensorix" | "ncompass" | "relace" | "huggingface-inference-api";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type OpenAIConfig = z.infer<typeof OpenAIConfigSchema>;
export declare const MoonshotConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"moonshot">;
}, "strip", z.ZodTypeAny, {
    provider: "moonshot";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "moonshot";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type MoonshotConfig = z.infer<typeof MoonshotConfigSchema>;
export declare const DeepseekConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"deepseek">;
}, "strip", z.ZodTypeAny, {
    provider: "deepseek";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "deepseek";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type DeepseekConfig = z.infer<typeof DeepseekConfigSchema>;
export declare const MiniMaxConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"minimax">;
}, "strip", z.ZodTypeAny, {
    provider: "minimax";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "minimax";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type MiniMaxConfig = z.infer<typeof MiniMaxConfigSchema>;
export declare const BedrockConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"bedrock">;
    env: z.ZodOptional<z.ZodObject<{
        region: z.ZodOptional<z.ZodString>;
        accessKeyId: z.ZodOptional<z.ZodString>;
        secretAccessKey: z.ZodOptional<z.ZodString>;
        profile: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        region?: string | undefined;
        accessKeyId?: string | undefined;
        secretAccessKey?: string | undefined;
        profile?: string | undefined;
    }, {
        region?: string | undefined;
        accessKeyId?: string | undefined;
        secretAccessKey?: string | undefined;
        profile?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "bedrock";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
    env?: {
        region?: string | undefined;
        accessKeyId?: string | undefined;
        secretAccessKey?: string | undefined;
        profile?: string | undefined;
    } | undefined;
}, {
    provider: "bedrock";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
    env?: {
        region?: string | undefined;
        accessKeyId?: string | undefined;
        secretAccessKey?: string | undefined;
        profile?: string | undefined;
    } | undefined;
}>;
export type BedrockConfig = z.infer<typeof BedrockConfigSchema>;
export declare const LlamastackConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"llamastack">;
}, "strip", z.ZodTypeAny, {
    provider: "llamastack";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "llamastack";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type LlamastackConfig = z.infer<typeof LlamastackConfigSchema>;
export declare const ContinueProxyConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"continue-proxy">;
    env: z.ZodObject<{
        apiKeyLocation: z.ZodOptional<z.ZodString>;
        envSecretLocations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        orgScopeId: z.ZodNullable<z.ZodString>;
        proxyUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        orgScopeId: string | null;
        apiKeyLocation?: string | undefined;
        envSecretLocations?: Record<string, string> | undefined;
        proxyUrl?: string | undefined;
    }, {
        orgScopeId: string | null;
        apiKeyLocation?: string | undefined;
        envSecretLocations?: Record<string, string> | undefined;
        proxyUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    provider: "continue-proxy";
    env: {
        orgScopeId: string | null;
        apiKeyLocation?: string | undefined;
        envSecretLocations?: Record<string, string> | undefined;
        proxyUrl?: string | undefined;
    };
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}, {
    provider: "continue-proxy";
    env: {
        orgScopeId: string | null;
        apiKeyLocation?: string | undefined;
        envSecretLocations?: Record<string, string> | undefined;
        proxyUrl?: string | undefined;
    };
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}>;
export type ContinueProxyConfig = z.infer<typeof ContinueProxyConfigSchema>;
export declare const MockConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"mock">;
}, "strip", z.ZodTypeAny, {
    provider: "mock";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}, {
    provider: "mock";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}>;
export type MockConfig = z.infer<typeof MockConfigSchema>;
export declare const CohereConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"cohere">;
}, "strip", z.ZodTypeAny, {
    provider: "cohere";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "cohere";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type CohereConfig = z.infer<typeof CohereConfigSchema>;
export declare const CometAPIConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"cometapi">;
}, "strip", z.ZodTypeAny, {
    provider: "cometapi";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "cometapi";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type CometAPIConfig = z.infer<typeof CometAPIConfigSchema>;
export declare const AskSageConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"askSage">;
    env: z.ZodOptional<z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        userApiUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        userApiUrl?: string | undefined;
    }, {
        email?: string | undefined;
        userApiUrl?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "askSage";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    env?: {
        email?: string | undefined;
        userApiUrl?: string | undefined;
    } | undefined;
}, {
    provider: "askSage";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    env?: {
        email?: string | undefined;
        userApiUrl?: string | undefined;
    } | undefined;
}>;
export type AskSageConfig = z.infer<typeof AskSageConfigSchema>;
/**
 * AskSage tool format (OpenAI-compatible)
 */
export interface AskSageTool {
    type: string;
    function: {
        name: string;
        description?: string;
        parameters?: Record<string, unknown>;
    };
}
export type AskSageToolChoice = "auto" | "none" | {
    type: "function";
    function: {
        name: string;
    };
};
export interface AskSageToolCall {
    id: string;
    type: "function";
    function: {
        name: string;
        arguments: string;
    };
}
/**
 * AskSage API response format
 */
export interface AskSageResponse {
    text?: string;
    answer?: string;
    message?: string;
    status?: number | string;
    response?: unknown;
    tool_calls?: AskSageToolCall[];
    choices?: Array<{
        message?: {
            content?: string;
            tool_calls?: AskSageToolCall[];
        };
    }>;
}
export interface AskSageTokenResponse {
    status: number | string;
    response: {
        access_token: string;
    };
}
export declare const AzureConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"azure">;
    env: z.ZodOptional<z.ZodObject<{
        apiVersion: z.ZodOptional<z.ZodString>;
        apiType: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"azure-foundry">, z.ZodLiteral<"azure-openai">, z.ZodLiteral<"azure">]>>;
        deployment: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        apiVersion?: string | undefined;
        apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined;
        deployment?: string | undefined;
    }, {
        apiVersion?: string | undefined;
        apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined;
        deployment?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "azure";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
    env?: {
        apiVersion?: string | undefined;
        apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined;
        deployment?: string | undefined;
    } | undefined;
}, {
    provider: "azure";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
    env?: {
        apiVersion?: string | undefined;
        apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined;
        deployment?: string | undefined;
    } | undefined;
}>;
export type AzureConfig = z.infer<typeof AzureConfigSchema>;
export declare const GeminiConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"gemini">;
    apiKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    provider: "gemini";
    apiKey: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "gemini";
    apiKey: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type GeminiConfig = z.infer<typeof GeminiConfigSchema>;
export declare const AnthropicConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"anthropic">;
    apiKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    provider: "anthropic";
    apiKey: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "anthropic";
    apiKey: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type AnthropicConfig = z.infer<typeof AnthropicConfigSchema>;
export declare const WatsonXConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"watsonx">;
    apiKey: z.ZodString;
    env: z.ZodObject<{
        apiVersion: z.ZodOptional<z.ZodString>;
        projectId: z.ZodOptional<z.ZodString>;
        deploymentId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        apiVersion?: string | undefined;
        projectId?: string | undefined;
        deploymentId?: string | undefined;
    }, {
        apiVersion?: string | undefined;
        projectId?: string | undefined;
        deploymentId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    provider: "watsonx";
    apiKey: string;
    env: {
        apiVersion?: string | undefined;
        projectId?: string | undefined;
        deploymentId?: string | undefined;
    };
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
}, {
    provider: "watsonx";
    apiKey: string;
    env: {
        apiVersion?: string | undefined;
        projectId?: string | undefined;
        deploymentId?: string | undefined;
    };
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
}>;
export type WatsonXConfig = z.infer<typeof WatsonXConfigSchema>;
export declare const JinaConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"jina">;
}, "strip", z.ZodTypeAny, {
    provider: "jina";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "jina";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type JinaConfig = z.infer<typeof JinaConfigSchema>;
export declare const InceptionConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"inception">;
}, "strip", z.ZodTypeAny, {
    provider: "inception";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "inception";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>;
export type InceptionConfig = z.infer<typeof InceptionConfigSchema>;
export declare const VertexAIConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"vertexai">;
    env: z.ZodOptional<z.ZodObject<{
        region: z.ZodOptional<z.ZodString>;
        projectId: z.ZodOptional<z.ZodString>;
        keyFile: z.ZodOptional<z.ZodString>;
        keyJson: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        region?: string | undefined;
        projectId?: string | undefined;
        keyFile?: string | undefined;
        keyJson?: string | undefined;
    }, {
        region?: string | undefined;
        projectId?: string | undefined;
        keyFile?: string | undefined;
        keyJson?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "vertexai";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    env?: {
        region?: string | undefined;
        projectId?: string | undefined;
        keyFile?: string | undefined;
        keyJson?: string | undefined;
    } | undefined;
}, {
    provider: "vertexai";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    env?: {
        region?: string | undefined;
        projectId?: string | undefined;
        keyFile?: string | undefined;
        keyJson?: string | undefined;
    } | undefined;
}>;
export type VertexAIConfig = z.infer<typeof VertexAIConfigSchema>;
export declare const AiSdkConfigSchema: z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"ai-sdk">;
    model: z.ZodString;
    providerOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    provider: "ai-sdk";
    model: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    providerOptions?: Record<string, unknown> | undefined;
}, {
    provider: "ai-sdk";
    model: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    providerOptions?: Record<string, unknown> | undefined;
}>;
export type AiSdkConfig = z.infer<typeof AiSdkConfigSchema>;
export declare const LLMConfigSchema: z.ZodDiscriminatedUnion<"provider", [z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    provider: z.ZodUnion<[z.ZodLiteral<"openai">, z.ZodLiteral<"mistral">, z.ZodLiteral<"voyage">, z.ZodLiteral<"deepinfra">, z.ZodLiteral<"groq">, z.ZodLiteral<"nvidia">, z.ZodLiteral<"ovhcloud">, z.ZodLiteral<"fireworks">, z.ZodLiteral<"together">, z.ZodLiteral<"novita">, z.ZodLiteral<"nebius">, z.ZodLiteral<"function-network">, z.ZodLiteral<"llama.cpp">, z.ZodLiteral<"llamafile">, z.ZodLiteral<"lmstudio">, z.ZodLiteral<"ollama">, z.ZodLiteral<"cerebras">, z.ZodLiteral<"kindo">, z.ZodLiteral<"msty">, z.ZodLiteral<"openrouter">, z.ZodLiteral<"clawrouter">, z.ZodLiteral<"sambanova">, z.ZodLiteral<"text-gen-webui">, z.ZodLiteral<"vllm">, z.ZodLiteral<"xAI">, z.ZodLiteral<"zAI">, z.ZodLiteral<"scaleway">, z.ZodLiteral<"tensorix">, z.ZodLiteral<"ncompass">, z.ZodLiteral<"relace">, z.ZodLiteral<"huggingface-inference-api">]>;
}, "strip", z.ZodTypeAny, {
    provider: "openai" | "mistral" | "voyage" | "deepinfra" | "groq" | "nvidia" | "ovhcloud" | "fireworks" | "together" | "novita" | "nebius" | "function-network" | "llama.cpp" | "llamafile" | "lmstudio" | "ollama" | "cerebras" | "kindo" | "msty" | "openrouter" | "clawrouter" | "sambanova" | "text-gen-webui" | "vllm" | "xAI" | "zAI" | "scaleway" | "tensorix" | "ncompass" | "relace" | "huggingface-inference-api";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "openai" | "mistral" | "voyage" | "deepinfra" | "groq" | "nvidia" | "ovhcloud" | "fireworks" | "together" | "novita" | "nebius" | "function-network" | "llama.cpp" | "llamafile" | "lmstudio" | "ollama" | "cerebras" | "kindo" | "msty" | "openrouter" | "clawrouter" | "sambanova" | "text-gen-webui" | "vllm" | "xAI" | "zAI" | "scaleway" | "tensorix" | "ncompass" | "relace" | "huggingface-inference-api";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"bedrock">;
    env: z.ZodOptional<z.ZodObject<{
        region: z.ZodOptional<z.ZodString>;
        accessKeyId: z.ZodOptional<z.ZodString>;
        secretAccessKey: z.ZodOptional<z.ZodString>;
        profile: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        region?: string | undefined;
        accessKeyId?: string | undefined;
        secretAccessKey?: string | undefined;
        profile?: string | undefined;
    }, {
        region?: string | undefined;
        accessKeyId?: string | undefined;
        secretAccessKey?: string | undefined;
        profile?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "bedrock";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
    env?: {
        region?: string | undefined;
        accessKeyId?: string | undefined;
        secretAccessKey?: string | undefined;
        profile?: string | undefined;
    } | undefined;
}, {
    provider: "bedrock";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
    env?: {
        region?: string | undefined;
        accessKeyId?: string | undefined;
        secretAccessKey?: string | undefined;
        profile?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"moonshot">;
}, "strip", z.ZodTypeAny, {
    provider: "moonshot";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "moonshot";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"deepseek">;
}, "strip", z.ZodTypeAny, {
    provider: "deepseek";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "deepseek";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"minimax">;
}, "strip", z.ZodTypeAny, {
    provider: "minimax";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "minimax";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"cohere">;
}, "strip", z.ZodTypeAny, {
    provider: "cohere";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "cohere";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"azure">;
    env: z.ZodOptional<z.ZodObject<{
        apiVersion: z.ZodOptional<z.ZodString>;
        apiType: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"azure-foundry">, z.ZodLiteral<"azure-openai">, z.ZodLiteral<"azure">]>>;
        deployment: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        apiVersion?: string | undefined;
        apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined;
        deployment?: string | undefined;
    }, {
        apiVersion?: string | undefined;
        apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined;
        deployment?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "azure";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
    env?: {
        apiVersion?: string | undefined;
        apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined;
        deployment?: string | undefined;
    } | undefined;
}, {
    provider: "azure";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
    env?: {
        apiVersion?: string | undefined;
        apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined;
        deployment?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"gemini">;
    apiKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    provider: "gemini";
    apiKey: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "gemini";
    apiKey: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"anthropic">;
    apiKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    provider: "anthropic";
    apiKey: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "anthropic";
    apiKey: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"watsonx">;
    apiKey: z.ZodString;
    env: z.ZodObject<{
        apiVersion: z.ZodOptional<z.ZodString>;
        projectId: z.ZodOptional<z.ZodString>;
        deploymentId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        apiVersion?: string | undefined;
        projectId?: string | undefined;
        deploymentId?: string | undefined;
    }, {
        apiVersion?: string | undefined;
        projectId?: string | undefined;
        deploymentId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    provider: "watsonx";
    apiKey: string;
    env: {
        apiVersion?: string | undefined;
        projectId?: string | undefined;
        deploymentId?: string | undefined;
    };
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
}, {
    provider: "watsonx";
    apiKey: string;
    env: {
        apiVersion?: string | undefined;
        projectId?: string | undefined;
        deploymentId?: string | undefined;
    };
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"jina">;
}, "strip", z.ZodTypeAny, {
    provider: "jina";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "jina";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"mock">;
}, "strip", z.ZodTypeAny, {
    provider: "mock";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}, {
    provider: "mock";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"inception">;
}, "strip", z.ZodTypeAny, {
    provider: "inception";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "inception";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"vertexai">;
    env: z.ZodOptional<z.ZodObject<{
        region: z.ZodOptional<z.ZodString>;
        projectId: z.ZodOptional<z.ZodString>;
        keyFile: z.ZodOptional<z.ZodString>;
        keyJson: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        region?: string | undefined;
        projectId?: string | undefined;
        keyFile?: string | undefined;
        keyJson?: string | undefined;
    }, {
        region?: string | undefined;
        projectId?: string | undefined;
        keyFile?: string | undefined;
        keyJson?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "vertexai";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    env?: {
        region?: string | undefined;
        projectId?: string | undefined;
        keyFile?: string | undefined;
        keyJson?: string | undefined;
    } | undefined;
}, {
    provider: "vertexai";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    env?: {
        region?: string | undefined;
        projectId?: string | undefined;
        keyFile?: string | undefined;
        keyJson?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"llamastack">;
}, "strip", z.ZodTypeAny, {
    provider: "llamastack";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "llamastack";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"continue-proxy">;
    env: z.ZodObject<{
        apiKeyLocation: z.ZodOptional<z.ZodString>;
        envSecretLocations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        orgScopeId: z.ZodNullable<z.ZodString>;
        proxyUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        orgScopeId: string | null;
        apiKeyLocation?: string | undefined;
        envSecretLocations?: Record<string, string> | undefined;
        proxyUrl?: string | undefined;
    }, {
        orgScopeId: string | null;
        apiKeyLocation?: string | undefined;
        envSecretLocations?: Record<string, string> | undefined;
        proxyUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    provider: "continue-proxy";
    env: {
        orgScopeId: string | null;
        apiKeyLocation?: string | undefined;
        envSecretLocations?: Record<string, string> | undefined;
        proxyUrl?: string | undefined;
    };
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}, {
    provider: "continue-proxy";
    env: {
        orgScopeId: string | null;
        apiKeyLocation?: string | undefined;
        envSecretLocations?: Record<string, string> | undefined;
        proxyUrl?: string | undefined;
    };
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
} & {
    provider: z.ZodLiteral<"cometapi">;
}, "strip", z.ZodTypeAny, {
    provider: "cometapi";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}, {
    provider: "cometapi";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    useResponsesApi?: boolean | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"askSage">;
    env: z.ZodOptional<z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        userApiUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        userApiUrl?: string | undefined;
    }, {
        email?: string | undefined;
        userApiUrl?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "askSage";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    env?: {
        email?: string | undefined;
        userApiUrl?: string | undefined;
    } | undefined;
}, {
    provider: "askSage";
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    env?: {
        email?: string | undefined;
        userApiUrl?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    requestOptions: z.ZodOptional<z.ZodObject<{
        timeout: z.ZodOptional<z.ZodNumber>;
        verifySsl: z.ZodOptional<z.ZodBoolean>;
        caBundlePath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        proxy: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        extraBodyProperties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        noProxy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        clientCertificate: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            cert: z.ZodString;
            key: z.ZodString;
            passphrase: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }, {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    }>>;
    apiBase: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodLiteral<"ai-sdk">;
    model: z.ZodString;
    providerOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    provider: "ai-sdk";
    model: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    providerOptions?: Record<string, unknown> | undefined;
}, {
    provider: "ai-sdk";
    model: string;
    requestOptions?: {
        timeout?: number | undefined;
        verifySsl?: boolean | undefined;
        caBundlePath?: string | string[] | undefined;
        proxy?: string | undefined;
        headers?: Record<string, string> | undefined;
        extraBodyProperties?: Record<string, unknown> | undefined;
        noProxy?: string[] | undefined;
        clientCertificate?: {
            key: string;
            cert: string;
            passphrase?: string | undefined;
        } | undefined;
    } | undefined;
    apiBase?: string | undefined;
    apiKey?: string | undefined;
    providerOptions?: Record<string, unknown> | undefined;
}>]>;
export type LLMConfig = z.infer<typeof LLMConfigSchema>;
