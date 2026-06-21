'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, PlayCircle, Loader2 } from 'lucide-react'

export function GuessTeam() {
  const [loadingAd, setLoadingAd] = useState(false)
  const [hint, setHint] = useState<string | null>(null)

  const handleWatchAd = () => {
    setLoadingAd(true)
    // 3 saniyelik reklam simülasyonu
    setTimeout(() => {
      setLoadingAd(false)
      setHint("Bu takımın ülkesi: İspanya") // Örnek İpucu
    }, 3000)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-3xl border border-border shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Takımı Tahmin Et</h2>
      
      {/* İpucu Gösterge Alanı */}
      <div className="h-12 flex items-center justify-center border-b border-border mb-6">
        {hint ? <span className="text-primary font-bold">{hint}</span> : <span className="text-white/20 text-sm">İpucu gizli</span>}
      </div>

      <button 
        onClick={handleWatchAd}
        disabled={loadingAd || !!hint}
        className="w-full py-4 flex items-center justify-center gap-2 bg-primary/10 border border-primary/30 rounded-xl hover:bg-primary/20 transition-all"
      >
        {loadingAd ? (
          <Loader2 className="animate-spin size-5" />
        ) : (
          <>
            <PlayCircle className="size-5 text-primary" />
            <span className="font-bold text-sm">İpucu için Video İzle</span>
          </>
        )}
      </button>
    </div>
  )
}
