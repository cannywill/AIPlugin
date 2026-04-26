import { IndexTag } from "..";
/**
 * Converts an IndexTag to a string representation, safely handling long paths.
 *
 * The string is used as a table name and identifier in various places, so it needs
 * to stay under OS filename length limits (typically 255 chars). This is especially
 * important for dev containers where the directory path can be very long due to
 * containing container configuration.
 *
 * The format is: "{directory}::{branch}::{artifactId}"
 *
 * To handle long paths:
 * 1. First tries the full string - most backwards compatible
 * 2. If too long, truncates directory from the beginning and adds a hash prefix
 *    to ensure uniqueness while preserving the more readable end parts
 * 3. Finally ensures entire string stays under MAX_TABLE_NAME_LENGTH for OS compatibility
 *
 * @param tag The tag containing directory, branch, and artifactId
 * @returns A string representation safe for use as a table name
 */
export declare function tagToString(tag: IndexTag): string;
//# sourceMappingURL=utils.d.ts.map