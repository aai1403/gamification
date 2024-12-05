export interface GameSettings {
  challenges: boolean;
  progressFeedback: boolean;
  boosters: boolean;
  randomCoins: boolean;
  unlockableContent: boolean;
  levels: boolean;
  badges: boolean;
  ranking: boolean;
}

export interface ImageTask {
  id: string;
  url: string;
  title: string;
  author: string;
  tags: string[];
}