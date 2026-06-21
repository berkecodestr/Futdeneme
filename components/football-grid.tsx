'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GRID_TEAMS } from '@/lib/data';

export function FootballGrid() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [turn, setTurn] = useState<'user' | 'opponent'>('user');
  const [grid, setGrid] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null);

  if (!isPlaying) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0A0A0A] text-white">
        <motion.h1 initial={{y: -20}} animate={{y: 0}} className="text-5xl font-black mb-12 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
          VIP FOOTBALL GRID
        </motion.h1>
        <button 
          onClick={() => setIsPlaying(true)}
          className="px-10 py-4 bg-white text-black font-black rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(234,179,8,0.5)]"
        >
          MAÇA BAŞLA
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white p-4">
      {/* SIRA GÖSTERGESİ */}
      <div className={cn(
        "mb-8 px-6 py-2 rounded-full border font-black uppercase tracking-[0.2em] text-xs transition-all",
        turn === 'user' ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-red-500/10 border-red-500/50 text-red-400"
      )}>
        SIRA: {turn === 'user' ? 'SEN' : 'RAKİP'}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-[400px]">
        <div/> 
        {GRID_TEAMS.slice(3, 6).map((col, i) => (
          <div key={i} className="bg-neutral-900 border border-white/5 p-3 rounded-2xl flex flex-col items-center justify-center">
             <span className="text-[9px] font-black uppercase opacity-60 text-center">{col.name}</span>
          </div>
        ))}
        
        {GRID_TEAMS.slice(0, 3).map((row, r) => (
          <>
            <div className="bg-neutral-900 border border-white/5 p-3 rounded-2xl flex items-center justify-center">
               <span className="text-[9px] font-black uppercase opacity-60 -rotate-90">{row.name}</span>
            </div>
            {[0, 1, 2].map((c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => setSelectedCell({r, c})}
                className={cn(
                  "h-24 border-2 rounded-2xl flex items-center justify-center transition-all hover:bg-white/5",
                  grid[r][c] ? "border-emerald-500 bg-emerald-500/10" : "border-white/5 bg-[#161616]"
                )}
              >
                {grid[r][c] ? <span className="text-[10px] font-bold text-emerald-400">{grid[r][c]}</span> : <span className="text-white/20 text-2xl font-bold">+</span>}
              </button>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
