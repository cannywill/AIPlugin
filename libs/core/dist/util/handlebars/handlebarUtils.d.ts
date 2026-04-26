export type HandlebarsType = typeof import("handlebars");
export declare function registerHelpers(handlebars: HandlebarsType, helpers: Array<[string, Handlebars.HelperDelegate]>): {
    [key: string]: Promise<string>;
};
export declare function prepareTemplatedFilepaths(handlebars: HandlebarsType, template: string, inputData: Record<string, string>, ctxProviderNames: string[], readFile: (filepath: string) => Promise<string>, getUriFromPath: (path: string) => Promise<string | undefined>): Promise<{
    withLetterKeys: string;
    templateData: {
        [x: string]: string;
    };
    requiredContextProviders: Set<string>;
}>;
export declare function resolveHelperPromises(renderedString: string, promises: {
    [key: string]: Promise<string>;
}): Promise<string>;
//# sourceMappingURL=handlebarUtils.d.ts.map