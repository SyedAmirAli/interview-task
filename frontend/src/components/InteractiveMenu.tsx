"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Assets from "@/assets";

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
            image: "/assets/images/work-1.jpg",
        },
    },
    {
        title: "Website Design",
        caseStudy: {
            title: "Romans & Partners",
            image: "/assets/images/work-2.jpg",
        },
    },
    {
        title: "Digital Products",
        caseStudy: {
            title: "Fudli App",
            image: "/assets/images/work-3.jpg",
        },
    },
    {
        title: "Brand Identities",
        caseStudy: {
            title: "Learning Library",
            image: "/assets/images/work-4.jpg",
        },
    },
];

export default function InteractiveMenu() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            id="interactive-menu"
            className="bg-[#111] text-white min-h-screen flex items-center justify-center py-24 px-20 bg-gradient-bottom"
            ref={containerRef}
        >
            <div className="w-full">
                {/* Header */}
                <motion.h2
                    className="text-[1.75vw] text-slate-100 pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Our team of experts can help you with...
                </motion.h2>

                {/* Menu Items */}
                <div className="relative mb-12">
                    <div className="space-y-4">
                        {menuItems.map((item, index) => (
                            <div
                                key={item.title}
                                className="flex justify-between items-center group"
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    // whileHover="hover"
                                    whileHover={{ scale: 1 }}
                                    style={{ scale: 1.05, transition: "500ms" }}
                                    // className="relative group"
                                    // whileHover={{ scale: 1.05 }}
                                >
                                    <span className="text-[3.5vw] font-semibold scale-105 group-hover:scale-100 duration-500">
                                        {item.title}
                                    </span>
                                </motion.button>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute right-0 flex items-center gap-4"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="text-left">
                                                    <p className="text-lg text-gray-400 mb-1">
                                                        Latest Case Study
                                                    </p>
                                                    <p className="text-3xl text-slate-200 font-medium">
                                                        {item.caseStudy.title}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="size-[72px] rounded-full overflow-hidden relative">
                                                        <Image
                                                            src={
                                                                item.caseStudy
                                                                    .image
                                                            }
                                                            alt={
                                                                item.caseStudy
                                                                    .title
                                                            }
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <Assets.svg.rightArrow />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agency Info */}
                <div className="w-full mt-12 border-t border-white/10 pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="w-full flex justify-between items-end"
                    >
                        <div className="w-full">
                            <h2 className="text-5xl font-bold bg-[linear-gradient(45deg,#545cff,#8d95ff_80%)] bg-clip-text text-transparent pb-6">
                                Creative Agency
                            </h2>
                            <p className="text-2xl leading-[1.5] pt-6">
                                We’re an award-winning{" "}
                                <a href="https://www.artistsweb.com/web-design-london/">
                                    creative agency
                                </a>{" "}
                                based in London, focused on{" "}
                                <a href="https://www.artistsweb.com/web-design-london/#e-commerce">
                                    E-Commerce
                                </a>
                                ,{" "}
                                <a href="https://www.artistsweb.com/web-design-london/#website-design">
                                    Web Design London
                                </a>
                                ,{" "}
                                <a href="https://www.artistsweb.com/web-design-london/#digital-products">
                                    Digital Products
                                </a>
                                ,{" "}
                                <a href="https://www.artistsweb.com/web-design-london/#brand-dentities">
                                    Branding
                                </a>{" "}
                                and SEO.
                            </p>
                        </div>
                        <div className="w-full items-center justify-end flex gap-4">
                            <div className="px-12 text-2xl font-medium border border-solid border-primary py-5 rounded-full text-white">
                                300+ Projects
                            </div>
                            <div className="px-12 text-2xl font-medium border border-solid border-primary py-5 rounded-full text-white">
                                15 Awards
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
