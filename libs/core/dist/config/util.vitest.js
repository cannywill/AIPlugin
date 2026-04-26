import { describe, expect, it } from "vitest";
import { serializePromptTemplates } from "./util";
describe("serializePromptTemplates", () => {
    it("should return undefined for undefined input", () => {
        expect(serializePromptTemplates(undefined)).toBeUndefined();
    });
    it("should convert function templates to empty strings", () => {
        const functionTemplate = () => "Generated template";
        const templates = {
            template1: functionTemplate,
        };
        const result = serializePromptTemplates(templates);
        expect(result).toEqual({ template1: "" });
    });
    it("should pass through string templates unchanged", () => {
        const templates = {
            template1: "This is a static template",
            template2: "Another static template",
        };
        const result = serializePromptTemplates(templates);
        expect(result).toEqual(templates);
    });
    it("should handle mixed template types", () => {
        const functionTemplate = () => "Generated template";
        const templates = {
            function: functionTemplate,
            string: "This is a static template",
        };
        const result = serializePromptTemplates(templates);
        expect(result).toEqual({
            function: "",
            string: "This is a static template",
        });
    });
});
