'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, X, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Player = 'X' | 'O' | null

export function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)

  // Kazananı hesaplayan fonksiyon
  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Yatay
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dikey
      [0, 4, 8], [2, 4, 6]             // Çapraz
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] }
      }
    }
    return null
  }

  const winData = calculateWinner(board)
  const winner = winData?.winner
  const winningLine = winData?.line || []
  const isDraw = !winner && board.every((square) => square !== null)

  const handleClick = useCallback((index: number) => {
    // Eğer kutu doluysa veya oyun bittiyse tıklamayı engelle
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }, [board, isXNext, winner])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      {/* Üst Bilgi Alanı */}
      <div className="mb-8 text-center space-y-2">
        <h2 className="text-3xl font-black text-white flex items-center gap-3 justify-center">
          <Trophy className="text-yellow-500 size-8" />
          Derbi: X vs O
        </h2>
        <div className="h-6 mt-2">
          {winner ? (
            <span className="text-green-400 font-bold text-lg animate-pulse">
              Kazanan: Takım {winner}!
            </span>
          ) : isDraw ? (
            <span className="text-orange-400 font-bold text-lg">Maç Berabere!</span>
          ) : (
            <span className="text-white/60 font-medium">
              Sıra: <span className={isXNext ? "text-blue-400" : "text-red-400"}>Takım {isXNext ? 'X' : 'O'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Oyun Tahtası */}
      <div className="grid grid-cols-3 gap-3 bg-white/5 p-5 rounded-3xl border border-white/10 shadow-2xl">
        {board.map((square, i) => {
          const isWinningSquare = winningLine.includes(i)
          return (
            <motion.button
              key={i}
              whileHover={!square && !winner ? { scale: 1.05 } : {}}
              whileTap={!square && !winner ? { scale: 0.95 } : {}}
              onClick={() => handleClick(i)}
              className={cn(
                "w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center transition-all duration-300 border",
                !square 
                  ? "bg-background/50 border-white/5 hover:border-white/20 hover:bg-white/5" 
                  : "bg-background border-white/10",
                isWinningSquare && "bg-green-500/20 border-green-500 shadow-[0_0_20px_rgba(74,222,128,0.3)]"
              )}
            >
              {square === 'X' && (
                <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}>
                  <X className="size-12 text-blue-500" strokeWidth={2.5} />
                </motion.div>
              )}
              {square === 'O' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Circle className="size-10 text-red-500" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Rövanş Butonu */}
      {(winner || isDraw) && (
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={resetGame}
          className="mt-10 flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-2xl font-black tracking-wide shadow-lg transition-all active:scale-95"
        >
          <RotateCcw className="size-5" />
          RÖVANŞ MAÇI
        </motion.button>
      )}
    </div>
  )
}
