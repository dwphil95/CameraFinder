import "server-only";

import { Camera, QuizAnswers } from "@/lib/types";
// import OpenAI from "openai";

// const prompt = `
//     You are a camera recommendation expert.

//     Given the user's questionnaire answers and the candidate cameras,
//     rank the best 3 cameras.

//     Prioritize:
//     1. Content Type
//     2. Importance Ratings
//     3. Use Case
//     4. Skill Level
//     5. Budget

//     Return JSON only.
// `;

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

/// AI integration logic will go here, to be implemented later
export const aiRerank = (answers: QuizAnswers, candidateCameras: Camera[]) => {
    return candidateCameras.slice(0, 3);
};
