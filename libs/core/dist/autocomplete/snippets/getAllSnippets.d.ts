import { IDE } from "../../index";
import { ContextRetrievalService } from "../context/ContextRetrievalService";
import { GetLspDefinitionsFunction } from "../types";
import { HelperVars } from "../util/HelperVars";
import { AutocompleteClipboardSnippet, AutocompleteCodeSnippet, AutocompleteDiffSnippet, AutocompleteStaticSnippet } from "./types";
export interface SnippetPayload {
    rootPathSnippets: AutocompleteCodeSnippet[];
    importDefinitionSnippets: AutocompleteCodeSnippet[];
    ideSnippets: AutocompleteCodeSnippet[];
    recentlyEditedRangeSnippets: AutocompleteCodeSnippet[];
    recentlyVisitedRangesSnippets: AutocompleteCodeSnippet[];
    diffSnippets: AutocompleteDiffSnippet[];
    clipboardSnippets: AutocompleteClipboardSnippet[];
    recentlyOpenedFileSnippets: AutocompleteCodeSnippet[];
    staticSnippet: AutocompleteStaticSnippet[];
}
export declare const getAllSnippets: ({ helper, ide, getDefinitionsFromLsp, contextRetrievalService, }: {
    helper: HelperVars;
    ide: IDE;
    getDefinitionsFromLsp: GetLspDefinitionsFunction;
    contextRetrievalService: ContextRetrievalService;
}) => Promise<SnippetPayload>;
export declare const getAllSnippetsWithoutRace: ({ helper, ide, getDefinitionsFromLsp, contextRetrievalService, }: {
    helper: HelperVars;
    ide: IDE;
    getDefinitionsFromLsp: GetLspDefinitionsFunction;
    contextRetrievalService: ContextRetrievalService;
}) => Promise<SnippetPayload>;
//# sourceMappingURL=getAllSnippets.d.ts.map