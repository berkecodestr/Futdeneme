'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GRID_TEAMS, GRID_PLAYER_POOL } from '@/lib/data';

const ROWS = GRID_TEAMS.slice(0, 3);
const COLS = GRID_TEAMS.slice(3, 6);

export function FootballGrid() {
  const [grid, setGrid] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)))
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null)
  const [turn, setTurn] = useState<'user' | 'opponent'>('user')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handlePlayerSelect = (playerName: string) => {
    if (!selectedCell) return
    const { r, c } = selectedCell
    
    // Basit doğrulama: Oyuncu havuzunda var mı diye bak (Daha sonra detaylandıracağız)
    const isCorrect = true 

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

      <div className="grid grid-cols-4 gap-2 w-full max-w-[400px] aspect-square">
        <div className="bg-transparent"></div>
        {/* Sütun Başlıkları */}
        {COLS.map((col, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-1 bg-neutral-900 border border-white/10 rounded-xl">
             <img src={col.logo} className="w-6 h-6 mb-1 rounded-full" alt={col.name} />
             <span className="text-[8px] font-black uppercase text-white/70">{col.name}</span>
          </div>
        ))}
        
        {/* Satır Başlıkları ve Hücreler */}
        {ROWS.map((rowTeam, r) => (
          <>
            <div className="flex flex-col items-center justify-center p-1 bg-neutral-900 border border-white/10 rounded-xl">
               <img src={rowTeam.logo} className="w-6 h-6 mb-1 rounded-full" alt={rowTeam.name} />
               <span className="text-[8px] font-black uppercase text-white/70">{rowTeam.name}</span>
            </div>
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
    </div>
  )
}
