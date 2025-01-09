import React from "react";
import { AnimatedButton } from "../AnimatedButton";

export default function FirstWorkSection({
    ref,
}: {
    ref?: React.RefObject<HTMLDivElement> | null;
}) {
    return (
        <div
            ref={ref}
            className="snap-start flex-shrink-0 w-[600px] h-[75vh] bg-transparent rounded-3xl p-0 flex flex-col justify-between"
        >
            <div className="py-12">
                <div className="flex items-center gap-6 mb-4">
                    <h2 className="text-6xl font-bold">Work</h2>
                    <span className="inline-flex items-center justify-center size-16 rounded-full border border-black text-lg">
                        13
                    </span>
                </div>
                <p className="text-3xl text-gray-800 max-w-md mt-10 leading-10">
                    A selection of our crafted work, built from scratch by our
                    talented in-house team.
                </p>
            </div>
            <AnimatedButton
                text="Case Studies"
                className="self-start rounded-full text-2xl py-5 px-14 border-black"
            />
        </div>
    );
}
