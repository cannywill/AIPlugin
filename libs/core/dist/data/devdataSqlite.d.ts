import { DatabaseConnection } from "../indexing/refreshIndex.js";
export declare class DevDataSqliteDb {
    static db: DatabaseConnection | null;
    private static createTables;
    static logTokensGenerated(model: string, provider: string, promptTokens: number, generatedTokens: number): Promise<void>;
    static getTokensPerDay(): Promise<any[]>;
    static getTokensPerModel(): Promise<any[]>;
    static get(): Promise<DatabaseConnection>;
}
//# sourceMappingURL=devdataSqlite.d.ts.map