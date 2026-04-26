import { BaseContextProvider } from "../";
import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, LoadSubmenuItemsArgs } from "../..";
declare class DocsContextProvider extends BaseContextProvider {
    static nRetrieve: number;
    static nFinal: number;
    static description: ContextProviderDescription;
    constructor(options: any);
    private _rerankChunks;
    private _sortAlphabetically;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
}
export default DocsContextProvider;
//# sourceMappingURL=DocsContextProvider.d.ts.map