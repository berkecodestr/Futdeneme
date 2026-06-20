import type { Formation } from './types'

export const FORMATIONS: Record<string, Formation> = {
  '4-3-3': {
    name: '4-3-3',
    slots: [
      { id: 'gk', role: 'GK', x: 50, y: 92 },
      { id: 'lb', role: 'LB', x: 15, y: 70 },
      { id: 'lcb', role: 'CB', x: 38, y: 74 },
      { id: 'rcb', role: 'CB', x: 62, y: 74 },
      { id: 'rb', role: 'RB', x: 85, y: 70 },
      { id: 'lcm', role: 'CM', x: 28, y: 50 },
      { id: 'cm', role: 'CM', x: 50, y: 54 },
      { id: 'rcm', role: 'CM', x: 72, y: 50 },
      { id: 'lw', role: 'LW', x: 18, y: 22 },
      { id: 'st', role: 'ST', x: 50, y: 18 },
      { id: 'rw', role: 'RW', x: 82, y: 22 },
    ],
  },
  '4-4-2': {
    name: '4-4-2',
    slots: [
      { id: 'gk', role: 'GK', x: 50, y: 92 },
      { id: 'lb', role: 'LB', x: 15, y: 70 },
      { id: 'lcb', role: 'CB', x: 38, y: 74 },
      { id: 'rcb', role: 'CB', x: 62, y: 74 },
      { id: 'rb', role: 'RB', x: 85, y: 70 },
      { id: 'lm', role: 'LM', x: 15, y: 47 },
      { id: 'lcm', role: 'CM', x: 40, y: 51 },
      { id: 'rcm', role: 'CM', x: 60, y: 51 },
      { id: 'rm', role: 'RM', x: 85, y: 47 },
      { id: 'lst', role: 'ST', x: 38, y: 20 },
      { id: 'rst', role: 'ST', x: 62, y: 20 },
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    slots: [
      { id: 'gk', role: 'GK', x: 50, y: 92 },
      { id: 'lcb', role: 'CB', x: 30, y: 74 },
      { id: 'cb', role: 'CB', x: 50, y: 77 },
      { id: 'rcb', role: 'CB', x: 70, y: 74 },
      { id: 'lm', role: 'LM', x: 11, y: 50 },
      { id: 'lcm', role: 'CM', x: 34, y: 53 },
      { id: 'cm', role: 'CDM', x: 50, y: 58 },
      { id: 'rcm', role: 'CM', x: 66, y: 53 },
      { id: 'rm', role: 'RM', x: 89, y: 50 },
      { id: 'lst', role: 'ST', x: 40, y: 20 },
      { id: 'rst', role: 'ST', x: 60, y: 20 },
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    slots: [
      { id: 'gk', role: 'GK', x: 50, y: 92 },
      { id: 'lb', role: 'LB', x: 15, y: 72 },
      { id: 'lcb', role: 'CB', x: 38, y: 75 },
      { id: 'rcb', role: 'CB', x: 62, y: 75 },
      { id: 'rb', role: 'RB', x: 85, y: 72 },
      { id: 'ldm', role: 'CDM', x: 38, y: 56 },
      { id: 'rdm', role: 'CDM', x: 62, y: 56 },
      { id: 'lam', role: 'LW', x: 18, y: 35 },
      { id: 'cam', role: 'CAM', x: 50, y: 38 },
      { id: 'ram', role: 'RW', x: 82, y: 35 },
      { id: 'st', role: 'ST', x: 50, y: 17 },
    ],
  },
}

export const FORMATION_NAMES = Object.keys(FORMATIONS)

// position groups for chemistry fit scoring
export const POSITION_GROUPS: Record<string, string[]> = {
  GK: ['GK'],
  DEF: ['LB', 'CB', 'RB'],
  MID: ['CDM', 'CM', 'CAM', 'LM', 'RM'],
  ATT: ['LW', 'RW', 'ST'],
}

export function positionGroup(pos: string): string {
  for (const [group, list] of Object.entries(POSITION_GROUPS)) {
    if (list.includes(pos)) return group
  }
  return 'MID'
}
