import { ILLMLogger, ILLMInteractionLog, LLMInteractionItem, LLMInteractionItemDetails } from "..";
type LLMLogItemFunction = (item: LLMInteractionItem) => void;
export declare class LLMLogger implements ILLMLogger {
    private nextId;
    createInteractionLog(): LLMInteractionLog;
    private logItemListeners;
    onLogItem(listener: LLMLogItemFunction): void;
    _logItem(item: LLMInteractionItem): void;
}
export declare class LLMInteractionLog implements ILLMInteractionLog {
    private logger;
    interactionId: string;
    constructor(logger: LLMLogger, interactionId: string);
    logItem(item: LLMInteractionItemDetails): void;
}
export {};
//# sourceMappingURL=logger.d.ts.map