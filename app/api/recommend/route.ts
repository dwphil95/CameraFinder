import { NextResponse } from "next/server";
import { recommend } from "@/lib/scoring/recommend";
import { getCameras } from "@/lib/cameras/get-cameras";
import { parseQuizAnswers } from "@/lib/quiz/parse-answers";

export const POST = async (request: Request) => {
    const body = await request.json();
    const answers = parseQuizAnswers(body); // throws 400 on invalid

    // Load camera data
    const cameras = getCameras();

    // Rank cameras
    const recommendations = recommend(answers, cameras);
    return NextResponse.json({ recommendations });
};
