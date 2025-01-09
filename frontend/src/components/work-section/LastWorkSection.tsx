import React from "react";
import { AnimatedButton } from "../AnimatedButton";

export default function LastWorkSection({
    ref,
}: {
    ref?: React.RefObject<HTMLDivElement> | null;
}) {
    return (
        <div
            ref={ref}
            className="min-w-[700px] h-[75vh] bg-transparent rounded-3xl p-12 flex flex-col justify-center items-center"
        >
            <div className="flex flex-col items-center justify-center text-nowrap gap-5">
                <h3 className="text-6xl font-bold">View More</h3>
                <div>
                    <AnimatedButton
                        text="Case Studies"
                        className="self-start rounded-full text-2xl py-5 px-14 border-black"
                    />
                </div>
            </div>
        </div>
    );
}
