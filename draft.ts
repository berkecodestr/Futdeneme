import type {
  Player,
  Manager,
  SquadSlot,
  TeamStats,
  ChemistryBreakdown,
  Rarity,
  Match,
  TournamentTeam,
} from './types'
import { positionGroup } from './formations'
import { MVP_NAMES } from './data'

export function flagUrl(code: string, size = 80): string {
  return `https://flagcdn.com/w${size}/${code}.png`
}

export const RARITY_STYLES: Record<
  Rarity,
  { label: string; ring: string; chip: string; glow: string }
> = {
  icon: {
    label: 'ICON',
    ring: 'border-[#e9c766]',
    chip: 'bg-[#e9c766] text-black',
    glow: '0 0 30px -4px rgba(233,199,102,0.6)',
  },
  hero: {
    label: 'HERO',
    ring: 'border-[#32ff9c]',
    chip: 'bg-[#32ff9c] text-black',
    glow: '0 0 30px -4px rgba(50,255,156,0.5)',
  },
  legend: {
    label: 'LEGEND',
    ring: 'border-[#d4af37]',
    chip: 'bg-[#d4af37] text-black',
    glow: '0 0 28px -6px rgba(212,175,55,0.55)',
  },
  star: {
    label: 'ELITE',
    ring: 'border-[#cfa9e8]',
    chip: 'bg-[#cfa9e8] text-black',
    glow: '0 0 24px -8px rgba(207,169,232,0.4)',
  },
  gold: {
    label: 'GOLD',
    ring: 'border-[#caa84a]/70',
    chip: 'bg-[#caa84a] text-black',
    glow: '0 0 18px -8px rgba(202,168,74,0.35)',
  },
}

// Position fit: exact role match best, same group partial, otherwise low
export function positionFitScore(playerPos: string, slotRole: string): number {
  if (playerPos === slotRole) return 100
  if (positionGroup(playerPos) === positionGroup(slotRole)) return 70
  return 30
}

export function computeStats(squad: SquadSlot[]): TeamStats {
  const filledSlots = squad.filter((s) => s.player)
  const filled = filledSlots.length
  const total = squad.length

  if (filled === 0) {
    return { ovr: 0, attack: 0, defense: 0, filled: 0, total }
  }

  const avg = (fn: (p: Player) => number) =>
    Math.round(
      filledSlots.reduce((acc, s) => acc + fn(s.player as Player), 0) / filled,
    )

  const ovrRaw =
    filledSlots.reduce((acc, s) => acc + (s.player as Player).overall, 0) /
    filled

  // attackers contribute to attack, defenders to defense
  const attackers = filledSlots.filter((s) =>
    ['ATT', 'MID'].includes(positionGroup((s.player as Player).position)),
  )
  const defenders = filledSlots.filter((s) =>
    ['DEF', 'GK', 'MID'].includes(positionGroup((s.player as Player).position)),
  )

  const attack = attackers.length
    ? Math.round(
        attackers.reduce(
          (acc, s) =>
            acc +
            (s.player as Player).shooting * 0.6 +
            (s.player as Player).pace * 0.4,
          0,
        ) / attackers.length,
      )
    : 0

  const defense = defenders.length
    ? Math.round(
        defenders.reduce(
          (acc, s) =>
            acc +
            (s.player as Player).defending * 0.7 +
            (s.player as Player).passing * 0.3,
          0,
        ) / defenders.length,
      )
    : 0

  return {
    ovr: Math.round(ovrRaw * 10) / 10,
    attack,
    defense,
    filled,
    total,
  }
}

export function computeChemistry(
  squad: SquadSlot[],
  manager: Manager,
): ChemistryBreakdown {
  const filledSlots = squad.filter((s) => s.player)
  const filled = filledSlots.length

  if (filled === 0) {
    return {
      positionFit: 0,
      linkLines: 0,
      coachSystem: 0,
      coachNation: 0,
      total: 0,
    }
  }

  // Position fit (0-100 average across filled slots)
  const fitAvg =
    filledSlots.reduce(
      (acc, s) => acc + positionFitScore((s.player as Player).position, s.slot.role),
      0,
    ) / filled

  // Link lines: shared nation or shared team across the squad
  let links = 0
  let possible = 0
  for (let i = 0; i < filledSlots.length; i++) {
    for (let j = i + 1; j < filledSlots.length; j++) {
      possible++
      const a = filledSlots[i].player as Player
      const b = filledSlots[j].player as Player
      if (a.nation.code === b.nation.code) links += 1
      if (a.team === b.team) links += 1
    }
  }
  const linkScore = possible ? Math.min(100, (links / possible) * 140) : 0

  // Coach system: players whose nation matches manager nation OR position fits formation
  const coachSystem =
    (filledSlots.filter(
      (s) => positionFitScore((s.player as Player).position, s.slot.role) >= 70,
    ).length /
      filled) *
    100

  // Coach nation: share of players matching manager nation
  const coachNation =
    (filledSlots.filter((s) => (s.player as Player).nation.code === manager.nation.code)
      .length /
      filled) *
      100 +
    manager.chemBonus

  const positionFit = Math.round(fitAvg)
  const linkLines = Math.round(linkScore)
  const coachSys = Math.round(coachSystem)
  const coachNat = Math.round(Math.min(100, coachNation))

  // weighted total, scaled by squad completeness
  const completeness = filled / squad.length
  const weighted =
    positionFit * 0.35 +
    linkLines * 0.25 +
    coachSys * 0.2 +
    coachNat * 0.2

  const total = Math.round(Math.min(100, weighted) * (0.55 + 0.45 * completeness))

  return {
    positionFit,
    linkLines,
    coachSystem: coachSys,
    coachNation: coachNat,
    total,
  }
}

export function pickRandom<T>(arr: T[], count: number): T[] {
  const copy = [...arr]
  const out: T[] = []
  for (let i = 0; i < count && copy.length; i++) {
    const idx = Math.floor(Math.random() * copy.length)
    out.push(copy.splice(idx, 1)[0])
  }
  return out
}

export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Tournament simulation given the squad's overall strength
export function simulateTournament(
  teamRating: number,
  pool: TournamentTeam[],
): Match[] {
  const userTeam: TournamentTeam = {
    name: 'Your VIP XI',
    flag: 'star',
    rating: teamRating,
  }

  const opponents = pickRandom(pool, 7)
  const matches: Match[] = []
  let mIndex = 0

  const playMatch = (
    round: Match['round'],
    home: TournamentTeam,
    away: TournamentTeam,
  ): Match => {
    mIndex++
    const diff = (home.rating - away.rating) / 8
    let homeScore = Math.max(0, Math.round(Math.random() * 2.5 + diff))
    let awayScore = Math.max(0, Math.round(Math.random() * 2.5 - diff))
    let penalties: Match['penalties']
    let winner: TournamentTeam

    if (homeScore === awayScore) {
      const hp = Math.round(Math.random() * 2 + 3)
      let ap = Math.round(Math.random() * 2 + 3)
      if (ap === hp) ap = hp - 1
      penalties = { home: hp, away: ap }
      winner = hp > ap ? home : away
    } else {
      winner = homeScore > awayScore ? home : away
    }

    return {
      id: `match-${mIndex}`,
      round,
      home,
      away,
      homeScore,
      awayScore,
      penalties,
      mvp: randomItem(MVP_NAMES),
      winner,
      played: true,
    }
  }

  // Quarter finals (4 matches) — user + 7 opponents
  const qfTeams = [userTeam, ...opponents]
  const qf: Match[] = []
  for (let i = 0; i < 8; i += 2) {
    qf.push(playMatch('Quarter Finals', qfTeams[i], qfTeams[i + 1]))
  }
  // bias: ensure user (rating high) tends to win — but keep simulated
  matches.push(...qf)

  const sfTeams = qf.map((m) => m.winner)
  const sf: Match[] = []
  for (let i = 0; i < 4; i += 2) {
    sf.push(playMatch('Semi Finals', sfTeams[i], sfTeams[i + 1]))
  }
  matches.push(...sf)

  const finalTeams = sf.map((m) => m.winner)
  const final = playMatch('Final', finalTeams[0], finalTeams[1])
  matches.push(final)

  return matches
}
