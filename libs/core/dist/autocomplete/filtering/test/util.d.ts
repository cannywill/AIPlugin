export interface AutocompleteFileringTestInput {
    description: string;
    filename: string;
    input: string;
    llmOutput: string;
    expectedCompletion: string | null | undefined;
    options?: {
        only?: boolean;
    };
}
export declare function testAutocompleteFiltering(test: AutocompleteFileringTestInput): Promise<void>;
//# sourceMappingURL=util.d.ts.map