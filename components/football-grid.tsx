'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FootballGrid() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [turn, setTurn] = useState<'user' | 'opponent'>('user')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Geri Sayım Sayacı - Hata yapmaması için güvenli useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTurn(turn === 'user' ? 'opponent' : 'user')
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [turn])

  const handlePesEt = () => {
    window.location.reload() // Basit bir şekilde oyunu sıfırlayalım
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4">
      {/* Üst Bar */}
      <div className="bg-[#1e293b] p-4 rounded-2xl flex items-center justify-between mb-6 border border-white/5">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          SÜRE: <span className="text-white text-lg ml-2">{timeLeft}s</span>
        </div>
        <button onClick={handlePesEt} className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase">Pes Et</button>
      </div>

      {/* Oyun Alanı */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        <div />
        {['AC MILAN', 'BARCELONA', 'PSG'].map(team => (
          <div key={team} className="bg-[#1e293b] p-2 rounded-lg text-[9px] font-bold text-center border border-white/5 truncate">{team}</div>
        ))}
        {['PSG', 'LIVERPOOL', 'FENERBAHÇE'].map((team, i) => (
          <div key={i} className="contents">
            <div className="bg-[#1e293b] p-2 rounded-lg text-[9px] font-bold text-center border border-white/5 flex items-center justify-center rotate-[-90deg] h-20">{team}</div>
            {[0, 1, 2].map((_, j) => (
              <button 
                key={j} 
                onClick={() => setTurn('user') && setIsMenuOpen(true)}
                className="h-20 bg-[#1e293b] rounded-xl border border-white/5 flex items-center justify-center text-white/10"
              >
                +
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Seçim Menüsü */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
            className="fixed bottom-0 left-0 w-full bg-[#1e293b] p-6 rounded-t-3xl border-t border-white/10"
          >
            <h3 className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">Oyuncu Seç</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Beckenbauer', 'Müller', 'Pelé', 'Cruyff'].map(player => (
                <button onClick={() => setIsMenuOpen(false)} key={player} className="bg-[#0f172a] p-4 rounded-xl text-[11px] font-bold border border-white/5">
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
