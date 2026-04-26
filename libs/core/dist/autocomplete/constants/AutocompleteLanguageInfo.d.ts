import { CharacterFilter, LineFilter } from "../filtering/streamTransforms/lineStream";
export interface AutocompleteLanguageInfo {
    /**
     * The display name of the language
     */
    name: string;
    /**
     * Keywords that show up at the top-level of files. We often use these as stop words or soft breaks
     */
    topLevelKeywords: string[];
    /**
     * The character that prefixes a single line comment
     * We use this to format snippets from other files as large comment blocks
     */
    singleLineComment?: string;
    /**
     * Semi-colon or other end of line indicator that may be used as a stop char
     * or other parsing
     */
    endOfLine: string[];
    /**
     * Strings that indicate we should filter out a line from completion
     * Primarily currently used for .ipynb files
     */
    lineFilters?: LineFilter[];
    /**
     * Similar to line filters, but characters. I think.
     */
    charFilters?: CharacterFilter[];
    /**
     * Function that allows cusotmization of whether to use a multi-line completion on a per-language and completion basis
     */
    useMultiline?: (args: {
        prefix: string;
        suffix: string;
    }) => boolean;
}
export declare const Typescript: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const JavaScript: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Python: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const Java: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Cpp: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const CSharp: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const C: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Scala: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Go: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const Rust: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Haskell: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const PHP: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const RubyOnRails: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const Swift: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Kotlin: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Ruby: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const Clojure: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const Julia: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const FSharp: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const R: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const Dart: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Solidity: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: string[];
};
export declare const Lua: {
    name: string;
    topLevelKeywords: string[];
    singleLineComment: string;
    endOfLine: never[];
};
export declare const YAML: AutocompleteLanguageInfo;
export declare const Json: AutocompleteLanguageInfo;
export declare const Markdown: AutocompleteLanguageInfo;
export declare const LANGUAGES: {
    [extension: string]: AutocompleteLanguageInfo;
};
export declare function languageForFilepath(fileUri: string): AutocompleteLanguageInfo;
//# sourceMappingURL=AutocompleteLanguageInfo.d.ts.map