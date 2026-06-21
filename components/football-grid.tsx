'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GRID_TEAMS } from '@/lib/data';

export function FootballGrid() {
  const [isPlaying, setIsPlaying] = useState(false); // Oyun başladı mı?
  const [turn, setTurn] = useState<'user' | 'opponent'>('user');
  const [grid, setGrid] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null);

  if (!isPlaying) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0A0A0A] text-white">
        <h1 className="text-4xl font-black mb-8">VIP FOOTBALL GRID</h1>
        <button 
          onClick={() => setIsPlaying(true)}
          className="px-12 py-4 bg-yellow-500 text-black font-black rounded-full hover:scale-105 transition-all"
        >
          OYUNA BAŞLA
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white p-4">
      {/* SIRA KUTUSU - Renklendirilmiş */}
      <div className={cn(
        "mb-6 px-8 py-3 rounded-2xl border font-black uppercase tracking-widest transition-colors",
        turn === 'user' ? "bg-green-500/20 border-green-500 text-green-400" : "bg-red-500/20 border-red-500 text-red-400"
      )}>
        Sıra: {turn === 'user' ? 'Sen (Yeşil)' : 'Rakip (Kırmızı)'}
      </div>

      <div className="grid grid-cols-4 gap-2 w-full max-w-[400px]">
        <div/> {/* Boş köşe */}
        {GRID_TEAMS.slice(3, 6).map((col, i) => (
          <div key={i} className="bg-neutral-900 p-2 rounded-xl text-[10px] text-center font-bold">{col.name}</div>
        ))}
        
        {GRID_TEAMS.slice(0, 3).map((row, r) => (
          <>
            <div className="bg-neutral-900 p-2 rounded-xl text-[10px] text-center font-bold">{row.name}</div>
            {[0, 1, 2].map((c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => setTurn(turn === 'user' ? 'opponent' : 'user')} // Basit geçiş
                className={cn(
                  "h-20 border-2 rounded-xl flex items-center justify-center transition-all",
                  turn === 'user' ? "border-green-500 bg-green-900/10" : "border-red-500 bg-red-900/10"
                )}
              >
                {grid[r][c] || "+"}
              </button>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
