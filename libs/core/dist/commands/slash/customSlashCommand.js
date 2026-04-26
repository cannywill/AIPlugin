export function convertCustomCommandToSlashCommand(customCommand) {
    const commandName = customCommand.name.startsWith("/")
        ? customCommand.name.substring(1)
        : customCommand.name;
    return {
        name: commandName,
        description: customCommand.description ?? "",
        prompt: customCommand.prompt,
        source: "json-custom-command",
        sourceFile: customCommand.sourceFile,
    };
}
