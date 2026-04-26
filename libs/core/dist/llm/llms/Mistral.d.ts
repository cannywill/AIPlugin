import { ChatMessage, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Mistral extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private autodetectApiKeyType;
    constructor(options: LLMOptions);
    private static modelConversion;
    protected _convertModelName(model: string): string;
    _convertArgs(options: any, messages: ChatMessage[]): import("openai/resources/index.js").ChatCompletionCreateParams;
    supportsFim(): boolean;
}
export default Mistral;
//# sourceMappingURL=Mistral.d.ts.map