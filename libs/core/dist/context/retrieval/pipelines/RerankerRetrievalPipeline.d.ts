import { Chunk } from "../../..";
import BaseRetrievalPipeline, { RetrievalPipelineRunArguments } from "./BaseRetrievalPipeline";
export default class RerankerRetrievalPipeline extends BaseRetrievalPipeline {
    private _retrieveInitial;
    private _rerank;
    private _expandWithEmbeddings;
    private _expandRankedResults;
    run(args: RetrievalPipelineRunArguments): Promise<Chunk[]>;
}
//# sourceMappingURL=RerankerRetrievalPipeline.d.ts.map