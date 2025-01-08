'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CaseStudyCardProps {
  title: string
  image: string
  className?: string
}

export function CaseStudyCard({ title, image, className }: CaseStudyCardProps) {
  return (
    <div 
      className={cn(
        "bg-zinc-900/50 rounded-lg p-4 flex items-center justify-between group cursor-pointer",
        "transition-opacity duration-300",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-sm text-zinc-400">Latest Case Study</p>
        <h3 className="text-xl text-white">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full overflow-hidden relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  )
}

