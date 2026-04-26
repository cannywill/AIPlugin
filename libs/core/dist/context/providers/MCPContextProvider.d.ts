import { BaseContextProvider } from "../";
import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, LoadSubmenuItemsArgs } from "../../";
interface MCPContextProviderOptions {
    mcpId: string;
    serverName: string;
    submenuItems: ContextSubmenuItem[];
}
declare class MCPContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    get description(): ContextProviderDescription;
    static encodeMCPResourceId(mcpId: string, uri: string): string;
    static decodeMCPResourceId(mcpResourceId: string): {
        mcpId: string;
        uri: string;
    };
    constructor(options: MCPContextProviderOptions);
    /**
     * Continue experimentally supports resource templates (https://modelcontextprotocol.io/docs/concepts/resources#resource-templates)
     * by allowing specifically just the "query" variable in the template, which we will update with the full input of the user in the input box
     */
    private insertInputToUriTemplate;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
}
export default MCPContextProvider;
//# sourceMappingURL=MCPContextProvider.d.ts.map