export function messageHasToolCalls(msg) {
    return msg.role === "assistant" && !!msg.toolCalls;
}
export function messageIsEmpty(message) {
    if (typeof message.content === "string") {
        return message.content.trim() === "";
    }
    if (Array.isArray(message.content)) {
        return message.content.every((item) => item.type === "text" && item.text?.trim() === "");
    }
    return false;
}
// some providers don't support empty messages
export function addSpaceToAnyEmptyMessages(messages) {
    return messages.map((message) => {
        if (messageIsEmpty(message)) {
            message.content = " ";
        }
        return message;
    });
}
export function isUserOrToolMsg(msg) {
    if (!msg) {
        return false;
    }
    return msg.role === "user" || msg.role === "tool";
}
export function isToolMessageForId(msg, toolCallId) {
    return !!msg && msg.role === "tool" && msg.toolCallId === toolCallId;
}
export function messageHasToolCallId(msg, toolCallId) {
    return (!!msg &&
        msg.role === "assistant" &&
        !!msg.toolCalls?.find((call) => call.id === toolCallId));
}
export function chatMessageIsEmpty(message) {
    switch (message.role) {
        case "system":
        case "user":
            return (typeof message.content === "string" && message.content.trim() === "");
        case "assistant":
            return (typeof message.content === "string" &&
                message.content.trim() === "" &&
                !message.toolCalls);
        case "thinking":
        case "tool":
            return false;
    }
}
