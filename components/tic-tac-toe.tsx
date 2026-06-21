'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="grid grid-cols-3 gap-2 bg-background p-2 rounded-xl">
        {board.map((_, i) => (
          <div key={i} className="aspect-square bg-card border border-border rounded-lg flex items-center justify-center text-xs font-bold text-white/30 hover:border-primary transition-all cursor-pointer">
            ?
          </div>
        ))}
      </div>
      <p className="text-center mt-6 text-sm text-white/60">
        Satır ve sütun kriterlerine uyan oyuncuyu seç!
      </p>
    </div>
  )
}
