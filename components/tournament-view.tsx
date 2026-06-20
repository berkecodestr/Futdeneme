'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, ChevronRight } from 'lucide-react'
import type { Match, TournamentTeam } from '@/lib/types'
import { Flag } from './flag'
import { cn } from '@/lib/utils'

const ROUNDS: Match['round'][] = ['Quarter Finals', 'Semi Finals', 'Final']

function TeamRow({
  team,
  score,
  pens,
  isWinner,
}: {
  team: TournamentTeam
  score: number
  pens?: number
  isWinner: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 rounded-lg px-2 py-1.5',
        isWinner ? 'bg-neon-soft' : 'opacity-70',
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Flag code={team.flag} className="h-3 w-4 shrink-0" alt={team.name} />
        <span
          className={cn(
            'truncate text-xs font-bold',
            isWinner ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          {team.name}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {pens !== undefined && (
          <span className="text-[10px] text-muted-foreground">({pens})</span>
        )}
        <span
          className={cn(
            'text-sm font-black tabular-nums',
            isWinner ? 'text-neon' : 'text-muted-foreground',
          )}
        >
          {score}
        </span>
      </div>
    </div>
  )
}

function MatchCard({ match, index }: { match: Match; index: number }) {
  const homeWon = match.winner.name === match.home.name
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12 }}
      className="glass rounded-xl border border-border p-2"
    >
      <TeamRow
        team={match.home}
        score={match.homeScore}
        pens={match.penalties?.home}
        isWinner={homeWon}
      />
      <TeamRow
        team={match.away}
        score={match.awayScore}
        pens={match.penalties?.away}
        isWinner={!homeWon}
      />
      <div className="mt-1.5 flex items-center justify-between border-t border-border/60 px-2 pt-1.5">
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Star className="size-2.5 text-primary" /> MVP {match.mvp}
        </span>
        {match.penalties && (
          <span className="text-[10px] font-bold text-primary">Penalties</span>
        )}
      </div>
    </motion.div>
  )
}

export function TournamentView({
  matches,
  onContinue,
}: {
  matches: Match[]
  onContinue: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
      <div className="mb-5 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-gold-soft px-3 py-1 text-[11px] font-bold tracking-widest text-primary">
          <Trophy className="size-3.5" /> VIP TOURNAMENT
        </span>
        <h1 className="mt-2 text-2xl font-black text-foreground">Knockout Stage</h1>
        <p className="text-sm text-muted-foreground">
          Your VIP XI faces the greatest squads ever assembled.
        </p>
      </div>

      <div className="space-y-5">
        {ROUNDS.map((round) => {
          const roundMatches = matches.filter((m) => m.round === round)
          return (
            <section key={round}>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
                {round}
                <span className="h-px flex-1 bg-border" />
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {roundMatches.map((m, i) => (
                  <MatchCard key={m.id} match={m} index={i} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[calc(100%-2rem)] max-w-md items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[#b58f24] py-3.5 text-sm font-black text-primary-foreground shadow-gold"
      >
        Reveal Champion <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
