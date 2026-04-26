export interface AsyncEncoder {
    encode(text: string): Promise<number[]>;
    decode(tokens: number[]): Promise<string>;
    close(): Promise<void>;
}
export declare class LlamaAsyncEncoder implements AsyncEncoder {
    private workerPool;
    constructor();
    encode(text: string): Promise<number[]>;
    decode(tokens: number[]): Promise<string>;
    close(): Promise<void>;
}
export declare class GPTAsyncEncoder implements AsyncEncoder {
    private workerPool;
    constructor();
    encode(text: string): Promise<number[]>;
    decode(tokens: number[]): Promise<string>;
    close(): Promise<void>;
}
//# sourceMappingURL=asyncEncoder.d.ts.map