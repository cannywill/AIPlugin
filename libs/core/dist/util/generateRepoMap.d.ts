import { IDE, ILLM } from "..";
export interface RepoMapOptions {
    includeSignatures?: boolean;
    dirUris?: string[];
    outputRelativeUriPaths: boolean;
}
export default function generateRepoMap(llm: ILLM, ide: IDE, options: RepoMapOptions): Promise<string>;
//# sourceMappingURL=generateRepoMap.d.ts.map