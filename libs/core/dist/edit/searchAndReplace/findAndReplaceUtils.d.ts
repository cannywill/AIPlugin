export declare const FOUND_MULTIPLE_FIND_STRINGS_ERROR = "Either provide a more specific string with surrounding context to make it unique, or use replace_all=true to replace all occurrences.";
/**
 * Validates a single edit operation
 */
export declare function validateSingleEdit(oldString: unknown, newString: unknown, replaceAll: unknown, index?: number): {
    oldString: string;
    newString: string;
    replaceAll?: boolean;
};
export declare function trimEmptyLines({ lines, fromEnd, }: {
    lines: string[];
    fromEnd: boolean;
}): string[];
//# sourceMappingURL=findAndReplaceUtils.d.ts.map