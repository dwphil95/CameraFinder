jest.mock("@/lib/ai/ai-rerank", () => ({
    aiRerank: jest.fn((_answers: unknown, cameras: unknown[]) => cameras),
}));

import { determineBudgetScore } from "@/lib/scoring/budget-score";
import { recommend } from "@/lib/scoring/recommend";
import { aiRerank } from "@/lib/ai/ai-rerank";
import { createCamera, createQuizAnswers } from "@/test-utils/recommendation-fixtures";

const mockAiRerank = jest.mocked(aiRerank);

describe("determineBudgetScore", () => {
    it("awards maximum points when the camera price falls within the user's budget range", () => {
        // Arrange
        const price = 1500;
        const budget = "$1,000-$2,000";

        // Act
        const score = determineBudgetScore(price, budget);

        // Assert
        expect(score).toBe(12);
    });

    it("reduces the score when the camera exceeds the user's budget", () => {
        // Arrange
        const price = 2200;
        const budget = "$1,000-$2,000";

        // Act
        const score = determineBudgetScore(price, budget);

        // Assert
        expect(score).toBe(6);
    });
});

describe("recommend", () => {
    beforeEach(() => {
        jest.spyOn(console, "log").mockImplementation(() => {});
        mockAiRerank.mockImplementation((_answers, cameras) => cameras);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("ranks a camera within budget above one that falls outside the selected range", () => {
        // Arrange
        const answers = createQuizAnswers({ budget: "$1,000-$2,000" });
        const inBudgetCamera = createCamera("in-budget", "In Budget Camera", { price: 1500 });
        const overBudgetCamera = createCamera("over-budget", "Over Budget Camera", {
            price: 5000,
        });

        // Act
        const results = recommend(answers, [overBudgetCamera, inBudgetCamera]);

        // Assert
        expect(results[0].id).toBe("in-budget");
    });

    it("ranks a camera that matches the user's skill level higher", () => {
        // Arrange
        const answers = createQuizAnswers({ skillLevel: "Beginner" });
        const matchingSkillCamera = createCamera("beginner-match", "Beginner Match Camera", {
            usability: { level: "Beginner", weightGrams: 500, hasFlipScreen: true },
        });
        const mismatchedSkillCamera = createCamera("pro-mismatch", "Professional Camera", {
            usability: { level: "Professional", weightGrams: 500, hasFlipScreen: true },
        });

        // Act
        const results = recommend(answers, [mismatchedSkillCamera, matchingSkillCamera]);

        // Assert
        expect(results[0].id).toBe("beginner-match");
    });

    it("ranks a videography-capable camera higher when the user selects Videography", () => {
        // Arrange
        const answers = createQuizAnswers({ useCase: "Videography" });
        const videoCamera = createCamera("video-camera", "Video Camera", {
            idealUseCases: ["Videography"],
        });
        const photoCamera = createCamera("photo-camera", "Photo Camera", {
            idealUseCases: ["Photography"],
        });

        // Act
        const results = recommend(answers, [photoCamera, videoCamera]);

        // Assert
        expect(results[0].id).toBe("video-camera");
    });

    it("ranks a photography-capable camera higher when the user selects Photography", () => {
        // Arrange
        const answers = createQuizAnswers({ useCase: "Photography" });
        const photoCamera = createCamera("photo-camera", "Photo Camera", {
            idealUseCases: ["Photography"],
        });
        const videoCamera = createCamera("video-camera", "Video Camera", {
            idealUseCases: ["Videography"],
        });

        // Act
        const results = recommend(answers, [videoCamera, photoCamera]);

        // Assert
        expect(results[0].id).toBe("photo-camera");
    });

    it("ranks a true hybrid camera higher when the user selects Hybrid", () => {
        // Arrange
        const answers = createQuizAnswers({ useCase: "Hybrid" });
        const hybridCamera = createCamera("hybrid-camera", "Hybrid Camera", {
            idealUseCases: ["Photography", "Videography"],
        });
        const photoOnlyCamera = createCamera("photo-only", "Photo Only Camera", {
            idealUseCases: ["Photography"],
        });

        // Act
        const results = recommend(answers, [photoOnlyCamera, hybridCamera]);

        // Assert
        expect(results[0].id).toBe("hybrid-camera");
    });

    it("ranks a camera with more matching content types higher", () => {
        // Arrange
        const answers = createQuizAnswers({
            contentTypes: ["Portraits", "Landscape"],
        });
        const strongContentMatch = createCamera("strong-content-match", "Strong Content Match", {
            idealContentTypes: ["Portraits", "Landscape"],
        });
        const partialContentMatch = createCamera("partial-content-match", "Partial Content Match", {
            idealContentTypes: ["Portraits"],
        });

        // Act
        const results = recommend(answers, [partialContentMatch, strongContentMatch]);

        // Assert
        expect(results[0].id).toBe("strong-content-match");
    });

    it("ranks a camera with stronger autofocus higher when autofocus is highly important", () => {
        // Arrange
        const answers = createQuizAnswers({
            importance: {
                imageQuality: 1,
                videoQuality: 1,
                autofocus: 5,
                lowLight: 1,
                portability: 1,
                batteryLife: 1,
            },
        });
        const excellentAutofocusCamera = createCamera(
            "excellent-autofocus",
            "Excellent Autofocus Camera",
            {
                photo: { burstFps: 10, lowLight: "Good", autofocus: "Excellent" },
            },
        );
        const poorAutofocusCamera = createCamera("poor-autofocus", "Poor Autofocus Camera", {
            photo: { burstFps: 10, lowLight: "Good", autofocus: "Poor" },
        });

        // Act
        const results = recommend(answers, [poorAutofocusCamera, excellentAutofocusCamera]);

        // Assert
        expect(results[0].id).toBe("excellent-autofocus");
    });
});
