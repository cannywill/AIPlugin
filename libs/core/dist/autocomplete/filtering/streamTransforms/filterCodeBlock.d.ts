import { LineStream } from "../../../diff/util";
/**
 * Filters and processes lines from a code block, removing unnecessary markers and handling edge cases.
 * Now includes markdown-aware processing to handle nested markdown blocks properly.
 *
 * @param {LineStream} rawLines - The input stream of lines to filter.
 * @param {string} filepath - Optional filepath to determine if this is a markdown file.
 * @yields {string} Filtered and processed lines from the code block.
 *
 * @description
 * This generator function performs the following tasks:
 * 1. Removes initial lines that should be removed before the actual code starts.
 * 2. For markdown files, applies nested markdown block logic to avoid premature termination.
 * 3. For mixed content, uses simplified processing to avoid premature termination.
 * 4. For traditional code blocks, uses original logic.
 * 5. Yields processed lines that are part of the actual code block content.
 */
export declare function filterCodeBlockLines(rawLines: LineStream, filepath?: string): LineStream;
//# sourceMappingURL=filterCodeBlock.d.ts.map