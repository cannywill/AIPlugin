import { ChatCompletionCreateParams } from "openai/resources/index";
import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class NCompass extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    static embeddingsApiEndpoint: string;
    private static modelConversion;
    protected _convertModelName(model: string): string;
    protected _convertArgs(options: CompletionOptions, messages: ChatMessage[]): ChatCompletionCreateParams;
    protected _getHeaders(): {
        "Content-Type": string;
        Authorization: string;
        "api-key": string;
        Accept?: string;
    };
    protected _embed(chunks: string[]): Promise<number[][]>;
}
export default NCompass;
//# sourceMappingURL=NCompass.d.ts.map