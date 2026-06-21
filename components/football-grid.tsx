'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const ALL_PLAYERS = ["L. Paredes", "M. Skriniar", "C. Ünder", "G. Wijnaldum", "M. Icardi", "H. Çalhanoğlu"]
const ROWS = ['PSG', 'Liverpool', 'Fenerbahçe']
const COLS = ['Roma', 'Inter', 'Dünya']

export function FootballGrid() {
  const [grid, setGrid] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)))
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null)
  const [turn, setTurn] = useState<'user' | 'opponent'>('user')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handlePlayerSelect = (playerName: string) => {
    if (!selectedCell) return
    const { r, c } = selectedCell
    
    // Doğrulama mantığı buraya gelecek
    const isCorrect = Math.random() > 0.3 

    if (isCorrect) {
      const newGrid = [...grid]
      newGrid[r][c] = playerName
      setGrid(newGrid)
      setStatus('success')
      setTimeout(() => { setSelectedCell(null); setTurn('opponent'); setStatus('idle') }, 800)
    } else {
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setTurn('opponent') }, 800)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#0A0A0A] text-white p-2">
      <div className="mb-6 px-6 py-2 bg-neutral-900 rounded-full border border-white/10 font-black text-xs uppercase tracking-widest">
        Sıra: <span className={turn === 'user' ? 'text-yellow-500' : 'text-white/40'}>{turn === 'user' ? 'Sen' : 'Rakip'}</span>
      </div>

      {/* Grid: Satır/Sütun yapısı tam korunuyor */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-[400px] aspect-square">
        <div className="bg-transparent"></div>
        {COLS.map((col, i) => (
          <div key={i} className="bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center font-black text-[10px] uppercase text-white/70">{col}</div>
        ))}
        
        {ROWS.map((rowTeam, r) => (
          <>
            <div className="bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center font-black text-[10px] uppercase text-white/70">{rowTeam}</div>
            {[0, 1, 2].map((c) => (
              <motion.button
                key={`${r}-${c}`}
                onClick={() => turn === 'user' && !grid[r][c] && setSelectedCell({ r, c })}
                className={cn(
                  "border-2 rounded-2xl flex items-center justify-center transition-all overflow-hidden p-1",
                  grid[r][c] ? "bg-green-500/10 border-green-500/50" : "bg-[#161616] border-white/5 hover:border-yellow-500/30"
                )}
              >
                {grid[r][c] ? <span className="text-[9px] font-bold text-center leading-tight text-green-400">{grid[r][c]}</span> : <span className="text-white/10 text-xl font-bold">+</span>}
              </motion.button>
            ))}
          </>
        ))}
      </div>

      <AnimatePresence>
        {selectedCell && (
          <motion.div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCell(null)}>
            <motion.div className={cn("bg-[#121212] p-6 rounded-3xl border w-full max-w-sm transition-colors", status === 'error' ? 'border-red-500' : status === 'success' ? 'border-green-500' : 'border-yellow-500/20')} onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-sm tracking-widest text-yellow-500">OYUNCU SEÇ</h3>
                <button onClick={() => setSelectedCell(null)}><X className="text-white/30" size={18} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ALL_PLAYERS.map((p, i) => (
                  <button key={i} onClick={() => handlePlayerSelect(p)} className="bg-[#1A1A1A] hover:bg-yellow-500 hover:text-black py-4 rounded-2xl font-bold text-[11px] transition-all border border-white/5">
                    {p}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
