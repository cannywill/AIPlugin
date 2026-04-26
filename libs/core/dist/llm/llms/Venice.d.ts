import { ChatCompletionCreateParams } from "@continuedev/openai-adapters";
import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI";
declare class Venice extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    protected _convertArgs(options: CompletionOptions, messages: ChatMessage[]): ChatCompletionCreateParams;
}
export default Venice;
//# sourceMappingURL=Venice.d.ts.map