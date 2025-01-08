'use client'

import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Testimonial {
  quote: string
  author: string
  company: string
  logo: string
}

const testimonials: Testimonial[] = [
  {
    quote: "We have worked with Artistsweb to build a complete new website with quite complex connections with our CRM and accounting functions. The end product is brilliant, a first class blend of design and functionality and the speed and depth of understanding about our business was remarkable. I'd highly recommend them.",
    author: "Steven Glibbery",
    company: "TGA Mobility",
    logo: "/placeholder.svg?height=48&width=48&text=TGA"
  },
  {
    quote: "Artistsweb built our new website and it has been an absolute pleasure working with the whole team. Excellent communication and they built us just an incredible looking website.",
    author: "Sarah Johnson",
    company: "Innovate Digital",
    logo: "/placeholder.svg?height=48&width=48&text=ID"
  },
  {
    quote: "The team's attention to detail and creative approach helped transform our online presence. Their technical expertise and design sensibilities are truly outstanding.",
    author: "Michael Chen",
    company: "Tech Solutions",
    logo: "/placeholder.svg?height=48&width=48&text=TS"
  },
  {
    quote: "Working with this team was a game-changer for our business. They understood our vision perfectly and delivered beyond our expectations.",
    author: "Emma Williams",
    company: "Creative Studios",
    logo: "/placeholder.svg?height=48&width=48&text=CS"
  },
  {
    quote: "Their innovative approach to web development and design has helped us achieve remarkable results. The final product exceeded all our expectations.",
    author: "David Miller",
    company: "Future Brands",
    logo: "/placeholder.svg?height=48&width=48&text=FB"
  }
]

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-8')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    })

    const cards = document.querySelectorAll('.testimonial-card')
    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-black py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
      
      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4 space-y-12"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-300">Trusted by leading companies worldwide</p>
        </div>

        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "testimonial-card opacity-0 translate-y-8 transition-all duration-1000",
                "backdrop-blur-md bg-white/5 rounded-3xl p-8 lg:p-12",
                "transform transition-all duration-700 ease-out"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="max-w-4xl mx-auto">
                <blockquote className="text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-white/10 overflow-hidden relative">
                    <Image
                      src={testimonial.logo}
                      alt={`${testimonial.company} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-blue-400">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

