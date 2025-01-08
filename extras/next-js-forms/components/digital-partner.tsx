'use client'

import { useInView } from 'react-intersection-observer'
import { AnimatedCounter } from './animated-counter'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function DigitalPartner() {
  const { ref, inView } = useInView({ triggerOnce: true })
  
  return (
    <section className="bg-white py-24 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side content */}
          <div 
            ref={ref}
            className={cn(
              "space-y-6 transition-all duration-1000 delay-300",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-5xl font-bold">Your Digital Partner</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We partner with companies of all sizes to solve complex business challenges 
              and define their digital strategies and objectives that deliver results. 
              We help bring ideas to life and create brands, websites & digital products that work.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-sm">Brands who&apos;ve trusted us...</p>
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={`/placeholder.svg?height=48&width=48&text=Logo${i}`}
                      alt={`Brand logo ${i}`}
                      width={48}
                      height={48}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side stats */}
          <div 
            className={cn(
              "bg-gray-50 rounded-3xl p-12 grid grid-cols-2 gap-8 transition-all duration-1000 delay-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">
                <AnimatedCounter end={20} />
              </div>
              <p className="text-gray-600">Years on the market</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">
                <AnimatedCounter end={500} />
              </div>
              <p className="text-gray-600">Satisfied Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

