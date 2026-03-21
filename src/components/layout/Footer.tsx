'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook, Sparkles, MapPin, Phone, Mail, ArrowUp } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-brand-black pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand-blue flex items-center justify-center rounded-sm transition-transform group-hover:rotate-12">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-luxury tracking-tighter text-brand-blue">
                LIKE ME
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-sans">
              Not Just a Salon. A Transformation Studio. Elevating the standard of luxury grooming for Men, Women, and Kids.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-brand-blue border border-white/10 hover:border-brand-blue/50 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
             <h4 className="text-lg font-luxury text-white mb-8 uppercase tracking-widest text-sm">Navigation</h4>
             <ul className="space-y-4">
              {['Home', 'Services', 'Pricing', 'Terms', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm uppercase tracking-widest text-white/40 hover:text-brand-blue transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
             <h4 className="text-lg font-luxury text-white mb-8 uppercase tracking-widest text-sm">Contact Us</h4>
             <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/40 group">
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span className="text-sm leading-relaxed group-hover:text-white transition-colors">
                  123 Luxury Avenue, Beverly Hills, CA 90210
                </span>
              </div>
              <div className="flex items-center gap-4 text-white/40 group">
                <Phone className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span className="text-sm group-hover:text-white transition-colors">
                  +1 (555) 000-LIKE
                </span>
              </div>
              <div className="flex items-center gap-4 text-white/40 group">
                <Mail className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span className="text-sm group-hover:text-white transition-colors">
                  studio@likeme.salon
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
             <h4 className="text-lg font-luxury text-white mb-8 uppercase tracking-widest text-sm">The Gazette</h4>
             <p className="text-white/40 text-xs leading-relaxed mb-6 font-sans">
                Subscribe for exclusive styling invitations and transformation updates.
             </p>
             <div className="relative mt-8">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 aspect-square bg-brand-blue text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-widest text-white/20">
            © 2024 LIKE ME Salon. All Rights Reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-4 group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover:text-brand-blue transition-colors">
              Back to Top
            </span>
            <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-blue/50 transition-colors">
              <ArrowUp className="w-4 h-4 text-brand-blue group-hover:animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
