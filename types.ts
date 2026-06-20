export type Position =
  | 'GK'
  | 'LB'
  | 'CB'
  | 'RB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'LM'
  | 'RM'
  | 'LW'
  | 'RW'
  | 'ST'

export type Era = '70s' | '80s' | '90s' | '00s' | '10s' | '20s'

export type Rarity = 'icon' | 'hero' | 'legend' | 'star' | 'gold'

export interface Nation {
  code: string // flagcdn code
  name: string
}

export interface Player {
  id: string
  name: string
  overall: number
  position: Position
  nation: Nation
  team: string
  teamType: 'national' | 'club'
  era: Era
  rarity: Rarity
  pace: number
  shooting: number
  passing: number
  defending: number
}

export interface Manager {
  id: string
  name: string
  nation: Nation
  formation: string
  chemBonus: number
  rating: number
  trophies: number
}

export interface FormationSlot {
  id: string
  role: Position
  x: number // 0-100 left to right
  y: number // 0-100 top(attack) to bottom(GK)
}

export interface Formation {
  name: string
  slots: FormationSlot[]
}

export type SquadSlot = {
  slot: FormationSlot
  player: Player | null
}

export interface TeamStats {
  ovr: number
  attack: number
  defense: number
  filled: number
  total: number
}

export interface ChemistryBreakdown {
  positionFit: number
  linkLines: number
  coachSystem: number
  coachNation: number
  total: number
}

export interface TournamentTeam {
  name: string
  flag: string
  rating: number
}

export interface Match {
  id: string
  round: 'Quarter Finals' | 'Semi Finals' | 'Final'
  home: TournamentTeam
  away: TournamentTeam
  homeScore: number
  awayScore: number
  penalties?: { home: number; away: number }
  mvp: string
  winner: TournamentTeam
  played: boolean
}
