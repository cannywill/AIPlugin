import OpenAI from "./OpenAI.js";
import type { LLMOptions } from "../../index.js";
declare class SambaNova extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private static MODEL_IDS;
    protected _convertModelName(model: string): string;
}
export default SambaNova;
//# sourceMappingURL=SambaNova.d.ts.map