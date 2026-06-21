'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function FootballGrid() { // 'export default' yerine 'export' yaptık
  const [timeLeft, setTimeLeft] = useState(30)
  const [turn, setTurn] = useState<'user' | 'opponent'>('user')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 30 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full h-full bg-[#020617] text-white p-4">
      {/* Basit bir test metni ekleyelim, sayfa geliyor mu görelim */}
      <h1 className="text-white font-black text-2xl mb-4">TEST MODU: {timeLeft}</h1>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="bg-blue-600 px-4 py-2 rounded-lg"
      >
        Menu Aç/Kapat
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
          >
            <div className="absolute bottom-0 w-full bg-slate-800 p-8 rounded-t-3xl">
              <h2 className="text-white">Menü Çalışıyor!</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
