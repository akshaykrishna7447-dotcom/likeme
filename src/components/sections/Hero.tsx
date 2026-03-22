'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial Cinematic Text Reveal
    if (textRef.current) {
      const texts = textRef.current.querySelectorAll('.cinematic-text')
      gsap.fromTo(
        texts,
        { opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 2,
          stagger: 0.3,
          ease: 'power3.out',
          delay: 0.2,
          clearProps: 'filter,transform', // Performance optimization
        }
      )
    }

    // Parallax on Scroll
    if (containerRef.current && bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(textRef.current, {
        yPercent: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-brand-black"
    >
      {/* Parallax Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          src="https://videos.pexels.com/video-files/3998415/3998415-hd_1920_1080_25fps.mp4"
          style={{ filter: 'contrast(1.2) brightness(0.6)' }}
        />
        {/* Dark Blue/Glow Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-[#2563EB]/10 to-brand-black/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30" />
      </div>

      {/* Cinematic Content */}
      <div ref={textRef} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl pointer-events-none will-change-transform">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-luxury tracking-tight leading-tight mb-6 md:mb-8">
          <div className="cinematic-text">Not Just a Salon.</div>
          <div className="cinematic-text">
            A <span className="text-brand-blue blue-text-glow">Transformation</span> Studio.
          </div>
        </h1>

        <div className="cinematic-text text-sm sm:text-lg md:text-2xl text-brand-blue/70 max-w-2xl mx-auto mb-10 md:mb-12 font-sans tracking-[0.2em] font-light">
          FOR MEN. WOMEN. KIDS. INFINITE STYLES.
        </div>

        <div className="cinematic-text flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pointer-events-auto">
          <Link
            href="#booking"
            className="group w-full sm:w-auto px-8 md:px-10 py-4 bg-brand-blue text-white font-bold uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-brand-blue flex items-center justify-center gap-2 rounded-sm"
          >
            Book Appointment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#services"
            className="w-full sm:w-auto px-8 md:px-10 py-4 glass-heavy hover:bg-white/10 transition-all font-bold uppercase tracking-[0.2em] text-sm rounded-sm text-white flex items-center justify-center"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-brand-blue to-transparent animate-pulse" />
        <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-white/40">Scroll to Explore</span>
      </div>
    </section>
  )
}
