'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Scissors, User, Baby, Sparkles, ChevronRight, X } from 'lucide-react'
import gsap from 'gsap'

const services = [
  {
    title: 'Men Grooming',
    description: 'Precision cuts, beard sculpting, and facial treatments.',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80',
    color: '#2563EB',
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

function ServiceCard({ service, onClick }: { service: typeof services[0], onClick: () => void }) {
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
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      layoutId={`card-${service.title}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="service-card relative h-[450px] w-full group cursor-pointer"
    >
      <div
        style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}
        className="absolute inset-0 rounded-2xl glass-heavy transition-all overflow-hidden border-brand-blue/10 group-hover:border-brand-blue/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            layoutId={`image-${service.title}`}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover brightness-[0.4] group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        </div>

        <motion.div layoutId={`content-${service.title}`} style={{ transform: 'translateZ(75px)' }} className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center mb-6 border border-brand-blue/30">
            <service.icon className="text-brand-blue w-6 h-6" />
          </div>
          <h3 className="text-2xl font-luxury mb-2 text-white group-hover:text-brand-blue transition-colors">
            {service.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
            {service.description}
          </p>
          <div className="flex items-center gap-2 text-brand-blue text-xs uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
            Expand Details <ChevronRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-text-service', 
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )

      gsap.fromTo('.service-card',
        { opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.service-grid', start: 'top 85%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section id="services" ref={sectionRef} className="py-24 px-6 bg-brand-black/50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="reveal-text-service">
                <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                  Artisanal Services
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-luxury mb-4 leading-tight">
                <div className="reveal-text-service">Tailored For Your</div>
                <div className="reveal-text-service text-brand-blue blue-text-glow">Signature Style.</div>
              </h2>
            </div>
            <p className="reveal-text-service text-white/40 max-w-sm text-sm uppercase tracking-[0.2em] leading-loose">
              Precision meet Modern in every cut, stroke, and treatment we offer.
            </p>
          </div>

          <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} onClick={() => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>

      {/* Expand Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-brand-black/90 backdrop-blur-xl"
          >
            <motion.div
              layoutId={`card-${selectedService.title}`}
              className="relative w-full max-w-4xl max-h-[90vh] md:h-[80vh] bg-brand-black rounded-3xl overflow-hidden glass-heavy border border-brand-blue/30 flex flex-col md:flex-row"
            >
              <motion.img
                layoutId={`image-${selectedService.title}`}
                src={selectedService.image}
                className="w-full md:w-1/2 h-48 sm:h-64 md:h-full object-cover shrink-0"
              />
              <motion.div layoutId={`content-${selectedService.title}`} className="p-6 sm:p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-start md:justify-center relative overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-brand-blue text-white hover:text-brand-black rounded-full flex items-center justify-center transition-all z-10"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl bg-brand-blue/20 flex items-center justify-center mb-6 md:mb-8 border border-brand-blue/30 mt-8 md:mt-0">
                  <selectedService.icon className="text-brand-blue w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-luxury mb-4 md:mb-6 text-white">{selectedService.title}</h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-sans">
                  {selectedService.description} Dive deep into our signature artisanal approach to grooming, featuring completely personalized consultations, luxury products, and world-class stylists trained globally.
                </p>
                <button 
                  onClick={() => { setSelectedService(null); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="py-4 md:py-5 px-6 md:px-10 bg-brand-blue text-white font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-brand-blue transition-all w-full sm:w-fit shrink-0 text-xs sm:text-sm"
                >
                  Book This Experience
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
