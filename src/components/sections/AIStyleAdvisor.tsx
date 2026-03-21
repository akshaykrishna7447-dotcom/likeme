'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, X, MessageSquare, Bot } from 'lucide-react'
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
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-2xl blue-glow"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-[100] w-full max-w-[400px] h-[550px] glass rounded-2xl overflow-hidden flex flex-col border-brand-blue/20 shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-brand-blue/10 border-b border-brand-blue/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center shadow-lg">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-luxury text-brand-blue">Style Advisor AI</h3>
                <p className="text-[10px] uppercase tracking-widest text-white/50">Online • Always Evolving</p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col max-w-[80%]',
                    msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  )}
                >
                  <div
                    className={cn(
                      'px-4 py-3 rounded-2xl text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-brand-blue text-white font-semibold'
                        : 'bg-white/5 text-white border border-white/10'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-1 items-center px-4 py-2 bg-white/5 w-fit rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-brand-black/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for style tips..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 pr-12 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
