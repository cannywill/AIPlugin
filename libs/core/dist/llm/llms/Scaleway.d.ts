import OpenAI from "./OpenAI";
import { LLMOptions, CompletionOptions, ChatMessage } from "../../index.js";
import { ChatCompletionCreateParams } from "openai/resources/index";
declare class Scaleway extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private static MODEL_IDS;
    protected _convertModelName(model: string): string;
    protected _convertArgs(options: CompletionOptions, messages: ChatMessage[]): ChatCompletionCreateParams;
}
export default Scaleway;
//# sourceMappingURL=Scaleway.d.ts.map