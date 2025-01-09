"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { InstagramIcon, FacebookIcon, TwitterIcon, Circle } from "lucide-react";
import { JSX, useEffect } from "react";
import Assets from "@/assets";
import { AnimatedButton } from "./AnimatedButton";
import { useAppContext } from "@/context/ContextProvider";

interface SocialType {
    id?: number;
    icon: string | JSX.Element;
    title?: string;
    url?: string | "#";
}
const socials: SocialType[] = [
    {
        icon: <InstagramIcon size={24} />,
        url: "#",
    },
    {
        icon: <FacebookIcon size={24} />,
        url: "#",
    },
    {
        icon: <TwitterIcon size={24} />,
        url: "#",
    },
    {
        icon: <Assets.svg.logos.awwwards width={24} height={24} fill="#fff" />,
        url: "#",
    },
];

function getIcon(name: string) {
    switch (name) {
        case "twitter":
            return <TwitterIcon size={24} />;
        case "instagram":
            return <InstagramIcon size={24} />;
        case "facebook":
            return <FacebookIcon size={24} />;
        case "Awwwards":
        case "awwwards":
            return (
                <Assets.svg.logos.awwwards width={24} height={24} fill="#fff" />
            );
        default:
            <Circle size={24} />;
    }
}

export default function FooterSection() {
    const app = useAppContext();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <footer ref={ref} className="py-24 px-20 bg-white">
            <div className="w-full font-onest">
                <div className="flex justify-between items-end gap-24">
                    {/* Left Column */}
                    <div className="space-y-8 w-full">
                        <h2
                            className={cn(
                                "text-[3vw] font-semibold leading-tight transition-all duration-1000 opacity-0 translate-y-8 max-w-5xl",
                                inView && "opacity-100 translate-y-0"
                            )}
                        >
                            {app.siteSettings.footer.title}
                        </h2>
                        <div
                            className={cn(
                                "space-y-4 transition-all duration-1000 opacity-0 translate-y-8",
                                inView && "opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: "200ms" }}
                        >
                            <div className="text-sm capitalize text-gray-500 font-medium pt-10">
                                Get in touch
                            </div>
                            <div className="space-y-2 pt-4">
                                <p className="text-[1.5vw] font-semibold">
                                    {app.siteSettings.footer.phone}
                                </p>
                                <p className="text-[1.5vw] font-semibold">
                                    {app.siteSettings.footer.email}
                                </p>
                                <p className="text-[1.5vw] font-semibold">
                                    {app.siteSettings.footer.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8 max-w-lg w-full">
                        <div
                            className={cn(
                                "flex justify-end transition-all duration-1000 opacity-0 translate-y-8",
                                inView && "opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: "400ms" }}
                        >
                            <div className="w-full bg-black text-white rounded-3xl py-5 px-12 flex justify-between items-center space-x-4">
                                <div>
                                    <span className="text-xl font-medium">
                                        {app.siteSettings.socials.title}
                                    </span>
                                </div>

                                <div className="flex gap-px">
                                    {app.siteSettings.socials.platforms.map(
                                        (
                                            { icon, title, link, target },
                                            index: number
                                        ) => (
                                            <Link
                                                key={index}
                                                href={link}
                                                target={target}
                                                className="flex items-center justify-center fill-white size-12 border-2 border-transparent hover:text-white border-solid hover:border-primary rounded-full duration-500 hover:scale-110"
                                            >
                                                {getIcon(icon)}
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className={cn(
                                "bg-gray-100 rounded-3xl p-14 transition-all backdrop text-center duration-1000 opacity-0 translate-y-8",
                                inView && "opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: "600ms" }}
                        >
                            <h3 className="text-[2.5vw] font-semibold">
                                {app.siteSettings.footer.cardBtnTitle}
                            </h3>
                            <p className="text-gray-600 text-xl mt-4 mb-12">
                                {app.siteSettings.footer.cardSummery}
                            </p>
                            <AnimatedButton
                                text="Get in touch"
                                className="bg-primary text-white text-[1.25vw] w-full py-5 duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        "mt-16 pt-8 border-t border-transparent flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 transition-all duration-1000 opacity-0 translate-y-8",
                        inView && "opacity-100 translate-y-0"
                    )}
                    style={{ transitionDelay: "800ms" }}
                >
                    <p>{app.siteSettings.footer.copyrightText}</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {app.siteSettings.footer.copyrightMenus.map(
                            ({ link, title }, index) => (
                                <Link
                                    key={index}
                                    href={link}
                                    className="hover:text-gray-700"
                                >
                                    {title}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
