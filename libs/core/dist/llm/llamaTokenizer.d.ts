export class LlamaTokenizer {
    constructor(vocab_base64: any, merges_binary: any);
    vocabById: string[];
    vocabByString: Map<any, any>;
    merges: Map<any, any>;
    utf8Encoder: TextEncoder;
    utf8Decoder: TextDecoder;
    getMergeIdentifierString(firstTokenId: any, secondTokenId: any): string;
    decompressMerges(merges_binary: any): Map<any, any>;
    /**
     * Helper function to decode the vocabulary.
     *
     * vocab_base64 is base64-encoded string of tokens delimited by '\n' (line break) in utf-8.
     * The row number of the token (indexing from 0) represents the id of the token in LLaMA tokenizer.
     *
     * Most tokens look like this: "ic" (without the quotes) (representing the "i" character followed by the "c" character)
     * Some tokens are special. In particular, spaces are replaced with the "▁" character and line-break is represented as "<0x0A>".
     *
     * This helper function returns the vocabulary as an array that contains Strings representing tokens:
     *
     *  "<unk>"   // Special token: unknown token
     *  "<s>"     // Special token: beginning of string
     *  "</s>"    // Special token: end of string
     *  "<0x00>"  // Byte-level token representing the 0-byte
     *  "<0x01>"  // Byte-level token ...
     *  "<0x02>"  // Byte-level token ...
     *  ...       // More byte-level tokens
     *  "<0x0A>"  // Byte-level token representing '\n' (line break). This is one of the few byte-level tokens that appear to be actually needed in practice.
     *  ...       // More byte-level tokens
     *  "<0xFF>"  // Byte-level token ...
     *  "▁▁"     // Token representing 2 consecutive spaces.
     *  "▁t"     // Token representing the space character followed by the "t" character.
     *  "er"      // Token representing the "e" character followed by the "r" character. Most tokens look like this.
     *  ...       // 32000 tokens
     */
    decodeVocabulary(vocab_base64: any): string[];
    mapCharactersToTokenIds(prompt: any, add_bos_token: any, add_preceding_space: any): any[];
    encode(prompt: any, add_bos_token?: boolean, add_preceding_space?: boolean, log_performance?: boolean): any[] | undefined;
    decode(tokenIds: any, add_bos_token?: boolean, add_preceding_space?: boolean): string;
    defaultTests(tokenizer: any): boolean;
    runTests(tests?: (tokenizer: any) => boolean): void;
}
export default llamaTokenizer;
declare const llamaTokenizer: LlamaTokenizer;
//# sourceMappingURL=llamaTokenizer.d.ts.map