"use client";

import { useEffect, useRef } from "react";

interface MouseParallaxProps {
    children: React.ReactNode;
}

export function MouseParallax({ children }: MouseParallaxProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { width, height } = container.getBoundingClientRect();

            const xPercent = (clientX / width - 0.5) * 2;
            const yPercent = (clientY / height - 0.5) * 2;

            const x = xPercent * 50; // Max movement in pixels
            const y = yPercent * 50;

            container.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="transition-transform duration-300 ease-out will-change-transform"
        >
            {children}
        </div>
    );
}
