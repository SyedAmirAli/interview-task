"use client";
import { useInView } from "react-intersection-observer";
import { AnimatedButton } from "./AnimatedButton";
import AnimatedCreditShow from "./AnimatedCreditShow";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/ContextProvider";
import { HeroSectionCountType } from "@/constants/types";

export default function Hero() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const app = useAppContext();
    const headings = app.siteSettings.heroSection.title.split(" ");
    console.info(
        headings.length > 3 ? 'Main title maximum supported words are "3"' : ""
    );

    return (
        <div
            ref={ref}
            className="w-full h-screen flex flex-col items-center justify-around px-[90px] font-onest"
        >
            <div className="w-full pt-40">
                <h2 className="text-[8.375vw] leading-relaxed font-semibold max-w-4xl">
                    <span
                        className={cn(
                            "block transition-all duration-1000 opacity-0 leading-[1.1] translate-y-8",
                            inView && "opacity-100 translate-y-0"
                        )}
                        style={{ transitionDelay: "2000ms" }}
                    >
                        {headings[0]}
                        <span className="px-10 lg:bg-gradient-to-r lg:from-[#545cff] lg:via-[#1f2246] lg:to-[#545cff] lg:bg-[length:1600px_100%] lg:bg-clip-text lg:text-transparent lg:animate-gradientMove">
                            {headings[1]}
                        </span>
                    </span>
                    <span
                        className={cn(
                            "block transition-all duration-1000 opacity-0 leading-[1.1] translate-y-8",
                            inView && "opacity-100 translate-y-0"
                        )}
                        style={{ transitionDelay: "2500ms" }}
                    >
                        {headings[2]}
                    </span>
                </h2>
            </div>
            <div className="w-full flex justify-between items-center py-20">
                <div className="w-full">
                    <AnimatedCreditShow
                        counts={
                            app.siteSettings.heroSection
                                .works as HeroSectionCountType[]
                        }
                    />
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-full">
                        <p className="text-black text-3xl font-medium leading-[1.3]">
                            {app.siteSettings.heroSection.summery}
                        </p>
                    </div>
                    <div className="pl-32 text-nowrap flex items-center justify-end">
                        <AnimatedButton
                            text="Case Studies"
                            className="text-2xl py-5 px-12 duration-500 hover:scale-110 bg-primary border-none text-white font-medium"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
