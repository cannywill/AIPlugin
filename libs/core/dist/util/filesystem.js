/**
 * 文件类型：工具实现
 * 文件作用：提供默认 IDE 文件系统适配实现。
 * 主要职责：在没有宿主 IDE 的场景下提供基础文件能力与 IDE 信息。
 */
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
class FileSystemIde {
    workspaceDir;
    constructor(workspaceDir) {
        this.workspaceDir = workspaceDir;
    }
    async readSecrets(keys) {
        return {};
    }
    async writeSecrets(secrets) { }
    showToast(type, message, ...otherParams) {
        return Promise.resolve();
    }
    fileExists(fileUri) {
        const filepath = fileURLToPath(fileUri);
        return Promise.resolve(fs.existsSync(filepath));
    }
    gotoDefinition(location) {
        return Promise.resolve([]);
    }
    gotoTypeDefinition(location) {
        return Promise.resolve([]);
    }
    getSignatureHelp(location) {
        return Promise.resolve(null);
    }
    getReferences(location) {
        return Promise.resolve([]);
    }
    getDocumentSymbols(fileUri) {
        return Promise.resolve([]);
    }
    onDidChangeActiveTextEditor(callback) {
        return;
    }
    isWorkspaceRemote() {
        return Promise.resolve(false);
    }
    async getIdeSettings() {
        return {
            remoteConfigServerUrl: undefined,
            remoteConfigSyncPeriod: 60,
            userToken: "",
            continueTestEnvironment: "none",
            pauseCodebaseIndexOnStart: false,
        };
    }
    async getFileStats(fileUris) {
        const result = {};
        for (const uri of fileUris) {
            try {
                const filepath = fileURLToPath(uri);
                const stats = fs.statSync(filepath);
                result[uri] = {
                    lastModified: stats.mtimeMs,
                    size: stats.size,
                };
            }
            catch (error) {
                console.error(`Error getting last modified time for ${uri}:`, error);
            }
        }
        return result;
    }
    getGitRootPath(dir) {
        return Promise.resolve(dir);
    }
    async listDir(dir) {
        const filepath = fileURLToPath(dir);
        const all = fs
            .readdirSync(filepath, { withFileTypes: true })
            .map((dirent) => [
            dirent.name,
            dirent.isDirectory()
                ? 2
                : dirent.isSymbolicLink()
                    ? 64
                    : 1,
        ]);
        return Promise.resolve(all);
    }
    getRepoName(dir) {
        return Promise.resolve(undefined);
    }
    async getTags(artifactId) {
        const directory = (await this.getWorkspaceDirs())[0];
        return [
            {
                artifactId,
                branch: await this.getBranch(directory),
                directory,
            },
        ];
    }
    /**
     * 功能：返回 Flutter 专用的 IDE 识别信息。
     * 返回：固定的 Flutter IDE 描述信息。
     */
    getIdeInfo() {
        return Promise.resolve({
            ideType: "flutter",
            name: "Flutter",
            version: "1.0",
            remoteName: "na",
            extensionVersion: "flutter",
            isPrerelease: false,
        });
    }
    readRangeInFile(fileUri, range) {
        return Promise.resolve("");
    }
    isTelemetryEnabled() {
        return Promise.resolve(true);
    }
    getUniqueId() {
        return Promise.resolve("NOT_UNIQUE");
    }
    getDiff(includeUnstaged) {
        return Promise.resolve([]);
    }
    getClipboardContent() {
        return Promise.resolve({ text: "", copiedAt: new Date().toISOString() });
    }
    getTerminalContents() {
        return Promise.resolve("");
    }
    async getDebugLocals(threadIndex) {
        return Promise.resolve("");
    }
    async getTopLevelCallStackSources(threadIndex, stackDepth) {
        return Promise.resolve([]);
    }
    async getAvailableThreads() {
        return Promise.resolve([]);
    }
    showLines(fileUri, startLine, endLine) {
        return Promise.resolve();
    }
    getWorkspaceDirs() {
        return Promise.resolve([this.workspaceDir]);
    }
    writeFile(fileUri, contents) {
        const filepath = fileURLToPath(fileUri);
        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, contents, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
    removeFile(fileUri) {
        const filepath = fileURLToPath(fileUri);
        return new Promise((resolve, reject) => {
            fs.unlink(filepath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
    showVirtualFile(title, contents) {
        return Promise.resolve();
    }
    openFile(path) {
        return Promise.resolve();
    }
    openUrl(url) {
        return Promise.resolve();
    }
    runCommand(command, options) {
        return Promise.resolve();
    }
    saveFile(fileUri) {
        return Promise.resolve();
    }
    readFile(fileUri) {
        const filepath = fileURLToPath(fileUri);
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, "utf8", (err, contents) => {
                if (err) {
                    reject(err);
                }
                resolve(contents);
            });
        });
    }
    getCurrentFile() {
        return Promise.resolve(undefined);
    }
    getBranch(dir) {
        return Promise.resolve("");
    }
    getOpenFiles() {
        return Promise.resolve([]);
    }
    getPinnedFiles() {
        return Promise.resolve([]);
    }
    async getSearchResults(query, maxResults) {
        return "";
    }
    async getFileResults(pattern, maxResults) {
        return [];
    }
    async getProblems(fileUri) {
        return Promise.resolve([]);
    }
    async subprocess(command, cwd) {
        return ["", ""];
    }
}
export default FileSystemIde;
