import path from "path";
import workerpool from "workerpool";
export class LlamaAsyncEncoder {
    workerPool;
    constructor() {
        this.workerPool = workerpool.pool(workerCodeFilePath("llamaTokenizerWorkerPool.mjs"));
    }
    async encode(text) {
        return this.workerPool.exec("encode", [text]);
    }
    async decode(tokens) {
        return this.workerPool.exec("decode", [tokens]);
    }
    // TODO: this should be called somewhere before exit or potentially with a shutdown hook
    async close() {
        await this.workerPool.terminate();
    }
}
// this class does not yet do anything asynchronous
export class GPTAsyncEncoder {
    workerPool;
    constructor() {
        this.workerPool = workerpool.pool(workerCodeFilePath("tiktokenWorkerPool.mjs"));
    }
    async encode(text) {
        return this.workerPool.exec("encode", [text]);
    }
    async decode(tokens) {
        return this.workerPool.exec("decode", [tokens]);
    }
    // TODO: this should be called somewhere before exit or potentially with a shutdown hook
    async close() {
        await this.workerPool.terminate();
    }
}
function workerCodeFilePath(workerFileName) {
    if (process.env.NODE_ENV === "test") {
        // `cross-env` seems to make it so __dirname is the root of the project and not the directory containing this file
        return path.join(__dirname, "llm", workerFileName);
    }
    return path.join(__dirname, workerFileName);
}
