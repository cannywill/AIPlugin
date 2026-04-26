import { AutocompleteSnippetDeprecated } from "../../types";
import { HelperVars } from "../../util/HelperVars";
export declare function getSymbolsForSnippet(snippet: string): Set<string>;
/**
 * Rank code snippets to be used in tab-autocomplete prompt. Returns a sorted version of the snippet array.
 */
export declare function rankAndOrderSnippets(ranges: AutocompleteSnippetDeprecated[], helper: HelperVars): Required<AutocompleteSnippetDeprecated>[];
/**
 * Fill the allowed space with snippets.
 * It is assumed that the snippets are sorted by score.
 */
export declare function fillPromptWithSnippets(snippets: Required<AutocompleteSnippetDeprecated>[], maxSnippetTokens: number, modelName: string): Required<AutocompleteSnippetDeprecated>[];
//# sourceMappingURL=index.d.ts.map