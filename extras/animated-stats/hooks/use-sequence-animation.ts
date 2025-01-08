"use client"

import { useState, useEffect } from "react"

export function useSequenceAnimation(items: any[], delay: number = 2000) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (!isAnimating) return

    const timer = setTimeout(() => {
      if (currentIndex === items.length - 1) {
        // Add extra delay before resetting
        setTimeout(() => {
          setCurrentIndex(0)
        }, delay)
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    }, 1000) // Time between each animation

    return () => clearTimeout(timer)
  }, [currentIndex, items.length, delay, isAnimating])

  return { currentIndex, isAnimating, setIsAnimating }
}

