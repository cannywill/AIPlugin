import OpenAI from "../OpenAI.js";
export interface OpenAISubclassConfig {
    providerName: string;
    defaultApiBase?: string;
    modelConversions?: {
        [key: string]: string;
    };
    customOptions?: any;
    modelConversionContent?: string;
    modelConversionMaxTokens?: number;
    customStreamCompleteEndpoint?: string;
    customEmbeddingsUrl?: string;
    customEmbeddingsHeaders?: {
        [key: string]: string;
    };
    customEmbeddingsBody?: any;
    customBodyOptions?: any;
}
export declare const createOpenAISubclassTests: (ProviderClass: typeof OpenAI, config: OpenAISubclassConfig) => void;
//# sourceMappingURL=openai-test-utils.d.ts.map