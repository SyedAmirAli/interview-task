"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export default function StatsSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section ref={ref} className="pb-24 px-20 overflow-hidden">
            <div className="w-full font-poppins">
                <div className="space-y-16">
                    {/* Heading */}
                    <h2 className="text-4xl md:text-6xl font-medium leading-[1.2] max-w-4xl">
                        <span
                            className={cn(
                                "block transition-all duration-1000 opacity-0 leading-[1.4] translate-y-8",
                                inView && "opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: "0ms" }}
                        >
                            Let our experienced team
                        </span>
                        <span
                            className={cn(
                                "block transition-all duration-1000 opacity-0 leading-[1.4] translate-y-8",
                                inView && "opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: "200ms" }}
                        >
                            elevate your digital goals
                        </span>
                    </h2>

                    {/* Stats and Description */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-40 items-end">
                        <div className="grid grid-cols-2 gap-8 pt-20">
                            <div>
                                <div
                                    className={cn(
                                        "text-5xl md:text-7xl font-bold mb-2 transition-all duration-1000 opacity-0 translate-y-8",
                                        inView && "opacity-100 translate-y-0"
                                    )}
                                    style={{ transitionDelay: "400ms" }}
                                >
                                    <AnimatedNumber end={250} duration={2000} />
                                </div>
                                <div
                                    className={cn(
                                        "text-[1.5vw] text-gray-600 transition-all duration-1000 opacity-0 translate-y-8",
                                        inView && "opacity-100 translate-y-0"
                                    )}
                                    style={{ transitionDelay: "600ms" }}
                                >
                                    Five-Star Reviews
                                </div>
                            </div>
                            <div>
                                <div
                                    className={cn(
                                        "text-5xl md:text-7xl font-medium mb-2 transition-all duration-1000 opacity-0 translate-y-8",
                                        inView && "opacity-100 translate-y-0"
                                    )}
                                    style={{ transitionDelay: "800ms" }}
                                >
                                    <AnimatedNumber end={10} duration={1500} />
                                </div>
                                <div
                                    className={cn(
                                        "text-[1.5vw] text-gray-600 transition-all duration-1000 opacity-0 translate-y-8",
                                        inView && "opacity-100 translate-y-0"
                                    )}
                                    style={{ transitionDelay: "1000ms" }}
                                >
                                    In-House Experts
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p
                                className={cn(
                                    "text-[1.5vw] text-gray-600 leading-relaxed transition-all duration-1000 opacity-0 translate-y-8",
                                    inView && "opacity-100 translate-y-0"
                                )}
                                style={{ transitionDelay: "1200ms" }}
                            >
                                We have successfully completed over 300+
                                projects from a variety of industries. In our
                                team, designers work alongside developers and
                                digital strategists, we believe this is our
                                winning recipe for creating digital products
                                that make an impact.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AnimatedNumber({ end, duration }: { end: number; duration: number }) {
    const numberRef = useRef<HTMLSpanElement>(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (!inView || !numberRef.current) return;

        let start = 0;
        const steps = 60;
        const increment = end / steps;
        const stepDuration = duration / steps;
        const startTime = performance.now();

        const updateNumber = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            if (progress < 1) {
                start += increment;
                if (numberRef.current) {
                    numberRef.current.textContent =
                        Math.floor(start).toString();
                }
                requestAnimationFrame(updateNumber);
            } else {
                if (numberRef.current) {
                    numberRef.current.textContent = end.toString();
                }
            }
        };

        requestAnimationFrame(updateNumber);
    }, [inView, end, duration]);

    return (
        <span
            ref={(element) => {
                numberRef.current = element;
                ref(element);
            }}
        >
            0
        </span>
    );
}
