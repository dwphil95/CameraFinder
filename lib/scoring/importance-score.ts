import "server-only";

import { Camera, ImportanceRatings } from "../types";

const importanceMultiplier: Record<number, number> = {
    1: 0.25,
    2: 0.5,
    3: 1,
    4: 1.5,
    5: 2,
};

const importanceBaseScores = {
    Poor: 0,
    Average: 2,
    Good: 3,
    Excellent: 4,
};

export const determineImportanceScore = (imp: ImportanceRatings, camera: Camera) => {
    /* 
        Score importance by applying multiplier based on user's importance ratings for 
        individual camera categories from 1 to 5. Then add this weight to the base score,
        determined by the camera's specific properties.

        importanceScore += (computedCategoryScore * categoryImportanceMultiplier)
    */
    let importanceScore = 0;

    // Image Quality
    let imageQualityScore = 0;
    const imageQualityMultiplier = importanceMultiplier[imp.imageQuality];
    if (camera.sensor === "Full Frame") imageQualityScore += 4;
    else if (camera.sensor === "APS-C") imageQualityScore += 3;
    else if (camera.sensor === "Micro Four Thirds") imageQualityScore += 2;

    if (camera.resolutionMP >= 40) imageQualityScore += 3;
    else if (camera.resolutionMP >= 24) imageQualityScore += 2;

    if (camera.photo.burstFps >= 20) imageQualityScore += 2;
    importanceScore += imageQualityScore * imageQualityMultiplier;

    // Video Quality
    let videoQualityScore = 0;
    const videoQualityMultiplier = importanceMultiplier[imp.videoQuality];
    if (camera.video.maxResolution === "8K") videoQualityScore += 4;
    else if (camera.video.maxResolution === "6K") videoQualityScore += 3;
    else if (camera.video.maxResolution === "4K") videoQualityScore += 2;
    else if (camera.video.maxResolution === "1080p") videoQualityScore += 1;

    if (camera.video.maxResolutionFps >= 60) videoQualityScore += 2;
    if (camera.video.hasIBIS) videoQualityScore += 2;
    if (camera.video.hasLog) videoQualityScore += 2;
    importanceScore += videoQualityScore * videoQualityMultiplier;

    // Autofocus
    const autofocusMultiplier = importanceMultiplier[imp.autofocus];
    importanceScore += importanceBaseScores[camera.photo.autofocus] * autofocusMultiplier;

    // Low-Light
    const lowLightMultiplier = importanceMultiplier[imp.lowLight];
    importanceScore += importanceBaseScores[camera.photo.lowLight] * lowLightMultiplier;

    // Portability
    const portabilityMultiplier = importanceMultiplier[imp.portability];
    if (camera.usability.weightGrams <= 400) importanceScore += 4 * portabilityMultiplier;
    else if (camera.usability.weightGrams <= 550) importanceScore += 3 * portabilityMultiplier;
    else if (camera.usability.weightGrams <= 700) importanceScore += 2 * portabilityMultiplier;
    else if (camera.usability.weightGrams <= 850) importanceScore += portabilityMultiplier;

    // Battery Life
    const batteryLifeMultiplier = importanceMultiplier[imp.batteryLife];
    if (camera.batteryLife >= 150) importanceScore += 4 * batteryLifeMultiplier;
    else if (camera.batteryLife >= 120) importanceScore += 3 * batteryLifeMultiplier;
    else if (camera.batteryLife >= 90) importanceScore += 2 * batteryLifeMultiplier;
    else if (camera.batteryLife >= 60) importanceScore += batteryLifeMultiplier;

    return importanceScore;
};
