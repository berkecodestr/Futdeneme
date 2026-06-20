'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import type { SquadSlot, Player } from '@/lib/types'
import { positionFitScore } from '@/lib/draft'
import { cn } from '@/lib/utils'
import { Flag } from './flag'

function fitRing(player: Player, role: string) {
  const fit = positionFitScore(player.position, role)
  if (fit === 100) return 'border-neon shadow-neon'
  if (fit >= 70) return 'border-primary'
  return 'border-destructive/70'
}

export function FootballPitch({
  squad,
  formationName,
  selectedPlayer,
  onPlace,
  onRemove,
}: {
  squad: SquadSlot[]
  formationName: string
  selectedPlayer: Player | null
  onPlace: (slotId: string) => void
  onRemove: (slotId: string) => void
}) {
  return (
    <section className="glass rounded-3xl border border-border p-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-sm font-black tracking-wide text-foreground">
          Squad Pitch
        </h3>
        <span className="rounded-full border border-primary/30 bg-gold-soft px-2 py-0.5 text-xs font-bold text-primary">
          {formationName}
        </span>
      </div>

      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-primary/15"
        style={{
          background:
            'repeating-linear-gradient(0deg,#0a160d,#0a160d 8%,#0c1a10 8%,#0c1a10 16%)',
        }}
      >
        {/* pitch markings */}
        <div className="pointer-events-none absolute inset-3 rounded-lg border border-white/10" />
        <div className="pointer-events-none absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-white/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-3 left-1/2 h-14 w-32 -translate-x-1/2 rounded-t-sm border border-b-0 border-white/10" />
        <div className="pointer-events-none absolute left-1/2 top-3 h-14 w-32 -translate-x-1/2 rounded-b-sm border border-t-0 border-white/10" />

        {squad.map(({ slot, player }) => (
          <div
            key={slot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          >
            <AnimatePresence mode="wait">
              {player ? (
                <motion.button
                  key="filled"
                  type="button"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 260 }}
                  onClick={() => onRemove(slot.id)}
                  className="group relative flex flex-col items-center"
                >
                  <div
                    className={cn(
                      'flex size-12 flex-col items-center justify-center rounded-full border-2 bg-gradient-to-b from-[#1b1810] to-[#0a0a0b]',
                      fitRing(player, slot.role),
                    )}
                  >
                    <span className="text-sm font-black text-gradient-gold leading-none">
                      {player.overall}
                    </span>
                    <Flag code={player.nation.code} className="mt-0.5 h-2 w-3" alt="" />
                  </div>
                  <span className="mt-1 max-w-16 truncate rounded bg-background/80 px-1 text-[9px] font-bold text-foreground">
                    {player.name.split(' ').pop()}
                  </span>
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <X className="size-2.5" strokeWidth={3} />
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  key="empty"
                  type="button"
                  onClick={() => onPlace(slot.id)}
                  disabled={!selectedPlayer}
                  className={cn(
                    'flex size-11 flex-col items-center justify-center rounded-full border-2 border-dashed transition-all',
                    selectedPlayer
                      ? 'animate-pulse border-neon bg-neon/10 text-neon'
                      : 'border-primary/40 bg-primary/5 text-primary/70',
                  )}
                >
                  <Plus className="size-3.5" />
                  <span className="text-[8px] font-bold">{slot.role}</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {selectedPlayer && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center text-xs font-medium text-neon"
        >
          Tap a glowing slot to place {selectedPlayer.name}
        </motion.p>
      )}
    </section>
  )
}
