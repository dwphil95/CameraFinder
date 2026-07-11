import { ContentType, QuizAnswers } from "./types";

export const questions = [
    {
        key: "budget",
        question: "What is your budget?",
        action: "Choose your budget range ($):",
    },
    {
        key: "useCase",
        question: "What's your primary use case?",
        action: "Choose your primary use case:",
    },
    {
        key: "skillLevel",
        question: "What is your skill level?",
        action: "Choose your skill level:",
    },
    {
        key: "contentTypes",
        question: "What types of content you are shooting?",
        action: "Choose your intended content types (select all that apply):",
    },
    {
        key: "importance",
        question: "Rate these features based on importance.",
        action: "Rate these features based on importance (1 = Least Important, 5 = Most Important):",
    },
];

export const budgetRanges = [
    {
        id: "none",
        value: "",
        label: "Choose a budget range...",
        min: null,
        max: null,
    },
    {
        id: "under-500",
        value: "Under $500",
        label: "Under $500",
        min: null,
        max: 500,
    },
    {
        id: "500-1000",
        value: "$500-$1,000",
        label: "$500–$1,000",
        min: 500,
        max: 1000,
    },
    {
        id: "1000-2000",
        value: "$1,000-$2,000",
        label: "$1,000-$2,000",
        min: 1000,
        max: 2000,
    },
    {
        id: "2000-3000",
        value: "$2,000-$3,000",
        label: "$2,000-$3,000",
        min: 2000,
        max: 3000,
    },
    {
        id: "3000-plus",
        value: "$3,000+",
        label: "$3,000+",
        min: 3000,
        max: null,
    },
] as const;

export const useCases = ["Photography", "Videography", "Hybrid"];

export const skillLevels = ["Beginner", "Intermediate", "Professional"];

export const contentTypes: Array<ContentType> = [
    "Social Media",
    "Cinematic Filmmaking",
    "Portraits",
    "Nature/Wildlife",
    "Action/Sports",
    "Travel Vlogging",
    "Weddings/Events",
    "Landscape",
];

export const importance = [
    { key: "imageQuality" as const, label: "Image Quality" },
    { key: "videoQuality" as const, label: "Video Quality" },
    { key: "autofocus" as const, label: "Autofocus Performance" },
    { key: "lowLight" as const, label: "Low-Light Performance" },
    { key: "portability" as const, label: "Portability" },
    { key: "batteryLife" as const, label: "Battery Life" },
];

export const initialAnswers: QuizAnswers = {
    budget: "",
    useCase: "",
    skillLevel: "",
    contentTypes: [],
    importance: {
        imageQuality: 3,
        videoQuality: 3,
        autofocus: 3,
        lowLight: 3,
        portability: 3,
        batteryLife: 3,
    },
};
