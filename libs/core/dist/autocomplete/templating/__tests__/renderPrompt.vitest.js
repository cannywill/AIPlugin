import { afterEach, describe, expect, it, vi } from "vitest";
// ---------- Module mocks ----------
// Simple Handlebars mock that does naive placeholder substitution
vi.mock("handlebars", () => {
    return {
        default: {
            compile: (template) => (ctx) => {
                return template
                    .replace(/{{prefix}}/g, ctx.prefix)
                    .replace(/{{suffix}}/g, ctx.suffix)
                    .replace(/{{filename}}/g, ctx.filename ?? "")
                    .replace(/{{reponame}}/g, ctx.reponame ?? "")
                    .replace(/{{language}}/g, ctx.language ?? "");
            },
        },
    };
});
// Token utilities – we map 1 char = 1 token for simplicity
vi.mock("../../../llm/countTokens", () => {
    const countTokens = (str) => str.length;
    const pruneLinesFromTop = (str, allowed) => str.slice(Math.max(0, str.length - allowed));
    const pruneLinesFromBottom = (str, allowed) => str.slice(0, allowed);
    const getTokenCountingBufferSafety = () => 0;
    return {
        countTokens,
        pruneLinesFromTop,
        pruneLinesFromBottom,
        getTokenCountingBufferSafety,
    };
});
// Snippet selection – configurable via constant return value
vi.mock("../filtering", () => ({
    getSnippets: () => [],
}));
// Snippet formatting
const FORMATTED_SNIPPETS = "[FORMATTED_SNIPPETS]";
vi.mock("../formatting", () => ({
    formatSnippets: () => FORMATTED_SNIPPETS,
}));
// Stop tokens helper – we expose a variable so each test can override it
let stopTokenReturn = ["<STOP>"];
vi.mock("../getStopTokens", () => ({
    getStopTokens: () => stopTokenReturn,
}));
// AutocompleteTemplate – provide overridable template + compiler + completionOptions
let templateOverride = "{{prefix}}|{{suffix}}";
let compileFnOverride;
let completionOptionsOverride;
vi.mock("../AutocompleteTemplate", () => ({
    getTemplateForModel: () => ({
        template: templateOverride,
        compilePrefixSuffix: compileFnOverride,
        completionOptions: completionOptionsOverride ?? {},
    }),
}));
// ---------- Imports after mocks ----------
import { renderPrompt, renderPromptWithTokenLimit } from "..";
// ---------- Helper builders ----------
const tsLang = {
    name: "TypeScript",
    topLevelKeywords: [],
    singleLineComment: "//",
    endOfLine: [";"],
};
const emptySnippetPayload = {
    rootPathSnippets: [],
    importDefinitionSnippets: [],
    ideSnippets: [],
    recentlyEditedRangeSnippets: [],
    recentlyVisitedRangesSnippets: [],
    diffSnippets: [],
    clipboardSnippets: [],
    recentlyOpenedFileSnippets: [],
    staticSnippet: [],
};
function makeHelper(overrides = {}) {
    return {
        input: {
            filepath: "file:///test.ts",
            pos: { line: 0, character: 0 },
            recentlyEditedRanges: [],
            recentlyVisitedRanges: [],
            ...overrides.input,
        },
        prunedPrefix: "PRUNED_PREFIX",
        prunedSuffix: "PRUNED_SUFFIX",
        lang: tsLang,
        modelName: "test-model",
        filepath: "file:///test.ts",
        workspaceUris: [],
        options: {
            // Default template can be overridden per test
            template: "{{prefix}}|{{suffix}}",
            maxPromptTokens: 2048,
            prefixPercentage: 0.5,
            maxSuffixPercentage: 0.5,
            experimental_includeClipboard: false,
            useRecentlyOpened: false,
            experimental_includeRecentlyVisitedRanges: false,
            experimental_includeRecentlyEditedRanges: false,
            experimental_includeDiff: false,
            onlyMyCode: false,
            ...overrides.options,
        },
        ...overrides,
    };
}
afterEach(() => {
    // reset overridable mocks
    templateOverride = "{{prefix}}|{{suffix}}";
    compileFnOverride = undefined;
    completionOptionsOverride = undefined;
    stopTokenReturn = ["<STOP>"];
    vi.restoreAllMocks();
});
// ---------- Test suite ----------
describe("renderPrompt prefix/suffix selection", () => {
    it("uses manuallyPassPrefix when provided", () => {
        const helper = makeHelper({
            input: { manuallyPassPrefix: "MANUAL" },
        });
        const { prefix, suffix } = renderPrompt({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
        });
        expect(suffix).toBe("\n");
        expect(prefix.endsWith("MANUAL")).toBe(true);
    });
    it("falls back to prunedPrefix when no manual prefix", () => {
        const helper = makeHelper({});
        const { prefix } = renderPrompt({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
        });
        expect(prefix.includes("PRUNED_PREFIX")).toBe(true);
    });
});
describe("template rendering paths", () => {
    it("handles function template", () => {
        templateOverride = (p, s, _filepath, _reponame) => `FUNC:${p}|${s}`;
        const helper = makeHelper({ options: { template: undefined } });
        const { prompt } = renderPrompt({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
        });
        expect(prompt.startsWith("FUNC:")).toBe(true);
        expect(prompt.includes("PRUNED_PREFIX")).toBe(true);
    });
});
describe("compilePrefixSuffix vs snippet formatting", () => {
    it("applies compilePrefixSuffix when provided", () => {
        compileFnOverride = (p, s) => [`COMP_${p}`, `COMP_${s}`];
        templateOverride = "{{prefix}}|{{suffix}}";
        const helper = makeHelper({ options: { template: undefined } });
        const { prefix: compiledPrefix } = renderPrompt({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
        });
        expect(compiledPrefix.startsWith("COMP_PRUNED_PREFIX")).toBe(true);
    });
    it("prepends formatted snippets when no compiler present", () => {
        const helper = makeHelper({});
        const { prefix: compiledPrefix } = renderPrompt({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
        });
        expect(compiledPrefix.startsWith(`${FORMATTED_SNIPPETS}\n`)).toBe(true);
    });
});
describe("renderPromptWithTokenLimit parity & pruning", () => {
    it("matches renderPrompt when llm is undefined", () => {
        const helper = makeHelper({});
        const res1 = renderPrompt({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
        });
        const res2 = renderPromptWithTokenLimit({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
            llm: undefined,
        });
        expect(res2).toEqual(res1);
    });
    it("prunes prefix/suffix to respect small context length", () => {
        const longPrefix = "A".repeat(300);
        const helper = makeHelper({ prunedPrefix: longPrefix });
        const llmStub = {
            contextLength: 120,
            completionOptions: { maxTokens: 10 },
            model: "test-model",
        };
        const { prefix: compiledPrefix } = renderPromptWithTokenLimit({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
            llm: llmStub,
        });
        expect(compiledPrefix.length).toBeLessThan(120);
    });
});
describe("stop-token merging", () => {
    it("returns stop tokens from getStopTokens", () => {
        stopTokenReturn = ["LANG_STOP", "TEMPLATE_STOP"];
        completionOptionsOverride = { stop: ["TEMPLATE_STOP"] };
        templateOverride = "{{prefix}}|{{suffix}}";
        const helper = makeHelper({ options: { template: undefined } });
        const { completionOptions } = renderPrompt({
            snippetPayload: emptySnippetPayload,
            workspaceDirs: ["file:///workspace"],
            helper,
        });
        expect(completionOptions?.stop).toEqual(stopTokenReturn);
    });
});
