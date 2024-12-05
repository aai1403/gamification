import React, { useState } from 'react';
import { Trophy, Users, Globe } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface LeaderboardModalProps {
  onClose: () => void;
}

type LeaderboardTab = 'weekly' | 'friends' | 'global';

export default function LeaderboardModal({ onClose }: LeaderboardModalProps) {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('weekly');
  const user = useSelector((state: RootState) => state.user);

  // Mock data for demonstration
  const leaderboardData = {
    weekly: [
      { id: '1', username: 'کاربر 1', score: 1500, level: 5 },
      { id: '2', username: 'کاربر 2', score: 1200, level: 4 },
      { id: '3', username: 'کاربر 3', score: 1000, level: 3 },
    ],
    friends: [
      { id: '1', username: 'دوست 1', score: 800, level: 3 },
      { id: '2', username: user.username, score: user.score, level: user.level },
      { id: '3', username: 'دوست 2', score: 600, level: 2 },
    ],
    global: [
      { id: '1', username: 'بازیکن برتر 1', score: 2000, level: 7 },
      { id: '2', username: 'بازیکن برتر 2', score: 1800, level: 6 },
      { id: '3', username: 'بازیکن برتر 3', score: 1600, level: 5 },
    ],
  };

  const tabs = [
    { id: 'weekly', label: 'هفتگی', icon: Trophy },
    { id: 'friends', label: 'دوستان', icon: Users },
    { id: 'global', label: 'جهانی', icon: Globe },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">جدول رتبه‌بندی</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex space-x-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as LeaderboardTab)}
                className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {leaderboardData[activeTab].map((player, index) => (
            <div
              key={player.id}
              className={`p-4 rounded-lg ${
                player.username === user.username
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                    {index + 1}
                  </span>
                  <div className="mr-3">
                    <p className="font-medium">{player.username}</p>
                    <p className="text-sm text-gray-500">سطح {player.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{player.score}</p>
                  <p className="text-xs text-gray-500">امتیاز</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}