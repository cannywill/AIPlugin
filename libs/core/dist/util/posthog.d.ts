import { IdeInfo } from "../index.js";
import type { PostHog as PostHogType } from "posthog-node";
export declare enum PosthogFeatureFlag {
    AutocompleteTimeout = "autocomplete-timeout",
    RecentlyVisitedRangesNumSurroundingLines = "recently-visited-ranges-num-surrounding-lines"
}
export declare const EXPERIMENTS: {
    [key in PosthogFeatureFlag]: {
        [key: string]: {
            value: any;
        };
    };
};
export declare class Telemetry {
    static client: PostHogType | undefined;
    static uniqueId: string;
    static os: string | undefined;
    static ideInfo: IdeInfo | undefined;
    /**
     * Convenience method for capturing errors in a single event
     */
    static captureError(errorName: string, error: unknown): Promise<void>;
    static capture(event: string, properties: {
        [key: string]: any;
    }, sendToTeam?: boolean, isExtensionActivationError?: boolean): Promise<void>;
    static shutdownPosthogClient(): void;
    static getTelemetryClient(): Promise<PostHogType | undefined>;
    static setup(allow: boolean, uniqueId: string, ideInfo: IdeInfo): Promise<void>;
    private static featureValueCache;
    static getFeatureFlag(flag: PosthogFeatureFlag): Promise<string | boolean | undefined>;
    static getValueForFeatureFlag(flag: PosthogFeatureFlag): Promise<any>;
}
//# sourceMappingURL=posthog.d.ts.map