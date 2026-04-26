jest.mock("@continuedev/fetch", () => ({
    streamResponse: jest.fn(),
}));
import Ollama from "./Ollama.js";
function createOllama() {
    // Create instance without triggering constructor's fetch call
    const instance = Object.create(Ollama.prototype);
    instance.model = "test-model";
    instance.completionOptions = {};
    instance.fetch = jest.fn();
    return instance;
}
describe("Ollama", () => {
    describe("_convertToOllamaMessage", () => {
        let ollama;
        beforeEach(() => {
            ollama = createOllama();
        });
        it("should convert a basic user message", () => {
            const msg = { role: "user", content: "hello" };
            const result = ollama._convertToOllamaMessage(msg);
            expect(result).toEqual({ role: "user", content: "hello" });
        });
        it("should convert assistant message with toolCalls, stripping index and other unsupported fields", () => {
            const msg = {
                role: "assistant",
                content: "",
                toolCalls: [
                    {
                        id: "tc_123",
                        type: "function",
                        index: 0, // This field causes errors on Gemma3
                        function: {
                            name: "get_weather",
                            arguments: '{"city":"London"}',
                        },
                    },
                ],
            };
            const result = ollama._convertToOllamaMessage(msg);
            expect(result.tool_calls).toBeDefined();
            expect(result.tool_calls).toHaveLength(1);
            expect(result.tool_calls[0]).toEqual({
                function: {
                    name: "get_weather",
                    arguments: { city: "London" },
                },
            });
            // Verify no index, id, or type fields leaked through
            expect(result.tool_calls[0]).not.toHaveProperty("index");
            expect(result.tool_calls[0]).not.toHaveProperty("id");
            expect(result.tool_calls[0]).not.toHaveProperty("type");
        });
        it("should handle toolCalls with object arguments (not string)", () => {
            const msg = {
                role: "assistant",
                content: "",
                toolCalls: [
                    {
                        id: "tc_456",
                        type: "function",
                        function: {
                            name: "search",
                            arguments: { query: "test" },
                        },
                    },
                ],
            };
            const result = ollama._convertToOllamaMessage(msg);
            expect(result.tool_calls[0].function.arguments).toEqual({
                query: "test",
            });
        });
        it("should not add tool_calls for assistant messages without them", () => {
            const msg = { role: "assistant", content: "Sure!" };
            const result = ollama._convertToOllamaMessage(msg);
            expect(result.tool_calls).toBeUndefined();
        });
        it("should convert tool result messages", () => {
            const msg = {
                role: "tool",
                content: '{"temp": 20}',
                toolCallId: "tc_123",
            };
            const result = ollama._convertToOllamaMessage(msg);
            expect(result.role).toBe("tool");
            expect(result.content).toBe('{"temp": 20}');
        });
        it("should filter out toolCalls without a function name", () => {
            const msg = {
                role: "assistant",
                content: "",
                toolCalls: [
                    {
                        id: "tc_1",
                        type: "function",
                        function: {
                            name: "valid_tool",
                            arguments: "{}",
                        },
                    },
                    {
                        id: "tc_2",
                        type: "function",
                        function: {
                            name: undefined,
                            arguments: "{}",
                        },
                    },
                ],
            };
            const result = ollama._convertToOllamaMessage(msg);
            expect(result.tool_calls).toHaveLength(1);
            expect(result.tool_calls[0].function.name).toBe("valid_tool");
        });
    });
    describe("_reorderMessagesForToolCompat", () => {
        let ollama;
        beforeEach(() => {
            ollama = createOllama();
        });
        it("should move system message from after tool to before assistant+tool block", () => {
            const messages = [
                { role: "system", content: "You are helpful" },
                { role: "user", content: "What's the weather?" },
                {
                    role: "assistant",
                    content: "",
                    tool_calls: [{ function: { name: "get_weather", arguments: {} } }],
                },
                { role: "tool", content: '{"temp": 20}' },
                { role: "system", content: "Use metric units" },
                { role: "user", content: "Thanks" },
            ];
            const result = ollama._reorderMessagesForToolCompat(messages);
            // No system message should follow a tool message
            for (let i = 1; i < result.length; i++) {
                if (result[i].role === "system") {
                    expect(result[i - 1].role).not.toBe("tool");
                }
            }
            // The moved system message should appear before the assistant
            const sysIdx = result.findIndex((m) => m.role === "system" && m.content === "Use metric units");
            const assistantIdx = result.findIndex((m) => m.role === "assistant");
            expect(sysIdx).toBeLessThan(assistantIdx);
        });
        it("should not modify messages when no system follows tool", () => {
            const messages = [
                { role: "system", content: "You are helpful" },
                { role: "user", content: "Hello" },
                { role: "assistant", content: "Hi there" },
            ];
            const result = ollama._reorderMessagesForToolCompat(messages);
            expect(result).toEqual(messages);
        });
        it("should handle multiple tool results before a system message", () => {
            const messages = [
                { role: "user", content: "Do two things" },
                {
                    role: "assistant",
                    content: "",
                    tool_calls: [
                        { function: { name: "tool1", arguments: {} } },
                        { function: { name: "tool2", arguments: {} } },
                    ],
                },
                { role: "tool", content: "result1" },
                { role: "tool", content: "result2" },
                { role: "system", content: "extra instructions" },
            ];
            const result = ollama._reorderMessagesForToolCompat(messages);
            // System should come before the assistant message
            const sysIdx = result.findIndex((m) => m.content === "extra instructions");
            const assistantIdx = result.findIndex((m) => m.role === "assistant");
            expect(sysIdx).toBeLessThan(assistantIdx);
            // No system message should follow a tool message
            for (let i = 1; i < result.length; i++) {
                if (result[i].role === "system") {
                    expect(result[i - 1].role).not.toBe("tool");
                }
            }
        });
        it("should handle system message after tool when no preceding assistant", () => {
            // Edge case: tool messages without a preceding assistant
            const messages = [
                { role: "tool", content: "result" },
                { role: "system", content: "instructions" },
            ];
            const result = ollama._reorderMessagesForToolCompat(messages);
            // System should be moved before tool
            expect(result[0].role).toBe("system");
            expect(result[1].role).toBe("tool");
        });
    });
});
