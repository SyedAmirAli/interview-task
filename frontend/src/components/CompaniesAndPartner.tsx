"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Assets from "@/assets";

interface ScrollRevealTextProps {
    text: string;
    className?: string;
}
export function ScrollRevealText({
    text,
    className = "",
}: ScrollRevealTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleWheel = (event: WheelEvent) => {
                // Adjust speed with multiplier
                setTranslateX((prev) => {
                    // Clamp the value between -2000 and 1500
                    const newTranslateX = prev - event.deltaY * 3; // Adjust the multiplier as needed
                    return Math.min(500, Math.max(-500, newTranslateX)); // Limit the values
                });
            };

            document.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                document.removeEventListener("wheel", handleWheel);
            };
        }
    }, []);

    return (
        <div
            className="relative flex items-center justify-center overflow-hidden pt-[20vh]"
            ref={ref}
        >
            <div
                className={`sticky h-[30vh] top-1/2 -translate-y-1/2 ${className}`}
                style={{
                    transform: `translate3d(${translateX}px, 0, 0)`,
                    transition: "transform 0.1s linear", // Smooth movement
                }}
            >
                <h2 className="text-[8vw] font-poppins text-nowrap font-bold leading-tight">
                    {text}
                </h2>
            </div>
        </div>
    );
}

export function useSequenceAnimation(items: any[], delay: number = 2000) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isReversing, setIsReversing] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        if (!isAnimating) return;

        const timer = setTimeout(() => {
            if (isReversing) {
                if (currentIndex === 0) {
                    setIsReversing(false);
                    setTimeout(() => {
                        setCurrentIndex(1);
                    }, delay);
                } else {
                    setCurrentIndex(currentIndex - 1);
                }
            } else {
                if (currentIndex === items.length - 1) {
                    setIsReversing(true);
                    setTimeout(() => {
                        setCurrentIndex(items.length - 2);
                    }, delay);
                } else {
                    setCurrentIndex(currentIndex + 1);
                }
            }
        }, 1000); // Time between each animation

        return () => clearTimeout(timer);
    }, [currentIndex, items.length, delay, isAnimating, isReversing]);

    return { currentIndex, isReversing, isAnimating, setIsAnimating };
}

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function AnimatedText({
    text,
    className = "",
    delay = 0,
}: AnimatedTextProps) {
    const words = text.split(" ");

    return (
        <div className="max-w-5xl w-full">
            <motion.div
                initial="hidden"
                animate="visible"
                className={className}
            >
                {words.map((word, i) => (
                    <motion.h1
                        key={i}
                        className="inline-block mr-6 text-[3vw] font-poppins font-medium text-justify"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.1,
                        }}
                        style={{ fontWeight: 600 }}
                    >
                        {word}
                    </motion.h1>
                ))}
            </motion.div>
        </div>
    );
}

const firstSet = [
    { src: <Assets.svg.logos.one width={200} height={80} />, alt: "Deezer" },
    { src: <Assets.svg.logos.two width={200} height={80} />, alt: "BMW" },
    { src: <Assets.svg.logos.three width={200} height={80} />, alt: "Costa" },
    { src: <Assets.svg.logos.four width={200} height={80} />, alt: "ITV" },
    { src: <Assets.svg.logos.five width={200} height={80} />, alt: "BBC" },
];

const secondSet = [
    {
        src: <Assets.svg.logos.six width={200} height={80} />,
        alt: "Tech Superpowers",
    },
    { src: <Assets.svg.logos.seven width={200} height={80} />, alt: "Vortexa" },
    {
        src: <Assets.svg.logos.eight width={200} height={80} />,
        alt: "Boschung",
    },
    { src: <Assets.svg.logos.nine width={200} height={80} />, alt: "Fudli" },
    {
        src: <Assets.svg.logos.ten width={200} height={80} />,
        alt: "Knowledge Train",
    },
];

export function AnimatedSection() {
    const [currentSet, setCurrentSet] = useState(firstSet);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isReversing, setIsReversing] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (isTransitioning) return;

            if (isReversing) {
                if (currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                } else {
                    setIsTransitioning(true);
                    setTimeout(() => {
                        setCurrentSet(
                            currentSet === firstSet ? secondSet : firstSet
                        );
                        setIsReversing(false);
                        setCurrentIndex(-1);
                        setIsTransitioning(false);
                    }, 100); // Wait for the last logo to disappear
                }
            } else {
                if (currentIndex < 3) {
                    setCurrentIndex(currentIndex + 1);
                } else {
                    // Animate the last logo immediately
                    setCurrentIndex(4);
                    // Wait before starting to hide logos
                    setTimeout(() => {
                        setIsReversing(true);
                        setCurrentIndex(4);
                    }, 500);
                }
            }
        }, 500); // Animation interval

        return () => clearInterval(timer);
    }, [currentIndex, isReversing, currentSet, isTransitioning]);

    return (
        <div className="mt-20 px-4 py-20">
            <div className="flex justify-between items-center gap-8">
                {currentSet.map((logo, index) => (
                    <motion.div
                        key={`${logo.alt}-${
                            currentSet === firstSet ? "first" : "second"
                        }-${index}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                            opacity: isReversing
                                ? index > currentIndex
                                    ? 0
                                    : 1
                                : index <= currentIndex
                                ? 1
                                : 0,
                            y: isReversing
                                ? index > currentIndex
                                    ? 50
                                    : 0
                                : index <= currentIndex
                                ? 0
                                : 50,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                        }}
                        className="w-32 h-12 relative"
                    >
                        {logo.src}
                        {/* <Image
                            src={logo.src}
                            alt={logo.alt}
                            fill
                            className="object-contain"
                        /> */}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function CompaniesAndPartner() {
    return (
        <div className="p-20" id="animate-text-scroll-slider">
            <AnimatedText text="From ambitious startups to global companies, we partner with great businesses and industry leaders." />
            <AnimatedSection />
            <ScrollRevealText text="Elevate your digital presence" />
        </div>
    );
}
