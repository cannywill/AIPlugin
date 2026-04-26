import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class LMStudio extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
}
export default LMStudio;
//# sourceMappingURL=LMStudio.d.ts.map