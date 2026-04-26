import { HelperVars } from "../../util/HelperVars";
export declare class StreamTransformPipeline {
    transform(generator: AsyncGenerator<string>, prefix: string, suffix: string, multiline: boolean, stopTokens: string[], fullStop: () => void, helper: HelperVars): AsyncGenerator<string>;
    private getLineBelowCursor;
}
//# sourceMappingURL=StreamTransformPipeline.d.ts.map