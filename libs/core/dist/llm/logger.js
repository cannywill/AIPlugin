export class LLMLogger {
    nextId = 0;
    createInteractionLog() {
        return new LLMInteractionLog(this, (this.nextId++).toString());
    }
    logItemListeners = [];
    onLogItem(listener) {
        this.logItemListeners.push(listener);
    }
    _logItem(item) {
        for (const listener of this.logItemListeners) {
            listener(item);
        }
    }
}
export class LLMInteractionLog {
    logger;
    interactionId;
    constructor(logger, interactionId) {
        this.logger = logger;
        this.interactionId = interactionId;
    }
    logItem(item) {
        this.logger._logItem({
            ...item,
            interactionId: this.interactionId,
            timestamp: Date.now(),
        });
    }
}
