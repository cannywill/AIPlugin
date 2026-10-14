import ignore from "ignore";
/**
 * 文件类型：索引忽略配置
 * 文件作用：定义默认索引时忽略的目录与文件类型。
 * 主要职责：避免索引无关或敏感目录，聚焦 Flutter 运行所需内容。
 */
export declare const DEFAULT_SECURITY_IGNORE_FILETYPES: string[];
export declare const DEFAULT_SECURITY_IGNORE_DIRS: string[];
export declare const ADDITIONAL_INDEXING_IGNORE_FILETYPES: string[];
export declare const ADDITIONAL_INDEXING_IGNORE_DIRS: string[];
export declare const DEFAULT_IGNORE_FILETYPES: string[];
export declare const DEFAULT_IGNORE_DIRS: string[];
export declare const DEFAULT_IGNORES: string[];
export declare const defaultIgnoresGlob: string;
export declare const defaultSecurityIgnoreFile: ignore.Ignore;
export declare const defaultSecurityIgnoreDir: ignore.Ignore;
export declare const defaultIgnoreFile: ignore.Ignore;
export declare const defaultIgnoreDir: ignore.Ignore;
export declare const DEFAULT_SECURITY_IGNORE: string;
export declare const DEFAULT_IGNORE: string;
export declare const defaultFileAndFolderSecurityIgnores: ignore.Ignore;
export declare const defaultIgnoreFileAndDir: ignore.Ignore;
export declare function isSecurityConcern(filePathOrUri: string): boolean;
export declare function throwIfFileIsSecurityConcern(filepath: string): void;
export declare function gitIgArrayFromFile(file: string): string[];
//# sourceMappingURL=ignore.d.ts.map