"use client";

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { setMainScrollContainer } from "@/context/actions";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/context/ContextProvider";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!scrollRef.current) return () => {};
        const scroll = new LocomotiveScroll({
            el: scrollRef.current!,
            smooth: true,
            multiplier: 1,
            lerp: 0.1,
        });

        dispatch(
            setMainScrollContainer({
                ref: null,
                scroll: scroll,
            })
        );

        return () => {
            scroll.destroy();
        };
    }, [dispatch]);
    return (
        <div id="smooth-scroll" className="w-full" /* ref={scrollRef} */>
            {children}
        </div>
    );
};

// export default SmoothScroll;

/* "use client";
import { useEffect, useRef } from "react";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollRef.current || typeof window === "undefined") return;
    }, []);

    return (
        <div id="smooth-scroll" className="w-full" ref={scrollRef}>
            {children}
        </div>
    );
}; */

export default SmoothScroll;
