'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GRID_TEAMS, GRID_PLAYER_POOL } from '@/lib/data';

export function FootballGrid() {
  const [gameState, setGameState] = useState<'idle' | 'loading' | 'playing'>('idle');
  const [turn, setTurn] = useState<'user' | 'opponent'>('user');
  const [grid, setGrid] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null);

  const startMatch = () => {
    setGameState('loading');
    setTimeout(() => setGameState('playing'), 2500); // Daha "ağır" ve premium bir geçiş
  };

  const handleSelect = (playerName: string) => {
    if (!selectedCell) return;
    const { r, c } = grid; // Basit atama
    const newGrid = [...grid];
    newGrid[selectedCell.r][selectedCell.c] = playerName;
    setGrid(newGrid);
    setTurn(turn === 'user' ? 'opponent' : 'user');
    setSelectedCell(null);
  };

  if (gameState === 'idle') return (
    <div className="h-screen bg-[#1a2a6c] bg-gradient-to-br from-[#1a2a6c] to-[#b21f1f] flex flex-col items-center justify-center text-white p-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <div className="w-24 h-24 bg-white/10 rounded-3xl mx-auto mb-6 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
          <span className="text-4xl font-black">⚽</span>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter mb-2 drop-shadow-xl">VIP GRID</h1>
        <p className="text-white/60 mb-12 font-medium uppercase tracking-[0.2em] text-[11px]">Professional Matchmaking</p>
        <button onClick={startMatch} className="px-12 py-5 bg-white text-[#b21f1f] font-black uppercase rounded-full hover:scale-105 transition-transform shadow-2xl">
          Maça Başla
        </button>
      </motion.div>
    </div>
  );

  if (gameState === 'loading') return (
    <div className="h-screen bg-[#1a2a6c] flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-8" />
      <h2 className="text-xl font-black tracking-widest animate-pulse">RAKİP BULUNDU</h2>
      <p className="text-white/50 text-sm mt-2">Maç hazırlanıyor... 2</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#e2e8f0] p-4 flex flex-col items-center">
      {/* Üst Bilgi Barı */}
      <div className="w-full max-w-md bg-white rounded-2xl p-4 shadow-sm mb-6 flex justify-between items-center border-b-4 border-gray-300">
        <div className="text-[10px] font-bold text-gray-400 uppercase">Sıra: <span className={turn === 'user' ? "text-green-600" : "text-red-600"}>{turn === 'user' ? 'SENDE' : 'RAKİPTE'}</span></div>
        <div className="text-xl font-black text-gray-800">00:27</div>
        <button className="px-4 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg uppercase">Pes Et</button>
      </div>

      {/* Grid Tasarımı (Premium) */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-md bg-[#4a7c59] p-3 rounded-2xl shadow-inner">
        <div /> 
        {GRID_TEAMS.slice(3, 6).map((col, i) => (
          <div key={i} className="h-16 bg-white/10 rounded-lg flex items-center justify-center font-black text-[9px] uppercase text-white/90">{col.name}</div>
        ))}
        {GRID_TEAMS.slice(0, 3).map((row, r) => (
          <>
            <div className="h-16 bg-white/10 rounded-lg flex items-center justify-center font-black text-[9px] uppercase text-white/90 rotate-[-90deg]">{row.name}</div>
            {[0, 1, 2].map((c) => (
              <button key={`${r}-${c}`} onClick={() => setSelectedCell({ r, c })} className="h-16 bg-white rounded-lg flex items-center justify-center shadow-lg transition-transform active:scale-95">
                {grid[r][c] ? <span className="text-[9px] font-bold text-gray-800">{grid[r][c]}</span> : <span className="text-gray-300 text-xl font-bold">+</span>}
              </button>
            ))}
          </>
        ))}
      </div>

      {/* Oyuncu Seçme Alanı (Zemin) */}
      <div className="w-full max-w-md mt-6 grid grid-cols-2 gap-3">
        {GRID_PLAYER_POOL.slice(0, 4).map((p, i) => (
          <button key={i} onClick={() => handleSelect(p.name)} className="bg-white p-4 rounded-xl shadow-md border-b-4 border-gray-200 flex items-center gap-3 hover:border-blue-400 transition-all">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <span className="text-xs font-bold text-gray-700">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
