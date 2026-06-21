'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function FootballGrid() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [turn, setTurn] = useState<'user' | 'opponent'>('user')
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [screen, setScreen] = useState<
  'menu' | 'searching' | 'countdown' | 'game'
>('menu')

const [countdown, setCountdown] = useState(3)
  const [grid, setGrid] = useState(
  Array(9).fill({
    player: null,
    image: null,
    owner: null
  })
)

  const columns = ['MILAN', 'BARÇA', 'PSG']
  const rows = ['PSG', 'LIV', 'FENER']

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTurn((current) =>
            current === 'user'
              ? 'opponent'
              : 'user'
          )

          return 30
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
  if (screen !== 'countdown') return

  const timer = setInterval(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        setScreen('game')
        return 3
      }

      return prev - 1
    })
  }, 1000)

  return () => clearInterval(timer)
}, [screen])

const startMatchmaking = () => {
  setScreen('searching')

  setTimeout(() => {
    setScreen('countdown')
  }, 3000)
}
  
  const handlePlayerSelect = (player: string) => {
    if (selectedCell === null) return

    const updated = [...grid]
    updated[selectedCell] = player

    setGrid(updated)
    setSelectedCell(null)

    setTurn((current) =>
      current === 'user'
        ? 'opponent'
        : 'user'
    )

    setTimeLeft(30)
  }
if (screen === 'menu') {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
      <div className="text-7xl mb-6">⚽</div>

      <h1 className="text-4xl font-black mb-4">
        FOOTBALL GRID
      </h1>

      <button
        onClick={startMatchmaking}
        className="bg-blue-600 px-8 py-4 rounded-2xl font-bold"
      >
        MAÇ BUL
      </button>
    </div>
  )
}

if (screen === 'searching') {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
      <div className="text-7xl animate-bounce mb-6">⚽</div>

      <h2 className="text-3xl font-bold">
        Rakip Aranıyor...
      </h2>

      <p className="text-slate-400 mt-4">
        Loading...
      </p>
    </div>
  )
}

if (screen === 'countdown') {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="text-9xl font-black">
        {countdown}
      </div>
    </div>
  )
}
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-b
      from-slate-950
      via-blue-950
      to-black
      text-white
      p-4
      max-w-md
      mx-auto
      "
    >
      {/* ÜST BAR */}

      <div
        className="
        rounded-3xl
        border
        border-blue-500/20
        bg-slate-900/70
        backdrop-blur
        p-5
        mb-6
        shadow-2xl
        "
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400 uppercase">
              Süre
            </p>

            <h2 className="text-4xl font-black">
              {timeLeft}
            </h2>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase">
              Durum
            </p>

            <div
              className={cn(
                'px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2',
                turn === 'user'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'
              )}
            >
              {turn === 'user'
                ? 'SIRA SENDE'
                : 'RAKİP DÜŞÜNÜYOR'}

              {turn === 'opponent' && (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}

      <div className="grid grid-cols-4 gap-3">

        <div />

        {columns.map((team) => (
          <div
            key={team}
            className="
            text-center
            text-[11px]
            font-black
            text-slate-300
            "
          >
            {team}
          </div>
        ))}

        {rows.map((row, r) => (
          <>
            <div
              key={row}
              className="
              flex
              items-center
              justify-center
              text-[11px]
              font-black
              text-slate-300
              "
            >
              {row}
            </div>

            {[0, 1, 2].map((c) => {
              const idx = r * 3 + c

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (turn === 'user') {
                      setSelectedCell(idx)
                    }
                  }}
                  className={cn(
                    `
                    aspect-square
                    rounded-3xl
                    border
                    shadow-xl
                    transition-all
                    flex
                    items-center
                    justify-center
                    p-2
                    `,
                    grid[idx]
                      ? 'bg-emerald-500/10 border-emerald-500/40'
                      : 'bg-slate-900 border-slate-700 hover:border-blue-500'
                  )}
                >
                  {grid[idx] ? (
                    <div className="text-center">
                      <div
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-gradient-to-r
                        from-blue-500
                        to-cyan-400
                        mx-auto
                        mb-2
                        "
                      />

                      <span className="text-[10px] font-bold">
                        {grid[idx]}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl text-white/10">
                      +
                    </span>
                  )}
                </button>
              )
            })}
          </>
        ))}
      </div>

      {/* OYUNCU SEÇME PANELİ */}

      <AnimatePresence>
        {selectedCell !== null && (
          <motion.div
            initial={{
              y: 300,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 300,
              opacity: 0,
            }}
            className="
            fixed
            bottom-0
            left-0
            right-0
            bg-slate-900/95
            backdrop-blur-xl
            rounded-t-3xl
            border-t
            border-blue-500/20
            p-6
            z-50
            "
          >
            <div className="flex justify-between mb-5">
              <h3 className="font-black text-sm">
                Oyuncu Seç
              </h3>

              <button
                onClick={() =>
                  setSelectedCell(null)
                }
                className="text-slate-400"
              >
                Kapat
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                'Zidane',
                'Messi',
                'Ronaldinho',
                'Ronaldo',
              ].map((player) => (
                <button
                  key={player}
                  onClick={() =>
                    handlePlayerSelect(player)
                  }
                  className="
                  p-4
                  rounded-2xl
                  bg-slate-800
                  border
                  border-blue-500/20
                  font-bold
                  hover:bg-blue-900
                  "
                >
                  {player}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
