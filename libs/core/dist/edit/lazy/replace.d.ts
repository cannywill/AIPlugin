import { ILLM } from "../..";
export declare const BUFFER_LINES_BELOW = 3;
export declare function getReplacementByMatching(oldCode: string, linesBefore: string[], linesAfter: string[]): string | undefined;
export declare function getReplacementWithLlm(oldCode: string, linesBefore: string[], linesAfter: string[], llm: ILLM, abortController: AbortController): AsyncGenerator<string>;
//# sourceMappingURL=replace.d.ts.map