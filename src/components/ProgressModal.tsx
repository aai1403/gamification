import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Trophy, Award, Star } from 'lucide-react';

interface ProgressModalProps {
  onClose: () => void;
}

export default function ProgressModal({ onClose }: ProgressModalProps) {
  const user = useSelector((state: RootState) => state.user);
  const gameSettings = useSelector((state: RootState) => state.gameSettings);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-6">پایان بازی!</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div className="text-center">
              <p className="text-lg font-semibold">امتیاز کسب شده</p>
              <p className="text-3xl font-bold text-blue-600">{user.score}</p>
            </div>
          </div>

          {gameSettings.levels && (
            <div className="flex items-center justify-center space-x-4">
              <Star className="w-8 h-8 text-purple-500" />
              <div className="text-center">
                <p className="text-lg font-semibold">سطح فعلی</p>
                <p className="text-3xl font-bold text-purple-600">{user.level}</p>
              </div>
            </div>
          )}

          {gameSettings.badges && user.badges.length > 0 && (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">نشان‌های جدید</h3>
              <div className="flex justify-center space-x-2">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center">
                    <Award className="w-6 h-6 text-blue-500" />
                    <span className="text-sm">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          بستن
        </button>
      </div>
    </div>
  );
}