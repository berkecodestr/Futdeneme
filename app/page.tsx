'use client'

import { useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swords, Sparkles } from 'lucide-react'
import type { Player, Manager, SquadSlot, Match } from '@/lib/types'
import { PLAYERS, MANAGERS, TOURNAMENT_TEAMS } from '@/lib/data'
import { FORMATIONS } from '@/lib/formations'
import {
  computeStats,
  computeChemistry,
  pickRandom,
  randomItem,
  simulateTournament,
} from '@/lib/draft'
import { Header } from '@/components/header'
import { ManagerCard } from '@/components/manager-card'
import { DraftPool } from '@/components/draft-pool'
import { FootballPitch } from '@/components/football-pitch'
import { StatsPanel } from '@/components/stats-panel'
import { ChemistryPanel } from '@/components/chemistry-panel'
import { PlayerInfoDialog } from '@/components/player-info-dialog'
import { TournamentView } from '@/components/tournament-view'
import { ChampionScreen } from '@/components/champion-screen'
import { cn } from '@/lib/utils' // cn fonksiyonunu kullandığın için eklendi

type Phase = 'draft' | 'tournament' | 'champion'

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

  // GÜNCELLENMİŞ DİZİLİŞ FONKSİYONU
  const changeFormation = useCallback((formationName: string) => {
  // 1. O dizilişe sahip menajeri bul (MANAGERS dizinden)
  const matchingManager = MANAGERS.find(m => m.formation === formationName);
  
  // 2. Eğer menajer varsa onu set et (bu hem resmi hem isimi değiştirir)
  if (matchingManager) {
    setManager(matchingManager);
  }
  
  // 3. Squad'ı ve dizilişi güncelle
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
    setPoolRolling(true)
    const placedIds = new Set(squad.filter((s) => s.player).map((s) => s.player!.id))
    let candidates = PLAYERS.filter((p) => !placedIds.has(p.id))
    if (filters.length) {
      candidates = candidates.filter((p) => {
        const eras = filters.filter((f) => !['national', 'club'].includes(f))
        const types = filters.filter((f) => ['national', 'club'].includes(f))
        const eraOk = eras.length ? eras.includes(p.era) : true
        const typeOk = types.length ? types.includes(p.teamType) : true
        return eraOk && typeOk
      })
    }
    setTimeout(() => {
      setPool(pickRandom(candidates, 9))
      setPoolRolling(false)
    }, 500)
  }, [filters, squad])

  const toggleFilter = useCallback((v: string) => {
    setFilters((prev) => (prev.includes(v) ? prev.filter((f) => f !== v) : [...prev, v]))
  }, [])

  const selectPlayer = useCallback((p: Player) => {
    setSelected((prev) => (prev?.id === p.id ? null : p))
  }, [])

  const placePlayer = useCallback((slotId: string) => {
  if (!selected) return;
  
  // Slotu bul
  const targetSlot = squad.find(s => s.slot.id === slotId);
  
  // ÖNEMLİ: İstersen burada "Pozisyon uyuşmazlığı" uyarısı koyabilirsin, 
  // ama her yere koyabilmek için bu if'i kaldır:
  // if (selected.position !== targetSlot?.slot.role) return; 

  setSquad((prev) => prev.map((s) => (s.slot.id === slotId ? { ...s, player: selected } : s)));
  setPool((prev) => prev.filter((p) => p.id !== selected.id));
  setSelected(null);
}, [selected, squad]);


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
    const next = randomItem(MANAGERS)
    setManager(next)
    setSquad(buildSquad(next.formation))
    setPool([])
    setSelected(null)
    setSearch('')
    setMatches([])
    setPhase('draft')
    window.scrollTo({ top: 0 })
  }, [])

  const userWon = matches[matches.length - 1]?.winner.name === 'Your VIP XI'

  return (
    <main className="min-h-[100dvh]">
      <AnimatePresence mode="wait">
        {phase === 'draft' && (
          <motion.div key="draft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header coins={coins} />
            <div className="mx-auto max-w-2xl space-y-5 px-4 py-5 pb-32">
              <ManagerCard manager={manager} rolling={managerRolling} onReroll={rerollManager} />
              
              <div className="flex justify-center gap-2 p-2 bg-background/50 rounded-xl border border-border/50">
                {['4-4-2', '4-3-3', '4-2-3-1'].map((f) => (
                  <button 
                    key={f} 
                    onClick={() => changeFormation(f)} 
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-xs font-bold transition",
                      manager.formation === f 
                        ? "bg-primary text-white" 
                        : "bg-background text-primary hover:bg-accent border border-primary/30"
                    )}
                  >
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
            {/* ... geri kalan kısım aynen duruyor */}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
