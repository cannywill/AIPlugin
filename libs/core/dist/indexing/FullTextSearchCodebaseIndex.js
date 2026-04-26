import { RETRIEVAL_PARAMS } from "../util/parameters";
import { getUriPathBasename } from "../util/uri";
import { ChunkCodebaseIndex } from "./chunk/ChunkCodebaseIndex";
import { SqliteDb } from "./refreshIndex";
import { IndexResultType, } from "./types";
import { tagToString } from "./utils";
export class FullTextSearchCodebaseIndex {
    relativeExpectedTime = 0.2;
    static artifactId = "sqliteFts";
    artifactId = FullTextSearchCodebaseIndex.artifactId;
    pathWeightMultiplier = 10.0;
    async _createTables(db) {
        await db.exec(`CREATE VIRTUAL TABLE IF NOT EXISTS fts USING fts5(
        path,
        content,
        tokenize = 'trigram'
    )`);
        await db.exec(`CREATE TABLE IF NOT EXISTS fts_metadata (
        id INTEGER PRIMARY KEY,
        path TEXT NOT NULL,
        cacheKey TEXT NOT NULL,
        chunkId INTEGER NOT NULL,
        FOREIGN KEY (chunkId) REFERENCES chunks (id),
        FOREIGN KEY (id) REFERENCES fts (rowid)
    )`);
    }
    async *update(tag, results, markComplete, repoName) {
        const db = await SqliteDb.get();
        await this._createTables(db);
        for (let i = 0; i < results.compute.length; i++) {
            const item = results.compute[i];
            // Insert chunks
            const chunks = await db.all("SELECT * FROM chunks WHERE path = ? AND cacheKey = ?", [item.path, item.cacheKey]);
            for (const chunk of chunks) {
                const { lastID } = await db.run("INSERT INTO fts (path, content) VALUES (?, ?)", [item.path, chunk.content]);
                await db.run(`INSERT INTO fts_metadata (id, path, cacheKey, chunkId)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET
           path = excluded.path,
           cacheKey = excluded.cacheKey,
           chunkId = excluded.chunkId`, [lastID, item.path, item.cacheKey, chunk.id]);
            }
            yield {
                progress: i / results.compute.length,
                desc: `Indexing ${getUriPathBasename(item.path)}`,
                status: "indexing",
            };
            await markComplete([item], IndexResultType.Compute);
        }
        // Add tag
        for (const item of results.addTag) {
            await markComplete([item], IndexResultType.AddTag);
        }
        // Remove tag
        for (const item of results.removeTag) {
            await markComplete([item], IndexResultType.RemoveTag);
        }
        // Delete
        for (const item of results.del) {
            await db.run(`
        DELETE FROM fts WHERE rowid IN (
          SELECT id FROM fts_metadata WHERE path = ? AND cacheKey = ?
        )
      `, [item.path, item.cacheKey]);
            await db.run("DELETE FROM fts_metadata WHERE path = ? AND cacheKey = ?", [
                item.path,
                item.cacheKey,
            ]);
            await markComplete([item], IndexResultType.Delete);
        }
    }
    async retrieve(config) {
        const db = await SqliteDb.get();
        const query = this.buildRetrieveQuery(config);
        const parameters = this.getRetrieveQueryParameters(config);
        let results = await db.all(query, parameters);
        results = results.filter((result) => result.rank <= (config.bm25Threshold ?? RETRIEVAL_PARAMS.bm25Threshold));
        const chunks = await db.all(`SELECT * FROM chunks WHERE id IN (${results.map(() => "?").join(",")})`, results.map((result) => result.chunkId));
        return chunks.map((chunk) => ({
            filepath: chunk.path,
            index: chunk.index,
            startLine: chunk.startLine,
            endLine: chunk.endLine,
            content: chunk.content,
            digest: chunk.cacheKey,
        }));
    }
    buildTagFilter(tags) {
        const tagStrings = this.convertTags(tags);
        return `AND chunk_tags.tag IN (${tagStrings.map(() => "?").join(",")})`;
    }
    buildPathFilter(filterPaths) {
        if (!filterPaths || filterPaths.length === 0) {
            return "";
        }
        return `AND fts_metadata.path IN (${filterPaths.map(() => "?").join(",")})`;
    }
    buildRetrieveQuery(config) {
        return `
      SELECT fts_metadata.chunkId, fts_metadata.path, fts.content, rank
      FROM fts
      JOIN fts_metadata ON fts.rowid = fts_metadata.id
      JOIN chunk_tags ON fts_metadata.chunkId = chunk_tags.chunkId
      WHERE fts MATCH ?
      ${this.buildTagFilter(config.tags)}
      ${this.buildPathFilter(config.filterPaths)}
      ORDER BY bm25(fts, ${this.pathWeightMultiplier})
      LIMIT ?
    `;
    }
    getRetrieveQueryParameters(config) {
        const { text, tags, filterPaths, n } = config;
        const tagStrings = this.convertTags(tags);
        return [
            text.replace(/\?/g, ""),
            ...tagStrings,
            ...(filterPaths || []),
            Math.ceil(n),
        ];
    }
    convertTags(tags) {
        // Notice that the "chunks" artifactId is used because of linking between tables
        return tags.map((tag) => tagToString({ ...tag, artifactId: ChunkCodebaseIndex.artifactId }));
    }
}
