import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class OSContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default OSContextProvider;
//# sourceMappingURL=OSContextProvider.d.ts.map