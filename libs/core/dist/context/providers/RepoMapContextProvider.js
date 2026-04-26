import { BaseContextProvider } from "..";
import { walkDirs } from "../../indexing/walkDir";
import generateRepoMap from "../../util/generateRepoMap";
import { getShortestUniqueRelativeUriPaths, getUriPathBasename, } from "../../util/uri";
const ENTIRE_PROJECT_ITEM = {
    id: "entire-codebase",
    title: "Entire codebase",
    description: "Search the entire codebase",
};
class RepoMapContextProvider extends BaseContextProvider {
    static description = {
        title: "repo-map",
        displayTitle: "Repository Map",
        description: "Select a folder",
        type: "submenu",
    };
    async getContextItems(query, extras) {
        return [
            {
                name: "Repository Map",
                description: "Overview of the repository structure",
                content: await generateRepoMap(extras.llm, extras.ide, {
                    dirUris: query === ENTIRE_PROJECT_ITEM.id ? undefined : [query],
                    outputRelativeUriPaths: true,
                    // Doesn't ALWAYS depend on indexing, so not setting dependsOnIndexing = true, just checking for it
                    includeSignatures: extras.config.disableIndexing
                        ? false
                        : (this.options?.includeSignatures ?? true),
                }),
            },
        ];
    }
    async loadSubmenuItems(args) {
        const workspaceDirs = await args.ide.getWorkspaceDirs();
        const folders = await walkDirs(args.ide, {
            include: "dirs",
            source: "load submenu items - repo map",
        }, workspaceDirs);
        const withUniquePaths = getShortestUniqueRelativeUriPaths(folders, workspaceDirs);
        return [
            ENTIRE_PROJECT_ITEM,
            ...withUniquePaths.map((folder) => ({
                id: folder.uri,
                title: getUriPathBasename(folder.uri),
                description: folder.uniquePath,
            })),
        ];
    }
}
export default RepoMapContextProvider;
