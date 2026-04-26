import { IDE, TabAutocompleteOptions } from "../..";
import { AutocompleteLanguageInfo } from "../constants/AutocompleteLanguageInfo";
import { AstPath } from "./ast";
import { AutocompleteInput } from "./types";
/**
 * A collection of variables that are often accessed throughout the autocomplete pipeline
 * It's noisy to re-calculate all the time or inject them into each function
 */
export declare class HelperVars {
    readonly input: AutocompleteInput;
    readonly options: TabAutocompleteOptions;
    readonly modelName: string;
    private readonly ide;
    lang: AutocompleteLanguageInfo;
    treePath: AstPath | undefined;
    workspaceUris: string[];
    private _fileContents;
    private _fileLines;
    private _fullPrefix;
    private _fullSuffix;
    private _prunedPrefix;
    private _prunedSuffix;
    private constructor();
    private init;
    static create(input: AutocompleteInput, options: TabAutocompleteOptions, modelName: string, ide: IDE): Promise<HelperVars>;
    prunePrefixSuffix(): {
        prunedPrefix: string;
        prunedSuffix: string;
    };
    get filepath(): string;
    get pos(): import("../..").Position;
    get prunedCaretWindow(): string;
    get fileContents(): string;
    get fileLines(): string[];
    get fullPrefix(): string;
    get fullSuffix(): string;
    get prunedPrefix(): string;
    get prunedSuffix(): string;
}
//# sourceMappingURL=HelperVars.d.ts.map