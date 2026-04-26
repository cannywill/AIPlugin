/**
 * Configuration options for the retry decorator
 */
export interface RetryOptions {
    /** Maximum number of retry attempts (default: 3) */
    maxAttempts?: number;
    /** Base delay in milliseconds (default: 1000) */
    baseDelay?: number;
    /** Maximum delay in milliseconds (default: 30000) */
    maxDelay?: number;
    /** Jitter factor between 0 and 1 (default: 0.3) */
    jitterFactor?: number;
    /** Custom function to determine if an error should be retried */
    shouldRetry?: (error: any, attempt: number) => boolean;
    /** Custom function called on each retry attempt */
    onRetry?: (error: any, attempt: number, delay: number) => void;
}
/**
 * Retry decorator for async functions with exponential backoff and jitter
 *
 * @param options Retry configuration options
 * @returns Decorator function
 *
 * @example
 * ```typescript
 * class MyLLM {
 *   @withRetry({ maxAttempts: 5, baseDelay: 2000 })
 *   async streamChat(messages: ChatMessage[]): Promise<AsyncGenerator<ChatMessage>> {
 *     // Implementation that might fail
 *   }
 * }
 * ```
 */
export declare function withRetry(options?: RetryOptions): (...args: any[]) => any;
/**
 * Functional version of retry for use without decorators
 *
 * @param fn Function to retry
 * @param options Retry configuration options
 * @returns Promise that resolves with the function result or rejects with the last error
 *
 * @example
 * ```typescript
 * const result = await retryAsync(
 *   () => someApiCall(),
 *   { maxAttempts: 3, baseDelay: 1000 }
 * );
 * ```
 */
export declare function retryAsync<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;
/**
 * Retry decorator specifically configured for LLM providers
 * Uses sensible defaults for LLM API calls, including longer delays
 * for capacity provisioning (e.g., AWS Bedrock can require up to 59+ seconds)
 */
export declare function withLLMRetry(options?: Partial<RetryOptions>): (...args: any[]) => any;
//# sourceMappingURL=retry.d.ts.map