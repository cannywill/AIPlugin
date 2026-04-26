import { BaseContextProvider } from "../";
import { ContextItem, ContextProviderDescription, ContextProviderExtras, FetchFunction } from "../../index.js";
declare class URLContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default URLContextProvider;
export declare function getUrlContextItems(query: string, fetchFn: FetchFunction): Promise<ContextItem[]>;
//# sourceMappingURL=URLContextProvider.d.ts.map