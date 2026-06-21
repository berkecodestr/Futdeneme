import { DATA } from './data';

export const checkPlayer = (playerName: string, rowTeam: string, colTeam: string) => {
  const player = DATA.players.find(p => p.name === playerName);
  // Oyuncu hem satır hem sütundaki takımda oynadı mı?
  return player?.teams.includes(rowTeam) && player?.teams.includes(colTeam);
};
