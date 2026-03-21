'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Scissors, ArrowRight, CheckCircle2, ChevronRight, Star } from 'lucide-react'
import { RevealText } from '../animations/RevealText'
import { cn } from '@/lib/utils'

const steps = ['Service', 'Stylist', 'Date & Time', 'Confirm']

const services = [
  { id: 'cut', name: 'Signature Cut', price: '₹499', icon: Scissors },
  { id: 'beard', name: 'Beard Art', price: '₹399', icon: Star },
  { id: 'glow', name: 'Wedding Glow', price: '₹1499', icon: CheckCircle2 },
  { id: 'spa', name: 'Spa Ritual', price: '₹1999', icon: Clock },
]

const stylists = [
  { id: 'marco', name: 'Marco V.', role: 'Master Barber', image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80' },
  { id: 'elena', name: 'Elena S.', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1595959183082-c8ef7ec3bc43?auto=format&fit=crop&q=80' },
  { id: 'julian', name: 'Julian R.', role: 'Skin Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80' },
]

const timeSlots = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM']

const getNext7Days = () => {
  const days = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push({
      full: date.toDateString(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      num: date.getDate(),
    })
  }
  return days
}

export function Booking() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isBooked, setIsBooked] = useState(false)
  
  const [bookingData, setBookingData] = useState({
    service: null as typeof services[0] | null,
    stylist: null as typeof stylists[0] | null,
    date: null as { full: string, day: string, num: number } | null,
    time: null as string | null,
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsBooked(true)
    }
  }

  const isStepValid = () => {
    if (currentStep === 0) return !!bookingData.service
    if (currentStep === 1) return !!bookingData.stylist
    if (currentStep === 2) return !!bookingData.date && !!bookingData.time
    return true
  }

  const nextDays = getNext7Days()

  return (
    <section id="booking" className="py-24 px-6 bg-brand-black relative">
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none" />
       
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <RevealText>
            <span className="text-brand-blue uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Reservation
            </span>
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-luxury mb-4 leading-tight">
            <RevealText delay={0.2}>Start Your <span className="text-brand-blue">Journey.</span></RevealText>
          </h2>
        </div>

        <div className="glass border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative min-h-[600px] flex flex-col">
          {!isBooked ? (
            <>
              {/* Stepper */}
              <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
                {steps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500",
                      idx < currentStep ? "bg-green-500 text-white" : 
                      idx === currentStep ? "bg-brand-blue text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" : 
                      "bg-white/5 text-white/20 border border-white/10"
                    )}>
                      {idx < currentStep ? "✓" : idx + 1}
                    </div>
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest font-bold hidden sm:inline transition-colors duration-500",
                      idx <= currentStep ? 'text-white' : 'text-white/20'
                    )}>
                      {step}
                    </span>
                    {idx < steps.length - 1 && <div className="w-8 h-[1px] bg-white/10 hidden lg:block" />}
                  </div>
                ))}
              </div>

              {/* Form Content */}
              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    {/* Step 0: Service */}
                    {currentStep === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map(s => (
                          <button 
                            key={s.id} 
                            onClick={() => setBookingData({ ...bookingData, service: s })}
                            className={cn(
                              "p-8 rounded-2xl bg-white/5 border text-left transition-all group relative overflow-hidden",
                              bookingData.service?.id === s.id ? "border-brand-blue bg-brand-blue/10" : "border-white/10 hover:border-brand-blue/50"
                            )}
                          >
                            <s.icon className={cn(
                              "w-8 h-8 mb-4 transition-transform group-hover:scale-110",
                              bookingData.service?.id === s.id ? "text-brand-blue" : "text-white/40"
                            )} />
                            <h4 className="text-xl font-luxury text-white mb-2">{s.name}</h4>
                            <p className="text-white/40 text-sm">Starting from {s.price}</p>
                            {bookingData.service?.id === s.id && (
                              <div className="absolute top-4 right-4 text-brand-blue">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 1: Stylist */}
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stylists.map(stylist => (
                          <button 
                            key={stylist.id} 
                            onClick={() => setBookingData({ ...bookingData, stylist: stylist })}
                            className={cn(
                              "p-6 rounded-2xl bg-white/5 border text-center transition-all group",
                              bookingData.stylist?.id === stylist.id ? "border-brand-blue bg-brand-blue/10" : "border-white/10 hover:border-brand-blue/50"
                            )}
                          >
                            <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-white/10 group-hover:border-brand-blue/30 transition-all">
                              <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-lg font-luxury text-white mb-1">{stylist.name}</h4>
                            <p className="text-white/40 text-xs uppercase tracking-widest">{stylist.role}</p>
                            {bookingData.stylist?.id === stylist.id && (
                              <div className="mt-4 text-brand-blue flex justify-center">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 2: Date & Time */}
                    {currentStep === 2 && (
                      <div className="space-y-10">
                        <div>
                          <h4 className="text-white text-sm uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                             <Calendar className="w-4 h-4 text-brand-blue" /> Select Date
                          </h4>
                          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {nextDays.map(d => (
                              <button 
                                key={d.full}
                                onClick={() => setBookingData({ ...bookingData, date: d })}
                                className={cn(
                                  "flex-shrink-0 w-16 h-20 rounded-xl border flex flex-col items-center justify-center transition-all",
                                  bookingData.date?.full === d.full ? "bg-brand-blue border-brand-blue text-white" : "bg-white/5 border-white/10 text-white/40 hover:border-brand-blue/50"
                                )}
                              >
                                <span className="text-[10px] uppercase font-bold mb-1">{d.day}</span>
                                <span className="text-lg font-luxury">{d.num}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white text-sm uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                             <Clock className="w-4 h-4 text-brand-blue" /> Available Slots
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {timeSlots.map(t => (
                              <button 
                                key={t}
                                onClick={() => setBookingData({ ...bookingData, time: t })}
                                className={cn(
                                  "py-4 rounded-xl border text-sm transition-all",
                                  bookingData.time === t ? "bg-brand-blue border-brand-blue text-white" : "bg-white/5 border-white/10 text-white/40 hover:border-brand-blue/50"
                                )}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Confirm */}
                    {currentStep === 3 && (
                      <div className="h-full flex flex-col items-center justify-center">
                        <div className="w-full max-w-md space-y-6">
                          <h4 className="text-white text-center text-sm uppercase tracking-widest mb-8 font-bold">Booking Details Review</h4>
                          <div className="space-y-4">
                             <div className="flex justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-white/40 text-sm uppercase tracking-widest">Service</span>
                                <span className="text-white text-sm font-bold">{bookingData.service?.name}</span>
                             </div>
                             <div className="flex justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-white/40 text-sm uppercase tracking-widest">Stylist</span>
                                <span className="text-white text-sm font-bold">{bookingData.stylist?.name}</span>
                             </div>
                             <div className="flex justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-white/40 text-sm uppercase tracking-widest">Schedule</span>
                                <span className="text-white text-sm font-bold">{bookingData.date?.full.split(' ').slice(0,3).join(' ')} at {bookingData.time}</span>
                             </div>
                             <div className="flex justify-between p-6 rounded-2xl bg-brand-blue/20 border border-brand-blue/30">
                                <span className="text-white/60 text-sm uppercase tracking-widest">Total Investment</span>
                                <span className="text-brand-blue text-xl font-luxury">{bookingData.service?.price}</span>
                             </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors disabled:opacity-0"
                >
                  Back
                </button>
                <div className="flex items-center gap-6">
                  {!isStepValid() && currentStep < 3 && (
                    <span className="text-[10px] uppercase tracking-widest text-brand-blue/50 font-bold italic hidden md:block">
                      Please make a selection to proceed
                    </span>
                  )}
                  <button
                    disabled={!isStepValid()}
                    onClick={handleNext}
                    className={cn(
                      "px-10 py-4 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 group",
                      isStepValid() ? "bg-brand-blue hover:bg-white hover:text-brand-blue shadow-[0_0_20px_rgba(37,99,235,0.3)]" : "bg-white/5 text-white/20 border border-white/10 cursor-not-allowed"
                    )}
                  >
                    {currentStep === steps.length - 1 ? 'Complete Transformation' : 'Next Step'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center justify-center flex-grow"
            >
              <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <CheckCircle2 className="w-12 h-12 text-brand-blue" />
              </div>
              <h3 className="text-4xl md:text-5xl font-luxury text-white mb-4">Transformation Confirmed.</h3>
              <p className="text-white/50 mb-10 text-sm max-w-sm mx-auto leading-relaxed">
                Thank you, your session with <span className="text-brand-blue font-bold">{bookingData.stylist?.name}</span> for a <span className="text-brand-blue font-bold">{bookingData.service?.name}</span> has been scheduled.
                We've sent the details to your email.
              </p>
              <button
                onClick={() => { 
                  setIsBooked(false); 
                  setCurrentStep(0); 
                  setBookingData({ service: null, stylist: null, date: null, time: null });
                }}
                className="px-10 py-4 border border-brand-blue/50 text-brand-blue rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
              >
                Schedule Another session
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
