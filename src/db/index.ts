import { openDB } from 'idb';
import { GameDB } from './schema';
import { User, GameSettings, BoosterType } from '../types';
import { sanitizeUser, sanitizeGameSettings, sanitizeBoosters } from '../utils/sanitizers';
import { isValidUser, isValidGameSettings } from '../utils/validators';

const DB_NAME = 'game-db';
const DB_VERSION = 1;

const dbPromise = openDB<GameDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    const userStore = db.createObjectStore('users', { keyPath: 'id' });
    userStore.createIndex('by-username', 'username');

    const settingsStore = db.createObjectStore('gameSettings', { keyPath: 'userId' });
    settingsStore.createIndex('by-userId', 'userId');

    const boosterStore = db.createObjectStore('boosters', { keyPath: ['userId', 'type'] });
    boosterStore.createIndex('by-userId', 'userId');
  },
});

export const saveUser = async (user: User): Promise<void> => {
  try {
    if (!isValidUser(user)) {
      throw new Error('Invalid user data');
    }
    const sanitizedUser = sanitizeUser(user);
    const db = await dbPromise;
    await db.put('users', sanitizedUser);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async (userId: string): Promise<User | undefined> => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const db = await dbPromise;
    const user = await db.get('users', userId);
    return user ? sanitizeUser(user) : undefined;
  } catch (error) {
    console.error('Error getting user:', error);
    return undefined;
  }
};

export const saveGameSettings = async (userId: string, settings: GameSettings): Promise<void> => {
  try {
    if (!userId || !isValidGameSettings(settings)) {
      throw new Error('Invalid game settings data');
    }
    const sanitizedSettings = sanitizeGameSettings(settings);
    const db = await dbPromise;
    await db.put('gameSettings', { ...sanitizedSettings, userId });
  } catch (error) {
    console.error('Error saving game settings:', error);
  }
};

export const saveBoosters = async (userId: string, boosters: Record<BoosterType, number>): Promise<void> => {
  try {
    if (!userId) {
      throw new Error('Invalid user ID');
    }
    const sanitizedBoosters = sanitizeBoosters(boosters);
    const db = await dbPromise;
    const tx = db.transaction('boosters', 'readwrite');
    
    await Promise.all(
      Object.entries(sanitizedBoosters).map(([type, amount]) =>
        tx.store.put({
          userId,
          type: type as BoosterType,
          amount: Math.max(0, amount)
        })
      )
    );
    
    await tx.done;
  } catch (error) {
    console.error('Error saving boosters:', error);
  }
};

export const getBoosters = async (userId: string): Promise<Record<BoosterType, number>> => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const db = await dbPromise;
    const boosters = await db.getAllFromIndex('boosters', 'by-userId', userId);
    return sanitizeBoosters(
      boosters.reduce((acc, booster) => ({
        ...acc,
        [booster.type]: booster.amount
      }), {} as Record<BoosterType, number>)
    );
  } catch (error) {
    console.error('Error getting boosters:', error);
    return {};
  }
};