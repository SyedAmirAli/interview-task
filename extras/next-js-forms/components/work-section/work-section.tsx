'use client'

import { useRef, useEffect } from 'react'
import { WorkCard } from './work-card'
import { Button } from '@/components/ui/button'

const works = [
  {
    title: "Romans & Partners",
    image: "/placeholder.svg?height=500&width=800",
    tags: [
      { label: "UI/UX Design" },
      { label: "Property Portal" }
    ],
    isLatest: true
  },
  {
    title: "Tech SuperPowers",
    image: "/placeholder.svg?height=500&width=800",
    tags: [
      { label: "UI/UX Design" },
      { label: "Development" }
    ]
  },
  {
    title: "Alveena Casa",
    image: "/placeholder.svg?height=500&width=800",
    tags: [
      { label: "UI/UX Design" },
      { label: "E-Commerce" }
    ]
  }
]

export function WorkSection() {
  // const scrollContainerRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
    // const handleWheel = (e: WheelEvent) => {
      // if (scrollContainerRef.current) {
        // e.preventDefault()
        // scrollContainerRef.current.scrollLeft += e.deltaY
      // }
    // }

    // const currentRef = scrollContainerRef.current
    // if (currentRef) {
      // currentRef.addEventListener('wheel', handleWheel, { passive: false })
    // }

    // return () => {
      // if (currentRef) {
        // currentRef.removeEventListener('wheel', handleWheel)
      // }
    // }
  // }, [])
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        // Prevent default vertical scrolling behavior
        e.preventDefault();

        // Scroll horizontally by deltaY value
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const currentRef = scrollContainerRef.current;

    if (currentRef) {
      // Add wheel event listener
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Cleanup the event listener on unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-8"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Work intro card */}
        <div className="snap-start flex-shrink-0 w-[800px] h-[500px] bg-gray-100 rounded-3xl p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-5xl font-bold">Work</h2>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-black text-lg">
                13
              </span>
            </div>
            <p className="text-xl text-gray-600 max-w-md">
              A selection of our crafted work, built from scratch by our talented in-house team.
            </p>
          </div>
          <Button variant="outline" className="self-start rounded-full">
            Case Studies
          </Button>
        </div>

        {/* Work cards */}
        {works.map((work, index) => (
          <div key={work.title} className="snap-start">
            <WorkCard {...work} />
          </div>
        ))}

        {/* View More card */}
        <div className="snap-start flex-shrink-0 w-[800px] h-[500px] bg-gray-100 rounded-3xl p-12 flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold mb-6">View More</h3>
          <Button variant="outline" className="rounded-full">
            Case Studies
          </Button>
        </div>
      </div>
    </section>
  )
}

