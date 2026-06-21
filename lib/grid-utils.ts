import { PLAYERS } from './data';

// 1. Oyuncu kontrol mantığı
export const hasPlayedFor = (playerName: string, teamName: string): boolean => {
  const player = PLAYERS.find(p => p.name === playerName);
  // Burada 'team' alanı mevcut sistemdeki yerini ifade eder. 
  // İleride 'history' dizisine geçersen burayı p.history.includes(teamName) olarak güncelleyebilirsin.
  return player ? player.team === teamName : false;
};

// 2. Kesişim mantığı: İki takımın kesişiminde oynayan oyuncuları bulur
export const getPlayersForIntersection = (teamA: string, teamB: string) => {
  // Eğer oyuncularının history verisi yoksa, en azından mevcut takım bilgilerinden 
  // filtreleme yapıyoruz. İleride history eklendiğinde burası daha da akıllı olacak.
  return PLAYERS.filter(p => 
    p.team === teamA || p.team === teamB
  );
};

// 3. Grid konfigürasyon verisi
export const GRID_CONFIG = [
  { name: "Germany 1990", logo: "🇩🇪" },
  { name: "Brazil 2002", logo: "🇧🇷" },
  { name: "France 2000", logo: "🇫🇷" },
  { name: "Spain 2010", logo: "🇪🇸" },
  { name: "AC Milan 1989", logo: "🇮🇹" },
  { name: "Barcelona 2009", logo: "🇪🇸" },
  { name: "Brazil 1994", logo: "🇧🇷" },
  { name: "France 2018", logo: "🇫🇷" },
  { name: "Portugal 2022", logo: "🇵🇹" },
];

// Helper: Grid için rastgele 3x3 eksen takımları seçer
export const getRandomGridTeams = () => {
  const shuffled = [...GRID_CONFIG].sort(() => 0.5 - Math.random());
  return {
    rows: shuffled.slice(0, 3),
    cols: shuffled.slice(3, 6)
  };
};
