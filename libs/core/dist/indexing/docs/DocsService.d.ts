import { Chunk, DocsIndexingDetails, IDE, ILLM, IndexingStatus, SiteIndexingConfig } from "../..";
import { ConfigHandler } from "../../config/ConfigHandler";
import TransformersJsEmbeddingsProvider from "../../llm/llms/TransformersJsEmbeddingsProvider";
import { FromCoreProtocol, ToCoreProtocol } from "../../protocol";
import { IMessenger } from "../../protocol/messenger";
export interface LanceDbDocsRow {
    title: string;
    starturl: string;
    content: string;
    path: string;
    startline: number;
    endline: number;
    vector: number[];
    [key: string]: any;
}
export interface SqliteDocsRow {
    title: string;
    startUrl: string;
    favicon: string;
}
export type AddParams = {
    siteIndexingConfig: SiteIndexingConfig;
    chunks: Chunk[];
    embeddings: number[][];
    favicon?: string;
};
export declare function embedModelsAreEqual(llm1: ILLM | null | undefined, llm2: ILLM | null | undefined): boolean;
export default class DocsService {
    private readonly ide;
    private readonly messenger?;
    private static lance;
    static lanceTableName: string;
    static sqlitebTableName: string;
    static defaultEmbeddingsProvider: TransformersJsEmbeddingsProvider;
    isInitialized: Promise<void>;
    isSyncing: boolean;
    private docsIndexingQueue;
    private lanceTableNamesSet;
    private config;
    private sqliteDb?;
    private ideInfoPromise;
    private githubToken?;
    constructor(configHandler: ConfigHandler, ide: IDE, messenger?: IMessenger<ToCoreProtocol, FromCoreProtocol> | undefined);
    setGithubToken(token: string): void;
    private initLanceDb;
    private static instance?;
    static createSingleton(configHandler: ConfigHandler, ide: IDE, messenger?: IMessenger<ToCoreProtocol, FromCoreProtocol>): DocsService;
    static getSingleton(): DocsService | undefined;
    private init;
    readonly statuses: Map<string, IndexingStatus>;
    handleStatusUpdate(update: IndexingStatus): void;
    initStatuses(): Promise<void>;
    abort(startUrl: string): void;
    shouldCancel(startUrl: string, startedWithEmbedder: string): boolean;
    /**
     * 功能：判断是否可使用 transformers.js 作为默认嵌入模型。
     * 返回：Flutter 环境默认返回 true。
     */
    canUseTransformersEmbeddings(): Promise<boolean>;
    getEmbeddingsProvider(): Promise<{
        provider: ILLM;
    } | {
        provider: TransformersJsEmbeddingsProvider;
    } | {
        provider: undefined;
    }>;
    private handleConfigUpdate;
    syncDocsWithPrompt(reIndex?: boolean): Promise<void>;
    hasMetadata(startUrl: string): Promise<boolean>;
    listMetadata(): Promise<SqliteDocsRow[]>;
    reindexDoc(startUrl: string): Promise<void>;
    indexAndAdd(siteIndexingConfig: SiteIndexingConfig, forceReindex?: boolean): Promise<void>;
    retrieveChunksFromQuery(query: string, startUrl: string, nRetrieve: number): Promise<Chunk[]>;
    private lanceDBRowToChunk;
    getDetails(startUrl: string): Promise<DocsIndexingDetails>;
    retrieveChunks(startUrl: string, vector: number[], nRetrieve: number, isRetry?: boolean): Promise<Chunk[]>;
    getIndexedPages(startUrl: string): Promise<Set<string>>;
    private getOrCreateSqliteDb;
    getFavicon(startUrl: string): Promise<any>;
    /**
     * Sync with no embeddings provider change
     */
    private syncDocs;
    private hasDocsContextProvider;
    private createLanceDocsTable;
    /**
     * From Lance: Table names can only contain alphanumeric characters,
     * underscores, hyphens, and periods
     */
    private sanitizeLanceTableName;
    private getLanceTableName;
    private getOrCreateLanceTable;
    private addToLance;
    private addMetadataToSqlite;
    private updateMetadataInSqlite;
    private addToConfig;
    private add;
    private deleteEmbeddingsFromLance;
    private deleteMetadataFromSqlite;
    private deleteFromConfig;
    private deleteIndexes;
    delete(startUrl: string): Promise<void>;
}
//# sourceMappingURL=DocsService.d.ts.map