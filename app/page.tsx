'use client'

import { useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swords, BrainCircuit, Goal, XCircle } from 'lucide-react'
import type { Player, Manager, SquadSlot, Match } from '@/lib/types'
import { PLAYERS, MANAGERS, TOURNAMENT_TEAMS, TEAM_POOLS } from '@/lib/data'
import { FORMATIONS } from '@/lib/formations'
import { computeStats, computeChemistry, randomItem, simulateTournament } from '@/lib/draft'
import { Header } from '@/components/header'
import { ManagerCard } from '@/components/manager-card'
import { DraftPool } from '@/components/draft-pool'
import { FootballPitch } from '@/components/football-pitch'
import { StatsPanel } from '@/components/stats-panel'
import { ChemistryPanel } from '@/components/chemistry-panel'
import { PlayerInfoDialog } from '@/components/player-info-dialog'
import { TournamentView } from '@/components/tournament-view'
import { ChampionScreen } from '@/components/champion-screen'
import { QuizArena } from '@/components/quiz-arena'
import { GuessTeam } from '@/components/guess-team'
import { TicTacToe } from '@/components/tic-tac-toe'
import { cn } from '@/lib/utils'

type Phase = 'draft' | 'tournament' | 'champion' | 'quiz' | 'guess' | 'tic-tac-toe'

function buildSquad(formationName: string): SquadSlot[] {
  return FORMATIONS[formationName].slots.map((slot) => ({ slot, player: null }))
}

const REWARD = 7500

export default function Page() {
  const [phase, setPhase] = useState<Phase>('draft')
  const [coins, setCoins] = useState(12500)
  const [manager, setManager] = useState<Manager>(() => randomItem(MANAGERS))
  const [squad, setSquad] = useState<SquadSlot[]>(() => buildSquad(manager.formation))
  const [managerRolling, setManagerRolling] = useState(false)
  const [pool, setPool] = useState<Player[]>([])
  const [poolRolling, setPoolRolling] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<string[]>([])
  const [selected, setSelected] = useState<Player | null>(null)
  const [infoPlayer, setInfoPlayer] = useState<Player | null>(null)
  const [matches, setMatches] = useState<Match[]>([])

  const stats = useMemo(() => computeStats(squad), [squad])
  const chem = useMemo(() => computeChemistry(squad, manager), [squad, manager])
  const squadFull = stats.filled === stats.total

  const displayedPool = useMemo(() => {
    if (!search.trim()) return pool
    const q = search.toLowerCase()
    return pool.filter((p) => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q) || p.nation.name.toLowerCase().includes(q))
  }, [pool, search])

  const changeFormation = useCallback((formationName: string) => {
    const matchingManager = MANAGERS.find(m => m.formation === formationName);
    if (matchingManager) setManager(matchingManager);
    setSquad(buildSquad(formationName));
    setSelected(null);
  }, []);

  const rerollManager = useCallback(() => {
    setManagerRolling(true)
    setTimeout(() => {
      const next = randomItem(MANAGERS.filter((m) => m.id !== manager.id))
      setManager(next)
      setSquad(buildSquad(next.formation))
      setSelected(null)
      setManagerRolling(false)
    }, 700)
  }, [manager.id])

  const rollPool = useCallback(() => {
    setPoolRolling(true);
    const teamKeys = Object.keys(TEAM_POOLS);
    const randomTeamKey = teamKeys[Math.floor(Math.random() * teamKeys.length)];
    const selectedTeamPlayers = TEAM_POOLS[randomTeamKey];
    const placedIds = new Set(squad.filter((s) => s.player).map((s) => s.player!.id));
    const availablePlayers = selectedTeamPlayers.filter((p) => !placedIds.has(p.id));
    setTimeout(() => {
      setPool(availablePlayers);
      setPoolRolling(false);
    }, 500);
  }, [squad]);

  const toggleFilter = useCallback((v: string) => {
    setFilters((prev) => (prev.includes(v) ? prev.filter((f) => f !== v) : [...prev, v]))
  }, [])

  const selectPlayer = useCallback((p: Player) => {
    setSelected((prev) => (prev?.id === p.id ? null : p))
  }, [])

  const placePlayer = useCallback((slotId: string) => {
    if (!selected) return;
    setSquad((prev) => prev.map((s) => (s.slot.id === slotId ? { ...s, player: selected } : s)));
    setPool((prev) => prev.filter((p) => p.id !== selected.id));
    setSelected(null);
  }, [selected]);

  const removePlayer = useCallback((slotId: string) => {
    setSquad((prev) =>
      prev.map((s) => {
        if (s.slot.id === slotId && s.player) {
          const removed = s.player
          setPool((pp) => [removed, ...pp.filter((p) => p.id !== removed.id)])
          return { ...s, player: null }
        }
        return s
      }),
    )
  }, [])

  const startTournament = useCallback(() => {
    const teamRating = Math.min(99, Math.round(stats.ovr + chem.total * 0.08 + manager.chemBonus * 0.2))
    setMatches(simulateTournament(teamRating, TOURNAMENT_TEAMS))
    setPhase('tournament')
    window.scrollTo({ top: 0 })
  }, [stats.ovr, chem.total, manager.chemBonus])

  const goChampion = useCallback(() => {
    const won = matches[matches.length - 1]?.winner.name === 'Your VIP XI'
    if (won) setCoins((c) => c + REWARD)
    setPhase('champion')
    window.scrollTo({ top: 0 })
  }, [matches])

  const returnToLounge = useCallback(() => {
    setManager(randomItem(MANAGERS))
    setSquad(buildSquad(manager.formation))
    setPool([])
    setSelected(null)
    setPhase('draft')
  }, [manager.formation])

  return (
    <main className="min-h-[100dvh]">
      {/* ARENA NAVIGATION - DÜZELTİLDİ */}
      <div className="flex justify-center gap-4 py-4 border-b border-white/5 bg-background overflow-x-auto">
        <button onClick={() => setPhase('draft')} className={cn("text-[10px] font-black uppercase tracking-widest transition", phase === 'draft' ? "text-primary" : "text-white/40")}>DRAFT</button>
        <button onClick={() => setPhase('quiz')} className={cn("text-[10px] font-black uppercase tracking-widest transition flex items-center gap-1", phase === 'quiz' ? "text-primary" : "text-white/40")}>
          <BrainCircuit className="size-3" /> QUIZ
        </button>
        <button onClick={() => setPhase('guess')} className={cn("text-[10px] font-black uppercase tracking-widest transition flex items-center gap-1", phase === 'guess' ? "text-primary" : "text-white/40")}>
          <Goal className="size-3" /> GUESS
        </button>
        <button onClick={() => setPhase('tic-tac-toe')} className={cn("text-[10px] font-black uppercase tracking-widest transition flex items-center gap-1", phase === 'tic-tac-toe' ? "text-primary" : "text-white/40")}>
          <XCircle className="size-3" /> TTT
        </button>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'draft' && (
          <motion.div key="draft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header coins={coins} />
            <div className="mx-auto max-w-2xl space-y-5 px-4 py-5 pb-32">
              <ManagerCard manager={manager} rolling={managerRolling} onReroll={rerollManager} />
              <div className="flex justify-center gap-2 p-2 bg-background/50 rounded-xl border border-border/50">
                {['4-4-2', '4-3-3', '4-2-3-1'].map((f) => (
                  <button key={f} onClick={() => changeFormation(f)} className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition", manager.formation === f ? "bg-primary text-white" : "bg-background text-primary")}>
                    {f}
                  </button>
                ))}
              </div>
              <StatsPanel stats={stats} />
              <div className="grid gap-5 lg:grid-cols-2">
                <FootballPitch squad={squad} formationName={manager.formation} selectedPlayer={selected} onPlace={placePlayer} onRemove={removePlayer} />
                <ChemistryPanel chem={chem} />
              </div>
              <DraftPool pool={displayedPool} search={search} onSearch={setSearch} activeFilters={filters} onToggleFilter={toggleFilter} onRoll={rollPool} rolling={poolRolling} selectedId={selected?.id ?? null} onSelect={selectPlayer} onInfo={setInfoPlayer} />
            </div>
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/80 backdrop-blur-xl">
              <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
                <button type="button" onClick={startTournament} disabled={!squadFull} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[#b58f24] px-5 py-3 text-sm font-black text-white">
                  <Swords className="size-4" /> {squadFull ? 'Enter Tournament' : 'Fill Squad'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {phase === 'quiz' && <QuizArena />}
        {phase === 'guess' && <GuessTeam />}
        {phase === 'tic-tac-toe' && <TicTacToe />}
        {phase === 'tournament' && <TournamentView matches={matches} onComplete={goChampion} />}
        {phase === 'champion' && <ChampionScreen won={matches[matches.length - 1]?.winner.name === 'Your VIP XI'} onReturn={returnToLounge} />}
      </AnimatePresence>
      <PlayerInfoDialog player={infoPlayer} open={!!infoPlayer} onOpenChange={(o) => !o && setInfoPlayer(null)} />
    </main>
  )
}
