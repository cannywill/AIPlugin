import { IndexTag } from "../..";
import { IContinueServerClient } from "../../continueServer/interface";
import { CodebaseIndex, RefreshIndexResults } from "../types";
export declare const mockFilename = "test.py";
export declare const mockPathAndCacheKey: {
    path: string;
    cacheKey: string;
};
export declare const mockFileContents = "def main():\n  print(\"Hello, world!\")\n\nclass Foo:\n  def __init__(self, bar: str):\n      self.bar = bar\n";
export declare const mockTag: IndexTag;
export declare const mockTagString: string;
export declare const testContinueServerClient: IContinueServerClient;
export declare function insertMockChunks(): Promise<void>;
export declare function updateIndexAndAwaitGenerator(index: CodebaseIndex, resultType: keyof RefreshIndexResults, markComplete: any, tag?: IndexTag): Promise<void>;
//# sourceMappingURL=indexing.d.ts.map