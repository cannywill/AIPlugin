import * as Diff from "diff";
function diffPatternMatches(diffs, pattern) {
    if (diffs.length !== pattern.length) {
        return false;
    }
    for (let i = 0; i < diffs.length; i++) {
        const diff = diffs[i];
        const diffPartType = !diff.added && !diff.removed ? "=" : diff.added ? "+" : "-";
        if (diffPartType !== pattern[i]) {
            return false;
        }
    }
    return true;
}
export function processSingleLineCompletion(lastLineOfCompletionText, currentText, cursorPosition) {
    const diffs = Diff.diffWords(currentText, lastLineOfCompletionText);
    if (diffPatternMatches(diffs, ["+"])) {
        // Just insert, we're already at the end of the line
        return {
            completionText: lastLineOfCompletionText,
        };
    }
    if (diffPatternMatches(diffs, ["+", "="]) ||
        diffPatternMatches(diffs, ["+", "=", "+"])) {
        // The model repeated the text after the cursor to the end of the line
        return {
            completionText: lastLineOfCompletionText,
            range: {
                start: cursorPosition,
                end: currentText.length + cursorPosition,
            },
        };
    }
    if (diffPatternMatches(diffs, ["+", "-"]) ||
        diffPatternMatches(diffs, ["-", "+"])) {
        // We are midline and the model just inserted without repeating to the end of the line
        return {
            completionText: lastLineOfCompletionText,
        };
    }
    // For any other diff pattern, just use the first added part if available
    if (diffs[0]?.added) {
        return {
            completionText: diffs[0].value,
        };
    }
    // Default case: treat as simple insertion
    return {
        completionText: lastLineOfCompletionText,
    };
}
