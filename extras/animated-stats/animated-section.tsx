"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedText } from "./components/animated-text"
import { ScrollRevealText } from "./components/scroll-reveal-text"
import { useSequenceAnimation } from "./hooks/use-sequence-animation"

const logos = [
  { src: "/placeholder.svg", alt: "Tech Superpowers" },
  { src: "/placeholder.svg", alt: "Vortexa" },
  { src: "/placeholder.svg", alt: "Boschung" },
  { src: "/placeholder.svg", alt: "Fudli" },
  { src: "/placeholder.svg", alt: "Knowledge" },
]

export default function AnimatedSection() {
  const { currentIndex } = useSequenceAnimation(logos)

  return (
    <div className="min-h-screen w-full py-20 space-y-20">
      {/* Animated text section */}
      <div className="container mx-auto px-4">
        <AnimatedText
          text="From ambitious startups to global"
          className="text-4xl md:text-5xl font-bold mb-4"
          delay={0}
        />
        <AnimatedText
          text="companies, we partner with great"
          className="text-4xl md:text-5xl font-bold mb-4"
          delay={0.5}
        />
        <AnimatedText
          text="businesses and industry leaders."
          className="text-4xl md:text-5xl font-bold"
          delay={1}
        />
      </div>

      {/* Animated logos section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center gap-8">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: index <= currentIndex ? 1 : 0,
                y: index <= currentIndex ? 0 : 50,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="w-32 h-12 relative"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll reveal section */}
      <ScrollRevealText text="Elevate your digital presence" />

      {/* Stats section */}
      <div className="container mx-auto px-4">
        <AnimatedText
          text="Let our experienced team elevate your digital goals"
          className="text-3xl md:text-4xl font-bold mb-16"
          delay={2}
        />
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="text-5xl font-bold"
              >
                250
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.7 }}
                className="text-xl text-gray-600"
              >
                Five-Star Reviews
              </motion.p>
            </div>
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.9 }}
                className="text-5xl font-bold"
              >
                10
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.1 }}
                className="text-xl text-gray-600"
              >
                In-House Experts
              </motion.p>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3 }}
            className="text-lg text-gray-600"
          >
            We have successfully completed over 300+ projects from a variety of industries. 
            In our team, designers work alongside developers and digital strategists, 
            we believe this is our winning recipe for creating digital products that make an impact.
          </motion.p>
        </div>
      </div>
    </div>
  )
}

