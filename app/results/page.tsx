"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { importance, initialAnswers } from "@/lib/constants";
import { Camera, QuizAnswers } from "@/lib/types";
import Link from "next/link";
import RecommendationCard from "@/components/RecommendationCard";
import NoRecommendations from "@/components/NoRecommendations";

const Results = () => {
    const [answers] = useState<QuizAnswers>(() => {
        try {
            if (typeof window === "undefined") return initialAnswers;

            const storedAnswers = localStorage.getItem("answers");
            return storedAnswers ? JSON.parse(storedAnswers) : initialAnswers;
        } catch (err) {
            console.error("Failed to parse answers:", err);
            return initialAnswers;
        }
    });

    const hasAnswers =
        answers.budget !== "" &&
        answers.useCase !== "" &&
        answers.skillLevel !== "" &&
        answers.contentTypes.length > 0;
    const [recommendations, setRecommendations] = useState<Camera[] | null>(null);
    const [fetchError, setFetchError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        if (!hasAnswers) return;
        let cancelled = false;

        fetch("/api/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Recommendation request failed");
                return res.json();
            })
            .then(({ cameras }) => {
                if (!cancelled) setRecommendations(cameras);
            })
            .catch(() => {
                if (!cancelled) setFetchError(true);
            });
        return () => {
            cancelled = true;
        };
    }, [hasAnswers, answers, retryCount]);

    const isLoading = hasAnswers && recommendations === null && !fetchError;

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            <div className="flex-1">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h1 className="text-3xl pb-3 font-bold">Your Recommendations</h1>
                    <h4 className="pb-3">
                        Here are your top recommendations based on the preferences you provided
                        below:
                    </h4>
                    <div className="bg-linear-to-r from-sky-100 to-sky-150 p-5 sm:p-6 mb-3 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between gap-4">
                            <h4 className="text-lg font-bold pb-3">Your Preferences</h4>
                            <Link
                                href="/quiz"
                                className="flex items-center text-sm text-white font-bold bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded border border-gray-200 shadow-md"
                            >
                                <Pencil className="w-5 h-5 pr-1" />
                                Edit Preferences
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <div className="gap-2 p-4">
                                <label className="block">
                                    Budget:{" "}
                                    <span className="font-bold text-black">{answers.budget}</span>
                                </label>
                                <label className="block">
                                    Use Case:{" "}
                                    <span className="font-bold text-black">{answers.useCase}</span>
                                </label>
                                <label className="block">
                                    Skill Level:{" "}
                                    <span className="font-bold text-black">
                                        {answers.skillLevel}
                                    </span>
                                </label>
                                <label className="block">
                                    Content Type:{" "}
                                    <span className="font-bold text-black">
                                        {answers.contentTypes.join(", ")}
                                    </span>
                                </label>
                            </div>
                            <div className="gap-2 p-4">
                                {importance.map(({ key, label }) => (
                                    <label key={key} className="block">
                                        {label}:{" "}
                                        <span className="font-bold text-black">
                                            {answers.importance[key]}/5
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl pt-6 font-bold">Your Camera Matches:</h2>

                    {isLoading && <p className="text-gray-600 py-8">Finding your best matches…</p>}

                    {fetchError && (
                        <p className="text-red-600 py-8">
                            Something went wrong loading recommendations...{" "}
                            <button
                                type="button"
                                className="underline"
                                onClick={() => {
                                    setFetchError(false);
                                    setRecommendations([]);
                                    setRetryCount((c) => c + 1);
                                }}
                            >
                                Retry
                            </button>
                        </p>
                    )}

                    {!isLoading &&
                        !fetchError &&
                        (recommendations?.length === 0 ? (
                            <NoRecommendations />
                        ) : (
                            recommendations?.map((recommendation, index) => (
                                <RecommendationCard
                                    key={recommendation.id}
                                    index={index}
                                    recommendation={recommendation}
                                    selectedContentTypes={answers.contentTypes}
                                />
                            ))
                        ))}

                    {!isLoading && !fetchError && (
                        <div className="flex flex-col items-center justify-center">
                            <Link
                                href="/quiz"
                                className="sm:text-lg lg:text-3xl text-white font-bold font-mono bg-rose-500 hover:bg-rose-700 sm:px-6 lg:px-10 py-4 mt-6 rounded-3xl border border-gray-200 shadow-md"
                            >
                                Retake Quiz!
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Results;
