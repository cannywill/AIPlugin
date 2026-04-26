import { Writable } from "stream";
import { LLMLogger } from "./logger";
/**
 * A class that formats LLM log output as a human-readable stream.
 * The general appearance of the output is something like:
 *
 *  01:23:45.6 [Chat]
 *             Options: {
 *               "maxTokens": 1000,
 *             }
 *             Role: system
 *             | You are a helpful assistant.
 *             Role: user
 *             | Who are you?
 *        +0.2 Role: assistant
 *             | How can I help you today?
 *        +0.3 | I can tell you about the weather or the stock mark
 *        +0.4 . et. [THIS LINE IS WRAPPED]
 * |01:23:46.1 [Complete]
 * |           Options: {
 * |             "maxTokens": 1000,
 * |           }
 * |           Prefix:
 * |           | COMPLETE THIS
 *        +0.6 Success
 *             PromptTokens: 50
 *             GeneratedTokens: 30
 * |      +0.2 Result:
 * |           | COMPLETION
 *
 * The lines with | are a second interaction that starts while the
 * first one is still in progress; every interaction starts with
 * an absolute timestamp, and relative timestamps are included for
 * separately received results in the same interaction.
 */
export declare class LLMLogFormatter {
    private logger;
    private output;
    private wrapWidth;
    private interactions;
    private lastItem;
    private lastLineStartItem;
    private openLine;
    private openLineChars;
    private lastFreedPrefix;
    /**
     * Creates a new LLMLogWriter.
     * @param logger - The LLMLogger instance to listen to for log items
     * @param output - Stream to write formatted output to
     * @param wrapWidth - Maximum width of a line before wrapping
     */
    constructor(logger: LLMLogger, output: Writable, wrapWidth?: number);
    private getInteractionData;
    private formatTimestamp;
    private logFragment;
    private logLines;
    private logMessageText;
    private logToolcalls;
    private logMessageContent;
    private logMessage;
    private logTokens;
    private logOptions;
    private logItem;
}
//# sourceMappingURL=logFormatter.d.ts.map