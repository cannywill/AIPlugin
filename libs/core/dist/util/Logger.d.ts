declare class LoggerClass {
    private static instance;
    private winston;
    private constructor();
    static getInstance(): LoggerClass;
    private shouldSendToSentry;
    log(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
    info(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    error(error: Error | string | unknown, context?: Record<string, any>): void;
}
export declare const Logger: LoggerClass;
export {};
//# sourceMappingURL=Logger.d.ts.map