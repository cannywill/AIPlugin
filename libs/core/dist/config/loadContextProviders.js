import { contextProviderClassFromName } from "../context/providers";
import CurrentFileContextProvider from "../context/providers/CurrentFileContextProvider";
import DiffContextProvider from "../context/providers/DiffContextProvider";
import DocsContextProvider from "../context/providers/DocsContextProvider";
import FileContextProvider from "../context/providers/FileContextProvider";
import ProblemsContextProvider from "../context/providers/ProblemsContextProvider";
import RulesContextProvider from "../context/providers/RulesContextProvider";
import TerminalContextProvider from "../context/providers/TerminalContextProvider";
/*
    Loads context providers based on configuration
    - default providers will always be loaded, using config params if present
    - other providers will be loaded if configured

    NOTE the MCPContextProvider is added in doLoadConfig if any resources are present
*/
/**
 * 功能：根据配置与默认列表生成上下文提供者集合。
 * 入参：configContext 为配置项，hasDocs 表示是否启用 docs，ideType 为当前 IDE 类型。
 * 返回：提供者列表与配置错误集合。
 */
export function loadConfigContextProviders(configContext, hasDocs, _ideType) {
    const providers = [];
    const errors = [];
    const defaultProviders = [
        new FileContextProvider({}),
        new CurrentFileContextProvider({}),
        new DiffContextProvider({}),
        new TerminalContextProvider({}),
        new ProblemsContextProvider({}),
        new RulesContextProvider({}),
    ];
    // Add from config
    if (configContext) {
        for (const config of configContext) {
            const cls = contextProviderClassFromName(config.provider);
            if (!cls &&
                !defaultProviders.find((p) => p.description.title === config.provider)) {
                errors.push({
                    fatal: false,
                    message: `Unknown context provider ${config.provider}`,
                });
                continue;
            }
            providers.push(new cls({
                name: config.name,
                ...config.params,
            }));
        }
    }
    // Add from defaults if not found in config
    for (const defaultProvider of defaultProviders) {
        if (!providers.find((p) => p.description.title === defaultProvider.description.title)) {
            providers.push(defaultProvider);
        }
    }
    if (hasDocs && !providers?.some((cp) => cp.description.title === "docs")) {
        providers.push(new DocsContextProvider({}));
    }
    return {
        providers,
        errors,
    };
}
