import { ChatCompletionCreateParams } from "openai/resources/index";
import { MiniMaxConfig } from "../types.js";
import { OpenAIApi } from "./OpenAI.js";
export declare const MINIMAX_API_BASE = "https://api.minimax.io/v1/";
export declare class MiniMaxApi extends OpenAIApi {
    constructor(config: MiniMaxConfig);
    modifyChatBody<T extends ChatCompletionCreateParams>(body: T): T;
}
