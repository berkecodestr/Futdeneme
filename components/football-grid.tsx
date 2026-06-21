'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FootballGrid() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [turn, setTurn] = useState<'user' | 'opponent'>('user')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [grid, setGrid] = useState(Array(9).fill(null))

  // Geri Sayım Sayacı
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setTurn(turn === 'user' ? 'opponent' : 'user')
      setTimeLeft(30)
    }
  }, [timeLeft, turn])

  const handlePesEt = () => {
    alert("Maçı terk ettin. Rakibin kazandı!")
    // Burada yönlendirme veya oyun sıfırlama yapılabilir
  }

  const handleCellClick = () => {
    if (turn === 'user') setIsMenuOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 font-sans">
      {/* Üst Bar (Skor ve Süre) */}
      <div className="bg-[#1e293b] p-4 rounded-2xl flex items-center justify-between mb-6 border border-white/10 shadow-xl">
        <div className="text-sm font-bold text-gray-400">SÜRE: <span className="text-white text-xl">{timeLeft}</span></div>
        <button onClick={handlePesEt} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-500/40 transition">PES ET</button>
      </div>

      {/* Oyun Alanı */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        <div /> {/* Boş alan */}
        {['AC MILAN', 'BARCELONA', 'PSG'].map(team => (
          <div key={team} className="bg-[#1e293b] p-2 rounded-lg text-[10px] font-black text-center border border-white/5">{team}</div>
        ))}
        {['PSG', 'LIVERPOOL', 'FENERBAHÇE'].map((team, i) => (
          <>
            <div className="bg-[#1e293b] p-2 rounded-lg text-[10px] font-black text-center border border-white/5 rotate-[-90deg]">{team}</div>
            {[0, 1, 2].map((_, j) => (
              <motion.button 
                whileHover={{ scale: 0.98 }}
                onClick={handleCellClick}
                key={j} className="h-20 bg-[#1e293b] rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 hover:border-white/30 transition">
                +
              </motion.button>
            ))}
          </>
        ))}
      </div>

      {/* Oyuncu Seçme Menüsü */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-[#0f172a] p-6 rounded-t-3xl border-t border-white/10 shadow-2xl"
          >
            <h3 className="text-sm font-bold mb-4 text-gray-400">OYUNCU SEÇ</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Franz Beckenbauer', 'Gerd Müller', 'Pelé', 'Johan Cruyff'].map(player => (
                <button onClick={() => setIsMenuOpen(false)} key={player} className="bg-[#1e293b] p-4 rounded-xl text-xs font-bold border border-white/10 hover:border-blue-500 transition">
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
