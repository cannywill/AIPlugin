import { Usage } from "../..";
export interface CostBreakdown {
    cost: number;
    breakdown: string;
}
export declare function calculateRequestCost(provider: string, model: string, usage: Usage): CostBreakdown | null;
//# sourceMappingURL=calculateRequestCost.d.ts.map