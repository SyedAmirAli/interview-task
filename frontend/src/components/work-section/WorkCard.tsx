"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/hooks";

interface Tag {
    label: string;
    className?: string;
}

interface WorkCardProps {
    title: string;
    image: string;
    tags: Tag[];
    isLatest?: boolean;
    className?: string;
}

export function WorkCard({
    title,
    image,
    tags,
    isLatest,
    className,
}: WorkCardProps) {
    return (
        <div
            className={cn(
                "relative flex-shrink-0 w-[800px] h-[75vh] rounded-3xl overflow-hidden group hover:border-opacity-100 border-opacity-0 duration-500 border-4 border-solid border-primary",
                className
            )}
        >
            <Image
                src={asset(image)}
                alt={title}
                fill
                className="object-cover transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-white text-4xl font-bold mb-4">
                        {title}
                    </h3>
                    <div className="flex gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm bg-white/10 text-white backdrop-blur-sm",
                                    tag.className
                                )}
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {isLatest && (
                <div className="absolute top-6 right-6">
                    <span className="px-4 py-1.5 rounded-full text-sm bg-blue-500 text-white">
                        Latest
                    </span>
                </div>
            )}
        </div>
    );
}
