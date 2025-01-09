"use client";
import { HeroSectionCountType } from "@/constants/types";
import { useEffect, useState } from "react";

export default function AnimatedCreditShow({
    counts,
}: {
    counts: HeroSectionCountType[];
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % counts.length); // Cycle through counts
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex gap-3 items-center">
            <button className="relative overflow-hidden text-xl rounded-full bg-black border-none text-white size-14 flex items-center justify-center group">
                {counts.map((count: HeroSectionCountType, index) => (
                    <span
                        key={index}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                            index === currentIndex
                                ? "translate-y-0 opacity-100"
                                : index < currentIndex
                                ? "-translate-y-full opacity-0"
                                : "translate-y-full opacity-0"
                        }`}
                    >
                        {count.count}
                    </span>
                ))}
            </button>
            <button className="relative overflow-hidden text-xl w-80 h-10">
                {counts.map((count: HeroSectionCountType, index) => (
                    <span
                        key={index}
                        className={`absolute inset-0 flex items-center text-slate-500 transition-all duration-500 ${
                            index === currentIndex
                                ? "translate-y-0 opacity-100"
                                : index < currentIndex
                                ? "-translate-y-full opacity-0"
                                : "translate-y-full opacity-0"
                        }`}
                    >
                        {count.title}
                    </span>
                ))}
            </button>
        </div>
    );
}
