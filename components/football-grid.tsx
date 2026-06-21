'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function FootballGrid() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 30 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 font-sans">
      {/* Üst Bar */}
      <div className="bg-[#1e293b] p-4 rounded-2xl flex items-center justify-between mb-6 border border-white/10 shadow-xl">
        <div className="text-sm font-bold text-gray-400">SÜRE: <span className="text-white text-xl">{timeLeft}</span></div>
        <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-500/40 transition">PES ET</button>
      </div>

      {/* Oyun Alanı */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        <div />
        {['AC MILAN', 'BARCELONA', 'PSG'].map((team, i) => (
          <div key={i} className="bg-[#1e293b] p-2 rounded-lg text-[10px] font-black text-center border border-white/5">{team}</div>
        ))}
        {['PSG', 'LIVERPOOL', 'FENERBAHÇE'].map((team, i) => (
          <div key={i} className="contents">
            <div className="bg-[#1e293b] p-2 rounded-lg text-[10px] font-black text-center border border-white/5 rotate-[-90deg] flex items-center justify-center">{team}</div>
            {[0, 1, 2].map((_, j) => (
              <motion.button 
                key={j}
                whileHover={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(true)}
                className="h-20 bg-[#1e293b] rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 hover:border-white/30 transition"
              >
                +
              </motion.button>
            ))}
          </div>
        ))}
      </div>

      {/* Oyuncu Seçme Menüsü */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-[#0f172a] p-6 rounded-t-3xl border-t border-white/10 shadow-2xl z-50"
          >
            <h3 className="text-sm font-bold mb-4 text-gray-400">OYUNCU SEÇ</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Beckenbauer', 'Müller', 'Pelé', 'Cruyff'].map((player, i) => (
                <button onClick={() => setIsMenuOpen(false)} key={i} className="bg-[#1e293b] p-4 rounded-xl text-xs font-bold border border-white/10 hover:border-blue-500 transition">
                  {player}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
