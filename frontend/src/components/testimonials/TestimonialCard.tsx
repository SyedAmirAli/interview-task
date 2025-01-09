import Image from "next/image";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
    quote: string;
    author: string;
    company: string;
    image: string;
    className?: string;
}

export default function TestimonialCard({
    quote,
    author,
    company,
    image,
    className,
}: TestimonialCardProps) {
    return (
        <div
            className={cn(
                "relative backdrop-blur-xl rounded-3xl p-20 testimonial-card",
                // "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br",
                // "before:from-white/10 before:to-white/5",
                // "after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br",
                // "after:from-blue-500/5 after:to-indigo-500/5",
                "transform will-change-transform",
                "!bg-transparent border border-solid border-slate-700",
                className
            )}
        >
            <div className="relative z-10">
                <blockquote className="mb-8">
                    <p className="text-[1.6vw] font-semibold text-white leading-relaxed">
                        {quote}
                    </p>
                </blockquote>

                <div className="flex items-center gap-6 mt-16">
                    <div className="relative size-16 rounded-full overflow-hidden bg-gray-800 ring-2 ring-white/10">
                        <Image
                            src={image}
                            alt={author}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="text-2xl text-slate-400 font-medium">
                            {author}
                        </div>
                        <div className="text-primary text-3xl">{company}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
