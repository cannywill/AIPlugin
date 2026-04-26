import { ConfigHandler } from "../config/ConfigHandler.js";
import { IDE, IndexingProgressUpdate } from "../index.js";
import type { FromCoreProtocol, ToCoreProtocol } from "../protocol";
import type { IMessenger } from "../protocol/messenger";
import { CodebaseIndex } from "./types.js";
export declare class PauseToken {
    private _paused;
    constructor(_paused: boolean);
    set paused(value: boolean);
    get paused(): boolean;
}
export declare class CodebaseIndexer {
    private readonly configHandler;
    protected readonly ide: IDE;
    private readonly messenger?;
    /**
     * We batch for two reasons:
     * - To limit memory usage for indexes that perform computations locally, e.g. FTS
     * - To make as few requests as possible to the embeddings providers
     */
    filesPerBatch: number;
    initPromise: Promise<void>;
    private config;
    private indexingCancellationController;
    private codebaseIndexingState;
    private readonly pauseToken;
    private builtIndexes;
    private getUserFriendlyIndexName;
    errorsRegexesToClearIndexesOn: RegExp[];
    constructor(configHandler: ConfigHandler, ide: IDE, messenger?: IMessenger<ToCoreProtocol, FromCoreProtocol> | undefined, initialPaused?: boolean);
    private init;
    set paused(value: boolean);
    get paused(): boolean;
    clearIndexes(): Promise<void>;
    protected getIndexesToBuild(): Promise<CodebaseIndex[]>;
    private totalIndexOps;
    private singleFileIndexOps;
    refreshFile(file: string, workspaceDirs: string[]): Promise<void>;
    private refreshFiles;
    refreshDirs(dirs: string[], abortSignal: AbortSignal): AsyncGenerator<IndexingProgressUpdate>;
    private handleErrorAndGetProgressUpdate;
    private errorToProgressUpdate;
    private logProgress;
    private yieldUpdateAndPause;
    private batchRefreshIndexResults;
    private indexFiles;
    private updateProgress;
    private sendIndexingErrorTelemetry;
    /**
     * We want to prevent sqlite concurrent write errors
     * when there are 2 indexing happening from different windows.
     * We want the other window to wait until the first window's indexing finishes.
     * Incase the first window closes before indexing is finished,
     * we want to unlock the IndexLock by checking the last timestamp.
     */
    private waitForDBIndex;
    wasAnyOneIndexAdded(): Promise<boolean>;
    refreshCodebaseIndex(paths: string[]): Promise<void>;
    refreshCodebaseIndexFiles(files: string[]): Promise<void>;
    handleIndexingError(e: any): Promise<void>;
    get currentIndexingState(): IndexingProgressUpdate;
    private hasIndexingContextProvider;
    private isIndexingConfigSame;
    private handleConfigUpdate;
}
//# sourceMappingURL=CodebaseIndexer.d.ts.map