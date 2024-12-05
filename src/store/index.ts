import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import gameSettingsReducer from './gameSettingsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameSettings: gameSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;