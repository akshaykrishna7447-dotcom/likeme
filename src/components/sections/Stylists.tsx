'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook, Sparkles } from 'lucide-react'
import { RevealText } from '../animations/RevealText'

const stylists = [
  {
    name: 'Marco V.',
    role: 'Master Barber',
    specialty: 'Precision Fades & Beard Art',
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80',
  },
  {
    name: 'Elena S.',
    role: 'Creative Director',
    specialty: 'Balayage & Editorial Styling',
    image: 'https://images.unsplash.com/photo-1595959183082-c8ef7ec3bc43?auto=format&fit=crop&q=80',
  },
  {
    name: 'Julian R.',
    role: 'Skin Specialist',
    specialty: 'Advanced Hydrafacials',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
  },
]

export function Stylists() {
  return (
    <section id="team" className="py-24 px-6 bg-brand-black/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <RevealText>
              <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                The Artisans
              </span>
            </RevealText>
            <h2 className="text-5xl md:text-7xl font-luxury mb-4 leading-tight">
              <RevealText delay={0.2}>Mastered by <span className="text-brand-blue">Hands.</span></RevealText>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm uppercase tracking-widest leading-loose">
            Our curators of style are ready to help you discover your new aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stylists.map((stylist, index) => (
            <motion.div
              key={stylist.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative"
            >
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 border border-white/10 group-hover:border-brand-blue/30 transition-all">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-4 bottom-4 p-6 glass rounded-2xl border border-white/10 group-hover:border-brand-blue/30 transition-all">
                  <h3 className="text-xl font-luxury text-white mb-1">{stylist.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-blue">
                    <Sparkles className="w-3 h-3" />
                    {stylist.role}
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-xs font-sans leading-relaxed border-t border-white/10 pt-3 italic">
                Specializes in {stylist.specialty}.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
