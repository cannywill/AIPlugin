import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as URI from "uri-js";
import * as YAML from "yaml";
import * as JSONC from "comment-json";
import dotenv from "dotenv";
import { defaultConfig } from "../config/default";
import Types from "../config/types";
dotenv.config();
export function setConfigFilePermissions(filePath) {
    try {
        if (os.platform() !== "win32") {
            fs.chmodSync(filePath, 0o600);
        }
    }
    catch (error) {
        console.warn(`Failed to set permissions on ${filePath}:`, error);
    }
}
const CONTINUE_GLOBAL_DIR = (() => {
    const configPath = process.env.CONTINUE_GLOBAL_DIR;
    if (configPath) {
        // Convert relative path to absolute paths based on current working directory
        return path.isAbsolute(configPath)
            ? configPath
            : path.resolve(process.cwd(), configPath);
    }
    return path.join(os.homedir(), ".continue");
})();
// export const DEFAULT_CONFIG_TS_CONTENTS = `import { Config } from "./types"\n\nexport function modifyConfig(config: Config): Config {
//   return config;
// }`;
export const DEFAULT_CONFIG_TS_CONTENTS = `export function modifyConfig(config: Config): Config {
  return config;
}`;
export function getChromiumPath() {
    return path.join(getContinueUtilsPath(), ".chromium-browser-snapshots");
}
export function getContinueUtilsPath() {
    const utilsPath = path.join(getContinueGlobalPath(), ".utils");
    if (!fs.existsSync(utilsPath)) {
        fs.mkdirSync(utilsPath);
    }
    return utilsPath;
}
export function getGlobalContinueIgnorePath() {
    const continueIgnorePath = path.join(getContinueGlobalPath(), ".continueignore");
    if (!fs.existsSync(continueIgnorePath)) {
        fs.writeFileSync(continueIgnorePath, "");
    }
    return continueIgnorePath;
}
export function getContinueGlobalPath() {
    // This is ~/.continue on mac/linux
    const continuePath = CONTINUE_GLOBAL_DIR;
    if (!fs.existsSync(continuePath)) {
        fs.mkdirSync(continuePath);
    }
    return continuePath;
}
export function getSessionsFolderPath() {
    const sessionsPath = path.join(getContinueGlobalPath(), "sessions");
    if (!fs.existsSync(sessionsPath)) {
        fs.mkdirSync(sessionsPath);
    }
    return sessionsPath;
}
export function getIndexFolderPath() {
    const indexPath = path.join(getContinueGlobalPath(), "index");
    if (!fs.existsSync(indexPath)) {
        fs.mkdirSync(indexPath);
    }
    return indexPath;
}
export function getGlobalContextFilePath() {
    return path.join(getIndexFolderPath(), "globalContext.json");
}
export function getSharedConfigFilePath() {
    return path.join(getContinueGlobalPath(), "sharedConfig.json");
}
export function getSessionFilePath(sessionId) {
    return path.join(getSessionsFolderPath(), `${sessionId}.json`);
}
export function getSessionsListPath() {
    const filepath = path.join(getSessionsFolderPath(), "sessions.json");
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, JSON.stringify([]));
    }
    return filepath;
}
export function getConfigJsonPath() {
    const p = path.join(getContinueGlobalPath(), "config.json");
    return p;
}
export function getConfigYamlPath(ideType) {
    const p = path.join(getContinueGlobalPath(), "config.yaml");
    const exists = fs.existsSync(p);
    const isEmpty = exists && fs.readFileSync(p, "utf8").trim() === "";
    const needsCreation = !exists && !fs.existsSync(getConfigJsonPath());
    if (needsCreation || isEmpty) {
        fs.writeFileSync(p, YAML.stringify(defaultConfig));
        setConfigFilePermissions(p);
    }
    return p;
}
export function getPrimaryConfigFilePath() {
    const configYamlPath = getConfigYamlPath();
    if (fs.existsSync(configYamlPath)) {
        return configYamlPath;
    }
    return getConfigJsonPath();
}
export function getConfigTsPath() {
    const p = path.join(getContinueGlobalPath(), "config.ts");
    if (!fs.existsSync(p)) {
        fs.writeFileSync(p, DEFAULT_CONFIG_TS_CONTENTS);
    }
    const typesPath = path.join(getContinueGlobalPath(), "types");
    if (!fs.existsSync(typesPath)) {
        fs.mkdirSync(typesPath);
    }
    const corePath = path.join(typesPath, "core");
    if (!fs.existsSync(corePath)) {
        fs.mkdirSync(corePath);
    }
    const packageJsonPath = path.join(getContinueGlobalPath(), "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        fs.writeFileSync(packageJsonPath, JSON.stringify({
            name: "continue-config",
            version: "1.0.0",
            description: "My Continue Configuration",
            main: "config.js",
        }));
    }
    fs.writeFileSync(path.join(corePath, "index.d.ts"), Types);
    return p;
}
export function getConfigJsPath() {
    // Do not create automatically
    return path.join(getContinueGlobalPath(), "out", "config.js");
}
export function getTsConfigPath() {
    const tsConfigPath = path.join(getContinueGlobalPath(), "tsconfig.json");
    if (!fs.existsSync(tsConfigPath)) {
        fs.writeFileSync(tsConfigPath, JSON.stringify({
            compilerOptions: {
                target: "ESNext",
                useDefineForClassFields: true,
                lib: ["DOM", "DOM.Iterable", "ESNext"],
                allowJs: true,
                skipLibCheck: true,
                esModuleInterop: false,
                allowSyntheticDefaultImports: true,
                strict: true,
                forceConsistentCasingInFileNames: true,
                module: "System",
                moduleResolution: "Node",
                noEmit: false,
                noEmitOnError: false,
                outFile: "./out/config.js",
                typeRoots: ["./node_modules/@types", "./types"],
            },
            include: ["./config.ts"],
        }, null, 2));
    }
    return tsConfigPath;
}
export function getContinueRcPath() {
    // Disable indexing of the config folder to prevent infinite loops
    const continuercPath = path.join(getContinueGlobalPath(), ".continuerc.json");
    if (!fs.existsSync(continuercPath)) {
        fs.writeFileSync(continuercPath, JSON.stringify({
            disableIndexing: true,
        }, null, 2));
    }
    return continuercPath;
}
function getDevDataPath() {
    const sPath = path.join(getContinueGlobalPath(), "dev_data");
    if (!fs.existsSync(sPath)) {
        fs.mkdirSync(sPath);
    }
    return sPath;
}
export function getDevDataSqlitePath() {
    return path.join(getDevDataPath(), "devdata.sqlite");
}
export function getDevDataFilePath(eventName, schema) {
    const versionPath = path.join(getDevDataPath(), schema);
    if (!fs.existsSync(versionPath)) {
        fs.mkdirSync(versionPath);
    }
    return path.join(versionPath, `${String(eventName)}.jsonl`);
}
function editConfigJson(callback) {
    const config = fs.readFileSync(getConfigJsonPath(), "utf8");
    let configJson = JSONC.parse(config);
    // Check if it's an object
    if (typeof configJson === "object" && configJson !== null) {
        configJson = callback(configJson);
        fs.writeFileSync(getConfigJsonPath(), JSONC.stringify(configJson, null, 2));
    }
    else {
        console.warn("config.json is not a valid object");
    }
}
function editConfigYaml(callback) {
    const configPath = getConfigYamlPath();
    const config = fs.readFileSync(configPath, "utf8");
    let configYaml = YAML.parse(config);
    // Check if it's an object
    if (typeof configYaml === "object" && configYaml !== null) {
        configYaml = callback(configYaml);
        fs.writeFileSync(configPath, YAML.stringify(configYaml));
        setConfigFilePermissions(configPath);
    }
    else {
        console.warn("config.yaml is not a valid object");
    }
}
export function editConfigFile(configJsonCallback, configYamlCallback) {
    if (fs.existsSync(getConfigYamlPath())) {
        editConfigYaml(configYamlCallback);
    }
    else if (fs.existsSync(getConfigJsonPath())) {
        editConfigJson(configJsonCallback);
    }
}
function getMigrationsFolderPath() {
    const migrationsPath = path.join(getContinueGlobalPath(), ".migrations");
    if (!fs.existsSync(migrationsPath)) {
        fs.mkdirSync(migrationsPath);
    }
    return migrationsPath;
}
export async function migrate(id, callback, onAlreadyComplete) {
    if (process.env.NODE_ENV === "test") {
        return await Promise.resolve(callback());
    }
    const migrationsPath = getMigrationsFolderPath();
    const migrationPath = path.join(migrationsPath, id);
    if (!fs.existsSync(migrationPath)) {
        try {
            console.log(`Running migration: ${id}`);
            fs.writeFileSync(migrationPath, "");
            await Promise.resolve(callback());
        }
        catch (e) {
            console.warn(`Migration ${id} failed`, e);
        }
    }
    else if (onAlreadyComplete) {
        onAlreadyComplete();
    }
}
export function getIndexSqlitePath() {
    return path.join(getIndexFolderPath(), "index.sqlite");
}
export function getLanceDbPath() {
    return path.join(getIndexFolderPath(), "lancedb");
}
export function getTabAutocompleteCacheSqlitePath() {
    return path.join(getIndexFolderPath(), "autocompleteCache.sqlite");
}
export function getDocsSqlitePath() {
    return path.join(getIndexFolderPath(), "docs.sqlite");
}
export function getRemoteConfigsFolderPath() {
    const dir = path.join(getContinueGlobalPath(), ".configs");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return dir;
}
export function getPathToRemoteConfig(remoteConfigServerUrl) {
    let url = undefined;
    try {
        url =
            typeof remoteConfigServerUrl !== "string" || remoteConfigServerUrl === ""
                ? undefined
                : new URL(remoteConfigServerUrl);
    }
    catch (e) { }
    const dir = path.join(getRemoteConfigsFolderPath(), url?.hostname ?? "None");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return dir;
}
export function getConfigJsonPathForRemote(remoteConfigServerUrl) {
    return path.join(getPathToRemoteConfig(remoteConfigServerUrl), "config.json");
}
export function getConfigJsPathForRemote(remoteConfigServerUrl) {
    return path.join(getPathToRemoteConfig(remoteConfigServerUrl), "config.js");
}
export function getContinueDotEnv() {
    const filepath = path.join(getContinueGlobalPath(), ".env");
    if (fs.existsSync(filepath)) {
        return dotenv.parse(fs.readFileSync(filepath));
    }
    return {};
}
export function getLogsDirPath() {
    const logsPath = path.join(getContinueGlobalPath(), "logs");
    if (!fs.existsSync(logsPath)) {
        fs.mkdirSync(logsPath);
    }
    return logsPath;
}
export function getCoreLogsPath() {
    return path.join(getLogsDirPath(), "core.log");
}
export function getPromptLogsPath() {
    return path.join(getLogsDirPath(), "prompt.log");
}
export function getGlobalFolderWithName(name) {
    return path.join(getContinueGlobalPath(), name);
}
export function getGlobalPromptsPath() {
    return getGlobalFolderWithName("prompts");
}
export function readAllGlobalPromptFiles(folderPath = getGlobalPromptsPath()) {
    if (!fs.existsSync(folderPath)) {
        return [];
    }
    const files = fs.readdirSync(folderPath);
    const promptFiles = [];
    files.forEach((file) => {
        const filepath = path.join(folderPath, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            const nestedPromptFiles = readAllGlobalPromptFiles(filepath);
            promptFiles.push(...nestedPromptFiles);
        }
        else if (file.endsWith(".prompt")) {
            const content = fs.readFileSync(filepath, "utf8");
            promptFiles.push({ path: filepath, content });
        }
    });
    return promptFiles;
}
export function getRepoMapFilePath() {
    return path.join(getContinueUtilsPath(), "repo_map.txt");
}
export function getEsbuildBinaryPath() {
    return path.join(getContinueUtilsPath(), "esbuild");
}
export function migrateV1DevDataFiles() {
    const devDataPath = getDevDataPath();
    function moveToV1FolderIfExists(oldFileName, newFileName) {
        const oldFilePath = path.join(devDataPath, `${oldFileName}.jsonl`);
        if (fs.existsSync(oldFilePath)) {
            const newFilePath = getDevDataFilePath(newFileName, "0.1.0");
            if (!fs.existsSync(newFilePath)) {
                fs.copyFileSync(oldFilePath, newFilePath);
                fs.unlinkSync(oldFilePath);
            }
        }
    }
    moveToV1FolderIfExists("tokens_generated", "tokensGenerated");
    moveToV1FolderIfExists("chat", "chatFeedback");
    moveToV1FolderIfExists("quickEdit", "quickEdit");
    moveToV1FolderIfExists("autocomplete", "autocomplete");
}
export function getLocalEnvironmentDotFilePath() {
    return path.join(getContinueGlobalPath(), ".local");
}
export function getStagingEnvironmentDotFilePath() {
    return path.join(getContinueGlobalPath(), ".staging");
}
export function getDiffsDirectoryPath() {
    const diffsPath = path.join(getContinueGlobalPath(), ".diffs"); // .replace(/^C:/, "c:"); ??
    if (!fs.existsSync(diffsPath)) {
        fs.mkdirSync(diffsPath, {
            recursive: true,
        });
    }
    return diffsPath;
}
export const isFileWithinFolder = (fileUri, folderPath) => {
    try {
        if (!fileUri || !folderPath) {
            return false;
        }
        const fileUriParsed = URI.parse(fileUri);
        const fileScheme = fileUriParsed.scheme || "file";
        let filePath = fileUriParsed.path || "";
        filePath = decodeURIComponent(filePath);
        let folderWithScheme = folderPath;
        if (!folderPath.includes("://")) {
            folderWithScheme = `${fileScheme}://${folderPath.startsWith("/") ? "" : "/"}${folderPath}`;
        }
        const folderUriParsed = URI.parse(folderWithScheme);
        let folderPathClean = folderUriParsed.path || "";
        folderPathClean = decodeURIComponent(folderPathClean);
        filePath = filePath.replace(/\/$/, "");
        folderPathClean = folderPathClean.replace(/\/$/, "");
        return (filePath === folderPathClean || filePath.startsWith(`${folderPathClean}/`));
    }
    catch (error) {
        console.error("Error in isFileWithinFolder:", error);
        return false;
    }
};
