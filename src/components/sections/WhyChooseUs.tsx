'use client'

import { useEffect, useRef } from 'react'
import { ShieldCheck, Users, Sparkles, Heart } from 'lucide-react'
import gsap from 'gsap'

const reasons = [
  {
    title: 'Expert Stylists',
    description: 'Masters of their craft with decades of collective experience.',
    icon: Users,
  },
  {
    title: 'Premium Products',
    description: 'Only the finest organic and luxury brands touch your skin and hair.',
    icon: Sparkles,
  },
  {
    title: 'Hygienic Environment',
    description: 'Medical-grade sterilization for your peace of mind.',
    icon: ShieldCheck,
  },
  {
    title: 'Personalized Styling',
    description: 'Consultations that deep-dive into your identity and preferences.',
    icon: Heart,
  },
]

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo('.reveal-text', 
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Cards Animation
      gsap.fromTo('.feature-card',
        { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
        {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.feature-grid',
            start: 'top 85%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-brand-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="reveal-text">
              <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                Beyond the Mirror
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-luxury mb-4 leading-tight">
              <div className="reveal-text">Why <span className="text-brand-blue blue-text-glow">Choose</span></div>
              <div className="reveal-text">LIKE ME?</div>
            </h2>
          </div>
        </div>

        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="feature-card p-8 glass-heavy border border-white/5 rounded-3xl hover:border-brand-blue/30 transition-all group"
            >
              <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <reason.icon className="text-brand-blue w-7 h-7" />
              </div>
              <h3 className="text-xl font-luxury text-white mb-4 uppercase tracking-wider">{reason.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-sans">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
