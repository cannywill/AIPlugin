import QuickLRU from "quick-lru";
export interface prevEdit {
    unidiff: string;
    fileUri: string;
    workspaceUri: string;
    timestamp: number;
}
export declare const prevEditLruCache: QuickLRU<string, prevEdit>;
export declare const setPrevEdit: (edit: prevEdit) => void;
export declare const getPrevEditsDescending: () => prevEdit[];
//# sourceMappingURL=prevEditLruCache.d.ts.map