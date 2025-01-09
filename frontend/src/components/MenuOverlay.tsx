"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "./AnimatedButton";
import { useAppContext } from "@/context/ContextProvider";

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const app = useAppContext();

    const title = app.siteSettings.stickyMenu.title;
    const menuItems = app.siteSettings.stickyMenu.menus;
    const socialLinks = app.siteSettings.socials.platforms;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/10 backdrop-blur-[5px] z-50"
                        onClick={onClose}
                    />

                    {/* Menu Container */}
                    <motion.div
                        initial={{ top: "-100px", opacity: 0 }}
                        animate={{ top: "110px", opacity: 1 }}
                        exit={{ top: "-20px", opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "linear",
                        }}
                        style={{ position: "fixed" }} // Use style for `top`
                        className="transition-all inset-x-4 md:inset-x-8 z-50 rounded-3xl bg-[#111] max-w-[940px] w-full p-[80px] text-white mx-auto"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-16">
                            <h2 className="text-3xl text-slate-300">{title}</h2>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="hover:text-white text-white/80 duration-300 bg-gray-800 rounded-full hover:bg-slate-700"
                                onClick={onClose}
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>

                        {/* Menu Items */}
                        <nav className="space-y-6 mb-12">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: 0.2 + i * 0.1,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                    className="group"
                                >
                                    <a
                                        href={item.link}
                                        className="flex items-center text-4xl md:text-5xl font-bold transition-colors"
                                    >
                                        <AnimatedButton
                                            text={item.title}
                                            className="bg-transparent border-none text-white text-5xl"
                                        />
                                        {item?.count !== undefined &&
                                            item.count !== 0 && (
                                                <span className="ml-4 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-lg">
                                                    {item.count}
                                                </span>
                                            )}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                delay: 0.6,
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-24"
                        >
                            <div className="space-y-2">
                                <p className="text-slate-500">Follow us</p>
                                <div className="flex gap-4">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.title}
                                            href={link.link}
                                            target={link.target}
                                            className="text-sm font-medium transition-colors duration-500 text-slate-300 hover:text-white line-under relative"
                                        >
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-end">
                                <AnimatedButton
                                    text="Get in Touch"
                                    className="text-xl py-3 px-8 duration-500 hover:scale-110 bg-primary border-none text-white font-medium"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
