'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, Dices, Layers } from 'lucide-react'
import type { Player } from '@/lib/types'
import { ERA_FILTERS } from '@/lib/data'
import { cn } from '@/lib/utils'
import { PlayerCard } from './player-card'

export function DraftPool({
  pool,
  search,
  onSearch,
  activeFilters,
  onToggleFilter,
  onRoll,
  rolling,
  selectedId,
  onSelect,
  onInfo,
}: {
  pool: Player[]
  search: string
  onSearch: (v: string) => void
  activeFilters: string[]
  onToggleFilter: (v: string) => void
  onRoll: () => void
  rolling: boolean
  selectedId: string | null
  onSelect: (p: Player) => void
  onInfo: (p: Player) => void
}) {
  return (
    <section className="glass rounded-3xl border border-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-sm font-black tracking-wide text-foreground">
          <Layers className="size-4 text-primary" /> Draft Pool
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {pool.length} cards
        </span>
      </div>

      {/* search + roll */}
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background/60 px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search players, teams..."
            className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="button"
          onClick={onRoll}
          disabled={rolling}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[#b58f24] px-4 py-2.5 text-sm font-black text-primary-foreground shadow-gold active:translate-y-px disabled:opacity-60"
        >
          <Dices className={cn('size-4', rolling && 'animate-spin')} />
          Roll
        </button>
      </div>

      {/* filter chips */}
      <div className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto pb-1">
        {ERA_FILTERS.map((f) => {
          const active = activeFilters.includes(f.value)
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onToggleFilter(f.value)}
              className={cn(
                'shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors',
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background/40 text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* cards grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {pool.map((player, i) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: rolling ? i * 0.05 : 0, duration: 0.35 }}
            >
              <PlayerCard
                player={player}
                selected={selectedId === player.id}
                onSelect={() => onSelect(player)}
                onInfo={() => onInfo(player)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {pool.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <Dices className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Hit <span className="font-bold text-primary">Roll</span> to open a fresh pack of legends.
          </p>
        </div>
      )}
    </section>
  )
}
