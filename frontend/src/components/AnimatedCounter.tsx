"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

export function AnimatedCounter({
    end,
    duration = 2000,
    suffix = "",
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true });
    const countingDone = useRef(false);

    useEffect(() => {
        if (inView && !countingDone.current) {
            const steps = 60;
            const increment = end / steps;
            const timePerStep = duration / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    setCount(end);
                    clearInterval(timer);
                    countingDone.current = true;
                } else {
                    setCount(Math.floor(current));
                }
            }, timePerStep);

            return () => clearInterval(timer);
        }
    }, [inView, end, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export default AnimatedCounter;
