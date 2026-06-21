'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function FootballGrid() {
  // Videodaki gibi 3x3 bir ızgara oluşturuyoruz
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-black text-white p-4">
      {/* 3x3 Izgara Konteyneri */}
      <div className="grid grid-cols-4 gap-2">
        {/* Sol üst köşe boş */}
        <div className="size-16"></div>
        {/* Üst Sıra Takımları (Örnek) */}
        {['Roma', 'Inter', 'Dünya'].map((t, i) => (
          <div key={i} className="size-16 bg-neutral-800 rounded-lg flex items-center justify-center font-bold">{t}</div>
        ))}
        
        {/* Satır Takımları ve Hücreler */}
        {['PSG', 'Liverpool', 'Fenerbahçe'].map((rowTeam, r) => (
          <>
            <div className="size-16 bg-neutral-800 rounded-lg flex items-center justify-center font-bold">{rowTeam}</div>
            {[0, 1, 2].map((c) => (
              <button key={c} className="size-16 bg-neutral-900 border border-white/10 rounded-lg text-white/20">
                ?
              </button>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
