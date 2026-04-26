import { SqliteDb } from "./refreshIndex.js";
import { IndexResultType, } from "./types.js";
/**
 * This is a CodebaseIndex used for testing which files get indexed.
 * It maintains a SQLite database of all file/tag pairs
 */
export class TestCodebaseIndex {
    relativeExpectedTime = 0.1;
    artifactId = "__test__";
    static async _createTables(db) {
        await db.exec(`CREATE TABLE IF NOT EXISTS test_index (
        id INTEGER PRIMARY KEY,
        path TEXT NOT NULL,
        branch TEXT NOT NULL,
        directory TEXT NOT NULL
    )`);
    }
    async *update(tag, results, markComplete, repoName) {
        const db = await SqliteDb.get();
        await TestCodebaseIndex._createTables(db);
        for (const item of [...results.compute, ...results.addTag]) {
            await db.run("INSERT INTO test_index (path, branch, directory) VALUES (?, ?, ?)", [item.path, tag.branch, tag.directory]);
        }
        for (const item of [...results.del, ...results.removeTag]) {
            await db.run("DELETE FROM test_index WHERE path = ? AND branch = ? AND directory = ?", [item.path, tag.branch, tag.directory]);
        }
        await markComplete(results.compute, IndexResultType.Compute);
        await markComplete(results.addTag, IndexResultType.AddTag);
        await markComplete(results.del, IndexResultType.Delete);
        await markComplete(results.removeTag, IndexResultType.RemoveTag);
    }
    async getIndexedFilesForTags(tags) {
        const db = await SqliteDb.get();
        await TestCodebaseIndex._createTables(db);
        const rows = await db.all(`SELECT path FROM test_index WHERE (branch, directory) IN (VALUES ${tags
            .map(() => "(?, ?)")
            .join(", ")})`, tags.flatMap((tag) => [tag.branch, tag.directory]));
        return rows.map((row) => row.path);
    }
    async clearDatabase() {
        const db = await SqliteDb.get();
        await TestCodebaseIndex._createTables(db);
        await db.run("DELETE FROM test_index");
    }
}
