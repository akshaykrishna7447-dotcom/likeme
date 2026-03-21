'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay,
          ease: [0.77, 0, 0.175, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
