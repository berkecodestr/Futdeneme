'use client'

import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Coins } from 'lucide-react'
import type { Match } from '@/lib/types'
import { Flag } from './flag'
import { Confetti } from './confetti'

export function ChampionScreen({
  matches,
  userWon,
  reward,
  onReturn,
}: {
  matches: Match[]
  userWon: boolean
  reward: number
  onReturn: () => void
}) {
  const final = matches[matches.length - 1]
  const champion = final.winner
  const goalsFor = matches
    .filter((m) => m.home.name === 'Your VIP XI' || m.away.name === 'Your VIP XI')
    .reduce((acc, m) => {
      if (m.home.name === 'Your VIP XI') return acc + m.homeScore
      if (m.away.name === 'Your VIP XI') return acc + m.awayScore
      return acc
    }, 0)

  return (
    <div className="relative mx-auto flex min-h-[100dvh] max-w-2xl flex-col items-center justify-center px-6 py-10 text-center">
      {userWon && <Confetti />}

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative flex size-32 items-center justify-center rounded-full border-2 border-primary bg-gradient-to-br from-primary/30 to-background shadow-gold">
          <Trophy className="size-16 text-primary" fill="currentColor" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <p className="text-xs font-bold tracking-[0.3em] text-primary">
          {userWon ? 'TOURNAMENT CHAMPION' : 'TOURNAMENT COMPLETE'}
        </p>
        <h1 className="mt-2 text-4xl font-black text-gradient-gold">
          {userWon ? 'VICTORY' : champion.name}
        </h1>

        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl glass-gold border border-primary/30 px-4 py-2 shadow-gold">
          <Flag code={champion.flag} className="h-5 w-7" alt={champion.name} />
          <span className="font-black text-foreground">{champion.name}</span>
          <span className="rounded-full bg-gold-soft px-2 py-0.5 text-xs font-bold text-primary">
            OVR {champion.rating}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid w-full max-w-xs grid-cols-3 gap-3"
      >
        <Summary label="Matches" value={String(matches.length)} />
        <Summary label="Goals" value={String(goalsFor)} />
        <Summary label="Result" value={userWon ? '1st' : 'Top 4'} />
      </motion.div>

      {userWon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center gap-2 rounded-full border border-neon/30 bg-neon-soft px-4 py-2 text-sm font-bold text-neon"
        >
          <Coins className="size-4" /> +{reward.toLocaleString()} VIP Coins earned
        </motion.div>
      )}

      <button
        type="button"
        onClick={onReturn}
        className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-secondary px-6 py-3 text-sm font-black text-foreground transition-colors hover:border-primary"
      >
        <RotateCcw className="size-4 text-primary" /> Return to Lounge
      </button>
    </div>
  )
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl border border-border p-3">
      <p className="text-xl font-black text-gradient-gold">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
