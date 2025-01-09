"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "./AnimatedButton";

const services = [
    { title: "E-Commerce", href: "/services/e-commerce" },
    { title: "Website Design", href: "/services/website-design" },
    { title: "Web Development", href: "/services/web-development" },
    { title: "Digital Products", href: "/services/digital-products" },
    { title: "Brand Identities", href: "/services/brand-identities" },
    { title: "SEO Optimisation", href: "/services/seo" },
];

export default function ServicesSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section ref={ref} className="w-full py-24 px-20">
            <div className="w-full font-onest mx-auto">
                <div className="w-full flex items-end justify-between gap-12 lg:gap-24">
                    {/* Services List */}
                    <div className="space-y-8 w-5/12">
                        <h2
                            className={cn(
                                "text-[4vw] font-bold transition-all duration-1000 opacity-0 translate-y-8",
                                inView && "opacity-100 translate-y-0"
                            )}
                        >
                            We're good at
                        </h2>
                        <div className="space-y-6">
                            <div
                                className={cn(
                                    "text-sm uppercase text-gray-500 font-medium transition-all duration-1000 opacity-0 translate-y-8",
                                    inView && "opacity-100 translate-y-0"
                                )}
                                style={{ transitionDelay: "200ms" }}
                            >
                                Services
                            </div>
                            <nav className="space-y-4">
                                {services.map((service, index) => (
                                    <Link
                                        key={service.href}
                                        href={service.href}
                                        className={cn(
                                            "block text-[2vw] font-bold hover:text-blue-600 transition-all duration-1000 opacity-0 translate-y-8",
                                            inView &&
                                                "opacity-100 translate-y-0"
                                        )}
                                        style={{
                                            transitionDelay: `${
                                                (index + 2) * 200
                                            }ms`,
                                        }}
                                    >
                                        {service.title}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Contact Card */}
                    <div
                        className={cn(
                            "bg-primary rounded-[2rem] p-16 text-white transition-all duration-1000 opacity-0 translate-y-16 w-7/12",
                            inView && "opacity-100 translate-y-0"
                        )}
                        style={{ transitionDelay: "1600ms" }}
                    >
                        <h3 className="text-[2.5vw] font-semibold mb-8">
                            Let's start with a conversation about how we can
                            help you! Get in touch, we're a nice bunch.
                        </h3>
                        <div className="flex flex-wrap gap-4 pt-8">
                            <AnimatedButton
                                text="Let's Talk"
                                className="text-2xl py-5 px-12 font-medium hover:scale-105 duration-300"
                            />
                            <button className="text-2xl py-5 px-12 font-medium border border-solid border-white/70 rounded-full">
                                <Link href="tel:02071128285">
                                    0207 112 82 85
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
