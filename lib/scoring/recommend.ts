import "server-only";

import { QuizAnswers, CameraScores, Camera } from "@/lib/types";
import { aiRerank } from "@/lib/ai/ai-rerank";
import { determineBudgetScore } from "@/lib/scoring/budget-score";
import { determineImportanceScore } from "@/lib/scoring/importance-score";
import { handleTieBreakers } from "@/lib/scoring/tie-breakers";

export const recommend = (answers: QuizAnswers, cameras: Camera[]) => {
    // Official recommendation algorithm (manual scoring algorithm -> AI re-ranking -> top 3)

    const ratedRecommendations = cameras
        .map((camera) => {
            const cameraScores: CameraScores = {
                camera: camera,
                scores: {
                    total: 0,
                    budget: 0,
                    skillLevel: 0,
                    useCases: 0,
                    contentTypes: 0,
                    importance: 0,
                },
            };

            // Budget
            cameraScores.scores.budget += determineBudgetScore(
                Math.ceil(camera.price), // Round camera price to nearest whole number when scoring, ex) $1,999.99 basically equals $2,000
                answers.budget,
            );

            // Skill level
            if (camera.usability.level === answers.skillLevel) cameraScores.scores.skillLevel += 5;

            // Use Case (Photo/Video/Hybrid)
            if (answers.useCase === "Videography" && camera.idealUseCases.includes("Videography"))
                cameraScores.scores.useCases += 20;
            else if (
                answers.useCase === "Photography" &&
                camera.idealUseCases.includes("Photography")
            )
                cameraScores.scores.useCases += 20;
            else if (answers.useCase === "Hybrid") {
                if (
                    camera.idealUseCases.includes("Photography") &&
                    camera.idealUseCases.includes("Videography")
                )
                    cameraScores.scores.useCases += 20;
            }

            // Content Type (wildlife, sports, etc.)
            const includedContentTypes = camera.idealContentTypes.filter((content) =>
                answers.contentTypes.includes(content),
            );
            cameraScores.scores.contentTypes += 5 * includedContentTypes.length;

            // Importance Ratings
            const importanceScore = determineImportanceScore(answers.importance, camera);
            cameraScores.scores.importance += importanceScore;

            cameraScores.scores.total +=
                cameraScores.scores.budget +
                cameraScores.scores.skillLevel +
                cameraScores.scores.useCases +
                cameraScores.scores.contentTypes +
                cameraScores.scores.importance;
            console.log(cameraScores);
            return cameraScores;
        })
        .sort((a, b) => {
            return b.scores.total !== a.scores.total
                ? b.scores.total - a.scores.total
                : handleTieBreakers(a, b);
        })
        .slice(0, 10);

    // AI integration to refine and generate top 3 camera results (to be worked on in next major milestone)
    const candidateCameras = ratedRecommendations.map((recommendation) => recommendation.camera);
    const topRecommendations = aiRerank(answers, candidateCameras);

    return topRecommendations;
};
