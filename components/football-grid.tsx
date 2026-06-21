'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'

// Buradaki takımları ve oyuncuları grid-utils'ten çekebilirsin
const ROWS = ['PSG', 'Liverpool', 'Fenerbahçe']
const COLS = ['Roma', 'Inter', 'Dünya']
const MOCK_PLAYERS = ["L. Paredes", "M. Skriniar", "C. Ünder", "G. Wijnaldum"]

export function FootballGrid() {
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null)

  return (
    <div className="flex flex-col items-center py-10 bg-[#0A0A0A] min-h-screen text-white px-4">
      <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
        <Trophy className="size-6 text-yellow-500" /> VIP FOOTBALL GRID
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2">
        <div className="size-20"></div>
        {COLS.map((col, i) => (
          <div key={i} className="size-20 bg-neutral-900 border border-white/5 rounded-xl flex items-center justify-center font-black text-xs uppercase tracking-wider text-white/60">
            {col}
          </div>
        ))}
        
        {ROWS.map((rowTeam, r) => (
          <>
            <div className="size-20 bg-neutral-900 border border-white/5 rounded-xl flex items-center justify-center font-black text-xs uppercase tracking-wider text-white/60">
              {rowTeam}
            </div>
            {[0, 1, 2].map((c) => (
              <motion.button
                key={`${r}-${c}`}
                whileHover={{ scale: 0.98, borderColor: 'rgba(234, 179, 8, 0.5)' }}
                onClick={() => setSelectedCell({ r, c })}
                className="size-20 bg-neutral-900 border-2 border-white/5 rounded-2xl flex items-center justify-center text-white/10 transition-all shadow-inner"
              >
                <span className="text-2xl font-bold">+</span>
              </motion.button>
            ))}
          </>
        ))}
      </div>

      {/* Oyuncu Seçme Modalı (Gelişmiş Tasarım) */}
      <AnimatePresence>
        {selectedCell && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-4"
            onClick={() => setSelectedCell(null)}
          >
            <motion.div 
              initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }}
              className="bg-[#121212] p-6 rounded-3xl border border-white/10 w-full max-w-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg">OYUNCU SEÇ</h3>
                <button onClick={() => setSelectedCell(null)} className="text-white/50"><X size={20} /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {MOCK_PLAYERS.map((p, i) => (
                  <button 
                    key={i} 
                    className="bg-neutral-900 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-yellow-700 p-4 rounded-2xl border border-white/5 font-bold text-sm transition-all shadow-lg"
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
