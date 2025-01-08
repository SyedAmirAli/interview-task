"use client";

import { useState } from "react";
import { CaseStudyCard } from "./case-study-card";
import { cn } from "@/lib/utils";

interface MenuItem {
    title: string;
    caseStudy: {
        title: string;
        image: string;
    };
}

const menuItems: MenuItem[] = [
    {
        title: "E-commerce",
        caseStudy: {
            title: "Alveena Casa",
            image: "/placeholder.svg?height=100&width=100",
        },
    },
    {
        title: "Website Design",
        caseStudy: {
            title: "Modern Portfolio",
            image: "/placeholder.svg?height=100&width=100",
        },
    },
    {
        title: "Digital Products",
        caseStudy: {
            title: "Mobile App",
            image: "/placeholder.svg?height=100&width=100",
        },
    },
    {
        title: "Brand Identities",
        caseStudy: {
            title: "Brand Guide",
            image: "/placeholder.svg?height=100&width=100",
        },
    },
];

export function InteractiveMenu() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="bg-black text-white p-8 lg:p-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl mb-12">
                    Our team of experts can help you with...
                </h2>

                <div className="grid lg:grid-cols-[1fr,400px] gap-24">
                    {/* Left side - Menu items */}
                    <div className="space-y-6">
                        {menuItems.map((item, index) => (
                            <div key={item.title} className="relative group">
                                <button
                                    className={cn(
                                        "text-5xl font-bold transition-colors duration-300",
                                        "hover:text-blue-500",
                                        activeIndex === index
                                            ? "text-blue-500"
                                            : "text-white"
                                    )}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    {item.title}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right side - Case study cards */}
                    <div className="relative">
                        {menuItems.map((item, index) => (
                            <CaseStudyCard
                                key={item.title}
                                title={item.caseStudy.title}
                                image={item.caseStudy.image}
                                className={cn(
                                    "absolute top-0 left-0 right-0",
                                    "transition-all duration-300",
                                    activeIndex === index
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4 pointer-events-none"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Agency info */}
                <div className="mt-32">
                    <h2 className="text-5xl font-bold text-blue-500 mb-6">
                        Creative Agency
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mb-8">
                        We're an award-winning creative agency based in London,
                        focused on E-Commerce, Web Design, Digital Products,
                        Branding and SEO.
                    </p>
                    <div className="flex gap-8">
                        <div className="px-6 py-3 bg-zinc-900 rounded-full">
                            300+ Projects
                        </div>
                        <div className="px-6 py-3 bg-zinc-900 rounded-full">
                            15 Awards
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
