'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { RevealText } from '../animations/RevealText'

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const position = ((x - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  return (
    <section className="py-24 px-6 bg-luxury-black overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <RevealText>
            <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              The Transformation
            </span>
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-luxury mb-4">
            <RevealText delay={0.2}>See the <span className="text-brand-blue">Difference.</span></RevealText>
          </h2>
          <p className="text-white/40 max-w-sm mx-auto text-sm uppercase tracking-widest leading-loose mt-6 font-sans">
            Slide to reveal the art of transformation.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none border border-brand-blue/20"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* After Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80"
              alt="After"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 right-6 px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-brand-blue">
              After • The Masterpiece
            </div>
          </div>

          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden border-r-2 border-brand-blue shadow-[10px_0_20px_rgba(37,99,235,0.3)]"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80"
              alt="Before"
              className="w-full h-full object-cover grayscale-[0.8] brightness-75"
              style={{ width: `${10000 / sliderPosition}%` }} // Simplified width hack for clipping
            />
            <div className="absolute bottom-6 left-6 px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-white/50">
              Before • The Potential
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-brand-blue z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8L22 12L18 16" />
                <path d="M6 8L2 12L6 16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
