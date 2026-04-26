interface SingleLineCompletionResult {
    completionText: string;
    range?: {
        start: number;
        end: number;
    };
}
export declare function processSingleLineCompletion(lastLineOfCompletionText: string, currentText: string, cursorPosition: number): SingleLineCompletionResult | undefined;
export {};
//# sourceMappingURL=processSingleLineCompletion.d.ts.map