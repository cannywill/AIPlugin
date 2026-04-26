import { AutocompleteCodeSnippet, AutocompleteSnippet } from "../snippets/types";
import { HelperVars } from "../util/HelperVars";
export declare function formatOpenedFilesContext(recentlyOpenedFilesSnippets: AutocompleteCodeSnippet[], remainingTokenCount: number, helper: HelperVars, alreadyAddedSnippets: AutocompleteSnippet[], TOKEN_BUFFER: number): AutocompleteCodeSnippet[];
declare const rankByScore: (snippets: AutocompleteCodeSnippet[]) => AutocompleteCodeSnippet[];
declare const getRecencyAndSizeScore: (index: number, snippet: AutocompleteSnippet) => number;
declare const setLogStats: (snippets: AutocompleteSnippet[]) => void;
declare function trimSnippetForContext(snippet: AutocompleteCodeSnippet, maxTokens: number, modelName: string): {
    newSnippet: AutocompleteCodeSnippet;
    newTokens: number;
};
export { getRecencyAndSizeScore, rankByScore, setLogStats, trimSnippetForContext, };
//# sourceMappingURL=formatOpenedFilesContext.d.ts.map