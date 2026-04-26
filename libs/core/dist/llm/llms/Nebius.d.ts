import { LLMOptions } from "../..";
import OpenAI from "./OpenAI";
declare class Nebius extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private static MODEL_IDS;
    protected _convertModelName(model: string): string;
}
export default Nebius;
//# sourceMappingURL=Nebius.d.ts.map