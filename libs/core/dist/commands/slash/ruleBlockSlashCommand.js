export function convertRuleBlockToSlashCommand(rule) {
    return {
        name: rule.name ||
            (rule.rule.length > 20 ? rule.rule.substring(0, 20) + "..." : rule.rule),
        description: rule.description ?? "",
        prompt: rule.rule,
        source: "invokable-rule",
        sourceFile: rule.sourceFile,
        slug: rule.slug,
    };
}
