export interface APIError extends Error {
    response?: Response;
}
export declare const RETRY_AFTER_HEADER = "Retry-After";
declare const withExponentialBackoff: <T>(apiCall: () => Promise<T>, maxTries?: number, initialDelaySeconds?: number) => Promise<T>;
export { withExponentialBackoff };
//# sourceMappingURL=withExponentialBackoff.d.ts.map