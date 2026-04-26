import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, LoadSubmenuItemsArgs } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class FolderContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
}
export default FolderContextProvider;
//# sourceMappingURL=FolderContextProvider.d.ts.map