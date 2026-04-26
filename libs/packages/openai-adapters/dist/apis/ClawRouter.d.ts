import { OpenAIApi } from "./OpenAI.js";
import { OpenAIConfig } from "../types.js";
export interface ClawRouterConfig extends OpenAIConfig {
}
/**
 * ClawRouter API adapter
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
export declare class ClawRouterApi extends OpenAIApi {
    constructor(config: ClawRouterConfig);
    /**
     * Override headers to include Continue-specific User-Agent
     * This helps ClawRouter track integration usage and optimize accordingly
     */
    protected getHeaders(): Record<string, string>;
}
export default ClawRouterApi;
