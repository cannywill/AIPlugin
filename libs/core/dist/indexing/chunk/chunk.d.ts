import { Chunk, ChunkWithoutID } from "../../index.js";
export type ChunkDocumentParam = {
    filepath: string;
    contents: string;
    maxChunkSize: number;
    digest: string;
};
export declare function chunkDocumentWithoutId(fileUri: string, contents: string, maxChunkSize: number): AsyncGenerator<ChunkWithoutID>;
export declare function chunkDocument({ filepath, contents, maxChunkSize, digest, }: ChunkDocumentParam): AsyncGenerator<Chunk>;
export declare function shouldChunk(fileUri: string, contents: string): boolean;
//# sourceMappingURL=chunk.d.ts.map