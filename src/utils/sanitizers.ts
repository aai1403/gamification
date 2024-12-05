import { User, GameSettings, BoosterType } from '../types';
import { isValidBoosterType } from './validators';

export const sanitizeUser = (user: Partial<User>): User => {
  return {
    id: user.id || '',
    username: user.username || '',
    avatar: user.avatar || '',
    level: Math.max(1, user.level || 1),
    score: Math.max(0, user.score || 0),
    coins: Math.max(0, user.coins || 0),
    badges: Array.isArray(user.badges) ? [...user.badges] : [],
    combo: Math.max(0, user.combo || 0),
    totalCorrect: Math.max(0, user.totalCorrect || 0),
    perfectStreak: Math.max(0, user.perfectStreak || 0),
    boosters: sanitizeBoosters(user.boosters || {}),
    activeBooster: user.activeBooster && isValidBoosterType(user.activeBooster) ? user.activeBooster : null,
    boosterTimeLeft: Math.max(0, user.boosterTimeLeft || 0)
  };
};

export const sanitizeGameSettings = (settings: Partial<GameSettings>): GameSettings => {
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

export const sanitizeBoosters = (boosters: Record<string, number>): Record<BoosterType, number> => {
  const sanitized: Record<BoosterType, number> = {};
  Object.entries(boosters).forEach(([key, value]) => {
    if (isValidBoosterType(key)) {
      sanitized[key] = Math.max(0, Math.floor(Number(value) || 0));
    }
  });
  return sanitized;
};