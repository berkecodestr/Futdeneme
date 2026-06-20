'use client'

import { motion } from 'framer-motion'
import { Beaker, MapPin, Link2, Cog, Globe } from 'lucide-react'
import type { ChemistryBreakdown } from '@/lib/types'

function Source({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex w-28 items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background/70">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full bg-neon"
        />
      </div>
      <span className="w-7 text-right text-xs font-bold tabular-nums text-neon">
        {value}
      </span>
    </div>
  )
}

export function ChemistryPanel({ chem }: { chem: ChemistryBreakdown }) {
  return (
    <section className="glass rounded-3xl border border-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-sm font-black tracking-wide text-foreground">
          <Beaker className="size-4 text-neon" /> Chemistry System
        </h3>
        <span className="text-xs font-bold text-neon">{chem.total}/100</span>
      </div>

      <div className="relative mb-4 h-3 overflow-hidden rounded-full bg-background/70">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${chem.total}%` }}
          transition={{ type: 'spring', damping: 20, stiffness: 120 }}
          className="animate-shimmer h-full rounded-full"
          style={{
            background:
              'linear-gradient(90deg,#1f7a4d,#32ff9c 60%,#d4af37)',
          }}
        />
      </div>

      <div className="space-y-2.5">
        <Source label="Position Fit" value={chem.positionFit} icon={<MapPin className="size-3" />} />
        <Source label="Link Lines" value={chem.linkLines} icon={<Link2 className="size-3" />} />
        <Source label="Coach System" value={chem.coachSystem} icon={<Cog className="size-3" />} />
        <Source label="Coach Nation" value={chem.coachNation} icon={<Globe className="size-3" />} />
      </div>
    </section>
  )
}
