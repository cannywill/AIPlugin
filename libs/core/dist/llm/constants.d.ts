declare const DEFAULT_MAX_TOKENS = 4096;
declare const DEFAULT_CONTEXT_LENGTH = 32768;
declare const DEFAULT_PRUNING_LENGTH = 128000;
declare const DEFAULT_REASONING_TOKENS = 2048;
declare const DEFAULT_ARGS: {
    maxTokens: number;
    temperature: number;
};
declare const PROXY_URL = "http://localhost:65433";
declare const DEFAULT_MAX_CHUNK_SIZE = 500;
declare const DEFAULT_MAX_BATCH_SIZE = 64;
export declare enum LLMConfigurationStatuses {
    VALID = "valid",
    MISSING_API_KEY = "missing-api-key",
    MISSING_ENV_SECRET = "missing-env-secret"
}
export declare enum NEXT_EDIT_MODELS {
    MERCURY_CODER = "mercury-coder",
    INSTINCT = "instinct"
}
export { DEFAULT_ARGS, DEFAULT_CONTEXT_LENGTH, DEFAULT_MAX_BATCH_SIZE, DEFAULT_MAX_CHUNK_SIZE, DEFAULT_MAX_TOKENS, DEFAULT_PRUNING_LENGTH, DEFAULT_REASONING_TOKENS, PROXY_URL, };
//# sourceMappingURL=constants.d.ts.map