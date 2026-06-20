'use client'

import { motion } from 'framer-motion'
import { Activity, Swords, ShieldCheck, Users } from 'lucide-react'
import type { TeamStats } from '@/lib/types'

function StatCard({
  label,
  value,
  icon,
  accent,
  suffix,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  accent: 'gold' | 'neon'
  suffix?: string
}) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl border border-border p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <motion.p
        key={String(value)}
        initial={{ scale: 1.2, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 1 }}
        className={
          accent === 'neon'
            ? 'mt-1 text-2xl font-black text-neon'
            : 'mt-1 text-2xl font-black text-gradient-gold'
        }
      >
        {value}
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </motion.p>
    </div>
  )
}

export function StatsPanel({ stats }: { stats: TeamStats }) {
  return (
    <section>
      <h3 className="mb-2 flex items-center gap-1.5 px-1 text-sm font-black tracking-wide text-foreground">
        <Activity className="size-4 text-neon" /> Live Advanced Stats
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Team OVR"
          value={stats.ovr ? stats.ovr.toFixed(1) : '—'}
          icon={<Activity className="size-3 text-primary" />}
          accent="gold"
        />
        <StatCard
          label="Attack"
          value={stats.attack || '—'}
          icon={<Swords className="size-3 text-neon" />}
          accent="neon"
        />
        <StatCard
          label="Defense"
          value={stats.defense || '—'}
          icon={<ShieldCheck className="size-3 text-neon" />}
          accent="neon"
        />
        <StatCard
          label="Squad"
          value={stats.filled}
          suffix={`/${stats.total}`}
          icon={<Users className="size-3 text-primary" />}
          accent="gold"
        />
      </div>
    </section>
  )
}
