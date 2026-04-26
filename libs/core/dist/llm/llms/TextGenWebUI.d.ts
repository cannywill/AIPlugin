import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class TextGenWebUI extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
}
export default TextGenWebUI;
//# sourceMappingURL=TextGenWebUI.d.ts.map