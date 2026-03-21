'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Users, Sparkles, Heart } from 'lucide-react'
import { RevealText } from '../animations/RevealText'

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
  return (
    <section className="py-24 px-6 bg-brand-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <RevealText>
            <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Beyond the Mirror
            </span>
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-luxury mb-4">
            <RevealText delay={0.2}>Why Choose <span className="text-brand-blue">LIKE ME?</span></RevealText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="p-8 glass border border-white/5 rounded-3xl hover:border-brand-blue/30 transition-all group"
            >
              <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <reason.icon className="text-brand-blue w-7 h-7" />
              </div>
              <h3 className="text-xl font-luxury text-white mb-4 uppercase tracking-wider">{reason.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-sans">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
