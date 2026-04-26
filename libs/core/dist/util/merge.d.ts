import { ConfigMergeType } from "../index.js";
type JsonObject = {
    [key: string]: any;
};
export declare function mergeJson(first: JsonObject, second: JsonObject, mergeBehavior?: ConfigMergeType, mergeKeys?: {
    [key: string]: (a: any, b: any) => boolean;
}): any;
export default mergeJson;
//# sourceMappingURL=merge.d.ts.map