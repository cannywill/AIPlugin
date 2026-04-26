/**
 * Adjusts token count based on model-specific tokenizer differences.
 * Since we use llama tokenizer (~= gpt tokenizer) for all models, we apply
 * multipliers for models known to have higher token counts.
 *
 * @param baseTokens - Token count from llama/gpt tokenizer
 * @param modelName - Name of the model
 * @returns Adjusted token count with safety buffer
 */
export declare function getAdjustedTokenCountFromModel(baseTokens: number, modelName: string): number;
//# sourceMappingURL=getAdjustedTokenCount.d.ts.map