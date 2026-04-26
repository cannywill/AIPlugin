import { Chunk } from "../../../";
import BaseRetrievalPipeline, { RetrievalPipelineRunArguments } from "./BaseRetrievalPipeline";
export default class NoRerankerRetrievalPipeline extends BaseRetrievalPipeline {
    run(args: RetrievalPipelineRunArguments): Promise<Chunk[]>;
}
//# sourceMappingURL=NoRerankerRetrievalPipeline.d.ts.map