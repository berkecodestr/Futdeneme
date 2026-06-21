'use client'

import { motion } from 'framer-motion'
import { Trophy, Target, Brain, Zap } from 'lucide-react'

const games = [
  { id: 'tictactoe', name: 'Futbol Sos-As', icon: <Trophy className="size-6" /> },
  { id: 'match', name: 'Maç Skoru', icon: <Target className="size-6" /> },
  { id: 'guess', name: 'Oyuncu Tahmin', icon: <Brain className="size-6" /> },
  { id: 'quiz', name: 'Futbol Quiz', icon: <Zap className="size-6" /> },
]

export function GameHub({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {games.map((game) => (
        <motion.button
          key={game.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(game.id)}
          className="aspect-square bg-card border border-border rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary transition-all"
        >
          <div className="text-primary">{game.icon}</div>
          <span className="text-xs font-bold text-white">{game.name}</span>
        </motion.button>
      ))}
    </div>
  )
}
