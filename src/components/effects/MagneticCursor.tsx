'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MagneticCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          translateX: x,
          translateY: y,
          left: -16,
          top: -16,
        }}
        className={`fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border border-brand-blue flex items-center justify-center transition-all duration-300 ${
          isHovering ? 'scale-[2.5] bg-brand-blue/10 shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'scale-1 shadow-none'
        } mix-blend-screen`}
      />
      
      {/* Inner Dot */}
      <motion.div
        style={{
          translateX: x,
          translateY: y,
          left: -3,
          top: -3,
        }}
        className={`fixed pointer-events-none z-[9999] w-1.5 h-1.5 bg-brand-blue rounded-full transition-opacity duration-300 shadow-[0_0_10px_rgba(212,175,55,0.8)] ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  )
}
