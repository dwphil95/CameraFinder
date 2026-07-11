import "server-only";

import { z } from "zod";
import { BudgetRange, QuizAnswers } from "../types";
import { budgetRanges, contentTypes } from "../constants";

const budgetValues = budgetRanges.map((r) => r.value) as [BudgetRange, ...BudgetRange[]];

const quizAnswersSchema = z.object({
    budget: z.enum(budgetValues),
    useCase: z.enum(["Photography", "Videography", "Hybrid"]),
    skillLevel: z.enum(["Beginner", "Intermediate", "Professional"]),
    contentTypes: z.array(z.enum(contentTypes)).min(1),
    importance: z.object({
        imageQuality: z.number().min(1).max(5),
        videoQuality: z.number().min(1).max(5),
        autofocus: z.number().min(1).max(5),
        lowLight: z.number().min(1).max(5),
        portability: z.number().min(1).max(5),
        batteryLife: z.number().min(1).max(5),
    }),
});

export const parseQuizAnswers = (input: unknown): QuizAnswers => {
    return quizAnswersSchema.parse(input);
};
