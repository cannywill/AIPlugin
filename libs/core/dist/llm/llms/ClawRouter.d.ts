import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
/**
 * ClawRouter LLM Provider
 *
 * ClawRouter is an open-source LLM router that automatically selects the
 * cheapest capable model for each request based on prompt complexity,
 * providing 78-96% cost savings on blended inference costs.
 *
 * Features:
 * - 15-dimension prompt complexity scoring
 * - Automatic model selection (cheap → capable based on task)
 * - OpenAI-compatible API at localhost:1337
 * - Support for multiple routing tiers (auto, free, eco)
 *
 * @see https://github.com/BlockRunAI/ClawRouter
 */
declare class ClawRouter extends OpenAI {
    static providerName: string;
    protected supportsReasoningField: boolean;
    protected supportsReasoningDetailsField: boolean;
    static defaultOptions: Partial<LLMOptions>;
    /**
     * Override headers to include Continue-specific User-Agent
     * This helps ClawRouter track integration usage and optimize accordingly
     */
    protected _getHeaders(): {
        "User-Agent": string;
        "X-Continue-Provider": string;
        "api-key": string;
        Authorization?: string | undefined;
        "Content-Type": string;
    };
}
export default ClawRouter;
//# sourceMappingURL=ClawRouter.d.ts.map