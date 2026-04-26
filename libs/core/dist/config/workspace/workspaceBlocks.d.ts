import { BlockType } from "@continuedev/config-yaml";
import { IDE } from "../..";
export declare function getFileContent(blockType: BlockType): string;
export declare function findAvailableFilename(baseDirUri: string, blockType: BlockType, fileExists: (uri: string) => Promise<boolean>, extension?: string, isGlobal?: boolean, baseFilenameOverride?: string): Promise<string>;
export declare function createNewWorkspaceBlockFile(ide: IDE, blockType: BlockType, baseFilename?: string): Promise<void>;
export declare function createNewGlobalRuleFile(ide: IDE, baseFilename?: string): Promise<void>;
//# sourceMappingURL=workspaceBlocks.d.ts.map