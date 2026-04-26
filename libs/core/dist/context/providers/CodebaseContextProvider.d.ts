import { BaseContextProvider } from "../";
import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../";
declare class CodebaseContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    load(): Promise<void>;
}
export default CodebaseContextProvider;
//# sourceMappingURL=CodebaseContextProvider.d.ts.map