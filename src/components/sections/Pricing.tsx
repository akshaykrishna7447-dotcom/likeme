'use client'

import { useEffect, useRef } from 'react'
import { Check, Sparkles } from 'lucide-react'
import gsap from 'gsap'

const tiers = [
  {
    name: 'Basic Grooming',
    price: '₹499+',
    description: 'Essential care for the modern individual.',
    features: ['Precision Haircut', 'Hair Wash & Conditioning', 'Basic Styling', 'Refreshing Beverage'],
    color: 'border-white/10',
    highlight: false,
  },
  {
    name: 'Advanced Styling',
    price: '₹999+',
    description: 'Refine your look with expert techniques.',
    features: ['Bespoke Haircut & Fade', 'Beard Sculpting / Clean Shave', 'Scalp Massage', 'Luxury Hair Spa', 'Signature Scent Application'],
    color: 'border-brand-blue/50',
    highlight: true,
  },
  {
    name: 'Luxury Experience',
    price: '₹1999+',
    description: 'The ultimate transformation package.',
    features: ['Master Stylist Consultation', 'Full Hair & Beard Overhaul', 'Premium Collagen Facial', 'Deep Tissue Neck Massage', 'Take-home Grooming Kit'],
    color: 'border-white/10',
    highlight: false,
  },
]

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo('.reveal-text-price', 
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
      gsap.fromTo('.pricing-card',
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 85%',
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="py-24 px-6 bg-brand-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="reveal-text-price">
            <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Investment in Self
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-luxury mb-4">
            <div className="reveal-text-price">Premium <span className="text-brand-blue blue-text-glow">Pricing.</span></div>
          </h2>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card p-10 rounded-3xl glass-heavy border ${tier.color} relative group overflow-hidden hover:-translate-y-2 transition-transform duration-500`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-brand-blue text-brand-black text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <h3 className="text-2xl font-luxury mb-2 text-white group-hover:text-brand-blue transition-colors">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-luxury text-brand-blue">{tier.price}</span>
              </div>
              <p className="text-white/40 text-sm mb-8 font-sans leading-relaxed">
                {tier.description}
              </p>

              <div className="space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] transition-all ${
                tier.highlight 
                  ? 'bg-brand-blue text-brand-black hover:bg-white' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                Choose Package
              </button>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/0 via-brand-blue/10 to-brand-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
