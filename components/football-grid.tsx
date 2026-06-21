'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function FootballGrid() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [turn, setTurn] = useState<'user' | 'opponent'>('user')
  const [grid, setGrid] = useState<string[]>(Array(9).fill(null))
  const [selectedCell, setSelectedCell] = useState<number | null>(null)

  // Geri sayım ve sıra yönetimi
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

  const handlePlayerSelect = (playerName: string) => {
    if (selectedCell !== null) {
      const newGrid = [...grid]
      newGrid[selectedCell] = playerName
      setGrid(newGrid)
      setSelectedCell(null)
      setTurn(turn === 'user' ? 'opponent' : 'user')
      setTimeLeft(30)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 font-sans max-w-md mx-auto">
      {/* Üst Bar: Zengin Tasarım */}
      <div className="bg-[#0f172a] p-4 rounded-2xl flex items-center justify-between mb-6 border border-white/10 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Süre</span>
          <span className="text-xl font-bold font-mono">{timeLeft}s</span>
        </div>
        <div className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border", 
          turn === 'user' ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-red-500/10 border-red-500/50 text-red-400"
        )}>
          {turn === 'user' ? 'Sıra Sende' : 'Rakip Düşünüyor'}
        </div>
      </div>

      {/* Oyun Alanı */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        <div />
        {['MILAN', 'BARÇA', 'PSG'].map((t, i) => <div key={i} className="text-[9px] font-black text-gray-500 text-center uppercase">{t}</div>)}
        {['PSG', 'LIV', 'FENER'].map((row, r) => (
          <>
            <div className="text-[9px] font-black text-gray-500 flex items-center justify-center rotate-[-90deg]">{row}</div>
            {[0, 1, 2].map((c) => {
              const idx = r * 3 + c
              return (
                <button 
                  key={idx} 
                  onClick={() => turn === 'user' && setSelectedCell(idx)}
                  className="h-20 bg-[#0f172a] rounded-xl border border-white/5 hover:border-blue-500/50 transition-all flex items-center justify-center text-[9px] p-2"
                >
                  {grid[idx] || <span className="text-white/10 text-xl font-bold">+</span>}
                </button>
              )
            })}
          </>
        ))}
      </div>

      {/* Modern Oyuncu Seçme Paneli */}
      <AnimatePresence>
        {selectedCell !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 w-full bg-[#111827] p-6 rounded-t-3xl border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Kimi Seçiyorsun?</h3>
              <button onClick={() => setSelectedCell(null)} className="text-[10px] font-bold text-gray-600">KAPAT</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Zidane', 'Ronaldinho', 'Ronaldo', 'Messi'].map(player => (
                <button key={player} onClick={() => handlePlayerSelect(player)} className="bg-[#1e293b] p-4 rounded-xl text-xs font-bold border border-white/5 hover:border-blue-500 transition-all">
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

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
