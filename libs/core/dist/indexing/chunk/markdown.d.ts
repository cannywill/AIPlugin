import { ChunkWithoutID } from "../../";
export declare function cleanFragment(fragment: string | undefined): string | undefined;
export declare function cleanHeader(header: string | undefined): string | undefined;
export declare function markdownChunker(content: string, maxChunkSize: number, hLevel: number): AsyncGenerator<ChunkWithoutID>;
/**
 * Recursively chunks by header level (h1-h6)
 * The final chunk will always include all parent headers
 * TODO: Merge together neighboring chunks if their sum doesn't exceed maxChunkSize
 */
//# sourceMappingURL=markdown.d.ts.map