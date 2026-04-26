import { BaseContextProvider } from "../";
import { retrieveContextItemsFromEmbeddings } from "../retrieval/retrieval";
class CodebaseContextProvider extends BaseContextProvider {
    static description = {
        title: "codebase",
        displayTitle: "Codebase",
        description: "Automatically find relevant files",
        type: "normal",
        renderInlineAs: "",
        dependsOnIndexing: ["embeddings", "fullTextSearch", "chunk"],
    };
    async getContextItems(query, extras) {
        return retrieveContextItemsFromEmbeddings(extras, this.options, undefined);
    }
    async load() { }
}
export default CodebaseContextProvider;
