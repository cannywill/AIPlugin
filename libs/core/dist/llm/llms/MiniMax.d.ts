import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class MiniMax extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    protected _convertArgs(options: CompletionOptions, messages: ChatMessage[]): import("openai/resources/index.js").ChatCompletionCreateParams;
}
export default MiniMax;
//# sourceMappingURL=MiniMax.d.ts.map