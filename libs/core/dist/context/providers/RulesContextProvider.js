import { BaseContextProvider } from "..";
import { getControlPlaneEnv } from "../../control-plane/env";
class RulesContextProvider extends BaseContextProvider {
    static description = {
        title: "rules",
        displayTitle: "Rules",
        description: "Mention rules files",
        type: "submenu",
        renderInlineAs: "",
    };
    // This is only used within this class. Worst case if there are exact duplicates is that one always calls the other, but this is an extreme edge case
    // Can eventually pull in more metadata, but this is experimental
    getIdFromRule(rule) {
        return rule.slug ?? rule.sourceFile ?? rule.name ?? rule.rule;
    }
    getNameFromRule(rule) {
        return rule.name ?? rule.slug ?? rule.sourceFile ?? rule.source;
    }
    getDescriptionFromRule(rule) {
        return rule.description ?? rule.name ?? "";
    }
    getUriFromRule(rule, appUrl) {
        if (rule.sourceFile) {
            return {
                type: "file",
                value: rule.sourceFile,
            };
        }
        if (rule.slug) {
            let url = `${appUrl}${rule.slug}`;
            return {
                type: "url",
                value: url,
            };
        }
        return undefined;
    }
    async getContextItems(query, extras) {
        const rule = extras.config.rules.find((rule) => this.getIdFromRule(rule) === query);
        if (!rule) {
            return [];
        }
        const env = await getControlPlaneEnv(extras.ide.getIdeSettings());
        return [
            {
                name: this.getNameFromRule(rule),
                content: rule.rule,
                description: this.getDescriptionFromRule(rule),
                uri: this.getUriFromRule(rule, env.APP_URL),
            },
        ];
    }
    async loadSubmenuItems(args) {
        return args.config.rules.map((rule) => ({
            id: this.getIdFromRule(rule),
            description: this.getDescriptionFromRule(rule),
            title: this.getNameFromRule(rule),
        }));
    }
}
export default RulesContextProvider;
