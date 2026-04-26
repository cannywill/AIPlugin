import { AutocompleteSnippetType, } from "../snippets/types";
import { ImportDefinitionsService } from "./ImportDefinitionsService";
import { getSymbolsForSnippet } from "./ranking";
import { RootPathContextService } from "./root-path-context/RootPathContextService";
import { StaticContextService } from "./static-context/StaticContextService";
export class ContextRetrievalService {
    ide;
    importDefinitionsService;
    rootPathContextService;
    staticContextService;
    constructor(ide) {
        this.ide = ide;
        this.importDefinitionsService = new ImportDefinitionsService(this.ide);
        this.rootPathContextService = new RootPathContextService(this.importDefinitionsService, this.ide);
        this.staticContextService = new StaticContextService(this.ide);
    }
    async getSnippetsFromImportDefinitions(helper) {
        if (helper.options.useImports === false) {
            return [];
        }
        const importSnippets = [];
        const fileInfo = this.importDefinitionsService.get(helper.filepath);
        if (fileInfo) {
            const { imports } = fileInfo;
            // Look for imports of any symbols around the current range
            const textAroundCursor = helper.fullPrefix.split("\n").slice(-5).join("\n") +
                helper.fullSuffix.split("\n").slice(0, 3).join("\n");
            const symbols = Array.from(getSymbolsForSnippet(textAroundCursor)).filter((symbol) => !helper.lang.topLevelKeywords.includes(symbol));
            for (const symbol of symbols) {
                const rifs = imports[symbol];
                if (Array.isArray(rifs)) {
                    const snippets = rifs.map((rif) => {
                        return {
                            filepath: rif.filepath,
                            content: rif.contents,
                            type: AutocompleteSnippetType.Code,
                        };
                    });
                    importSnippets.push(...snippets);
                }
            }
        }
        return importSnippets;
    }
    async getRootPathSnippets(helper) {
        if (!helper.treePath) {
            return [];
        }
        return this.rootPathContextService.getContextForPath(helper.filepath, helper.treePath);
    }
    async getStaticContextSnippets(helper) {
        return this.staticContextService.getContext(helper);
    }
    /**
     * Initialize the import definitions cache for a file.
     * This is normally done automatically when the active text editor changes,
     * but needs to be called manually when using context fetching outside the normal flow.
     */
    async initializeForFile(filepath) {
        try {
            await this.importDefinitionsService.cache.initKey(filepath);
        }
        catch (e) {
            console.warn(`Failed to initialize import definitions cache for ${filepath}:`, e);
        }
    }
}
