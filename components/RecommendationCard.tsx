"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { RecommendationCardProps } from "@/lib/props";
import Link from "next/link";

const RecommendationCard = ({
    index,
    recommendation,
    selectedContentTypes,
}: RecommendationCardProps) => {
    const [includedContentTypes] = useState(() =>
        selectedContentTypes.filter((contentType) =>
            recommendation.idealContentTypes.includes(contentType),
        ),
    );

    useEffect(() => {
        console.log(`${recommendation.name}: ${includedContentTypes}`);
    }, [recommendation, includedContentTypes]);

    return (
        <div className="bg-white mt-4 p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm ">
            <div className="grid grid-cols-6 gap-6">
                <div className="gap-2 col-span-2">
                    <h1 className="font-bold text-xl md:text-2xl">
                        #{index + 1}: {recommendation.name}
                    </h1>
                    <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl m-4">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <Camera className="w-24 h-24 sm:w-32 sm:h-32 text-white opacity-80" />
                        </div>
                    </div>
                    <div className="flex flex-cols item-center justify-center gap-2">
                        <Link
                            href={recommendation.purchaseLink}
                            target="_blank"
                            className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-4 border border-gray-700 rounded-lg"
                        >
                            Buy On Manufacturer Site
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col col-span-3 pt-4">
                    <div className="grid grid-cols-2 text-gray-700 gap-2">
                        <div className="bg-blue-50 p-3 gap-6 border border-gray-200 shadow-md rounded-sm">
                            <label className="block">
                                Max Burst Rate:{" "}
                                <span className="font-bold text-black">
                                    {`${recommendation.photo.burstFps} fps`}
                                </span>
                            </label>
                        </div>
                        <div className="bg-blue-50 p-3 gap-6 border border-gray-200 shadow-md rounded-sm">
                            <label className="block">
                                Weight:{" "}
                                <span className="font-bold text-black">
                                    {`${recommendation.usability.weightGrams} grams`}
                                </span>
                            </label>
                        </div>
                        <div className="bg-blue-50 p-3 gap-6 border border-gray-200 shadow-md rounded-sm">
                            <label className="block">
                                Resolution Pixels:{" "}
                                <span className="font-bold text-black">
                                    {`${recommendation.resolutionMP} MP`}
                                </span>
                            </label>
                            <label className="block">
                                Max Resolution:{" "}
                                <span className="font-bold text-black">
                                    {`${recommendation.video.maxResolution} ${recommendation.video.maxResolutionFps} fps`}
                                </span>
                            </label>
                        </div>
                        <div className="bg-blue-50 p-3 gap-6 border border-gray-200 shadow-md rounded-sm">
                            <label className="block">
                                Type:{" "}
                                <span className="font-bold text-black">{recommendation.type}</span>
                            </label>
                            <label className="block">
                                Sensor:{" "}
                                <span className="font-bold text-black">
                                    {recommendation.sensor}
                                </span>
                            </label>
                        </div>
                        <div className="grid grid-cols-3 col-span-2">
                            {includedContentTypes.map((contentType, index) => (
                                <p
                                    key={index}
                                    className="text-black font-bold text-xs text-center bg-amber-200 gap-2 m-2 p-2 border border-gray-400 shadow-sm rounded-sm"
                                >
                                    {contentType}
                                </p>
                            ))}
                        </div>
                        <div className="font-bold col-span-2 p-4 text-black text-lg">
                            <span>{recommendation.description}</span>
                        </div>
                        <div className="bg-green-100 col-span-2 md:col-span-1 p-3 gap-4 rounded-2xl border border-gray-300">
                            <span className="font-bold">Pros:</span>
                            <ul className="list-disc text-black text-sm p-3">
                                {recommendation.pros.map((pro, index) => (
                                    <li key={index}>{pro}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-100 col-span-2 md:col-span-1 p-3 gap-4 rounded-2xl border border-gray-300">
                            <span className="font-bold">Cons:</span>
                            <ul className="list-disc text-black text-sm p-3">
                                {recommendation.cons.map((con, index) => (
                                    <li key={index}>{con}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="gap-2">
                    <h1 className="flex justify-end font-extrabold text-xl md:text-3xl">
                        {recommendation.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;
