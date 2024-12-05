import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSettings } from '../types';
import { saveGameSettings } from '../db';

interface UnlockableContent {
  newImages: boolean;
  tagThemes: boolean;
  gameModes: boolean;
}

interface ExtendedGameSettings extends GameSettings {
  unlockedContent: UnlockableContent;
}

const initialState: ExtendedGameSettings = {
  challenges: false,
  progressFeedback: false,
  boosters: false,
  randomCoins: false,
  unlockableContent: false,
  levels: false,
  badges: false,
  ranking: false,
  unlockedContent: {
    newImages: false,
    tagThemes: false,
    gameModes: false
  }
};

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<GameSettings>>) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    updateUnlockableContent: (state, action: PayloadAction<string>) => {
      const contentId = action.payload;
      switch (contentId) {
        case 'new-images':
          state.unlockedContent.newImages = true;
          break;
        case 'tag-themes':
          state.unlockedContent.tagThemes = true;
          break;
        case 'game-modes':
          state.unlockedContent.gameModes = true;
          break;
      }
      saveGameSettings(state.id, state).catch(console.error);
    }
  },
});

export const { updateSettings, updateUnlockableContent } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;