import Link from "next/link";
import { Camera, Sparkles, Zap, DollarSign, CheckCircle, ArrowRight } from "lucide-react";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            <div className="flex-1">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                    <Camera className="w-4 h-4" />
                                    AI-Powered Camera Matching
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Find the Perfect Camera for Your Needs
                                </h1>
                            </div>

                            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                                Answer a few quick questions about your photography style, budget,
                                and priorities. Our AI-powered engine analyzes your preferences and
                                instantly recommends your top 3 cameras.
                            </p>

                            <Link
                                href="/quiz"
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 sm:px-10 py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
                            >
                                Start the Quiz
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                                Takes just 2–3 minutes. No login needed.
                            </p>
                        </div>

                        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <Camera className="w-24 h-24 sm:w-32 sm:h-32 text-white opacity-80" />
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="group bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:from-blue-200 transition-colors">
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                No Login Required
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Start your search immediately with zero sign-up hassle.
                            </p>
                        </div>

                        <div className="group bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:from-blue-200 transition-colors">
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                AI-Powered Recommendations
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Smart algorithm matches you with the best cameras for your use case.
                            </p>
                        </div>

                        <div className="group bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:from-blue-200 transition-colors">
                                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                US Pricing & Availability
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                All recommendations include current US pricing and retailer links.
                            </p>
                        </div>

                        <div className="group bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:from-blue-200 transition-colors">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                Top 3 Ranked Results
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Get your best options ranked by relevance to your specific needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-t border-gray-200 mt-12 sm:mt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                        <span className="font-semibold text-gray-900">Affiliate Disclosure:</span>{" "}
                        Camera Finder may earn a commission from affiliate links at no extra cost to
                        you. We partner with retailers and manufacturers to provide you with
                        accurate pricing and availability information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
