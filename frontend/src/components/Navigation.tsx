"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedButton } from "@/components/AnimatedButton";
import { cn } from "@/lib/utils";
import Assets from "@/assets";
import MenuOverlay from "./MenuOverlay";

export function Navigation() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [logoError, setLogoError] = useState(false);

    const [isOverlay, setIsOverlay] = useState(false);

    const handleToggleOverlay = () => setIsOverlay(!isOverlay);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        const addListener = () =>
            window.addEventListener("scroll", handleScroll, { passive: true });
        addListener();

        const rmListener = () =>
            window.removeEventListener("scroll", handleScroll);

        return rmListener;
    }, [lastScrollY]);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-sm z-50 transition-transform duration-300",
                    isVisible ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <div className="mx-auto px-[90px] py-4 flex justify-between items-center">
                    <div className=" flex items-center">
                        {logoError ? (
                            <span className="text-2xl font-bold">Logo</span>
                        ) : (
                            <Assets.svg.logo width={60} height={50} />
                        )}
                    </div>
                    <div className="flex items-center space-x-6">
                        <AnimatedButton
                            text="Get in touch"
                            className="py-1.5 bg-transparent"
                        />
                        <AnimatedButton
                            onClick={handleToggleOverlay}
                            text={<Assets.svg.equal width={16} height={16} />}
                            className="p-2 flex items-center justify-center bg-transparent"
                        />
                    </div>
                </div>
            </nav>

            <MenuOverlay onClose={handleToggleOverlay} isOpen={isOverlay} />
        </>
    );
}
