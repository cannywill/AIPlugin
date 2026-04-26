import { ChatMessage, ILLM, Prediction, type StreamDiffLinesType } from "..";
export declare function recursiveStream(llm: ILLM, abortController: AbortController, type: StreamDiffLinesType, prompt: ChatMessage[] | string, prediction: Prediction | undefined, currentBuffer?: string, isContinuation?: boolean): AsyncGenerator<string | ChatMessage>;
//# sourceMappingURL=recursiveStream.d.ts.map