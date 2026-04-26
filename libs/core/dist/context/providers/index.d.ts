import { BaseContextProvider } from "../";
import { ContextProviderName } from "../../";
/**
 * Note: We are currently omitting the following providers due to bugs:
 * - `CodeOutlineContextProvider`
 * - `CodeHighlightsContextProvider`
 *
 * See this issue for details: https://github.com/continuedev/continue/issues/1365
 */
export declare const Providers: (typeof BaseContextProvider)[];
export declare function contextProviderClassFromName(name: ContextProviderName): typeof BaseContextProvider | undefined;
//# sourceMappingURL=index.d.ts.map