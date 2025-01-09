"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TestimonialCard from "./TestimonialCard";
import { cn } from "@/lib/utils";
import { MouseParallax } from "./MouseParallax";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: '"We have worked with Artistsweb to build a complete new website with quite complex connections with our CRM and accounting functions. The end product is brilliant, a really first class blend of design and functionality and the speed and depth of understanding about our business was remarkable. I’d highly recommend them."',
        author: "Emma Thompson",
        company: "Digital Innovations",
        image: "/assets/images/work-4.jpg",
    },
    {
        quote: '"Artistsweb built our new website and it has been an absolute pleasure working with the whole team. Excellent communication and they built us just an incredible looking website."',
        author: "Michael Chen",
        company: "Future Tech",
        image: "/assets/images/work-5.jpg",
    },
    {
        quote: "\"I had the absolute privilege of working with this wonderful team. The work they presented for my webpage was exactly what I had in mind. They are a team of talented artists who understood the concept and managed to deliver exactly what I was looking for. You don't need to look any further if you're looking for quality, professionalism, and a total artistic perspective. These guys are amazing! I won't leave them.\"",
        author: "Steven Glibbery",
        company: "TGA Mobility",
        image: "/assets/images/work-1.jpg",
    },
    {
        quote: '"In the years we’ve worked with Artistsweb, they have consistently been a solid, reliable, dedicated and effective partner. We value greatly their capacity to work quickly and the advice that they give us. Their knowledge and development skillset is unrivalled compared to other digital agencies we’ve worked with and we shall continue to collaborate with them undoubtedly, for many years to come."',
        author: "Nathan Smith",
        company: "Tech SuperPowers",
        image: "/assets/images/work-2.jpg",
    },
    {
        quote: '"Artistsweb are a great team of professionals to work with. They listened to our requirements very closely and delivered complex solutions with detail and outstanding creativity and more importantly to deadlines other agencies could not previously meet. We would highly recommend them to any corporation looking for a talented team of digital strategists, designers and developers."',
        author: "Fortunato Angelini",
        company: "Re-Core Pilates",
        image: "/assets/images/work-3.jpg",
    },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !cardsContainerRef.current) return;

        const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
        const section = sectionRef.current;
        const container = cardsContainerRef.current;

        // Initial setup
        gsap.set(cards, {
            yPercent: (i) => i * 100,
            opacity: (i) => (i === 0 ? 1 : 0.3),
            scale: (i) => (i === 0 ? 1 : 0.9),
            filter: (i) => `blur(${i === 0 ? 0 : 4}px)`,
        });

        // Create main scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${(cards.length - 1) * window.innerHeight}`,
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1 / (cards.length - 1),
                    duration: { min: 0.3, max: 0.6 },
                    ease: "power4.inOut",
                },
                onUpdate: (self) => {
                    // Update progress bar
                    if (progressBarRef.current) {
                        gsap.to(progressBarRef.current, {
                            scaleY: self.progress,
                            duration: 0.1,
                        });
                    }

                    // Calculate current card index
                    const progress = self.progress;
                    const currentIndex = Math.round(
                        progress * (cards.length - 1)
                    );

                    // Update all cards
                    cards.forEach((card, i) => {
                        const distance = Math.abs(i - currentIndex);
                        gsap.to(card, {
                            opacity: distance === 0 ? 1 : 0.3 - distance * 0.1,
                            scale: distance === 0 ? 1 : 0.9 - distance * 0.05,
                            filter: `blur(${distance === 0 ? 0 : 4}px)`,
                            duration: 0.4,
                            ease: "power2.out",
                        });
                    });
                },
            },
        });

        // Animate cards
        cards.forEach((card, i) => {
            if (i === 0) return;

            tl.to(card, {
                yPercent: 0,
                duration: 1,
                ease: "none",
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-indigo-950 font-onest"
        >
            <MouseParallax>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                </div>
            </MouseParallax>

            <div className="container relative mx-auto px-4 py-24">
                <div className="container mx-auto mb-24">
                    <h2
                        className="text-5xl md:text-7xl font-bold text-white mb-8"
                        style={{ lineHeight: 1.1 }}
                    >
                        Client Feedback
                    </h2>
                    <div className="w-full flex items-center justify-between">
                        <p className="text-xl md:text-2xl text-gray-300 font-light">
                            We're collaborators - We build tight-knit
                            partnerships with our clients.
                        </p>
                        <div className="flex items-center justify-center gap-6">
                            <motion.div
                                className="size-10 border-2 border-gray-400 rounded-full border-t-transparent"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <p className="text-xl text-slate-400">
                                Keep Scrolling
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    ref={cardsContainerRef}
                    className="relative container mx-auto min-h-[480px]"
                >
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            {...testimonial}
                            className={cn(
                                "testimonial-card absolute w-full",
                                "transition-[filter] duration-300"
                            )}
                        />
                    ))}
                </div>

                <div className="fixed top-1/2 right-12 -translate-y-1/2 flex items-center gap-4 px-6">
                    <div className="h-40 w-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            ref={progressBarRef}
                            className="h-full w-full bg-gradient-to-b from-blue-500 to-indigo-500 origin-top scale-y-0"
                        />
                    </div>
                    <div className="text-sm text-white/50 rotate-90 origin-left translate-x-4"></div>
                </div>
            </div>
        </section>
    );
}
