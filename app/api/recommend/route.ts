import { NextResponse } from "next/server";
import { recommend } from "@/lib/scoring/recommend";
import { getCameras } from "@/lib/cameras/get-cameras";
import { parseQuizAnswers } from "@/lib/quiz/parse-answers";
import { aiRerank } from "@/lib/ai/ai-rerank";

export const POST = async (request: Request) => {
    const body = await request.json();
    const answers = parseQuizAnswers(body); // throws 400 on invalid

    // Load camera data
    const cameras = getCameras();

    // Rank cameras to generate top 10 candidate cameras
    const candidateCameras = recommend(answers, cameras);

    // AI integration to refine and generate top 3 camera results (to be worked on in next major milestone)
    const recommendations = aiRerank(answers, candidateCameras);

    return NextResponse.json({ recommendations });
};
