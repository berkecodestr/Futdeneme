'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getRandomGridTeams, getPlayersForIntersection } from '@/lib/grid-utils'

export function FootballGrid() {
  const [grid, setGrid] = useState<{rows: any[], cols: any[]} | null>(null)
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null)

  useEffect(() => {
    setGrid(getRandomGridTeams())
  }, [])

  if (!grid) return <div className="text-white">Yükleniyor...</div>

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
        <Trophy className="text-yellow-500" /> Futbol Grid
      </h2>

      {/* 3x3 Izgara */}
      <div className="grid grid-cols-4 gap-2">
        <div className="size-20"></div> {/* Sol üst boşluk */}
        {grid.cols.map((col, i) => (
          <div key={i} className="size-20 bg-white/10 rounded-xl flex items-center justify-center text-2xl border border-white/5">{col.logo}</div>
        ))}
        
        {grid.rows.map((row, r) => (
          <>
            <div className="size-20 bg-white/10 rounded-xl flex items-center justify-center text-2xl border border-white/5">{row.logo}</div>
            {[0, 1, 2].map((c) => (
              <motion.button
                key={`${r}-${c}`}
                whileHover={{ scale: 0.98 }}
                onClick={() => setSelectedCell({ r, c })}
                className="size-20 bg-background border-2 border-white/10 rounded-xl flex items-center justify-center hover:border-primary/50 transition-all"
              >
                <span className="text-white/20 text-xs">?</span>
              </motion.button>
            ))}
          </>
        ))}
      </div>

      <button onClick={() => setGrid(getRandomGridTeams())} className="mt-8 flex items-center gap-2 text-primary font-bold">
        <RefreshCw className="size-4" /> Yeni Maç
      </button>
    </div>
  )
}
