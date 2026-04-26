import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, FetchFunction, LoadSubmenuItemsArgs } from "../../index.js";
import { BaseContextProvider } from "../index.js";
export interface DiscordChannel {
    id: string;
    name?: string;
    icon?: string;
    topic?: string;
    type?: number;
    guild_id?: string;
}
interface DiscordMessage {
    id: string;
    content: string;
    author: {
        id: string;
        username: string;
    };
    timestamp: string;
}
declare class DiscordContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    private baseUrl;
    private getUrl;
    get deprecationMessage(): string;
    fetchMessages(channelId: string, fetch: FetchFunction): Promise<Array<DiscordMessage>>;
    fetchChannels(fetch: FetchFunction): Promise<Array<DiscordChannel>>;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
}
export default DiscordContextProvider;
//# sourceMappingURL=DiscordContextProvider.d.ts.map