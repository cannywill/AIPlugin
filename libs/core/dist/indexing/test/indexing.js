import { jest } from "@jest/globals";
import { ChunkCodebaseIndex } from "../chunk/ChunkCodebaseIndex";
import { testIde } from "../../test/fixtures";
import { addToTestDir, TEST_DIR } from "../../test/testDir";
import { tagToString } from "../utils";
export const mockFilename = "test.py";
export const mockPathAndCacheKey = {
    path: `${TEST_DIR}/${mockFilename}`,
    cacheKey: "abc123",
};
export const mockFileContents = `\
def main():
  print("Hello, world!")

class Foo:
  def __init__(self, bar: str):
      self.bar = bar
`;
export const mockTag = {
    branch: "main",
    directory: "/",
    artifactId: "artifactId",
};
export const mockTagString = tagToString(mockTag);
export const testContinueServerClient = {
    connected: false,
    getFromIndexCache: jest.fn(),
};
const mockContinueServerClient = {
    connected: false,
    getFromIndexCache: jest.fn(),
};
const mockResults = {
    compute: [],
    addTag: [],
    removeTag: [],
    del: [],
};
const mockMarkComplete = jest
    .fn()
    .mockImplementation(() => Promise.resolve());
export async function insertMockChunks() {
    const index = new ChunkCodebaseIndex(testIde.readFile.bind(testIde), mockContinueServerClient, 1000);
    addToTestDir([[mockFilename, mockFileContents]]);
    await updateIndexAndAwaitGenerator(index, "compute", mockMarkComplete);
    await updateIndexAndAwaitGenerator(index, "addTag", mockMarkComplete);
}
export async function updateIndexAndAwaitGenerator(index, resultType, markComplete, tag = mockTag) {
    const computeGenerator = index.update(tag, { ...mockResults, [resultType]: [mockPathAndCacheKey] }, markComplete, "test-repo");
    while (!(await computeGenerator.next()).done) { }
}
