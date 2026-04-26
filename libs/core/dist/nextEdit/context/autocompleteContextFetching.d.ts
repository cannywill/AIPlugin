import { Position } from "../..";
import { AutocompleteCodeSnippet } from "../../autocomplete/snippets/types";
import { GetLspDefinitionsFunction } from "../../autocomplete/types";
import { RecentlyEditedRange } from "../../autocomplete/util/types";
import { ConfigHandler } from "../../config/ConfigHandler";
import { IDE, ILLM } from "../../index";
/**
 * Gets the formatted autocomplete context string that would be used for autocomplete at the given position.
 * This function mimics the context generation pipeline from the autocomplete system without triggering
 * an actual completion.
 *
 * @param filepath - The file path where context is being requested
 * @param pos - The position in the file where context is being requested
 * @param ide - The IDE interface for file system operations
 * @param configHandler - The config handler to load user configuration
 * @param getDefinitionsFromLsp - Function to get LSP definitions (can be a no-op function if not needed)
 * @param autocompleteModel - Optional autocomplete model to use (if not provided, uses configured autocomplete model)
 * @param recentlyEditedRanges - Recently edited ranges (defaults to empty array)
 * @param recentlyVisitedRanges - Recently visited ranges (if not provided, will fetch current live data like real autocomplete)
 * @param maxPromptTokens - Optional override for maximum number of tokens (if not provided, uses config)
 * @param manuallyPassFileContents - Optional file contents to use instead of reading from disk (should match current editor state)
 * @returns Promise that resolves to the formatted context string
 */
export declare const getAutocompleteContext: (filepath: string, pos: Position, ide: IDE, configHandler: ConfigHandler, getDefinitionsFromLsp: GetLspDefinitionsFunction | undefined, recentlyEditedRanges: RecentlyEditedRange[], recentlyVisitedRanges: AutocompleteCodeSnippet[], maxPromptTokens: number, manuallyPassFileContents: string, autocompleteModel?: ILLM | string) => Promise<string>;
//# sourceMappingURL=autocompleteContextFetching.d.ts.map