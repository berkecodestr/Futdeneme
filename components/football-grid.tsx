'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GRID_TEAMS, GRID_PLAYER_POOL } from '@/lib/data';

export function FootballGrid() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [turn, setTurn] = useState<'user' | 'opponent'>('user');
  const [grid, setGrid] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null);

  const handleSelect = (playerName: string) => {
    if (selectedCell) {
      const { r, c } = selectedCell;
      const newGrid = [...grid];
      newGrid[r][c] = playerName;
      setGrid(newGrid);
      setSelectedCell(null);
      setTurn(turn === 'user' ? 'opponent' : 'user');
    }
  };

  if (!isPlaying) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0A0A0A] text-white">
        <motion.h1 initial={{y: -20}} animate={{y: 0}} className="text-5xl font-black mb-12 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
          VIP FOOTBALL GRID
        </motion.h1>
        <button onClick={() => setIsPlaying(true)} className="px-10 py-4 bg-white text-black font-black rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(234,179,8,0.5)]">
          MAÇA BAŞLA
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white p-4">
      
      {/* GÜNCELLENEN SIRA KISMI */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className={cn(
          "px-8 py-3 rounded-full border-2 font-black uppercase tracking-widest transition-all",
          turn === 'user' 
            ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]" 
            : "bg-neutral-800 border-neutral-600 text-neutral-500"
        )}>
          {turn === 'user' ? 'SENİN SIRAN' : 'RAKİBİN SIRASI'}
        </div>
        <div className={turn === 'opponent' ? "text-red-400 font-bold text-xs" : "text-neutral-600 font-bold text-xs"}>
          {turn === 'opponent' ? 'RAKİP HAMLE YAPIYOR...' : 'BEKLENİYOR...'}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full max-w-[400px]">
        <div/> 
        {GRID_TEAMS.slice(3, 6).map((col, i) => (
          <div key={i} className="bg-neutral-900 border border-white/5 p-3 rounded-2xl flex items-center justify-center text-[9px] font-black uppercase opacity-60 text-center">{col.name}</div>
        ))}
        {GRID_TEAMS.slice(0, 3).map((row, r) => (
          <>
            <div className="bg-neutral-900 border border-white/5 p-3 rounded-2xl flex items-center justify-center text-[9px] font-black uppercase opacity-60 -rotate-90">{row.name}</div>
            {[0, 1, 2].map((c) => (
              <button key={`${r}-${c}`} onClick={() => setSelectedCell({r, c})} className={cn("h-24 border-2 rounded-2xl transition-all", grid[r][c] ? "border-emerald-500 bg-emerald-500/10" : "border-white/5 bg-[#161616]")}>
                {grid[r][c] ? <span className="text-[10px] font-bold text-emerald-400">{grid[r][c]}</span> : <span className="text-white/20 text-2xl font-bold">+</span>}
              </button>
            ))}
          </>
        ))}
      </div>

      <AnimatePresence>
        {selectedCell && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#1A1A1A] border border-white/10 p-6 rounded-3xl w-full max-w-sm">
              <h2 className="text-xl font-black mb-6 text-yellow-500">OYUNCU SEÇ</h2>
              <div className="grid grid-cols-2 gap-3">
                {GRID_PLAYER_POOL.slice(0, 4).map((p, i) => (
                  <button key={i} onClick={() => handleSelect(p.name)} className="p-4 bg-neutral-900 hover:bg-neutral-800 rounded-xl font-bold transition-all">
                    {p.name}
                  </button>
                ))}
              </div>
              <button onClick={() =>
