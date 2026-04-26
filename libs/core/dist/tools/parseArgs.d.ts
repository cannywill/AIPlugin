import { ToolCallDelta } from "..";
export declare function safeParseToolCallArgs(toolCall: ToolCallDelta): Record<string, any>;
/**
 * Coerce parsed args to match the tool's input schema types.
 * JSON.parse() deeply parses all values, so string-typed parameters
 * that contain valid JSON (e.g. file content for a .json file) get
 * converted to objects. This checks the schema and re-stringifies
 * any values that should be strings.
 */
export declare function coerceArgsToSchema(args: Record<string, any>, schema?: Record<string, any>): Record<string, any>;
export declare function getStringArg(args: any, argName: string, allowEmpty?: boolean): string;
export declare function getOptionalStringArg(args: any, argName: string, allowEmpty?: boolean): string | undefined;
export declare function getNumberArg(args: any, argName: string): number;
export declare function getBooleanArg(args: any, argName: string, required?: boolean): boolean | undefined;
//# sourceMappingURL=parseArgs.d.ts.map