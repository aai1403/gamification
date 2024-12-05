import React from 'react';
import { Star, Trophy, Gift } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface LevelsModalProps {
  onClose: () => void;
}

export default function LevelsModal({ onClose }: LevelsModalProps) {
  const user = useSelector((state: RootState) => state.user);
  
  const levels = [
    {
      level: 1,
      name: 'مبتدی',
      requirements: 'امتیاز 0-1000',
      rewards: ['دسترسی به چالش‌های پایه', '10 سکه هدیه'],
      unlocked: true
    },
    {
      level: 2,
      name: 'کاربر ماهر',
      requirements: 'امتیاز 1000-2000',
      rewards: ['باز شدن تقویت‌کننده‌ها', '20 سکه هدیه'],
      unlocked: user.level >= 2
    },
    {
      level: 3,
      name: 'متخصص',
      requirements: 'امتیاز 2000-3000',
      rewards: ['چالش‌های پیشرفته', '30 سکه هدیه'],
      unlocked: user.level >= 3
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">سطوح بازی</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {levels.map((level) => (
            <div
              key={level.level}
              className={`p-4 border rounded-lg ${
                level.unlocked ? 'bg-white' : 'bg-gray-50 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg flex items-center">
                  <Star className={`w-5 h-5 mr-2 ${
                    level.unlocked ? 'text-yellow-500' : 'text-gray-400'
                  }`} />
                  سطح {level.level}: {level.name}
                </h3>
                {level.unlocked && level.level === user.level && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    سطح فعلی
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{level.requirements}</p>
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">پاداش‌ها:</h4>
                <ul className="space-y-1">
                  {level.rewards.map((reward, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <Gift className="w-4 h-4 text-purple-500 mr-2" />
                      {reward}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}