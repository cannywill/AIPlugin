import Parser from "web-tree-sitter";
export interface TypeDeclarationResult {
    name: string;
    fullText: string;
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
    kind: string;
}
export declare function findEnclosingTypeDeclaration(sourceCode: string, cursorLine: number, cursorColumn: number, ast: Parser.Tree): TypeDeclarationResult | null;
export declare function extractTopLevelDecls(currentFile: string, givenParser?: Parser): Promise<Parser.QueryMatch[]>;
export declare function extractTopLevelDeclsWithFormatting(currentFile: string, givenParser?: Parser): Promise<{
    declaration: string;
    nodeType: string;
    name: string;
    declaredType: string;
    returnType?: string;
}[]>;
export declare function extractFunctionTypeFromDecl(match: Parser.QueryMatch): string;
export declare function unwrapToBaseType(node: Parser.SyntaxNode): Parser.SyntaxNode;
//# sourceMappingURL=tree-sitter-utils.d.ts.map