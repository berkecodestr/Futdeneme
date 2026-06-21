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
  const [error, setError] = useState<string | null>(null);

  const startMatch = () => {
    setGameState('loading');
    setTimeout(() => setGameState('playing'), 2000); // 2 saniye rakip arama simülasyonu
  };

  const handleSelect = (playerName: string) => {
    if (!selectedCell) return;
    const { r, c } = selectedCell;
    const rowTeam = GRID_TEAMS[r].name;
    const colTeam = GRID_TEAMS[c + 3].name;
    const player = GRID_PLAYER_POOL.find(p => p.name === playerName);
    
    // Doğrulama: Basit bir kontrol (Gerçek projede burası veritabanına bağlanacak)
    const isCorrect = player && player.team.includes(rowTeam) && player.team.includes(colTeam);

    if (isCorrect) {
      const newGrid = [...grid];
      newGrid[r][c] = playerName;
      setGrid(newGrid);
      setTurn(turn === 'user' ? 'opponent' : 'user');
      setSelectedCell(null);
    } else {
      setError("Hatalı Seçim! Oyuncu bu takımlarda oynamadı.");
      setTimeout(() => setError(null), 2000);
    }
  };

  if (gameState === 'idle') return (
    <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-6xl font-black italic tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">VIP GRID</h1>
        <p className="text-gray-500 mb-10 uppercase tracking-[0.3em] text-[10px]">Professional Football Challenge</p>
        <button onClick={startMatch} className="group relative px-8 py-4 bg-white text-black font-black uppercase rounded-lg hover:bg-yellow-500 transition-all">
          Maça Başla
        </button>
      </motion.div>
    </div>
  );

  if (gameState === 'loading') return (
    <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white gap-4">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-bold tracking-widest animate-pulse">RAKİP ARANIYOR...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 flex flex-col items-center">
      <div className="mb-8 flex items-center gap-4 border border-white/10 px-6 py-2 rounded-full bg-white/5">
        <div className={cn("w-2 h-2 rounded-full", turn === 'user' ? "bg-green-500 animate-pulse" : "bg-red-500")} />
        <span className="text-[10px] font-black uppercase tracking-widest">{turn === 'user' ? "Sıra Sende" : "Rakip Hamle Yapıyor..."}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full max-w-[400px]">
        <div /> 
        {GRID_TEAMS.slice(3, 6).map((col, i) => (
          <div key={i} className="h-20 bg-[#0c0c0c] border border-white/5 rounded-xl flex items-center justify-center font-black text-[9px] uppercase opacity-70 text-center">{col.name}</div>
        ))}
        {GRID_TEAMS.slice(0, 3).map((row, r) => (
          <>
            <div className="h-20 bg-[#0c0c0c] border border-white/5 rounded-xl flex items-center justify-center font-black text-[9px] uppercase opacity-70 rotate-[-90deg]">{row.name}</div>
            {[0, 1, 2].map((c) => (
              <button key={`${r}-${c}`} onClick={() => setSelectedCell({ r, c })} className={cn("h-20 border border-white/10 rounded-xl transition-all", grid[r][c] ? "bg-green-900/20 border-green-500" : "bg-[#0c0c0c] hover:border-white/30")}>
                {grid[r][c] ? <span className="text-[9px] font-bold text-green-500 px-1">{grid[r][c]}</span> : <span className="text-white/10 text-xl font-bold">+</span>}
              </button>
            ))}
          </>
        ))}
      </div>

      {error && <motion.div initial={{y: 20}} animate={{y:0}} className="mt-8 px-6 py-3 bg-red-900/20 border border-red-500 text-red-500 font-bold text-[11px] rounded-lg">{error}</motion.div>}

      <AnimatePresence>
        {selectedCell && (
          <motion.div initial={{opacity:0}} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6">
            <div className="bg-[#111] p-6 rounded-2xl w-full max-w-sm border border-white/10">
              <h2 className="font-black text-lg mb-6">OYUNCU SEÇ</h2>
              <div className="grid grid-cols-2 gap-2">
                {GRID_PLAYER_POOL.slice(0, 4).map((p, i) => (
                  <button key={i} onClick={() => handleSelect(p.name)} className="p-3 bg-[#1a1a1a] border border-white/5 rounded-lg hover:border-yellow-500/50 transition-all text-xs font-bold">{p.name}</button>
                ))}
              </div>
              <button onClick={() => setSelectedCell(null)} className="mt-4 w-full p-3 text-[10px] text-gray-500 font-bold uppercase">Vazgeç</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
