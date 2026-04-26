import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
/**
 * CometAPI-specific error types for better error handling
 */
export declare class CometAPIError extends Error {
    code?: string | undefined;
    statusCode?: number | undefined;
    constructor(message: string, code?: string | undefined, statusCode?: number | undefined);
}
export declare class CometAPIAuthenticationError extends CometAPIError {
    constructor(message?: string);
}
export declare class CometAPIQuotaExceededError extends CometAPIError {
    constructor(message?: string);
}
/**
 * CometAPI LLM provider - aggregates multiple mainstream models
 * from various providers (GPT, Claude, Gemini, Grok, DeepSeek, Qwen, etc.)
 *
 * Uses OpenAI-compatible API format with bearer token authentication
 */
declare class CometAPI extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    constructor(options: LLMOptions);
    /**
     * Validate CometAPI configuration
     */
    private static validateConfig;
    /**
     * Validate API base URL format
     */
    private static isValidApiBase;
    /**
     * Basic model format validation
     */
    private static isValidModelFormat;
    /**
     * Patterns to filter out non-chat models from the model list
     * Based on CometAPI documentation requirements
     */
    private static IGNORE_PATTERNS;
    /**
     * Recommended chat models from CometAPI documentation
     */
    private static RECOMMENDED_MODELS;
    /**
     * Filter model list to exclude non-chat models
     * Uses pattern matching against model names
     */
    protected filterChatModels(models: any[]): any[];
    /**
     * Get recommended models for CometAPI
     * Returns predefined list since CometAPI model info is limited
     */
    protected getRecommendedModels(): string[];
    /**
     * Override listModels method to apply model filtering with enhanced error handling
     */
    listModels(): Promise<string[]>;
    /**
     * Override chat completion with enhanced error handling
     */
    protected _streamChat(messages: any[], signal: AbortSignal, options?: any): AsyncGenerator<any>;
}
export default CometAPI;
//# sourceMappingURL=CometAPI.d.ts.map