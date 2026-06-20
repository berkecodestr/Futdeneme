'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Shield, Sparkles, Trophy } from 'lucide-react'
import type { Manager } from '@/lib/types'
import { Flag } from './flag'

export function ManagerCard({
  manager,
  rolling,
  onReroll,
}: {
  manager: Manager
  rolling: boolean
  onReroll: () => void
}) {
  return (
    <section className="glass-gold relative overflow-hidden rounded-3xl border border-primary/25 p-5 shadow-gold">
      <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl" />

      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-primary">
          <Sparkles className="size-3.5" /> ELITE MANAGER
        </span>
        <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-background/40 px-2 py-1 text-[10px] font-bold text-primary">
          <Trophy className="size-3" /> {manager.trophies}x
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={manager.id}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <motion.div
              animate={rolling ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6, repeat: rolling ? Infinity : 0, ease: 'linear' }}
              className="flex size-20 items-center justify-center rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-primary/30 to-background overflow-hidden"
            >
              {/* RESİM KISMI BURAYA EKLENDİ */}
              {manager.image ? (
                <img
                  src={manager.image}
                  alt={manager.name}
                  className="size-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <span className="text-2xl font-black text-gradient-gold">
                  {manager.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
              )}
            </motion.div>
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-primary/40 bg-background px-2 py-0.5">
              <Flag code={manager.nation.code} className="h-2.5 w-4" alt={manager.nation.name} />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-black leading-tight text-foreground">
              {manager.name}
            </h2>
            <p className="text-xs text-muted-foreground">{manager.nation.name}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 rounded-lg border border-border bg-background/50 px-2 py-1 text-xs font-bold text-foreground">
                <Shield className="size-3 text-primary" /> {manager.formation}
              </span>
              <span className="rounded-lg bg-neon-soft px-2 py-1 text-xs font-black text-neon">
                +{manager.chemBonus} System
              </span>
              <span className="rounded-lg border border-primary/30 px-2 py-1 text-xs font-bold text-primary">
                OVR {manager.rating}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={onReroll}
        disabled={rolling}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[#b58f24] py-3 text-sm font-black text-primary-foreground shadow-gold transition-transform active:translate-y-px disabled:opacity-60"
      >
        <RefreshCw className={`size-4 ${rolling ? 'animate-spin' : ''}`} />
        {rolling ? 'Summoning Legend...' : 'Re-roll Elite Manager'}
      </button>
    </section>
  )
}
