import { generateOpenAIToolCallId } from "./systemToolUtils";
export const getInitialToolCallParseState = () => ({
    toolCallId: generateOpenAIToolCallId(),
    isWithinArgStart: false,
    currentArgName: undefined,
    currentArgChunks: [],
    currentLineIndex: 0,
    processedArgNames: new Set(),
    lineChunks: [],
    done: false,
});
