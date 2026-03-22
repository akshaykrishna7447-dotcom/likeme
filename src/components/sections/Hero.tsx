'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RevealText } from '../animations/RevealText'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          src="https://videos.pexels.com/video-files/3998415/3998415-hd_1920_1080_25fps.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <RevealText delay={0.2} className="inline-block px-4 py-1 border border-brand-blue/30 rounded-full mb-6">
          <span className="text-sm tracking-[0.3em] uppercase text-brand-blue flex items-center gap-2">
          </span>
        </RevealText>

        <h1 className="text-6xl md:text-8xl font-luxury tracking-tight leading-tight mb-8">
          <RevealText delay={0.4}>Not Just a Salon.</RevealText>
          <RevealText delay={0.6}>
            A <span className="text-brand-blue">Transformation</span> Studio.
          </RevealText>
        </h1>

        <RevealText delay={0.8} className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 font-sans tracking-wide">
          For Men. Women. Kids. One Space. Infinite Styles.
        </RevealText>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link
            href="#booking"
            className="group px-10 py-4 bg-brand-blue text-white font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-brand-blue flex items-center gap-2 rounded-sm"
          >
            Book Appointment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#services"
            className="px-10 py-4 border border-white/20 hover:border-brand-blue/50 transition-all font-bold uppercase tracking-widest text-sm rounded-sm"
          >
            Explore Services
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-blue to-transparent animate-bounce" />
        <span className="text-[10px] tracking-widest uppercase text-white/40">Scroll to Explore</span>
      </motion.div>
    </section>
  )
}
