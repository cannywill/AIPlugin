import { ChatCompletionCreateParams } from "openai/resources/index";
import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Cerebras extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    maxStopWords: number | undefined;
    constructor(options: LLMOptions);
    private filterThinkingTags;
    private filterThinkingFromMessages;
    protected _convertArgs(options: CompletionOptions, messages: ChatMessage[]): ChatCompletionCreateParams;
    private static modelConversion;
    protected _convertModelName(model: string): string;
}
export default Cerebras;
//# sourceMappingURL=Cerebras.d.ts.map