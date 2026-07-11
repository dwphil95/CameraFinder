import "server-only";

import { budgetRanges } from "../constants";
import { BudgetRange } from "../types";

export const determineBudgetScore = (cameraPrice: number, budget: BudgetRange) => {
    /* 
        Score budget based on following factors:
            Within budget range: score 12
            At most 30% lower than budget range: score 9
            At most 20% above budget range: score 6
            Else: score no points
    */
    const range = budgetRanges.find((r) => r.value === budget);
    if (!range) return 0;

    const { min, max } = range;
    if (min && max) {
        if (cameraPrice >= min && cameraPrice <= max) return 12;
        else if (cameraPrice < min && cameraPrice >= min * 0.7) return 9;
        else if (cameraPrice > max && cameraPrice <= max * 1.2) return 6;
    } else if (min) {
        // Range over $3,000, max is null
        if (cameraPrice >= min) return 12;
        else if (cameraPrice >= min * 0.7) return 9;
    } else if (max) {
        // Range under $500, min is null
        if (cameraPrice <= max) return 12;
        else if (cameraPrice <= max * 1.2) return 6;
    }
    return 0;
};
