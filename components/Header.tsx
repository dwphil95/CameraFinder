"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-bold text-gray-900"
                    >
                        <Camera className="w-8 h-8 text-blue-600" />
                        <span>Camera Finder</span>
                    </Link>

                    <nav className="flex gap-6">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors ${
                                pathname === "/"
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/quiz"
                            className={`text-sm font-medium transition-colors ${
                                pathname === "/quiz"
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Quiz
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
