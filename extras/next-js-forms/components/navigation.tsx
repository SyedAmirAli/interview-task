'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatedButton } from './animated-button'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 bg-gray-50/80 backdrop-blur-md shadow-lg z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="h-[80px] flex items-center">
          {!logoError ? (
            <Image
              src="https://www.ovtidose.com/assets/logo-main-black.png"
              alt="Logo"
              width={160}
              height={80}
              className="h-[80px] w-auto object-contain"
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <span className="text-2xl font-bold">Logo</span>
          )}
        </div>
        <div className="flex items-center space-x-6">
          <span className="hidden md:inline text-black/80 font-medium">Get in touch</span>
          <AnimatedButton text="Menu" />
        </div>
      </div>
    </nav>
  )
}

