import { BaseContextProvider } from "..";
import { ContextItem, ContextProviderDescription, ContextProviderExtras, FetchFunction } from "../..";
export declare const fetchSearchResults: (query: string, n: number, fetchFn: FetchFunction) => Promise<ContextItem[]>;
export default class WebContextProvider extends BaseContextProvider {
    static ENDPOINT: URL;
    private static DEFAULT_N;
    static description: ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
//# sourceMappingURL=WebContextProvider.d.ts.map