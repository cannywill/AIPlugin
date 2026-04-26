export function closeTag(openingTag) {
    return `</${openingTag.slice(1)}`;
}
export function splitAtCodeblocksAndNewLines(content) {
    return content.split(/(```|\n)/g).filter(Boolean);
}
function randomLettersAndNumbers(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
export function generateOpenAIToolCallId() {
    return `call_${randomLettersAndNumbers(24)}`;
}
export function createDelta(name, args, id) {
    return {
        type: "function",
        function: {
            name,
            arguments: args,
        },
        id,
    };
}
