export declare function removeQuotesAndEscapes(input: string): string;
export declare function dedentAndGetCommonWhitespace(s: string): [string, string];
export declare function getMarkdownLanguageTagForFile(filepath: string): string;
export declare function copyOf(obj: any): any;
export declare function deduplicateArray<T>(array: T[], equal: (a: T, b: T) => boolean): T[];
export type TODO = any;
export declare function dedent(strings: TemplateStringsArray, ...values: any[]): string;
/**
 * Removes code blocks from a message.
 *
 * Return modified message text.
 */
export declare function removeCodeBlocksAndTrim(text: string): string;
export declare function splitCamelCaseAndNonAlphaNumeric(value: string): string[];
//# sourceMappingURL=index.d.ts.map