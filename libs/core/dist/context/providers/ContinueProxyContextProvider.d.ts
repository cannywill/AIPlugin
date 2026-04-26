import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, LoadSubmenuItemsArgs } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class ContinueProxyContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    workOsAccessToken: string | undefined;
    get description(): ContextProviderDescription;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default ContinueProxyContextProvider;
//# sourceMappingURL=ContinueProxyContextProvider.d.ts.map