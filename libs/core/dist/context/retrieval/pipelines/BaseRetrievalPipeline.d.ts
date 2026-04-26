import { BranchAndDir, Chunk, ContinueConfig, IDE, ILLM } from "../../../";
export interface RetrievalPipelineOptions {
    llm: ILLM;
    config: ContinueConfig;
    ide: IDE;
    input: string;
    nRetrieve: number;
    nFinal: number;
    tags: BranchAndDir[];
    filterDirectory?: string;
}
export interface RetrievalPipelineRunArguments {
    query: string;
    tags: BranchAndDir[];
    filterDirectory?: string;
    includeEmbeddings: boolean;
}
export interface IRetrievalPipeline {
    run(args: RetrievalPipelineRunArguments): Promise<Chunk[]>;
}
export default class BaseRetrievalPipeline implements IRetrievalPipeline {
    protected readonly options: RetrievalPipelineOptions;
    private ftsIndex;
    private lanceDbIndex;
    private lanceDbInitPromise;
    constructor(options: RetrievalPipelineOptions);
    protected initLanceDb(): Promise<void>;
    protected ensureLanceDbInitialized(): Promise<boolean>;
    private getCleanedTrigrams;
    private escapeFtsQueryString;
    protected retrieveFts(args: RetrievalPipelineRunArguments, n: number): Promise<Chunk[]>;
    protected retrieveAndChunkRecentlyEditedFiles(n: number): Promise<Chunk[]>;
    protected retrieveEmbeddings(input: string, n: number): Promise<Chunk[]>;
    run(args: RetrievalPipelineRunArguments): Promise<Chunk[]>;
    protected retrieveWithTools(input: string): Promise<Chunk[]>;
}
//# sourceMappingURL=BaseRetrievalPipeline.d.ts.map