'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Scissors, ArrowRight, CheckCircle2 } from 'lucide-react'
import { RevealText } from '../animations/RevealText'

const steps = ['Service', 'Stylist', 'Date & Time', 'Confirm']

export function Booking() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isBooked, setIsBooked] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsBooked(true)
    }
  }

  return (
    <section id="booking" className="py-24 px-6 bg-luxury-black relative">
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxury-gold/5 blur-[150px] rounded-full pointer-events-none" />
       
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <RevealText>
            <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Reservation
            </span>
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-luxury mb-4">
            <RevealText delay={0.2}>Start Your <span className="text-luxury-gold">Journey.</span></RevealText>
          </h2>
        </div>

        <div className="glass border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
          {!isBooked ? (
            <>
              {/* Stepper */}
              <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
                {steps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      idx <= currentStep ? 'bg-brand-blue text-white' : 'bg-white/5 text-white/40 border border-white/10'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold hidden sm:inline ${
                      idx <= currentStep ? 'text-white' : 'text-white/20'
                    }`}>
                      {step}
                    </span>
                    {idx < steps.length - 1 && <div className="w-8 h-[1px] bg-white/10 hidden lg:block" />}
                  </div>
                ))}
              </div>

              {/* Form Content (Placeholder) */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8 min-h-[300px]"
              >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentStep === 0 && (
                      ['Signature Cut', 'Beard Art', 'Wedding Glow', 'Spa Ritual'].map(s => (
                        <button key={s} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-brand-blue/50 transition-all group">
                          <Scissors className="w-6 h-6 text-brand-blue mb-4 group-hover:scale-110 transition-transform" />
                          <h4 className="text-lg font-brand text-white mb-2">{s}</h4>
                          <p className="text-white/40 text-xs">Starting from ₹499</p>
                        </button>
                      ))
                    )}
                    {currentStep >= 1 && (
                      <div className="col-span-2 text-center py-12 opacity-50 italic text-white/40">
                        {steps[currentStep]} selection logic would go here in a production app.
                      </div>
                    )}
                 </div>
              </motion.div>

              <div className="mt-12 flex justify-between">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors disabled:opacity-0"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-10 py-4 bg-brand-blue text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-blue transition-all flex items-center gap-2 group"
                >
                  {currentStep === steps.length - 1 ? 'Complete Booking' : 'Next Step'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <CheckCircle2 className="w-12 h-12 text-luxury-gold" />
              </div>
              <h3 className="text-4xl font-luxury text-white mb-4">Transformation Confirmed.</h3>
              <p className="text-white/50 mb-10 text-sm max-w-sm mx-auto leading-relaxed">
                We've sent the details to your email. Get ready to experience the ultimate salon luxury.
              </p>
              <button
                onClick={() => { setIsBooked(false); setCurrentStep(0); }}
                className="px-10 py-4 border border-luxury-gold/50 text-luxury-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-all"
              >
                Book Another
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
