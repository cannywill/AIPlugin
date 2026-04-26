import { ConfigYaml } from "@continuedev/config-yaml";
export declare const LOCAL_ONBOARDING_PROVIDER_TITLE = "Ollama";
export declare const LOCAL_ONBOARDING_FIM_MODEL = "qwen2.5-coder:1.5b-base";
export declare const LOCAL_ONBOARDING_FIM_TITLE = "Qwen2.5-Coder 1.5B";
export declare const LOCAL_ONBOARDING_CHAT_MODEL = "llama3.1:8b";
export declare const LOCAL_ONBOARDING_CHAT_TITLE = "Llama 3.1 8B";
export declare const LOCAL_ONBOARDING_EMBEDDINGS_MODEL = "nomic-embed-text:latest";
export declare const LOCAL_ONBOARDING_EMBEDDINGS_TITLE = "Nomic Embed";
/**
 * We set the "best" chat + autocopmlete models by default
 * whenever a user doesn't have a config.json
 */
export declare function setupBestConfig(config: ConfigYaml): ConfigYaml;
export declare function setupLocalConfig(config: ConfigYaml): ConfigYaml;
export declare function setupQuickstartConfig(config: ConfigYaml): ConfigYaml;
export declare function setupProviderConfig(config: ConfigYaml, provider: string, apiKey: string): ConfigYaml;
//# sourceMappingURL=onboarding.d.ts.map