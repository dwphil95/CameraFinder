import type { Camera, ImportanceRatings, QuizAnswers } from "@/lib/types";

export const defaultImportance: ImportanceRatings = {
    imageQuality: 3,
    videoQuality: 3,
    autofocus: 3,
    lowLight: 3,
    portability: 3,
    batteryLife: 3,
};

export const createQuizAnswers = (overrides: Partial<QuizAnswers> = {}): QuizAnswers => ({
    budget: "$1,000-$2,000",
    useCase: "Photography",
    skillLevel: "Intermediate",
    contentTypes: [],
    importance: defaultImportance,
    ...overrides,
});

export const createCamera = (
    id: string,
    name: string,
    overrides: Partial<Camera> = {},
): Camera => ({
    id,
    name,
    brand: "Test",
    type: "Mirrorless",
    price: 1500,
    sensor: "APS-C",
    resolutionMP: 24,
    batteryLife: 90,
    video: {
        maxResolution: "4K",
        maxResolutionFps: 30,
        hasIBIS: false,
        hasLog: false,
    },
    photo: {
        burstFps: 10,
        lowLight: "Good",
        autofocus: "Good",
    },
    usability: {
        level: "Intermediate",
        weightGrams: 500,
        hasFlipScreen: true,
    },
    idealUseCases: ["Photography", "Videography"],
    idealContentTypes: [],
    description: "Test camera",
    pros: [],
    cons: [],
    recommendationReason: "Test recommendation",
    purchaseLink: "https://example.com",
    ...overrides,
});
