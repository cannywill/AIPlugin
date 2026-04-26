import os from "os";
import { BaseContextProvider } from "../index.js";
class OSContextProvider extends BaseContextProvider {
    static description = {
        title: "os",
        displayTitle: "Operating System",
        description: "Operating system and CPU Information.",
        type: "normal",
    };
    async getContextItems(query, extras) {
        const cpu = os.arch();
        const platform = os.platform();
        return [
            {
                description: "Your operating system and CPU",
                content: `I am running ${platform === "win32" ? "Windows" : platform} on ${cpu}.`,
                name: "Operating System",
            },
        ];
    }
}
export default OSContextProvider;
