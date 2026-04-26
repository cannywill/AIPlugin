import Parser, { Language } from "web-tree-sitter";
import { FileSymbolMap, IDE, SymbolWithRange } from "..";
export declare enum LanguageName {
    CPP = "cpp",
    C_SHARP = "c_sharp",
    C = "c",
    CSS = "css",
    PHP = "php",
    BASH = "bash",
    JSON = "json",
    TYPESCRIPT = "typescript",
    TSX = "tsx",
    ELM = "elm",
    JAVASCRIPT = "javascript",
    PYTHON = "python",
    ELISP = "elisp",
    ELIXIR = "elixir",
    GO = "go",
    EMBEDDED_TEMPLATE = "embedded_template",
    HTML = "html",
    JAVA = "java",
    LUA = "lua",
    OCAML = "ocaml",
    QL = "ql",
    RESCRIPT = "rescript",
    RUBY = "ruby",
    RUST = "rust",
    SYSTEMRDL = "systemrdl",
    TOML = "toml",
    SOLIDITY = "solidity"
}
export declare const supportedLanguages: {
    [key: string]: LanguageName;
};
export declare const IGNORE_PATH_PATTERNS: Partial<Record<LanguageName, RegExp[]>>;
export declare function getParserForFile(filepath: string): Promise<Parser | undefined>;
export declare function getLanguageForFile(filepath: string): Promise<Language | undefined>;
export declare const getFullLanguageName: (filepath: string) => LanguageName;
export declare function getQueryForFile(filepath: string, queryPath: string): Promise<Parser.Query | undefined>;
export declare function getSymbolsForFile(filepath: string, contents: string): Promise<SymbolWithRange[] | undefined>;
export declare function getSymbolsForManyFiles(uris: string[], ide: IDE): Promise<FileSymbolMap>;
//# sourceMappingURL=treeSitter.d.ts.map