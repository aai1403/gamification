export interface User {
  id: string;
  username: string;
  avatar: string;
  level: number;
  score: number;
  coins: number;
  badges: Badge[];
  combo: number;
  totalCorrect: number;
  perfectStreak: number;
  boosters: Record<BoosterType, number>;
  activeBooster: BoosterType | null;
  boosterTimeLeft: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  dateEarned: string;
}

export const BOOSTER_TYPES = {
  SCORE: 'SCORE',
  TIME: 'TIME',
  HINT: 'HINT'
} as const;

export type BoosterType = typeof BOOSTER_TYPES[keyof typeof BOOSTER_TYPES];