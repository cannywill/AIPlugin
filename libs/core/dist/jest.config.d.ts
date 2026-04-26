declare namespace _default {
    let transform: {
        "^.+\\.(ts|js)$": (string | {
            useESM: boolean;
            isolatedModules: boolean;
            tsconfig: {
                experimentalDecorators: boolean;
                emitDecoratorMetadata: boolean;
            };
        })[];
    };
    let moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": string;
        "^uuid$": string;
        "^@azure/(.*)$": string;
        "^mssql$": string;
    };
    let extensionsToTreatAsEsm: string[];
    let preset: string;
    let testTimeout: number;
    let testEnvironment: string;
    namespace globals {
        let __dirname: string;
        let __filename: string;
    }
    let collectCoverageFrom: string[];
    let globalSetup: string;
    let setupFilesAfterEnv: string[];
    let maxWorkers: number;
    let testMatch: string[];
}
export default _default;
//# sourceMappingURL=jest.config.d.ts.map