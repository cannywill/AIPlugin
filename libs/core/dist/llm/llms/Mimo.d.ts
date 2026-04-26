import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Mimo extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
}
export default Mimo;
//# sourceMappingURL=Mimo.d.ts.map