'use client'

import { motion } from 'framer-motion'
import { Settings, Coins, Crown } from 'lucide-react'

export function Header({ coins }: { coins: number }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#9b7d22] shadow-gold">
            <Crown className="size-5 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-black tracking-tight text-foreground">
              VIP <span className="text-gradient-gold">FOOTBALL</span>
            </p>
            <p className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
              DRAFT LOUNGE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            key={coins}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-gold-soft px-3 py-1.5"
          >
            <Coins className="size-3.5 text-primary" />
            <span className="text-xs font-bold tabular-nums text-primary">
              {coins.toLocaleString()}
            </span>
          </motion.div>

          <button
            type="button"
            aria-label="Settings"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          >
            <Settings className="size-4" />
          </button>

          <button
            type="button"
            aria-label="Profile"
            className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary text-xs font-black text-primary ring-1 ring-primary/30"
          >
            VIP
          </button>
        </div>
      </div>
    </header>
  )
}
