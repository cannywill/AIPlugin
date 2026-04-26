import { formatGrepSearchResults } from "../../util/grepSearch.js";
import { BaseContextProvider } from "../index.js";
const DEFAULT_MAX_SEARCH_CONTEXT_RESULTS = 200;
class SearchContextProvider extends BaseContextProvider {
    static description = {
        title: "search",
        displayTitle: "Search",
        description: "Use ripgrep to exact search the workspace",
        type: "query",
        renderInlineAs: "",
    };
    async getContextItems(query, extras) {
        const results = await extras.ide.getSearchResults(query, this.options?.maxResults ?? DEFAULT_MAX_SEARCH_CONTEXT_RESULTS);
        // Note, search context provider will not truncate result chars, but will limit number of results
        const { formatted } = formatGrepSearchResults(results);
        return [
            {
                description: "Search results",
                content: `Results of searching codebase for "${query}":\n\n${formatted}`,
                name: "Search results",
            },
        ];
    }
}
export default SearchContextProvider;
