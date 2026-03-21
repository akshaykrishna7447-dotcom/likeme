'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Scissors, User, Baby, Sparkles, ChevronRight } from 'lucide-react'
import { RevealText } from '../animations/RevealText'

const services = [
  {
    title: 'Men Grooming',
    description: 'Precision cuts, beard sculpting, and facial treatments.',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80',
    color: '#D4AF77',
  },
  {
    title: 'Women Beauty',
    description: 'Bespoke styling, coloring, and premium skincare.',
    icon: User,
    image: 'https://images.unsplash.com/photo-1560869713-7d0a294308d3?auto=format&fit=crop&q=80',
    color: '#FFDAB9',
  },
  {
    title: 'Kids Styling',
    description: 'Gentle cuts for the little ones in a fun environment.',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80',
    color: '#F5E6D3',
  },
  {
    title: 'Skin & Spa',
    description: 'Rejuvenating facials and relaxing spa experiences.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80',
    color: '#06B6D4',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative h-[450px] w-full group cursor-pointer"
    >
      <div
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-0 rounded-2xl glass transition-all overflow-hidden border-brand-blue/10 group-hover:border-brand-blue/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover brightness-[0.4] group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        </div>

        <div
          style={{ transform: 'translateZ(75px)' }}
          className="absolute inset-0 p-8 flex flex-col justify-end"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center mb-6 border border-brand-blue/30">
            <service.icon className="text-brand-blue w-6 h-6" />
          </div>
          <h3 className="text-2xl font-luxury mb-2 text-white group-hover:text-brand-blue transition-colors">
            {service.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
            {service.description}
          </p>
          <div className="flex items-center gap-2 text-brand-blue text-xs uppercase tracking-widest font-bold">
            View Details <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-luxury-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <RevealText>
              <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                Artisanal Services
              </span>
            </RevealText>
            <h2 className="text-5xl md:text-7xl font-luxury mb-4 leading-tight">
              <RevealText delay={0.2}>Tailored For Your</RevealText>
              <RevealText delay={0.4} className="text-brand-blue">Signature Style.</RevealText>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm uppercase tracking-widest leading-loose">
            Precision meet Modern in every cut, stroke, and treatment we offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
