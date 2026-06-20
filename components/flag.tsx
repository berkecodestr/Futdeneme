import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { flagUrl } from '@/lib/draft'

export function Flag({
  code,
  className,
  alt,
}: {
  code: string
  className?: string
  alt?: string
}) {
  if (code === 'star') {
    return (
      <span
        className={cn(
          'flex items-center justify-center rounded-[3px] bg-primary',
          className,
        )}
        aria-label={alt ?? 'VIP'}
      >
        <Star className="size-3 text-primary-foreground" fill="currentColor" />
      </span>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagUrl(code) || '/placeholder.svg'}
      alt={alt ?? `${code} flag`}
      crossOrigin="anonymous"
      className={cn('rounded-[3px] object-cover', className)}
    />
  )
}
