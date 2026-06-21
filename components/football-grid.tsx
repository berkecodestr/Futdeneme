'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'

// Örnek dinamik havuz (Bunu kendi data.ts dosyanla değiştirebilirsin)
const ALL_PLAYERS = ["L. Paredes", "M. Skriniar", "C. Ünder", "G. Wijnaldum", "M. Icardi", "H. Çalhanoğlu", "A. Rabiot", "D. Vlahović"]

const ROWS = ['PSG', 'Liverpool', 'Fenerbahçe']
const COLS = ['Roma', 'Inter', 'Dünya']

export function FootballGrid() {
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null)
  const [randomPlayers, setRandomPlayers] = useState<string[]>([])

  // Kutucuğa tıklanınca rastgele 4 isim getir
  const handleCellClick = (r: number, c: number) => {
    const shuffled = [...ALL_PLAYERS].sort(() => 0.5 - Math.random());
    setRandomPlayers(shuffled.slice(0, 4));
    setSelectedCell({ r, c });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#0A0A0A] text-white p-2">
      {/* Grid: w-full ve max-w-md ile ekranı doldurmasını sağladık */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-[400px] aspect-square">
        <div className="bg-transparent"></div> {/* Köşe boşluğu */}
        
        {/* Üst Takımlar */}
        {COLS.map((col, i) => (
          <div key={i} className="bg-neutral-900 border border-white/5 rounded-xl flex items-center justify-center font-black text-[10px] uppercase tracking-wider text-yellow-500/80">
            {col}
          </div>
        ))}
        
        {/* Satır ve Kutucuklar */}
        {ROWS.map((rowTeam, r) => (
          <>
            <div className="bg-neutral-900 border border-white/5 rounded-xl flex items-center justify-center font-black text-[10px] uppercase tracking-wider text-yellow-500/80">
              {rowTeam}
            </div>
            {[0, 1, 2].map((c) => (
              <motion.button
                key={`${r}-${c}`}
                whileHover={{ scale: 0.95 }}
                onClick={() => handleCellClick(r, c)}
                className="bg-[#161616] border-2 border-white/5 rounded-2xl flex items-center justify-center shadow-lg transition-all hover:border-yellow-500/30"
              >
                <span className="text-white/20 font-bold text-2xl">+</span>
              </motion.button>
            ))}
          </>
        ))}
      </div>

      {/* Gelişmiş Seçim Ekranı */}
      <AnimatePresence>
        {selectedCell && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCell(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="bg-neutral-900 p-6 rounded-3xl border border-yellow-500/20 w-full max-w-sm shadow-[0_0_30px_rgba(234,179,8,0.2)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg tracking-widest text-yellow-500">OYUNCU SEÇ</h3>
                <button onClick={() => setSelectedCell(null)} className="text-white/50 hover:text-white"><X size={20} /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {randomPlayers.map((p, i) => (
                  <button 
                    key={i} 
                    className="bg-[#1A1A1A] hover:bg-yellow-500 hover:text-black py-4 px-2 rounded-2xl font-bold text-xs transition-all border border-white/5"
                  >
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
