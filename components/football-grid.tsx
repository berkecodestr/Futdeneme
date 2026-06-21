'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy } from 'lucide-react'

// Örnek oyuncu listesi (bunu ileride kendi veritabanından çekeceğiz)
const MOCK_PLAYERS = ["L. Paredes", "M. Skriniar", "C. Ünder", "G. Wijnaldum"]

export function FootballGrid() {
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null)

  return (
    <div className="flex flex-col items-center py-6 bg-black min-h-screen text-white">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-yellow-500">
        <Trophy className="size-5" /> Futbol Grid
      </h2>

      {/* Grid Yapısı */}
      <div className="grid grid-cols-4 gap-2 p-2 bg-white/5 rounded-2xl">
        <div className="size-16"></div>
        {['Roma', 'Inter', 'Dünya'].map((t, i) => (
          <div key={i} className="size-16 bg-neutral-800 rounded-lg flex items-center justify-center font-bold text-xs">{t}</div>
        ))}
        
        {['PSG', 'Liverpool', 'Fenerbahçe'].map((rowTeam, r) => (
          <>
            <div className="size-16 bg-neutral-800 rounded-lg flex items-center justify-center font-bold text-xs">{rowTeam}</div>
            {[0, 1, 2].map((c) => (
              <motion.button
                key={`${r}-${c}`}
                whileHover={{ scale: 0.95 }}
                onClick={() => setSelectedCell({ r, c })}
                className="size-16 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center text-white/40"
              >
                ?
              </motion.button>
            ))}
          </>
        ))}
      </div>

      {/* Oyuncu Seçme Modalı */}
      <AnimatePresence>
        {selectedCell && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedCell(null)}
          >
            <div className="bg-neutral-900 p-6 rounded-2xl border border-yellow-500/30 w-full max-w-xs" onClick={e => e.stopPropagation()}>
              <h3 className="text-center font-bold mb-4">Oyuncu Seç</h3>
              <div className="grid gap-3">
                {MOCK_PLAYERS.map((p, i) => (
                  <button key={i} className="bg-neutral-800 hover:bg-yellow-500/20 p-3 rounded-xl border border-white/10 transition">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
