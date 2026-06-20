'use client'

import { motion } from 'framer-motion'
import { Info, Check } from 'lucide-react'
import type { Player } from '@/lib/types'
import { RARITY_STYLES } from '@/lib/draft'
import { cn } from '@/lib/utils'
import { Flag } from './flag'
import { TeamBadge } from './team-badge'

function monogram(name: string) {
  const parts = name.split(' ')
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

export function PlayerCard({
  player,
  selected,
  onSelect,
  onInfo,
  className,
}: {
  player: Player
  selected?: boolean
  onSelect?: () => void
  onInfo?: () => void
  className?: string
}) {
  const r = RARITY_STYLES[player.rarity]

  return (
    <motion.div
      layout
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={cn(
        'group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-gradient-to-b from-[#16140c] to-[#0a0a0b] p-3 text-left transition-shadow',
        r.ring,
        selected && 'ring-2 ring-neon',
        className,
      )}
      style={{
        boxShadow: selected
          ? '0 0 28px -4px rgba(50,255,156,0.6)'
          : r.glow,
      }}
    >
      {/* top row: rating + position */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black text-gradient-gold">
            {player.overall}
          </span>
          <span className="mt-0.5 text-[10px] font-bold tracking-widest text-primary/80">
            {player.position}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Flag code={player.nation.code} className="h-3.5 w-5" alt={player.nation.name} />
          <TeamBadge team={player.team} className="size-6" />
        </div>
      </div>

      {/* monogram avatar / IMAGE */}
      <div className="my-2 flex items-center justify-center">
        <div
          className={cn(
            'flex size-20 items-center justify-center rounded-full border bg-gradient-to-br from-white/10 to-transparent overflow-hidden',
            r.ring,
          )}
        >
          {player.image ? (
            <img 
              src={player.image} 
              alt={player.name} 
              className="size-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <span className="text-xl font-black text-foreground/90">
              {monogram(player.name)}
            </span>
          )}
        </div>
      </div>

      {/* name */}
      <p className="truncate text-center text-sm font-bold text-foreground">
        {player.name}
      </p>

      {/* badges */}
      <div className="mt-2 flex items-center justify-between gap-1">
        <span
          className={cn(
            'rounded-full px-1.5 py-0.5 text-[8px] font-black tracking-wider',
            r.chip,
          )}
        >
          {r.label}
        </span>
        <span className="rounded-full border border-border px-1.5 py-0.5 text-[8px] font-bold text-muted-foreground">
          {player.era}
        </span>
        {onInfo && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onInfo()
            }}
            aria-label={`Info about ${player.name}`}
            className="ml-auto flex size-5 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Info className="size-3" />
          </button>
        )}
      </div>

      {selected && (
        <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-neon text-black">
          <Check className="size-3" strokeWidth={3} />
        </div>
      )}
    </motion.div>
  )
}
