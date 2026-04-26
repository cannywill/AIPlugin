export function convertPromptBlockToSlashCommand(prompt) {
    return {
        name: prompt.name,
        description: prompt.description ?? "",
        prompt: prompt.prompt,
        source: "yaml-prompt-block",
        sourceFile: prompt.sourceFile,
    };
}
