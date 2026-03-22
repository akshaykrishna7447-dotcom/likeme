'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, X, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function AIStyleAdvisor() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Style Advisor. How can I help you transform your look today? (Try: 'I have a round face')",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI Response (Logic for specific queries)
    setTimeout(() => {
      let response = "That's a great question! For your specific style needs, I'd recommend consulting with our lead stylist. Would you like to check our availability?"
      
      const lowerInput = input.toLowerCase()
      if (lowerInput.includes('round face')) {
        response = "For a round face, I'd suggest a textured quiff or a layered cut to add height and structure. It creates a more angular silhouette!"
      } else if (lowerInput.includes('skin') || lowerInput.includes('facial')) {
        response = "Our Hydrafacial is perfect for a deep-cleansing glow. It removes impurities while saturating the skin with antioxidants!"
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            layoutId="ai-chat-container"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] w-14 h-14 sm:w-16 sm:h-16 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] cursor-pointer"
          >
            <motion.div layoutId="ai-icon">
              <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            layoutId="ai-chat-container"
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[calc(100vw-4rem)] max-w-[400px] h-[calc(100vh-6rem)] max-h-[600px] glass-heavy rounded-3xl overflow-hidden flex flex-col border border-brand-blue/20 shadow-[-20px_0_100px_rgba(37,99,235,0.15)] origin-bottom-right"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 bg-brand-blue/5 border-b border-brand-blue/10 flex items-center gap-4 relative">
              <motion.div layoutId="ai-icon" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-brand-blue flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                <Sparkles className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-lg sm:text-xl font-luxury text-brand-blue tracking-widest truncate">STYLE ADVISOR AI</h3>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/50 truncate">Online • Always Evolving</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-brand-blue transition-colors z-10"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 custom-scrollbar"
            >
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  key={msg.id}
                  className={cn(
                    'flex flex-col max-w-[90%] sm:max-w-[85%]',
                    msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  )}
                >
                  <div
                    className={cn(
                      'px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm leading-relaxed tracking-wide',
                      msg.role === 'user'
                        ? 'bg-brand-blue text-white font-semibold rounded-tr-sm'
                        : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-sm'
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2 items-center px-4 py-3 sm:px-5 sm:py-4 bg-white/5 w-fit rounded-xl sm:rounded-2xl border border-white/10 rounded-tl-sm">
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-brand-blue/10 bg-brand-black/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for style tips..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 sm:py-4 px-4 sm:px-6 pr-12 sm:pr-14 text-xs sm:text-sm focus:outline-none focus:border-brand-blue/50 transition-colors text-white placeholder-white/30 tracking-wide font-light"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-1.5 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 bg-brand-blue text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <Send className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
