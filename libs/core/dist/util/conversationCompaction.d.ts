import { ILLM } from "..";
import { HistoryManager } from "./history";
export interface CompactionParams {
    sessionId: string;
    index: number;
    historyManager: HistoryManager;
    currentModel: ILLM;
}
/**
 * Compacts conversation history up to a specified index by generating a summary.
 * This helper function extracts the compaction logic from the main core handler.
 *
 * @param params - Object containing sessionId, index, historyManager, and currentModel
 * @returns Promise<void> - Updates the session with the conversation summary
 */
export declare function compactConversation({ sessionId, index, historyManager, currentModel, }: CompactionParams): Promise<void>;
//# sourceMappingURL=conversationCompaction.d.ts.map