// jest.mock("@/lib/ai/ai-rerank", () => ({
//     aiRerank: jest.fn((_answers: unknown, cameras: unknown[]) => cameras),
// }));

import { recommend } from "@/lib/scoring/recommend";
import { createCamera, createQuizAnswers } from "@/test-utils/recommendation-fixtures";
import { Camera } from "@/lib/types";

// const mockAiRerank = jest.mocked(aiRerank);

describe("recommendation scoring algorithm", () => {
    // beforeEach(() => {
    //     jest.spyOn(console, "log").mockImplementation(() => {});
    //     mockAiRerank.mockImplementation((_answers, cameras) => cameras);
    // });

    // afterEach(() => {
    //     jest.restoreAllMocks();
    // });

    describe("initial camera dataset", () => {
        it("returns an empty array when no cameras exist", () => {
            // Arrange
            const answers = createQuizAnswers();
            const noCameras: Camera[] = [];

            // Act
            const results = recommend(answers, noCameras);

            // Assert
            expect(results).toEqual([]);
        });

        it("returns a single camera when there is only one camera", () => {
            // Arrange
            const answers = createQuizAnswers();
            const camera = createCamera("single-camera", "Single Camera", { price: 1000 });

            // Act
            const results = recommend(answers, [camera]);

            // Assert
            expect(results.length).toEqual(1);
            expect(results[0].id).toBe("single-camera");
        });

        it("returns only the top ten candidate cameras when there are more than ten cameras", () => {
            // Arrange
            const answers = createQuizAnswers();
            const cameras = Array.from({ length: 15 }, (_, index) =>
                createCamera(`camera-${index}`, `Camera ${index}`, { price: 1000 + index * 100 }),
            );

            // Act
            const results = recommend(answers, cameras);

            // Assert
            expect(results.length).toEqual(10);
        });
    });

    describe("budget scoring", () => {
        it("ranks a camera within budget range above one that falls outside budget range", () => {
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
            expect(results[1].id).toBe("over-budget");
        });

        it("ranks a camera slightly exceeding budget range above one that falls slightly below budget range", () => {
            // Arrange
            const answers = createQuizAnswers({ budget: "$2,000-$3,000" });
            const belowBudgetCamera = createCamera("below-budget", "Below Budget Camera", {
                price: 1750,
            });
            const overBudgetCamera = createCamera("over-budget", "Over Budget Camera", {
                price: 2200,
            });

            // Act
            const results = recommend(answers, [belowBudgetCamera, overBudgetCamera]);

            // Assert
            expect(results[0].id).toBe("over-budget");
            expect(results[1].id).toBe("below-budget");
        });
    });

    describe("skill level scoring", () => {
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
            expect(results[1].id).toBe("pro-mismatch");
        });
    });

    describe("use case scoring", () => {
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
            expect(results[1].id).toBe("photo-camera");
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
            expect(results[1].id).toBe("video-camera");
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
            const videoOnlyCamera = createCamera("video-only", "Video Only Camera", {
                idealUseCases: ["Videography"],
            });

            // Act
            const results = recommend(answers, [photoOnlyCamera, videoOnlyCamera, hybridCamera]);

            // Assert
            expect(results[0].id).toBe("hybrid-camera");
        });
    });

    describe("content type scoring", () => {
        it("ranks a camera with more matching content types higher", () => {
            // Arrange
            const answers = createQuizAnswers({
                contentTypes: ["Portraits", "Landscape"],
            });
            const strongContentMatch = createCamera(
                "strong-content-match",
                "Strong Content Match",
                {
                    idealContentTypes: ["Portraits", "Landscape", "Action/Sports"],
                },
            );
            const partialContentMatch = createCamera(
                "partial-content-match",
                "Partial Content Match",
                {
                    idealContentTypes: ["Portraits", "Social Media", "Travel Vlogging"],
                },
            );
            const noContentMatch = createCamera("no-content-match", "No Content Match", {
                idealContentTypes: ["Social Media", "Weddings/Events"],
            });

            // Act
            const results = recommend(answers, [
                noContentMatch,
                partialContentMatch,
                strongContentMatch,
            ]);

            // Assert
            expect(results[0].id).toBe("strong-content-match");
            expect(results[1].id).toBe("partial-content-match");
            expect(results[2].id).toBe("no-content-match");
        });
    });

    describe("importance ratings scoring", () => {
        it("ranks a camera with stronger image quality higher when photo/images are most important", () => {
            // Arrange
            const answers = createQuizAnswers({
                importance: {
                    imageQuality: 5,
                    videoQuality: 4,
                    autofocus: 3,
                    lowLight: 3,
                    portability: 3,
                    batteryLife: 4,
                },
            });
            const excellentImageQualityCamera = createCamera(
                "excellent-image-quality",
                "Excellent Image Quality Camera",
                {
                    resolutionMP: 50,
                    photo: {
                        burstFps: 28,
                        lowLight: "Excellent",
                        autofocus: "Excellent",
                    },
                },
            );
            const goodImageQualityCamera = createCamera(
                "good-image-quality",
                "Good Image Quality Camera",
                {
                    resolutionMP: 35,
                    photo: {
                        burstFps: 20,
                        lowLight: "Good",
                        autofocus: "Average",
                    },
                },
            );
            const poorImageQualityCamera = createCamera(
                "poor-image-quality",
                "Poor Image Quality Camera",
                {
                    resolutionMP: 35,
                    photo: {
                        burstFps: 10,
                        lowLight: "Poor",
                        autofocus: "Average",
                    },
                },
            );

            // Act
            const results = recommend(answers, [
                poorImageQualityCamera,
                excellentImageQualityCamera,
                goodImageQualityCamera,
            ]);

            // Assert
            expect(results[0].id).toBe("excellent-image-quality");
            expect(results[1].id).toBe("good-image-quality");
            expect(results[2].id).toBe("poor-image-quality");
        });

        it("ranks a camera with stronger video quality higher when video is most important", () => {
            // Arrange
            const answers = createQuizAnswers({
                importance: {
                    imageQuality: 4,
                    videoQuality: 5,
                    autofocus: 3,
                    lowLight: 3,
                    portability: 3,
                    batteryLife: 4,
                },
            });
            const excellentVideoQualityCamera = createCamera(
                "excellent-video-quality",
                "Excellent Video Quality Camera",
                {
                    video: {
                        maxResolution: "4K",
                        maxResolutionFps: 60,
                        hasIBIS: true,
                        hasLog: true,
                    },
                },
            );
            const goodVideoQualityCamera = createCamera(
                "good-video-quality",
                "Good Video Quality Camera",
                {
                    video: {
                        maxResolution: "4K",
                        maxResolutionFps: 30,
                        hasIBIS: false,
                        hasLog: true,
                    },
                },
            );
            const poorVideoQualityCamera = createCamera(
                "poor-video-quality",
                "Poor Video Quality Camera",
                {
                    video: {
                        maxResolution: "1080p",
                        maxResolutionFps: 30,
                        hasIBIS: false,
                        hasLog: false,
                    },
                },
            );

            // Act
            const results = recommend(answers, [
                poorVideoQualityCamera,
                excellentVideoQualityCamera,
                goodVideoQualityCamera,
            ]);

            // Assert
            expect(results[0].id).toBe("excellent-video-quality");
            expect(results[1].id).toBe("good-video-quality");
            expect(results[2].id).toBe("poor-video-quality");
        });

        it("ranks a camera with stronger autofocus performance higher when autofocus is most important", () => {
            // Arrange
            const answers = createQuizAnswers({
                importance: {
                    imageQuality: 3,
                    videoQuality: 3,
                    autofocus: 5,
                    lowLight: 3,
                    portability: 3,
                    batteryLife: 3,
                },
            });
            const excellentAutofocusCamera = createCamera(
                "excellent-autofocus",
                "Excellent Autofocus Camera",
                {
                    photo: { burstFps: 10, lowLight: "Poor", autofocus: "Excellent" },
                },
            );
            const poorAutofocusCamera = createCamera("poor-autofocus", "Poor Autofocus Camera", {
                photo: { burstFps: 10, lowLight: "Excellent", autofocus: "Poor" },
            });

            // Act
            const results = recommend(answers, [poorAutofocusCamera, excellentAutofocusCamera]);

            // Assert
            expect(results[0].id).toBe("excellent-autofocus");
            expect(results[1].id).toBe("poor-autofocus");
        });

        it("ranks a camera with stronger low-light performance higher when low-light is most important", () => {
            // Arrange
            const answers = createQuizAnswers({
                importance: {
                    imageQuality: 2,
                    videoQuality: 3,
                    autofocus: 4,
                    lowLight: 5,
                    portability: 3,
                    batteryLife: 1,
                },
            });
            const excellentLowlightCamera = createCamera(
                "excellent-lowlight",
                "Excellent Lowlight Camera",
                {
                    photo: { burstFps: 10, lowLight: "Excellent", autofocus: "Poor" },
                },
            );
            const poorLowlightCamera = createCamera("poor-lowlight", "Poor Lowlight Camera", {
                photo: { burstFps: 10, lowLight: "Poor", autofocus: "Excellent" },
            });

            // Act
            const results = recommend(answers, [poorLowlightCamera, excellentLowlightCamera]);

            // Assert
            expect(results[0].id).toBe("excellent-lowlight");
            expect(results[1].id).toBe("poor-lowlight");
        });

        it("ranks a camera with stronger portability higher when portability is most important", () => {
            // Arrange
            const answers = createQuizAnswers({
                importance: {
                    imageQuality: 3,
                    videoQuality: 3,
                    autofocus: 4,
                    lowLight: 4,
                    portability: 5,
                    batteryLife: 2,
                },
            });
            const excellentPortabilityCamera = createCamera(
                "excellent-portability",
                "Excellent Portability Camera",
                {
                    usability: { level: "Intermediate", weightGrams: 300, hasFlipScreen: true },
                },
            );
            const poorPortabilityCamera = createCamera(
                "poor-portability",
                "Poor Portability Camera",
                {
                    usability: { level: "Intermediate", weightGrams: 750, hasFlipScreen: true },
                },
            );

            // Act
            const results = recommend(answers, [poorPortabilityCamera, excellentPortabilityCamera]);

            // Assert
            expect(results[0].id).toBe("excellent-portability");
            expect(results[1].id).toBe("poor-portability");
        });

        it("ranks a camera with stronger battery life higher when battery life is most important", () => {
            // Arrange
            const answers = createQuizAnswers({
                importance: {
                    imageQuality: 3,
                    videoQuality: 3,
                    autofocus: 4,
                    lowLight: 4,
                    portability: 3,
                    batteryLife: 5,
                },
            });
            const excellentBatteryLifeCamera = createCamera(
                "excellent-batterylife",
                "Excellent Battery Life Camera",
                {
                    batteryLife: 160,
                },
            );
            const poorBatteryLifeCamera = createCamera(
                "poor-batterylife",
                "Poor Battery Life Camera",
                {
                    batteryLife: 85,
                },
            );

            // Act
            const results = recommend(answers, [poorBatteryLifeCamera, excellentBatteryLifeCamera]);

            // Assert
            expect(results[0].id).toBe("excellent-batterylife");
            expect(results[1].id).toBe("poor-batterylife");
        });
    });
});
