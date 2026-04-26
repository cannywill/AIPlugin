import { IDE } from "../..";
import { AutocompleteCodeSnippet, AutocompleteStaticSnippet } from "../snippets/types";
import { HelperVars } from "../util/HelperVars";
export declare class ContextRetrievalService {
    private readonly ide;
    private importDefinitionsService;
    private rootPathContextService;
    private staticContextService;
    constructor(ide: IDE);
    getSnippetsFromImportDefinitions(helper: HelperVars): Promise<AutocompleteCodeSnippet[]>;
    getRootPathSnippets(helper: HelperVars): Promise<AutocompleteCodeSnippet[]>;
    getStaticContextSnippets(helper: HelperVars): Promise<AutocompleteStaticSnippet[]>;
    /**
     * Initialize the import definitions cache for a file.
     * This is normally done automatically when the active text editor changes,
     * but needs to be called manually when using context fetching outside the normal flow.
     */
    initializeForFile(filepath: string): Promise<void>;
}
//# sourceMappingURL=ContextRetrievalService.d.ts.map