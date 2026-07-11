import "server-only";

import { CameraScores } from "../types";

export const handleTieBreakers = (a: CameraScores, b: CameraScores) => {
    // Content types (Top priority)
    if (b.scores.contentTypes !== a.scores.contentTypes)
        return b.scores.contentTypes - a.scores.contentTypes;

    // Use cases (photo, video, or hybrid)
    if (b.scores.useCases !== a.scores.useCases) return b.scores.useCases - a.scores.useCases;

    // Importance alignment
    if (b.scores.importance !== a.scores.importance)
        return b.scores.importance - a.scores.importance;

    // Budget
    if (b.scores.budget !== a.scores.budget) return b.scores.budget - a.scores.budget;

    // Skill level (Least priority)
    if (b.scores.skillLevel !== a.scores.skillLevel)
        return b.scores.skillLevel - a.scores.skillLevel;

    // If equal scoring across all categories, list cheaper cameras first (rank cheaper cameras higher, ascending order)
    return a.camera.price - b.camera.price;
};