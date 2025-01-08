'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export function AnimatedButton({ text, className, ...props }: AnimatedButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden px-4 py-2 bg-white text-black border border-black rounded-full",
        "group",
        className
      )}
      {...props}
    >
      <span className="inline-block group-hover:transition-all group-hover:duration-500 group-hover:-translate-y-full group-hover:opacity-0">
        {text}
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 group-hover:transition-all group-hover:duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {text}
      </span>
    </button>
  )
}

