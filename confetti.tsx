'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

const COLORS = ['#d4af37', '#32ff9c', '#f5d77a', '#ffffff']

export function Confetti({ count = 80 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2 + Math.random() * 2,
        rotate: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 8,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', rotate: p.rotate, opacity: [1, 1, 0.8, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  )
}
