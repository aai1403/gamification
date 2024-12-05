import { DBSchema } from 'idb';
import { GameSettings, User, BoosterType } from '../types';

export interface GameDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-username': string };
  };
  gameSettings: {
    key: string;
    value: GameSettings & { userId: string };
    indexes: { 'by-userId': string };
  };
  boosters: {
    key: [string, BoosterType];
    value: {
      userId: string;
      type: BoosterType;
      amount: number;
    };
    indexes: { 'by-userId': string };
  };
}