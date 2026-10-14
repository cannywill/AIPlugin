import { DocumentSymbol, FileStatsMap, FileType, IDE, IdeInfo, IdeSettings, IndexTag, Location, Problem, Range, RangeInFile, SignatureHelp, TerminalOptions, Thread, ToastType } from "../index.js";
declare class FileSystemIde implements IDE {
    private readonly workspaceDir;
    constructor(workspaceDir: string);
    readSecrets(keys: string[]): Promise<Record<string, string>>;
    writeSecrets(secrets: {
        [key: string]: string;
    }): Promise<void>;
    showToast(type: ToastType, message: string, ...otherParams: any[]): Promise<void>;
    fileExists(fileUri: string): Promise<boolean>;
    gotoDefinition(location: Location): Promise<RangeInFile[]>;
    gotoTypeDefinition(location: Location): Promise<RangeInFile[]>;
    getSignatureHelp(location: Location): Promise<SignatureHelp | null>;
    getReferences(location: Location): Promise<RangeInFile[]>;
    getDocumentSymbols(fileUri: string): Promise<DocumentSymbol[]>;
    onDidChangeActiveTextEditor(callback: (fileUri: string) => void): void;
    isWorkspaceRemote(): Promise<boolean>;
    getIdeSettings(): Promise<IdeSettings>;
    getFileStats(fileUris: string[]): Promise<FileStatsMap>;
    getGitRootPath(dir: string): Promise<string | undefined>;
    listDir(dir: string): Promise<[string, FileType][]>;
    getRepoName(dir: string): Promise<string | undefined>;
    getTags(artifactId: string): Promise<IndexTag[]>;
    /**
     * 功能：返回 Flutter 专用的 IDE 识别信息。
     * 返回：固定的 Flutter IDE 描述信息。
     */
    getIdeInfo(): Promise<IdeInfo>;
    readRangeInFile(fileUri: string, range: Range): Promise<string>;
    isTelemetryEnabled(): Promise<boolean>;
    getUniqueId(): Promise<string>;
    getDiff(includeUnstaged: boolean): Promise<string[]>;
    getClipboardContent(): Promise<{
        text: string;
        copiedAt: string;
    }>;
    getTerminalContents(): Promise<string>;
    getDebugLocals(threadIndex: number): Promise<string>;
    getTopLevelCallStackSources(threadIndex: number, stackDepth: number): Promise<string[]>;
    getAvailableThreads(): Promise<Thread[]>;
    showLines(fileUri: string, startLine: number, endLine: number): Promise<void>;
    getWorkspaceDirs(): Promise<string[]>;
    writeFile(fileUri: string, contents: string): Promise<void>;
    removeFile(fileUri: string): Promise<void>;
    showVirtualFile(title: string, contents: string): Promise<void>;
    openFile(path: string): Promise<void>;
    openUrl(url: string): Promise<void>;
    runCommand(command: string, options?: TerminalOptions): Promise<void>;
    saveFile(fileUri: string): Promise<void>;
    readFile(fileUri: string): Promise<string>;
    getCurrentFile(): Promise<undefined>;
    getBranch(dir: string): Promise<string>;
    getOpenFiles(): Promise<string[]>;
    getPinnedFiles(): Promise<string[]>;
    getSearchResults(query: string, maxResults?: number): Promise<string>;
    getFileResults(pattern: string, maxResults?: number): Promise<string[]>;
    getProblems(fileUri?: string | undefined): Promise<Problem[]>;
    subprocess(command: string, cwd?: string): Promise<[string, string]>;
}
export default FileSystemIde;
//# sourceMappingURL=filesystem.d.ts.map