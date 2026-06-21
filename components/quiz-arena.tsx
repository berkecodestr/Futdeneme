'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const QUIZ_DATA = [
  {
    id: 1,
    question: "Mourinho ilk UEFA Şampiyonlar Ligi kupasını hangi takımda kazandı?",
    options: ["Real Madrid", "Chelsea", "Porto", "Inter"],
    answer: "Porto"
  },
  // ... diğer soruları buraya ekleyebilirsin
]

export function QuizArena() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')

  const handleAnswer = (option: string) => {
    if (status !== 'idle') return
    setSelected(option)
    if (option === QUIZ_DATA[currentIdx].answer) {
      setStatus('correct')
      setScore(s => s + 10)
    } else {
      setStatus('wrong')
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-border">
        <span className="font-black text-primary">SCORE: {score}</span>
        <Trophy className="text-yellow-500 size-5" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIdx}
          initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
          className="bg-card p-6 rounded-3xl border border-border shadow-2xl"
        >
          <h2 className="text-lg font-bold mb-6">{QUIZ_DATA[currentIdx].question}</h2>
          <div className="grid gap-3">
            {QUIZ_DATA[currentIdx].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={cn(
                  "p-4 rounded-xl border font-semibold transition-all",
                  selected === opt 
                    ? status === 'correct' ? "bg-green-500/20 border-green-500 text-green-500" : "bg-red-500/20 border-red-500 text-red-500"
                    : "bg-background border-border hover:border-primary/50"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {status !== 'idle' && (
        <button 
          onClick={() => { setStatus('idle'); setSelected(null); setCurrentIdx(i => i + 1); }}
          className="w-full py-4 bg-primary rounded-2xl font-black flex justify-center gap-2"
        >
          Sonraki Soru <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  )
}
