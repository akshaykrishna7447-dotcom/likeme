'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { RevealText } from '../animations/RevealText'

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
  return (
    <section id="pricing" className="py-24 px-6 bg-brand-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <RevealText>
            <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Investment in Self
            </span>
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-luxury mb-4">
            <RevealText delay={0.2}>Premium <span className="text-brand-blue">Pricing.</span></RevealText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-3xl glass border ${tier.color} relative group overflow-hidden`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl flex items-center gap-2">
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

              <button className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                tier.highlight 
                  ? 'bg-brand-blue text-white hover:bg-white hover:text-brand-blue' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                Choose Package
              </button>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/0 via-brand-blue/5 to-brand-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
