import { User, GameSettings, BoosterType } from '../types';

export const sanitizeUser = (user: User): User => {
  return {
    id: user.id || '',
    username: user.username || '',
    avatar: user.avatar || '',
    level: user.level || 1,
    score: user.score || 0,
    coins: user.coins || 0,
    badges: user.badges || [],
    combo: user.combo || 0,
    totalCorrect: user.totalCorrect || 0,
    perfectStreak: user.perfectStreak || 0,
    boosters: user.boosters || {},
    activeBooster: null,
    boosterTimeLeft: 0
  };
};

export const sanitizeGameSettings = (settings: GameSettings): GameSettings => {
  return {
    challenges: Boolean(settings.challenges),
    progressFeedback: Boolean(settings.progressFeedback),
    boosters: Boolean(settings.boosters),
    randomCoins: Boolean(settings.randomCoins),
    unlockableContent: Boolean(settings.unlockableContent),
    levels: Boolean(settings.levels),
    badges: Boolean(settings.badges),
    ranking: Boolean(settings.ranking)
  };
};

export const sanitizeBoosters = (boosters: Record<BoosterType, number>): Record<BoosterType, number> => {
  const sanitized: Record<BoosterType, number> = {};
  Object.entries(boosters).forEach(([key, value]) => {
    sanitized[key as BoosterType] = Math.max(0, Number(value) || 0);
  });
  return sanitized;
};