import * as JSONC from "comment-json";
import { joinPathsToUri } from "../../util/uri";
export async function getWorkspaceRcConfigs(ide) {
    try {
        const workspaces = await ide.getWorkspaceDirs();
        const rcFiles = await Promise.all(workspaces.map(async (dir) => {
            const ls = await ide.listDir(dir);
            const rcFiles = ls
                .filter((entry) => (entry[1] === 1 ||
                entry[1] === 64) &&
                entry[0].endsWith(".continuerc.json"))
                .map((entry) => joinPathsToUri(dir, entry[0]));
            return await Promise.all(rcFiles.map(ide.readFile));
        }));
        return rcFiles
            .flat()
            .map((file) => JSONC.parse(file));
    }
    catch (e) {
        console.debug("Failed to load workspace configs: ", e);
        return [];
    }
}
