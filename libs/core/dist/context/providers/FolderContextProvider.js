import { walkDirs } from "../../indexing/walkDir.js";
import { getShortestUniqueRelativeUriPaths, getUriPathBasename, } from "../../util/uri.js";
import { BaseContextProvider } from "../index.js";
import { retrieveContextItemsFromEmbeddings } from "../retrieval/retrieval.js";
class FolderContextProvider extends BaseContextProvider {
    static description = {
        title: "folder",
        displayTitle: "Folder",
        description: "Type to search",
        type: "submenu",
        dependsOnIndexing: ["embeddings", "fullTextSearch", "chunk"],
    };
    async getContextItems(query, extras) {
        return retrieveContextItemsFromEmbeddings(extras, this.options, query);
    }
    async loadSubmenuItems(args) {
        const workspaceDirs = await args.ide.getWorkspaceDirs();
        const folders = await walkDirs(args.ide, {
            include: "dirs",
            source: "load submenu items - folder",
        }, workspaceDirs);
        const withUniquePaths = getShortestUniqueRelativeUriPaths(folders, workspaceDirs);
        return withUniquePaths.map((folder) => {
            return {
                id: folder.uri,
                title: getUriPathBasename(folder.uri),
                description: folder.uniquePath,
            };
        });
    }
}
export default FolderContextProvider;
