import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class zAI extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
}
export default zAI;
//# sourceMappingURL=zAI.d.ts.map