import { v4 as uuidv4 } from "uuid";
import { Logger } from "../../util/Logger.js";
export class InProcessMessenger {
    // Listeners for the entity that owns this messenger (right now, always Core)
    myTypeListeners = new Map();
    // Listeners defined by the other side of the protocol (right now, always IDE)
    externalTypeListeners = new Map();
    _onErrorHandlers = [];
    onError(handler) {
        this._onErrorHandlers.push(handler);
    }
    invoke(messageType, data, messageId) {
        const listener = this.myTypeListeners.get(messageType);
        if (!listener) {
            return;
        }
        const msg = {
            messageType: messageType,
            data,
            messageId: messageId ?? uuidv4(),
        };
        try {
            return listener(msg);
        }
        catch (error) {
            // Capture message handling errors to Sentry
            Logger.error(error, {
                messageType: String(messageType),
                messageId: msg.messageId,
            });
            // Re-throw the original error
            throw error;
        }
    }
    send(messageType, message, _messageId) {
        const messageId = _messageId ?? uuidv4();
        const data = {
            messageType: messageType,
            data: message,
            messageId,
        };
        this.externalTypeListeners.get(messageType)?.(data);
        return messageId;
    }
    on(messageType, handler) {
        this.myTypeListeners.set(messageType, handler);
    }
    async request(messageType, data) {
        const messageId = uuidv4();
        const listener = this.externalTypeListeners.get(messageType);
        if (!listener) {
            throw new Error(`No handler for message type "${String(messageType)}"`);
        }
        try {
            const response = await listener({
                messageType: messageType,
                data,
                messageId,
            });
            return response;
        }
        catch (error) {
            // Capture message handling errors to Sentry
            Logger.error(error, {
                messageType: String(messageType),
                messageId,
            });
            // Re-throw the original error
            throw error;
        }
    }
    externalOn(messageType, handler) {
        this.externalTypeListeners.set(messageType, handler);
    }
    externalRequest(messageType, data, _messageId) {
        const messageId = _messageId ?? uuidv4();
        const listener = this.myTypeListeners.get(messageType);
        if (!listener) {
            throw new Error(`No handler for message type "${String(messageType)}"`);
        }
        try {
            const response = listener({
                messageType: messageType,
                data,
                messageId,
            });
            return Promise.resolve(response);
        }
        catch (error) {
            // Capture message handling errors to Sentry
            Logger.error(error, {
                messageType: String(messageType),
                messageId,
            });
            // Re-throw the original error
            throw error;
        }
    }
}
