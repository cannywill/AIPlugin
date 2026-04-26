export class MessageIde {
    request;
    on;
    constructor(request, on) {
        this.request = request;
        this.on = on;
    }
    async readSecrets(keys) {
        return this.request("readSecrets", { keys });
    }
    async writeSecrets(secrets) {
        return this.request("writeSecrets", { secrets });
    }
    fileExists(fileUri) {
        return this.request("fileExists", { filepath: fileUri });
    }
    async gotoDefinition(location) {
        return this.request("gotoDefinition", { location });
    }
    async gotoTypeDefinition(location) {
        return this.request("gotoTypeDefinition", { location });
    }
    async getSignatureHelp(location) {
        return this.request("getSignatureHelp", { location });
    }
    async getReferences(location) {
        return this.request("getReferences", { location });
    }
    async getDocumentSymbols(textDocumentIdentifier) {
        return this.request("getDocumentSymbols", { textDocumentIdentifier });
    }
    onDidChangeActiveTextEditor(callback) {
        this.on("didChangeActiveTextEditor", (data) => callback(data.filepath));
    }
    getIdeSettings() {
        return this.request("getIdeSettings", undefined);
    }
    getFileStats(files) {
        return this.request("getFileStats", { files });
    }
    getGitRootPath(dir) {
        return this.request("getGitRootPath", { dir });
    }
    listDir(dir) {
        return this.request("listDir", { dir });
    }
    showToast = (...params) => {
        return this.request("showToast", params);
    };
    getRepoName(dir) {
        return this.request("getRepoName", { dir });
    }
    getDebugLocals(threadIndex) {
        return this.request("getDebugLocals", { threadIndex });
    }
    getTopLevelCallStackSources(threadIndex, stackDepth) {
        return this.request("getTopLevelCallStackSources", {
            threadIndex,
            stackDepth,
        });
    }
    getAvailableThreads() {
        return this.request("getAvailableThreads", undefined);
    }
    getTags(artifactId) {
        return this.request("getTags", artifactId);
    }
    getIdeInfo() {
        return this.request("getIdeInfo", undefined);
    }
    readRangeInFile(filepath, range) {
        return this.request("readRangeInFile", { filepath, range });
    }
    isTelemetryEnabled() {
        return this.request("isTelemetryEnabled", undefined);
    }
    isWorkspaceRemote() {
        return this.request("isWorkspaceRemote", undefined);
    }
    getUniqueId() {
        return this.request("getUniqueId", undefined);
    }
    async getDiff(includeUnstaged) {
        return await this.request("getDiff", { includeUnstaged });
    }
    async getClipboardContent() {
        return {
            text: "",
            copiedAt: new Date().toISOString(),
        };
    }
    async getTerminalContents() {
        return await this.request("getTerminalContents", undefined);
    }
    async getWorkspaceDirs() {
        return await this.request("getWorkspaceDirs", undefined);
    }
    async showLines(fileUri, startLine, endLine) {
        return await this.request("showLines", {
            filepath: fileUri,
            startLine,
            endLine,
        });
    }
    async writeFile(fileUri, contents) {
        await this.request("writeFile", { path: fileUri, contents });
    }
    async removeFile(fileUri) {
        await this.request("removeFile", { path: fileUri });
    }
    async showVirtualFile(title, contents) {
        await this.request("showVirtualFile", { name: title, content: contents });
    }
    async openFile(fileUri) {
        await this.request("openFile", { path: fileUri });
    }
    async openUrl(url) {
        await this.request("openUrl", url);
    }
    async runCommand(command, options) {
        await this.request("runCommand", { command, options });
    }
    async saveFile(fileUri) {
        await this.request("saveFile", { filepath: fileUri });
    }
    async readFile(fileUri) {
        return await this.request("readFile", { filepath: fileUri });
    }
    getOpenFiles() {
        return this.request("getOpenFiles", undefined);
    }
    getCurrentFile() {
        return this.request("getCurrentFile", undefined);
    }
    getPinnedFiles() {
        return this.request("getPinnedFiles", undefined);
    }
    getSearchResults(query, maxResults) {
        return this.request("getSearchResults", { query, maxResults });
    }
    getFileResults(pattern) {
        return this.request("getFileResults", { pattern });
    }
    getProblems(fileUri) {
        return this.request("getProblems", { filepath: fileUri });
    }
    subprocess(command, cwd) {
        return this.request("subprocess", { command, cwd });
    }
    async getBranch(dir) {
        return this.request("getBranch", { dir });
    }
}
