import Parser from "web-tree-sitter";
/**
 * Singleton class that keeps track of a map of document paths to their history.
 * The point here is to prevent re-calculating the AST,
 * and to preserve an older, original state of the document before any user edits.
 */
export declare class DocumentHistoryTracker {
    private static instance;
    private documentAstMap;
    private documentContentHistoryMap;
    private constructor();
    /**
     * Get the singleton instance of DocumentHistoryTracker.
     */
    static getInstance(): DocumentHistoryTracker;
    /**
     * Add a document and its first state to the tracker.
     *
     * @param documentPath The path of the document.
     * @param documentContent The first content of the document.
     * @param ast The first AST of the document.
     */
    addDocument(documentPath: string, documentContent: string, ast: Parser.Tree): void;
    /**
     * Push a new AST to an existing document's history stack.
     *
     * @param documentPath The path of the document.
     * @param documentContent The new content to push to the document's history stack.
     * @param ast The new AST to push to the document's history stack.
     * @throws Error if the document doesn't exist in the tracker.
     */
    push(documentPath: string, documentContent: string, ast: Parser.Tree): void;
    /**
     * Get the most recent AST of a document.
     *
     * @param documentPath The path of the document.
     * @returns The most recent AST of the document.
     * @throws Error if the document doesn't exist in the tracker.
     */
    getMostRecentAst(documentPath: string): Parser.Tree | null;
    /**
     * Get the most recent AST of a document.
     *
     * @param documentPath The path of the document.
     * @returns The most recent document history of the document.
     * @throws Error if the document doesn't exist in the tracker.
     */
    getMostRecentDocumentHistory(documentPath: string): string | null;
    /**
     * Delete a document from the tracker.
     *
     * @param documentPath The path of the document to delete.
     */
    deleteDocument(documentPath: string): void;
    /**
     * Clear all documents from the tracker.
     */
    clearMap(): void;
}
//# sourceMappingURL=DocumentHistoryTracker.d.ts.map