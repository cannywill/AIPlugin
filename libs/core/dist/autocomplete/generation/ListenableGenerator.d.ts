export declare class ListenableGenerator<T> {
    private readonly onError;
    private _source;
    private _buffer;
    private _listeners;
    private _isEnded;
    private _abortController;
    constructor(source: AsyncGenerator<T>, onError: (e: any) => void, abortController: AbortController);
    cancel(): void;
    private _start;
    listen(listener: (value: T) => void): void;
    tee(): AsyncGenerator<T>;
}
//# sourceMappingURL=ListenableGenerator.d.ts.map