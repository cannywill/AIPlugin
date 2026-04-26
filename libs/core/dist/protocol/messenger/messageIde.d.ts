import { FromIdeProtocol } from "..";
import { ToIdeFromWebviewOrCoreProtocol } from "../ide";
import type { DocumentSymbol, FileStatsMap, FileType, IDE, IdeInfo, IdeSettings, IndexTag, Location, Problem, Range, RangeInFile, SignatureHelp, TerminalOptions, Thread } from "../..";
export declare class MessageIde implements IDE {
    private readonly request;
    private readonly on;
    constructor(request: <T extends keyof ToIdeFromWebviewOrCoreProtocol>(messageType: T, data: ToIdeFromWebviewOrCoreProtocol[T][0]) => Promise<ToIdeFromWebviewOrCoreProtocol[T][1]>, on: <T extends keyof FromIdeProtocol>(messageType: T, callback: (data: FromIdeProtocol[T][0]) => FromIdeProtocol[T][1]) => void);
    readSecrets(keys: string[]): Promise<Record<string, string>>;
    writeSecrets(secrets: {
        [key: string]: string;
    }): Promise<void>;
    fileExists(fileUri: string): Promise<boolean>;
    gotoDefinition(location: Location): Promise<RangeInFile[]>;
    gotoTypeDefinition(location: Location): Promise<RangeInFile[]>;
    getSignatureHelp(location: Location): Promise<SignatureHelp | null>;
    getReferences(location: Location): Promise<RangeInFile[]>;
    getDocumentSymbols(textDocumentIdentifier: string): Promise<DocumentSymbol[]>;
    onDidChangeActiveTextEditor(callback: (fileUri: string) => void): void;
    getIdeSettings(): Promise<IdeSettings>;
    getFileStats(files: string[]): Promise<FileStatsMap>;
    getGitRootPath(dir: string): Promise<string | undefined>;
    listDir(dir: string): Promise<[string, FileType][]>;
    showToast: IDE["showToast"];
    getRepoName(dir: string): Promise<string | undefined>;
    getDebugLocals(threadIndex: number): Promise<string>;
    getTopLevelCallStackSources(threadIndex: number, stackDepth: number): Promise<string[]>;
    getAvailableThreads(): Promise<Thread[]>;
    getTags(artifactId: string): Promise<IndexTag[]>;
    getIdeInfo(): Promise<IdeInfo>;
    readRangeInFile(filepath: string, range: Range): Promise<string>;
    isTelemetryEnabled(): Promise<boolean>;
    isWorkspaceRemote(): Promise<boolean>;
    getUniqueId(): Promise<string>;
    getDiff(includeUnstaged: boolean): Promise<string[]>;
    getClipboardContent(): Promise<{
        text: string;
        copiedAt: string;
    }>;
    getTerminalContents(): Promise<string>;
    getWorkspaceDirs(): Promise<string[]>;
    showLines(fileUri: string, startLine: number, endLine: number): Promise<void>;
    writeFile(fileUri: string, contents: string): Promise<void>;
    removeFile(fileUri: string): Promise<void>;
    showVirtualFile(title: string, contents: string): Promise<void>;
    openFile(fileUri: string): Promise<void>;
    openUrl(url: string): Promise<void>;
    runCommand(command: string, options?: TerminalOptions): Promise<void>;
    saveFile(fileUri: string): Promise<void>;
    readFile(fileUri: string): Promise<string>;
    getOpenFiles(): Promise<string[]>;
    getCurrentFile(): Promise<{
        isUntitled: boolean;
        path: string;
        contents: string;
    } | undefined>;
    getPinnedFiles(): Promise<string[]>;
    getSearchResults(query: string, maxResults?: number): Promise<string>;
    getFileResults(pattern: string): Promise<string[]>;
    getProblems(fileUri: string): Promise<Problem[]>;
    subprocess(command: string, cwd?: string): Promise<[string, string]>;
    getBranch(dir: string): Promise<string>;
}
//# sourceMappingURL=messageIde.d.ts.map