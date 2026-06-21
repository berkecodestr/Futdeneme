'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RefreshCw } from 'lucide-react'
import { getRandomGridTeams } from '@/lib/grid-utils'

export function FootballGrid() {
  const [grid, setGrid] = useState<{rows: any[], cols: any[]} | null>(null)

  useEffect(() => {
    setGrid(getRandomGridTeams())
  }, [])

  if (!grid) return <div className="text-white text-center p-10">Yükleniyor...</div>

  return (
    <div className="flex flex-col items-center py-6 bg-black min-h-screen text-white">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-yellow-500">
        <Trophy className="size-5" /> Futbol Grid (Derbi Modu)
      </h2>

      {/* Grid Yapısı */}
      <div className="grid grid-cols-4 gap-2 p-2 bg-white/5 rounded-2xl">
        <div className="size-16"></div> {/* Sol üst köşe boş */}
        
        {/* Sütun Takımları */}
        {grid.cols.map((col, i) => (
          <div key={i} className="size-16 bg-white/10 rounded-lg flex items-center justify-center text-3xl">
            {col.logo}
          </div>
        ))}
        
        {/* Satır Takımları ve Hücreler */}
        {grid.rows.map((row, r) => (
          <>
            <div className="size-16 bg-white/10 rounded-lg flex items-center justify-center text-3xl">
              {row.logo}
            </div>
            {[0, 1, 2].map((c) => (
              <motion.button
                key={`${r}-${c}`}
                whileHover={{ scale: 0.95 }}
                className="size-16 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center font-bold text-white/30"
              >
                ?
              </motion.button>
            ))}
          </>
        ))}
      </div>

      <button 
        onClick={() => setGrid(getRandomGridTeams())} 
        className="mt-8 flex items-center gap-2 text-yellow-500 font-bold hover:opacity-80 transition-opacity"
      >
        <RefreshCw className="size-4" /> Yeni Izgarayı Karıştır
      </button>
    </div>
  )
}
