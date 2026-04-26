import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class xAI extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    supportsCompletions(): boolean;
}
export default xAI;
//# sourceMappingURL=xAI.d.ts.map