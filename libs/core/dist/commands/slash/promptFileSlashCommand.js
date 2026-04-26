import { parsePromptFile } from "../../promptFiles/parsePromptFile";
export function slashCommandFromPromptFile(path, content) {
    const { name, description, systemMessage, prompt, version } = parsePromptFile(path, content);
    return {
        name,
        description,
        prompt,
        source: version === 1 ? "prompt-file-v1" : "prompt-file-v2",
        sourceFile: path,
        overrideSystemMessage: systemMessage,
    };
}
