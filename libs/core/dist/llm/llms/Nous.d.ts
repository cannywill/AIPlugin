import { LLMOptions } from "../..";
import OpenAI from "./OpenAI";
declare class Nous extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
}
export default Nous;
//# sourceMappingURL=Nous.d.ts.map