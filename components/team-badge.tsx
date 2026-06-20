import { cn } from '@/lib/utils'

function initials(team: string): string {
  const cleaned = team.replace(/\d+/g, '').trim()
  const words = cleaned.split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export function TeamBadge({
  team,
  className,
}: {
  team: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/25 to-primary/5 text-[9px] font-bold tracking-tight text-primary',
        className,
      )}
      title={team}
      aria-label={team}
    >
      {initials(team)}
    </span>
  )
}
