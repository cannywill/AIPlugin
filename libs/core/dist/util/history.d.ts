import { BaseSessionMetadata, Session } from "../index.js";
import { ListHistoryOptions } from "../protocol/core.js";
export declare class HistoryManager {
    list(options: ListHistoryOptions): BaseSessionMetadata[];
    delete(sessionId: string): void;
    clearAll(): void;
    load(sessionId: string): Session;
    save(session: Session): void;
}
declare const historyManager: HistoryManager;
export default historyManager;
//# sourceMappingURL=history.d.ts.map