'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const GRID_CRITERIA = [
  "Premier League Oynadı", "Barcelona Forması Giydi", "Brezilyalı",
  "Dünya Kupası Kazandı", "Şampiyonlar Ligi Kazandı", "30+ Gol Attı",
  "Real Madrid'de Oynadı", "Milli Takımda Kaptanlık Yaptı", "Yılın Futbolcusu Seçildi"
]

export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [input, setInput] = useState('')
  const [activeCell, setActiveCell] = useState<number | null>(null)

  const handleGuess = (index: number) => {
    // Burada oyuncu doğrulaması yapılacak (şimdilik basit bir log)
    console.log(`Kutu ${index} için tahmin: ${input}`)
    const newBoard = [...board]
    newBoard[index] = input
    setBoard(newBoard)
    setActiveCell(null)
    setInput('')
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {GRID_CRITERIA.map((criterion, i) => (
          <div 
            key={i} 
            onClick={() => setActiveCell(i)}
            className="aspect-square bg-card border border-border rounded-xl flex flex-col items-center justify-center p-2 text-[10px] font-bold text-center cursor-pointer hover:border-primary transition"
          >
            {board[i] ? <span className="text-primary text-xs">{board[i]}</span> : criterion}
          </div>
        ))}
      </div>

      {activeCell !== null && (
        <div className="bg-background p-4 rounded-2xl border border-primary/30">
          <input 
            autoFocus
            className="w-full bg-transparent text-white p-2 border-b border-white/20 mb-2 focus:outline-none"
            placeholder="Futbolcu adı gir..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => handleGuess(activeCell)} className="w-full py-2 bg-primary text-black font-bold rounded-lg text-xs">
            Onayla
          </button>
        </div>
      )}
    </div>
  )
}
