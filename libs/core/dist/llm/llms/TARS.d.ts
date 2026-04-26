import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class TARS extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
}
export default TARS;
//# sourceMappingURL=TARS.d.ts.map