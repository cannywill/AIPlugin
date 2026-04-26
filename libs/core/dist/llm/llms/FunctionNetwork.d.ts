import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";
declare class FunctionNetwork extends OpenAI {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private static modelConversion;
    constructor(options: LLMOptions);
    protected _convertModelName(model: string): string;
    supportsFim(): boolean;
    supportsCompletions(): boolean;
    supportsPrefill(): boolean;
    protected _embed(chunks: string[]): Promise<number[][]>;
}
export default FunctionNetwork;
//# sourceMappingURL=FunctionNetwork.d.ts.map