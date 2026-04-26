import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class Fireworks extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private static modelConversion;
    protected _convertModelName(model: string): string;
}
export default Fireworks;
//# sourceMappingURL=Fireworks.d.ts.map