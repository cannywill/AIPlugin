import { BaseContextProvider } from "../";
import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../";
declare class CurrentFileContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default CurrentFileContextProvider;
//# sourceMappingURL=CurrentFileContextProvider.d.ts.map