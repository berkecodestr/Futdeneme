'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// TİP TANIMLARI
type CellState = {
  player: string | null
  team: string | null
}

export function FootballGrid() {
  // GRID STATE (3x3 grid)
  const [grid, setGrid] = useState<CellState[]>(Array(9).fill({ player: null, team: null }))
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  
  const rows = ['PSG', 'LIVERPOOL', 'FENERBAHÇE']
  const cols = ['AC MILAN', 'BARCELONA', 'PSG']

  const handleCellClick = (index: number) => {
    setSelectedCell(index)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 space-y-6">
      
      {/* HEADER: Süre ve Pes Et */}
      <div className="w-full bg-[#1e293b] p-4 rounded-2xl flex items-center justify-between border border-white/10 shadow-lg">
        <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          Süre: <span className="text-white text-xl ml-2">29</span>
        </div>
        <button className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-lg font-bold text-xs border border-red-500/20 hover:bg-red-500/20 transition">
          PES ET
        </button>
      </div>

      {/* GRID CONTAINER */}
      <div className="grid grid-cols-4 gap-2 w-full">
        {/* Boş köşe */}
        <div className="aspect-square" />
        
        {/* Kolon Başlıkları */}
        {cols.map((col, i) => (
          <div key={`col-${i}`} className="bg-[#1e293b] p-2 rounded-xl text-[9px] font-black text-center flex items-center justify-center border border-white/5 text-gray-300">
            {col}
          </div>
        ))}

        {/* Satırlar ve Hücreler */}
        {rows.map((row, rowIndex) => (
          <>
            <div key={`row-${rowIndex}`} className="bg-[#1e293b] p-2 rounded-xl text-[9px] font-black text-center flex items-center justify-center border border-white/5 text-gray-300 rotate-[-90deg]">
              {row}
            </div>
            {[0, 1, 2].map((colIndex) => {
              const cellIndex = rowIndex * 3 + colIndex
              return (
                <motion.button
                  key={`cell-${cellIndex}`}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCellClick(cellIndex)}
                  className="aspect-square bg-[#0f172a] rounded-xl border border-white/10 flex flex-col items-center justify-center transition-all hover:bg-[#1e293b]"
                >
                  {grid[cellIndex].player ? (
                    <span className="text-[10px] font-bold">{grid[cellIndex].player}</span>
                  ) : (
                    <span className="text-white/20 text-xl font-thin">+</span>
                  )}
                </motion.button>
              )
            })}
          </>
        ))}
      </div>

      {/* SEÇİM PANELİ (Geliştirilebilir) */}
      <AnimatePresence>
        {selectedCell !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 w-full max-w-md bg-[#0f172a] p-6 rounded-t-3xl border-t border-white/10 shadow-2xl z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Oyuncu Seç ({selectedCell + 1}. Hücre)</h3>
              <button onClick={() => setSelectedCell(null)} className="text-gray-500">Kapat</button>
            </div>
            {/* Buraya oyuncu listesi gelecek */}
            <div className="h-32 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl text-gray-500">
              Oyuncu Listesi Buraya Gelecek
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
