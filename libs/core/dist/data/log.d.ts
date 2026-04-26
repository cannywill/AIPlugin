import { DevDataLogEvent } from "@continuedev/config-yaml";
import { AnyZodObject } from "zod";
import { Core } from "../core.js";
import { ContinueConfig, IdeInfo, IdeSettings } from "../index.js";
export declare const LOCAL_DEV_DATA_VERSION = "0.2.0";
export declare class DataLogger {
    private static instance;
    core?: Core;
    ideSettingsPromise?: Promise<IdeSettings>;
    ideInfoPromise?: Promise<IdeInfo>;
    private constructor();
    static getInstance(): DataLogger;
    addBaseValues(body: Record<string, any>, eventName: string, schema: string, zodSchema: AnyZodObject): Promise<Record<string, any>>;
    logLocalData(event: DevDataLogEvent): Promise<void>;
    logDevData(event: DevDataLogEvent): Promise<void>;
    parseEventData(event: DevDataLogEvent, schema: string, level: "all" | "noCode"): Promise<{
        provider: string;
        model: string;
        promptTokens: number;
        generatedTokens: number;
    } | {
        time: number;
        disable: boolean;
        maxPromptTokens: number;
        debounceDelay: number;
        maxSuffixPercentage: number;
        prefixPercentage: number;
        onlyMyCode: boolean;
        useCache: boolean;
        useRecentlyEdited: boolean;
        timestamp: string;
        useFileSuffix: boolean;
        multilineCompletions: "never" | "always" | "auto";
        slidingWindowPrefixPercentage: number;
        slidingWindowSize: number;
        modelProvider: string;
        modelName: string;
        cacheHit: boolean;
        filepath: string;
        completionId: string;
        uniqueId: string;
        transform?: boolean | undefined;
        template?: string | undefined;
        useImports?: boolean | undefined;
        accepted?: boolean | undefined;
        gitRepo?: string | undefined;
        completionOptions?: {
            contextLength?: number | undefined;
            maxTokens?: number | undefined;
            temperature?: number | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            minP?: number | undefined;
            presencePenalty?: number | undefined;
            frequencyPenalty?: number | undefined;
            stop?: string[] | undefined;
            n?: number | undefined;
            reasoning?: boolean | undefined;
            reasoningBudgetTokens?: number | undefined;
            promptCaching?: boolean | undefined;
            stream?: boolean | undefined;
            keepAlive?: number | undefined;
        } | undefined;
        disableInFiles?: string[] | undefined;
    } | {
        time: number;
        disable: boolean;
        maxPromptTokens: number;
        debounceDelay: number;
        maxSuffixPercentage: number;
        prefixPercentage: number;
        onlyMyCode: boolean;
        useCache: boolean;
        useRecentlyEdited: boolean;
        eventName: string;
        schema: string;
        timestamp: string;
        userId: string;
        userAgent: string;
        selectedProfileId: string;
        multilineCompletions: "never" | "always" | "auto";
        slidingWindowPrefixPercentage: number;
        slidingWindowSize: number;
        modelProvider: string;
        modelName: string;
        cacheHit: boolean;
        filepath: string;
        completionId: string;
        uniqueId: string;
        transform?: boolean | undefined;
        template?: string | undefined;
        useImports?: boolean | undefined;
        accepted?: boolean | undefined;
        gitRepo?: string | undefined;
        enabledStaticContextualization?: boolean | undefined;
    } | {
        label: string;
        model?: string | undefined;
    } | {
        modelName: string;
        completionOptions: {};
        sessionId: string;
        feedback?: boolean | undefined;
    } | {
        eventName: string;
        schema: string;
        timestamp: string;
        userId: string;
        userAgent: string;
        selectedProfileId: string;
        modelProvider: string;
        modelName: string;
        modelTitle: string;
        sessionId: string;
        feedback?: boolean | undefined;
    } | {
        eventName: string;
        schema: string;
        timestamp: string;
        userId: string;
        userAgent: string;
        selectedProfileId: string;
        modelProvider: string;
        modelName: string;
        modelTitle: string;
        sessionId: string;
        tools?: string[] | undefined;
        rules?: {
            id: string;
            slug?: string | undefined;
        }[] | undefined;
    } | {
        eventName: string;
        schema: string;
        timestamp: string;
        userId: string;
        userAgent: string;
        selectedProfileId: string;
        modelProvider: string;
        modelName: string;
        filepath: string;
        modelTitle: string;
    } | {
        eventName: string;
        schema: string;
        timestamp: number;
        userId: string;
        userAgent: string;
        selectedProfileId: string;
        modelProvider: string;
        modelName: string;
        completionId: string;
        uniqueId: string;
        elapsed: number;
        cursorPosition: {
            line: number;
            character: number;
        };
        aborted?: boolean | undefined;
        accepted?: boolean | undefined;
        gitRepo?: string | undefined;
        completionOptions?: any;
        requestId?: string | undefined;
    } | {
        eventName: string;
        schema: string;
        timestamp: string;
        userId: string;
        userAgent: string;
        selectedProfileId: string;
        modelProvider: string;
        modelName: string;
        modelTitle: string;
        beforeCursorPos: {
            line: number;
            character: number;
        };
        afterCursorPos: {
            line: number;
            character: number;
        };
    } | {
        eventName: string;
        schema: string;
        timestamp: string;
        userId: string;
        userAgent: string;
        selectedProfileId: string;
        accepted: boolean;
        toolCallId: string;
        functionName: string;
        succeeded: boolean;
    }>;
    logToOneDestination(dataConfig: NonNullable<ContinueConfig["data"]>[number], event: DevDataLogEvent): Promise<void>;
}
//# sourceMappingURL=log.d.ts.map