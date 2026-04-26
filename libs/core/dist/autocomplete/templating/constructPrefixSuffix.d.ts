import { AutocompleteInput } from "../util/types";
/**
 * We have to handle a few edge cases in getting the entire prefix/suffix for the current file.
 * This is entirely prior to finding snippets from other files.
 *
 * Accepts pre-loaded file contents to avoid a redundant file read
 * (the caller already has the contents loaded).
 */
export declare function constructInitialPrefixSuffix(input: AutocompleteInput, fileContents: string): {
    prefix: string;
    suffix: string;
};
//# sourceMappingURL=constructPrefixSuffix.d.ts.map