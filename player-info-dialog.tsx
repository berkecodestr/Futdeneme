'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Player } from '@/lib/types'
import { RARITY_STYLES } from '@/lib/draft'
import { Flag } from './flag'
import { TeamBadge } from './team-badge'
import { cn } from '@/lib/utils'

const STAT_ROWS: { key: keyof Player; label: string }[] = [
  { key: 'pace', label: 'Pace' },
  { key: 'shooting', label: 'Shooting' },
  { key: 'passing', label: 'Passing' },
  { key: 'defending', label: 'Defending' },
]

function statColor(v: number) {
  if (v >= 85) return 'text-neon'
  if (v >= 70) return 'text-primary'
  return 'text-muted-foreground'
}

export function PlayerInfoDialog({
  player,
  onClose,
}: {
  player: Player | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {player && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            initial={{ y: 40, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-gold w-full max-w-sm rounded-3xl border border-primary/30 p-5 shadow-gold"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex flex-col leading-none">
                  <span className="text-4xl font-black text-gradient-gold">
                    {player.overall}
                  </span>
                  <span className="mt-1 text-xs font-bold tracking-widest text-primary/80">
                    {player.position}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Flag code={player.nation.code} className="h-4 w-6" alt={player.nation.name} />
                  <TeamBadge team={player.team} className="size-8" />
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <h3 className="mt-3 text-xl font-black text-foreground">{player.name}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-black tracking-wider',
                  RARITY_STYLES[player.rarity].chip,
                )}
              >
                {RARITY_STYLES[player.rarity].label}
              </span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {player.era}
              </span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {player.team}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {STAT_ROWS.map((row) => {
                const value = player[row.key] as number
                return (
                  <div key={row.key} className="flex items-center gap-3">
                    <span className="w-20 text-xs font-bold text-muted-foreground">
                      {row.label}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-background/70">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-neon"
                      />
                    </div>
                    <span className={cn('w-7 text-right text-sm font-black tabular-nums', statColor(value))}>
                      {value}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
