import { User, GameSettings, BoosterType } from '../types';

export const isValidUser = (user: any): user is User => {
  return (
    user &&
    typeof user.id === 'string' &&
    typeof user.username === 'string' &&
    typeof user.level === 'number' &&
    typeof user.score === 'number' &&
    Array.isArray(user.badges)
  );
};

export const isValidGameSettings = (settings: any): settings is GameSettings => {
  return (
    settings &&
    typeof settings.challenges === 'boolean' &&
    typeof settings.progressFeedback === 'boolean' &&
    typeof settings.boosters === 'boolean' &&
    typeof settings.randomCoins === 'boolean' &&
    typeof settings.unlockableContent === 'boolean' &&
    typeof settings.levels === 'boolean' &&
    typeof settings.badges === 'boolean' &&
    typeof settings.ranking === 'boolean'
  );
};

export const isValidBoosterType = (type: string): type is BoosterType => {
  return ['SCORE', 'TIME', 'HINT'].includes(type);
};