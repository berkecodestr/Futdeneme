export function Lobby({ onStartGame }: { onStartGame: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-black text-yellow-500">GRID TACTICS</h1>
      <button 
        onClick={onStartGame}
        className="bg-yellow-500 text-black px-12 py-4 rounded-2xl font-black hover:scale-105 transition"
      >
        OYUNA BAŞLA
      </button>
      <div className="text-white/30 text-xs">V.1.0 - Online Mod Hazır</div>
    </div>
  )
}
