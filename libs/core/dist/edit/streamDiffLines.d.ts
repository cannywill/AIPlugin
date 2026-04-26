import { ChatMessage, DiffLine, ILLM, RuleWithSource, StreamDiffLinesPayload } from "../";
export declare function addIndentation(diffLineGenerator: AsyncGenerator<DiffLine>, indentation: string): AsyncGenerator<DiffLine>;
export declare function streamDiffLines(options: StreamDiffLinesPayload, llm: ILLM, abortController: AbortController, overridePrompt: ChatMessage[] | undefined, rulesToInclude: RuleWithSource[] | undefined): AsyncGenerator<DiffLine>;
//# sourceMappingURL=streamDiffLines.d.ts.map