import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Trophy, Award, Target, Zap } from 'lucide-react';

interface ScoreDetailsProps {
  onClose: () => void;
}

export default function ScoreDetails({ onClose }: ScoreDetailsProps) {
  const user = useSelector((state: RootState) => state.user);
  const gameSettings = useSelector((state: RootState) => state.gameSettings);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">جزئیات امتیازات</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-lg font-semibold">امتیاز کل</p>
              <p className="text-2xl font-bold text-blue-600">{user.score}</p>
            </div>
          </div>

          {gameSettings.levels && (
            <div className="flex items-center space-x-4">
              <Target className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-lg font-semibold">سطح فعلی</p>
                <p className="text-2xl font-bold text-purple-600">{user.level}</p>
              </div>
            </div>
          )}

          {gameSettings.badges && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">نشان‌های کسب شده</h3>
              <div className="grid grid-cols-2 gap-2">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                    <Award className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{badge.name}</p>
                      <p className="text-sm text-gray-500">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {gameSettings.boosters && (
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-lg font-semibold">ترکیب فعلی</p>
                <p className="text-2xl font-bold text-orange-600">{user.combo}x</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}