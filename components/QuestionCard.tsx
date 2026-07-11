"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContentType, ImportanceRatings, QuizAnswers } from "@/lib/types";
import {
    questions,
    budgetRanges,
    skillLevels,
    useCases,
    contentTypes,
    importance,
    initialAnswers,
} from "@/lib/constants";
import Button from "./Button";

const QuestionCard = () => {
    const router = useRouter();
    const [questionNum, setQuestionNum] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);

    useEffect(() => {
        // Print latest 'answers' state value for debugging purposes
        console.log(answers);
    }, [answers]);

    const updateAnswers = (key: keyof QuizAnswers, value: string) => {
        setAnswers({ ...answers, [key]: value });
    };

    const updateContentTypes = (value: ContentType) => {
        setAnswers({
            ...answers,
            contentTypes: answers.contentTypes.includes(value)
                ? answers.contentTypes.filter((type) => type !== value)
                : [...answers.contentTypes, value],
        });
    };

    const updateImportance = (key: keyof ImportanceRatings, value: number) => {
        setAnswers({
            ...answers,
            importance: { ...answers.importance, [key]: value },
        });
    };

    const handlePrev = () => {
        setQuestionNum(questionNum - 1);
    };

    const handleNext = () => {
        setQuestionNum(questionNum + 1);
    };

    const disableNext = () => {
        const key = questions[questionNum]["key"] as keyof typeof answers;
        return key === "contentTypes" ? !answers[key].length : !answers[key];
    };

    const handleSubmit = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("answers", JSON.stringify(answers));
            router.push("/results");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {questions[questionNum]["question"]}
                        </h1>
                        <span className="text-sm font-medium text-gray-600">
                            {questionNum + 1} of {questions.length}
                        </span>
                    </div>
                </div>
                <div>
                    <div>
                        <label className="block font-medium mb-4">
                            {questions[questionNum]["action"]}
                        </label>
                        {questionNum == 0 && ( // Budget
                            <select
                                value={answers.budget}
                                onChange={(e) => updateAnswers("budget", e.target.value)}
                                className="w-full px-4 py-3 shadow-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                            >
                                {budgetRanges.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        )}
                        {questionNum == 1 && ( // Use case
                            <div>
                                {useCases.map((useCase) => (
                                    <label
                                        key={useCase}
                                        className="m-3 p-4 flex rounded-xl shadow-sm border border-gray-300"
                                    >
                                        <input
                                            type="radio"
                                            name="useCase"
                                            value={useCase}
                                            checked={answers.useCase === useCase && true}
                                            onChange={(e) =>
                                                updateAnswers("useCase", e.target.value)
                                            }
                                            className="mt-1 w-4 h-4"
                                        />
                                        <span className="ml-3 text-gray-900 font-medium">
                                            {useCase}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {questionNum == 2 && ( // Skill level
                            <div>
                                {skillLevels.map((skillLevel) => (
                                    <label
                                        key={skillLevel}
                                        className="m-3 p-4 flex rounded-xl shadow-sm border border-gray-300"
                                    >
                                        <input
                                            type="radio"
                                            name="skillLevel"
                                            value={skillLevel}
                                            checked={answers.skillLevel === skillLevel && true}
                                            onChange={(e) =>
                                                updateAnswers("skillLevel", e.target.value)
                                            }
                                            className="mt-1 w-4 h-4"
                                        />
                                        <span className="ml-3 text-gray-900 font-medium">
                                            {skillLevel}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {questionNum == 3 && ( // Content type
                            <div>
                                {contentTypes.map((contentType) => (
                                    <label
                                        key={contentType}
                                        className="m-3 p-4 flex rounded-xl shadow-sm border border-gray-300"
                                    >
                                        <input
                                            type="checkbox"
                                            name="contentType"
                                            value={contentType}
                                            checked={answers.contentTypes.includes(contentType)}
                                            onChange={(e) =>
                                                updateContentTypes(e.target.value as ContentType)
                                            }
                                            className="mt-1 w-4 h-4"
                                        />
                                        <span className="ml-3 text-gray-900 font-medium">
                                            {contentType}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {questionNum == 4 && ( // Camera feature importance
                            <div>
                                {importance.map(({ key, label }) => (
                                    <div key={key} className="p-3">
                                        <div className="flex justify-between gap-2">
                                            <label className="font-bold">{label}</label>
                                            <label className="font-bold">
                                                {answers.importance[key]}/5
                                            </label>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="5"
                                            value={answers.importance[key]}
                                            onChange={(e) =>
                                                updateImportance(key, parseInt(e.target.value))
                                            }
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-10 flex justify-between gap-4">
                    <div>
                        {questionNum > 0 && (
                            <Button
                                handleClick={handlePrev}
                                disabled={false}
                                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Prev
                            </Button>
                        )}
                    </div>
                    {questionNum + 1 < questions.length ? (
                        <Button
                            handleClick={handleNext}
                            disabled={disableNext()}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            handleClick={handleSubmit}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            See My Results
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
