/**
 * Asynchronous generator that yields characters from the input stream until it encounters
 * an end-of-line character followed by a non-whitespace character.
 *
 * @param {AsyncGenerator<string>} stream - The input stream of characters.
 * @param {string[]} endOfLine - An array of characters considered as end-of-line markers.
 * @param {() => void} fullStop - A function to be called when the generator stops.
 * @yields {string} Characters from the input stream.
 * @returns {AsyncGenerator<string>} An async generator that yields characters.
 */
export declare function onlyWhitespaceAfterEndOfLine(stream: AsyncGenerator<string>, endOfLine: string[], fullStop: () => void): AsyncGenerator<string>;
/**
 * Yields characters from the stream, stopping if the first character is a newline.
 * @param {AsyncGenerator<string>} stream - The input character stream.
 * @yields {string} Characters from the stream.
 */
export declare function noFirstCharNewline(stream: AsyncGenerator<string>): AsyncGenerator<string, void, unknown>;
/**
 * Asynchronously yields characters from the input stream, stopping if a stop token is encountered.
 *
 * @param {AsyncGenerator<string>} stream - The input stream of characters.
 * @param {string[]} stopTokens - Array of tokens that signal when to stop yielding.
 * @yields {string} Characters from the input stream.
 * @returns {AsyncGenerator<string>} An async generator that yields characters until a stop condition is met.
 * @description
 * 1. If no stop tokens are provided, yields all characters from the stream.
 * 2. Otherwise, buffers incoming chunks and checks for stop tokens.
 * 3. Yields characters one by one if no stop token is found at the start of the buffer.
 * 4. Stops yielding and returns if a stop token is encountered.
 * 5. After the stream ends, filters encountered stop tokens in remaining buffer.
 * 6. Yields any remaining buffered characters.
 */
export declare function stopAtStopTokens(stream: AsyncGenerator<string>, stopTokens: string[]): AsyncGenerator<string>;
/**
 * Asynchronously yields characters from the input stream.
 * Stops if the beginning of the suffix is detected in the stream.
 */
export declare function stopAtStartOf(stream: AsyncGenerator<string>, suffix: string, sequenceLength?: number): AsyncGenerator<string>;
//# sourceMappingURL=charStream.d.ts.map