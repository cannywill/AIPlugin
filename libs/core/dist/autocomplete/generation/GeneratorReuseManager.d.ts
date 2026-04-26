import { ListenableGenerator } from "./ListenableGenerator";
export declare class GeneratorReuseManager {
    private readonly onError;
    currentGenerator: ListenableGenerator<string> | undefined;
    pendingGeneratorPrefix: string | undefined;
    pendingCompletion: string;
    constructor(onError: (err: any) => void);
    private _createListenableGenerator;
    private shouldReuseExistingGenerator;
    getGenerator(prefix: string, newGenerator: (abortSignal: AbortSignal) => AsyncGenerator<string>, multiline: boolean): AsyncGenerator<string>;
}
//# sourceMappingURL=GeneratorReuseManager.d.ts.map