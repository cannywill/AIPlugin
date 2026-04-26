import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class SearchContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default SearchContextProvider;
//# sourceMappingURL=SearchContextProvider.d.ts.map