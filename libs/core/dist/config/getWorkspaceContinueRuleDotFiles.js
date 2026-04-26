import { joinPathsToUri } from "../util/uri";
export const SYSTEM_PROMPT_DOT_FILE = ".continuerules";
export async function getWorkspaceContinueRuleDotFiles(ide) {
    const dirs = await ide.getWorkspaceDirs();
    const errors = [];
    const rules = [];
    for (const dir of dirs) {
        try {
            const dotFile = joinPathsToUri(dir, SYSTEM_PROMPT_DOT_FILE);
            const exists = await ide.fileExists(dotFile);
            if (exists) {
                const content = await ide.readFile(dotFile);
                rules.push({
                    rule: content,
                    sourceFile: dotFile,
                    source: ".continuerules",
                });
            }
        }
        catch (e) {
            errors.push({
                fatal: false,
                message: `Failed to load system prompt dot file from workspace ${dir}: ${e instanceof Error ? e.message : e}`,
            });
        }
    }
    return { rules, errors };
}
