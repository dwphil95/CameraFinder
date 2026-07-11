import { NextResponse } from "next/server";
import { recommend } from "@/lib/scoring/recommend";
import { parseQuizAnswers } from "@/lib/quiz/parse-answers";

export const POST = async (request: Request) => {
    const body = await request.json();
    const answers = parseQuizAnswers(body); // throws 400 on invalid
    const cameras = recommend(answers);
    return NextResponse.json({ cameras });
};
