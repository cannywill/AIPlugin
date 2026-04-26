import { IDE } from "..";
export declare function isContinueConfigRelatedUri(uri: string): boolean;
export declare function isContinueAgentConfigFile(uri: string): boolean;
export declare function isColocatedRulesFile(uri: string): boolean;
export interface LoadAssistantFilesOptions {
    includeGlobal: boolean;
    includeWorkspace: boolean;
    fileExtType?: "yaml" | "markdown";
}
export declare function getDotContinueSubDirs(ide: IDE, options: LoadAssistantFilesOptions, workspaceDirs: string[], subDirName: string): string[];
/**
 * This method searches in both ~/.continue and workspace .continue
 * for all YAML/Markdown files in the specified subdirectory, for example .continue/assistants or .continue/prompts
 */
export declare function getAllDotContinueDefinitionFiles(ide: IDE, options: LoadAssistantFilesOptions, subDirName: string): Promise<{
    path: string;
    content: string;
}[]>;
//# sourceMappingURL=loadLocalAssistants.d.ts.map