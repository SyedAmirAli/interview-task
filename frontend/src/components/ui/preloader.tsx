"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Assets from "@/assets";
import { useAppContext, useAppDispatch } from "@/context/ContextProvider";
import { closePreloader } from "@/context/actions";

export const Preloader = () => {
    const dispatch = useAppDispatch();
    const app = useAppContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(closePreloader());
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {app.preloaderState && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-[#111] z-[51] text-white max-h-screen"
                    initial={{ clipPath: "inset(0 0% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    exit={{ clipPath: "inset(0 0% 0 100%)" }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        exit: { duration: 0.8 },
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="relative z-[60]"
                    >
                        <Assets.svg.logo
                            width={200}
                            height={120}
                            className="!fill-white text-white"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* "use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Assets from "@/assets";
import { useAppContext } from "@/context/ContextProvider";

export const Preloader = () => {
    const app = useAppContext();
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPreloader(false);
        }, 2000); // Adjust this time as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {showPreloader && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-[#111] z-[51] text-white max-h-screen"
                    initial={{ clipPath: "inset(0 0% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    exit={{ clipPath: "inset(0 0% 0 100%)" }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        exit: { duration: 0.8 },
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="relative z-[60]"
                    >
                        <Assets.svg.logo
                            width={200}
                            height={120}
                            className="!fill-white text-white"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
 */
