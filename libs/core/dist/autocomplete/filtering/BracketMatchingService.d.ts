export declare const BRACKETS: {
    [key: string]: string;
};
export declare const BRACKETS_REVERSE: {
    [key: string]: string;
};
/**
 * We follow the policy of only completing bracket pairs that we started
 * But sometimes we started the pair in a previous autocomplete suggestion
 */
export declare class BracketMatchingService {
    private openingBracketsFromLastCompletion;
    private lastCompletionFile;
    handleAcceptedCompletion(completion: string, filepath: string): void;
    stopOnUnmatchedClosingBracket(stream: AsyncGenerator<string>, prefix: string, suffix: string, filepath: string, multiline: boolean): AsyncGenerator<string>;
}
//# sourceMappingURL=BracketMatchingService.d.ts.map