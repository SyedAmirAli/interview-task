"use client"; // interactive-menu

import { useEffect, useRef } from "react";
import { WorkCard } from "./WorkCard";
import LastWorkSection from "./LastWorkSection";
import FirstWorkSection from "./FirstWorkSection";
import { useAppContext } from "@/context/ContextProvider";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
    const app = useAppContext();
    const workSectionRef = useRef<HTMLElement>(null);
    const workSectionContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!Array.isArray(app.works) || app.works.length === 0) {
            return; // Exit early if works are not loaded
        }

        const section = workSectionRef.current;
        const container = workSectionContainerRef.current;

        if (!section || !container) return;

        // Clear previous GSAP animations and ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        const totalScrollWidth = container.scrollWidth - section.clientWidth;

        // Initialize GSAP animation
        gsap.to(container, {
            x: -totalScrollWidth,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${container.scrollWidth}`,
                scrub: true,
                pin: section,
                anticipatePin: 1,
            },
        });
    }, [app.works]); // Depend on app.works

    return (
        <section
            className="bg-white overflow-hidden"
            id="work-section"
            ref={workSectionRef}
        >
            <div
                ref={workSectionContainerRef}
                id="work-section-container"
                className="flex gap-6 overflow-hidden scrollbar-hide snap-x snap-mandatory max-h-screen min-h-screen p-20 items-center justify-start duration-500"
                style={{ scrollBehavior: "smooth" }}
            >
                {/* Work intro card */}
                <FirstWorkSection />

                {/* Work cards */}
                {Array.isArray(app.works) &&
                    app.works.map((work) => (
                        <a
                            key={work._id}
                            className="snap-start block single-work"
                            href="#"
                        >
                            <WorkCard {...work} />
                        </a>
                    ))}

                {/* View More card */}
                <LastWorkSection />
            </div>
        </section>
    );
}

/*  
const works = [
    {
        title: "Romans & Partners",
        image: "/assets/images/work-1.jpg",
        tags: [{ label: "UI/UX Design" }, { label: "Property Portal" }],
        isLatest: true,
    },
    {
        title: "Tech SuperPowers",
        image: "/assets/images/work-2.jpg",
        tags: [{ label: "UI/UX Design" }, { label: "Development" }],
    },
    {
        title: "Alveena Casa",
        image: "/assets/images/work-3.jpg",
        tags: [{ label: "UI/UX Design" }, { label: "E-Commerce" }],
    },
];

console.log(app.works);

useEffect(() => {
    const section = workSectionRef.current;
    const container = workSectionContainerRef.current;

    if (!section || !container) return;
    const totalScrollWidth = container.scrollWidth - section.clientWidth;

    // GSAP horizontal scroll animation
    gsap.to(container, {
        x: -totalScrollWidth,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${container.scrollWidth}`,
            scrub: true,
            pin: section,
            anticipatePin: 1,
        },
    });
}, [app]);
*/
