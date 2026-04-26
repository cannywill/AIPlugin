import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Lemonade extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
}
export default Lemonade;
//# sourceMappingURL=Lemonade.d.ts.map