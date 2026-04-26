import { DiffLine, ILLM } from "../..";
export declare function applyCodeBlock(oldFile: string, newLazyFile: string, filename: string, llm: ILLM, abortController: AbortController): Promise<{
    isInstantApply: boolean;
    diffLinesGenerator: AsyncGenerator<DiffLine>;
}>;
//# sourceMappingURL=applyCodeBlock.d.ts.map