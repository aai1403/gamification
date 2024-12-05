import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Badge, BoosterType } from '../types';
import { saveUser, saveBoosters } from '../db';
import { sanitizeUser } from '../utils/db-helpers';

const initialState: User = {
  id: '',
  username: '',
  avatar: '',
  level: 1,
  score: 0,
  coins: 0,
  badges: [],
  combo: 0,
  totalCorrect: 0,
  perfectStreak: 0,
  boosters: {},
  activeBooster: null,
  boosterTimeLeft: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return sanitizeUser(action.payload);
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (!state.id) return state;
      state.avatar = action.payload;
      saveUser(sanitizeUser(state)).catch(console.error);
    },
    updateScore: (state, action: PayloadAction<{
      points: number;
      correct: boolean;
      time: number;
      attempts: number;
      challengeBonus?: number;
    }>) => {
      if (!state.id) return state;
      
      const { points, correct, challengeBonus = 0 } = action.payload;
      state.score += points + challengeBonus;
      
      if (correct) {
        state.totalCorrect++;
        state.combo++;
      } else {
        state.combo = 0;
      }
      
      // Level up logic
      const newLevel = Math.floor(state.score / 1000) + 1;
      if (newLevel > state.level) {
        state.level = newLevel;
      }
      
      saveUser(sanitizeUser(state)).catch(console.error);
    },
    addBadge: (state, action: PayloadAction<Badge>) => {
      if (!state.id) return state;
      if (!state.badges.some(badge => badge.id === action.payload.id)) {
        state.badges.push(action.payload);
        saveUser(sanitizeUser(state)).catch(console.error);
      }
    },
    updateBooster: (state, action: PayloadAction<{ type: BoosterType; amount: number }>) => {
      if (!state.id) return state;
      const { type, amount } = action.payload;
      if (!state.boosters) state.boosters = {};
      state.boosters[type] = (state.boosters[type] || 0) + amount;
      saveBoosters(state.id, state.boosters).catch(console.error);
    },
    addCoins: (state, action: PayloadAction<number>) => {
      if (!state.id) return state;
      state.coins = (state.coins || 0) + action.payload;
      saveUser(sanitizeUser(state)).catch(console.error);
    },
    activateBooster: (state, action: PayloadAction<BoosterType>) => {
      if (!state.id) return state;
      
      const boosterId = action.payload;
      if (state.boosters?.[boosterId] > 0) {
        state.boosters[boosterId]--;
        state.activeBooster = boosterId;
        
        switch (boosterId) {
          case 'SCORE':
            state.boosterTimeLeft = 30;
            break;
          case 'TIME':
            state.boosterTimeLeft = 10;
            break;
          case 'HINT':
            state.boosterTimeLeft = 1;
            break;
        }
        
        saveBoosters(state.id, state.boosters).catch(console.error);
      }
    },
    updateBoosterTime: (state) => {
      if (state.boosterTimeLeft > 0) {
        state.boosterTimeLeft--;
        if (state.boosterTimeLeft === 0) {
          state.activeBooster = null;
        }
      }
    }
  },
});

export const { 
  setUser, 
  updateAvatar, 
  updateScore, 
  addBadge, 
  updateBooster,
  addCoins,
  activateBooster,
  updateBoosterTime 
} = userSlice.actions;

export default userSlice.reducer;