import { expect } from "vitest";
import MockLLM from "../../../llm/llms/Mock";
import { testConfigHandler, testIde } from "../../../test/fixtures";
import { joinPathsToUri } from "../../../util/uri";
import { CompletionProvider } from "../../CompletionProvider";
const FIM_DELIMITER = "<|fim|>";
function parseFimExample(text) {
    const [prefix, suffix] = text.split(FIM_DELIMITER);
    return { prefix, suffix };
}
export async function testAutocompleteFiltering(test) {
    const { prefix, suffix } = parseFimExample(test.input);
    // Setup necessary objects
    const llm = new MockLLM({
        model: "mock",
    });
    llm.completion = test.llmOutput;
    const ide = testIde;
    const configHandler = testConfigHandler;
    // Create a real file
    const [workspaceDir] = await ide.getWorkspaceDirs();
    const fileUri = joinPathsToUri(workspaceDir, test.filename);
    await ide.writeFile(fileUri, test.input.replace(FIM_DELIMITER, ""));
    // Prepare completion input and provider
    const completionProvider = new CompletionProvider(configHandler, ide, async () => llm, () => { }, async () => []);
    const line = prefix.split("\n").length - 1;
    const character = prefix.split("\n")[line].length;
    const autocompleteInput = {
        isUntitledFile: false,
        completionId: "test-completion-id",
        filepath: fileUri,
        pos: {
            line,
            character,
        },
        recentlyEditedRanges: [],
        recentlyVisitedRanges: [],
    };
    // Generate a completion
    const result = await completionProvider.provideInlineCompletionItems(autocompleteInput, undefined);
    // Ensure that we return the text that is wanted to be displayed
    expect(result?.completion).toEqual(test.expectedCompletion);
}
