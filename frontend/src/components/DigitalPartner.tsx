"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AnimatedCounter from "./AnimatedCounter";
import Assets from "@/assets";

export function DigitalPartner() {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <section className="bg-white py-24 px-20">
            <div className="w-full">
                <div className="grid lg:grid-cols-2 gap-40 items-end">
                    {/* Left side content */}
                    <div
                        ref={ref}
                        className={cn(
                            "space-y-6 transition-all duration-1000 delay-300",
                            inView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        )}
                    >
                        <h2 className="text-[3.5vw] font-bold">
                            Your Digital Partner
                        </h2>
                        <p className="text-[1.5vw] text-gray-600 leading-relaxed max-w-2xl">
                            We partner with companies of all sizes to solve
                            complex business challenges and define their digital
                            strategies and objectives that deliver results. We
                            help bring ideas to life and create brands, websites
                            & digital products that work.
                        </p>
                        <div className="flex items-center gap-10 pt-40">
                            <div className="flex -space-x-10">
                                {[
                                    <Assets.svg.companies.one
                                        width={66}
                                        height={66}
                                    />,
                                    <Assets.svg.companies.two
                                        width={66}
                                        height={66}
                                    />,
                                    <Assets.svg.companies.three
                                        width={66}
                                        height={66}
                                    />,
                                ].map((icon, i) => (
                                    <div
                                        key={i}
                                        className="rounded-full bg-[#111] flex items-center justify-center overflow-hidden fill-white p-2"
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-500 text-[1.25vw]">
                                Brands who&apos;ve trusted us...
                            </p>
                        </div>
                    </div>

                    {/* Right side stats */}
                    <div
                        className={cn(
                            "bg-[#ecf1f4] rounded-3xl p-20 grid grid-cols-2 transition-all duration-1000 delay-500",
                            inView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="text-center border-r border-solid border-slate-400/80 py-10 pr-12">
                            <div className="text-6xl font-bold mb-4">
                                <AnimatedCounter end={20} />
                            </div>
                            <p className="text-gray-600 text-[1.25vw]">
                                Years on the market
                            </p>
                        </div>
                        <div className="text-center py-10 pl-12">
                            <div className="text-6xl font-bold mb-4">
                                <AnimatedCounter end={500} />
                            </div>
                            <p className="text-gray-600 text-[1.25vw]">
                                Satisfied Customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DigitalPartner;
