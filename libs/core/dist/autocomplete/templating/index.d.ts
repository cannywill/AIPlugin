import { CompletionOptions } from "../..";
import { HelperVars } from "../util/HelperVars";
import { ILLM } from "../../index.js";
import { SnippetPayload } from "../snippets";
export declare function renderPrompt({ snippetPayload, workspaceDirs, helper, }: {
    snippetPayload: SnippetPayload;
    workspaceDirs: string[];
    helper: HelperVars;
}): {
    prompt: string;
    prefix: string;
    suffix: string;
    completionOptions: Partial<CompletionOptions> | undefined;
};
export declare function renderPromptWithTokenLimit({ snippetPayload, workspaceDirs, helper, llm, }: {
    snippetPayload: SnippetPayload;
    workspaceDirs: string[];
    helper: HelperVars;
    llm: ILLM | undefined;
}): {
    prompt: string;
    prefix: string;
    suffix: string;
    completionOptions: Partial<CompletionOptions> | undefined;
};
//# sourceMappingURL=index.d.ts.map