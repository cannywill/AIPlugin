import Parser from "web-tree-sitter";
import { RangeInFileWithContents } from "../../";
export type AstPath = Parser.SyntaxNode[];
export declare function getAst(filepath: string, fileContents: string): Promise<Parser.Tree | undefined>;
export declare function getTreePathAtCursor(ast: Parser.Tree, cursorIndex: number): Promise<AstPath>;
export declare function getScopeAroundRange(range: RangeInFileWithContents): Promise<RangeInFileWithContents | undefined>;
//# sourceMappingURL=ast.d.ts.map