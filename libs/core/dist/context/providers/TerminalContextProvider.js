import { BaseContextProvider } from "../index.js";
class TerminalContextProvider extends BaseContextProvider {
    static description = {
        title: "terminal",
        displayTitle: "Terminal",
        description: "Reference the last terminal command",
        type: "normal",
    };
    async getContextItems(query, extras) {
        const content = await extras.ide.getTerminalContents();
        return [
            {
                description: "The contents of the terminal",
                content: `Current terminal contents:\n\n${content || "The terminal is empty."}`,
                name: "Terminal",
            },
        ];
    }
}
export default TerminalContextProvider;
