import { ILLM } from "../../index.js";
export interface LlmTestCase {
    llm: ILLM;
    methodToTest: keyof ILLM;
    params: any[];
    expectedRequest: {
        url: string;
        method: string;
        headers?: Record<string, string>;
        body?: Record<string, any>;
    };
    mockResponse?: any;
    mockStream?: string[];
}
export declare function runLlmTest(testCase: LlmTestCase): Promise<void>;
//# sourceMappingURL=llmTestHarness.d.ts.map