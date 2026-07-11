import { budgetRanges } from "./constants";

export type BudgetRange = (typeof budgetRanges)[number]["value"];

export type ContentType =
    | "Social Media"
    | "Cinematic Filmmaking"
    | "Portraits"
    | "Nature/Wildlife"
    | "Action/Sports"
    | "Travel Vlogging"
    | "Weddings/Events"
    | "Landscape";

export type ImportanceRatings = {
    imageQuality: number;
    videoQuality: number;
    autofocus: number;
    lowLight: number;
    portability: number;
    batteryLife: number;
};

export type QuizAnswers = {
    budget: BudgetRange;
    useCase: "Photography" | "Videography" | "Hybrid" | "";
    skillLevel: "Beginner" | "Intermediate" | "Professional" | "";
    contentTypes: Array<ContentType>;
    importance: ImportanceRatings;
};

export type Camera = {
    id: string;
    name: string;
    brand: string;
    type: "Mirrorless" | "DSLR";
    price: number; // Body only (USD)
    sensor: "Full Frame" | "APS-C" | "Micro Four Thirds" | "Medium Format";
    resolutionMP: number;
    batteryLife: number; // Minutes

    // VIDEO CAPABILITIES (for videography use case)
    video: {
        maxResolution: "1080p" | "4K" | "6K" | "8K";
        maxResolutionFps: number; // Standard video only, not slow motion
        hasIBIS: boolean;
        hasLog: boolean;
    };

    // PHOTO CAPABILITIES (for photography use case)
    photo: {
        burstFps: number; // With electronic shutter
        lowLight: "Poor" | "Average" | "Good" | "Excellent";
        autofocus: "Poor" | "Average" | "Good" | "Excellent";
    };

    // USABILITY
    usability: {
        level: "Beginner" | "Intermediate" | "Professional";
        weightGrams: number;
        hasFlipScreen: boolean;
    };

    // USE CASES
    idealUseCases: Array<"Photography" | "Videography">;

    // CONTENT TYPES
    idealContentTypes: Array<ContentType>;

    // UI + AI OUTPUT
    description: string;
    pros: string[];
    cons: string[];

    recommendationReason: string;

    // MANUFACTURER PURCHASE LINK
    purchaseLink: string;
};

export type CameraScores = {
    camera: Camera;
    scores: {
        total: number;
        budget: number;
        skillLevel: number;
        useCases: number;
        contentTypes: number;
        importance: number;
    };
};
