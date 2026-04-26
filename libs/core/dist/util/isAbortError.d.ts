/**
 * Unified abort error detection.
 * Covers all known abort patterns in the Continue codebase:
 * - String literal "cancel" (streaming cancellation)
 * - Error with name "AbortError" (node-fetch, DOM)
 * - Error with code "ABORT_ERR" (Node.js AbortSignal)
 * - DOMException with name "AbortError" (browser/Node.js 18+)
 * - Plain objects with name "AbortError" (serialized errors)
 */
export declare function isAbortError(error: unknown): boolean;
//# sourceMappingURL=isAbortError.d.ts.map