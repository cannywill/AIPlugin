import path from "path";
import { BaseLLM } from "../../llm/index.js";
class EmbeddingsPipeline {
    static task = "feature-extraction";
    static model = "all-MiniLM-L6-v2";
    static instance = null;
    static async getInstance() {
        if (EmbeddingsPipeline.instance === null) {
            // @ts-ignore
            // prettier-ignore
            const { env, pipeline } = await import("../../vendor/modules/@xenova/transformers/src/transformers.js");
            env.allowLocalModels = true;
            env.allowRemoteModels = false;
            env.localModelPath = path.join(typeof __dirname === "undefined"
                ? // @ts-ignore
                    path.dirname(new URL(import.meta.url).pathname)
                : __dirname, "..", "models");
            EmbeddingsPipeline.instance = await pipeline(EmbeddingsPipeline.task, EmbeddingsPipeline.model);
        }
        return EmbeddingsPipeline.instance;
    }
}
export class TransformersJsEmbeddingsProvider extends BaseLLM {
    static providerName = "transformers.js";
    static maxGroupSize = 1;
    static model = "all-MiniLM-L6-v2";
    static mockVector = Array.from({ length: 384 }).fill(2);
    static defaultOptions = {
        model: TransformersJsEmbeddingsProvider.model,
    };
    constructor() {
        super({
            model: TransformersJsEmbeddingsProvider.model,
            title: "Transformers.js (Built-In)",
        });
    }
    async embed(chunks) {
        // Workaround to ignore testing issues in Jest
        if (process.env.NODE_ENV === "test") {
            return chunks.map(() => TransformersJsEmbeddingsProvider.mockVector);
        }
        const extractor = await EmbeddingsPipeline.getInstance();
        if (!extractor) {
            throw new Error("TransformerJS embeddings pipeline is not initialized");
        }
        if (chunks.length === 0) {
            return [];
        }
        const outputs = [];
        for (let i = 0; i < chunks.length; i += TransformersJsEmbeddingsProvider.maxGroupSize) {
            const chunkGroup = chunks.slice(i, i + TransformersJsEmbeddingsProvider.maxGroupSize);
            const output = await extractor(chunkGroup, {
                pooling: "mean",
                normalize: true,
            });
            // To avoid causing the extension host to go unresponsive
            await new Promise((resolve) => setTimeout(resolve, 10));
            outputs.push(...output.tolist());
        }
        return outputs;
    }
}
export default TransformersJsEmbeddingsProvider;
