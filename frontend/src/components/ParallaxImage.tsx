"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Scale and opacity transforms
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Vibration effect transforms
    const x = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [0, -5, 0, 5, 0]
    );
    const y = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [0, 5, 0, -5, 0]
    );

    return (
        <div className="w-full pb-20 pt-8 px-20">
            <div
                ref={containerRef}
                className="relative min-h-screen w-full overflow-hidden bg-white rounded-[40px]"
            >
                <motion.div
                    style={{
                        scale,
                        x,
                        y,
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="absolute min-h-screen w-full rounded-[48px]"
                >
                    <Image
                        src="/assets/images/work-6.jpg"
                        alt="Office workspace with modern setup"
                        fill
                        className="object-cover rounded-[48px]"
                        priority
                        sizes="100vw"
                    />
                </motion.div>
            </div>
        </div>
    );
}

// // components/ParallaxImage.tsx
// import React, { useRef, useEffect, useState } from "react";

// interface ParallaxImageProps {
//     src?: string;
//     alt?: string;
// }

// const ParallaxImage: React.FC<ParallaxImageProps> = ({
//     src = "/assets/images/work-6.jpg",
//     alt = "Parallax Image View",
// }) => {
//     const figureRef = useRef<HTMLDivElement>(null);
//     const [translateY, setTranslateY] = useState(0); // Translation value

//     useEffect(() => {
//         const figure = figureRef.current;
//         let currentTranslateY = 0;

//         if (!figure) return;

//         const handleWheel = (event: WheelEvent) => {
//             event.preventDefault();

//             // Update translation based on the scroll delta
//             currentTranslateY += event.deltaY * 0.1; // Adjust multiplier for speed

//             // Clamp the translateY value to avoid excessive movement
//             currentTranslateY = Math.max(
//                 -200,
//                 Math.min(200, currentTranslateY)
//             ); // Limit to [-200px, 200px]

//             setTranslateY(currentTranslateY); // Update the state
//         };

//         // Attach the wheel event listener
//         figure.addEventListener("wheel", handleWheel);

//         return () => {
//             // Cleanup listener on unmount
//             figure.removeEventListener("wheel", handleWheel);
//         };
//     }, []);

//     return (
//         <div
//             ref={figureRef}
//             className="relative overflow-hidden h-screen"
//             style={{
//                 transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${translateY}, 0, 1)`,
//                 transition: "transform 0.1s ease-out",
//             }}
//         >
//             <img
//                 src={src}
//                 alt={alt}
//                 className="absolute top-0 left-0 w-full h-auto object-cover"
//             />
//         </div>
//     );
// };

// export default ParallaxImage;

// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";

// export function ParallaxSection({
//     src = "/assets/images/work-6.jpg",
//     alt = "Parallax Image View",
// }: ParallaxImageProps) {
//     const containerRef = useRef<HTMLDivElement>(null);

//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ["start end", "end start"],
//     });

//     const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
//     const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

//     return (
//         <section
//             ref={containerRef}
//             className="relative w-full overflow-hidden p-20 bg-white"
//         >
//             <div className="relative p-20 rounded-3xl w-full min-h-screen">
//                 <motion.div
//                     style={{ scale, opacity }}
//                     className="absolute inset-0 w-full"
//                 >
//                     <Image
//                         src={src}
//                         alt="Office workspace with modern setup"
//                         fill
//                         className="object-cover rounded-[50px]"
//                         priority
//                     />
//                     {/* <div className="absolute inset-0 bg-black/50" /> */}
//                 </motion.div>
//             </div>

//             {/* <div className="relative z-10 flex h-full items-center justify-center px-4">
//                 <div className="max-w-4xl text-center">
//                     <motion.h2
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="text-4xl md:text-6xl font-bold text-white mb-6 text-nowrap"
//                     >
//                         Where Innovation Meets Design
//                     </motion.h2>
//                     <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.2 }}
//                         className="text-lg md:text-xl text-white/80"
//                     >
//                         Our workspace is designed to inspire creativity and
//                         foster collaboration, enabling us to deliver exceptional
//                         digital experiences for our clients.
//                     </motion.p>
//                 </div>
//             </div> */}
//         </section>
//     );
// }

// // // components/ParallaxImage.tsx
// // import { motion, useViewportScroll, useTransform } from "framer-motion";
// // import React from "react";

// interface ParallaxImageProps {
//     src?: string;
//     alt?: string;
// }

// // const ParallaxImage: React.FC<ParallaxImageProps> = ({
// //     src = "/assets/images/work-6.jpg",
// //     alt = "Parallax Image View",
// // }) => {
// //     const { scrollY } = useViewportScroll();

// //     // Map scroll position to vertical translation
// //     const y = useTransform(scrollY, [0, 500], [0, -200]); // Adjust as needed

// //     return (
// //         <div className="h-[100vh] overflow-hidden py-24 px-20">
// //             <div className="relative over">
// //                 <motion.img
// //                     src={src}
// //                     alt={alt}
// //                     style={{ y }}
// //                     className="absolute top-0 left-0 w-full h-auto object-cover rounded-3xl"
// //                 />
// //             </div>
// //         </div>
// //     );
// // };

// export default ParallaxSection;
