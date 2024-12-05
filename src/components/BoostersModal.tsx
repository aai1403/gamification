import React from 'react';
import { Zap, Clock, HelpCircle, Coins } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { activateBooster } from '../store/userSlice';
import { BOOSTER_TYPES } from '../types';

interface BoostersModalProps {
  onClose: () => void;
}

export default function BoostersModal({ onClose }: BoostersModalProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const boosters = [
    {
      id: BOOSTER_TYPES.HINT,
      name: 'نمایش برچسب صحیح',
      description: 'یکی از برچسب‌های صحیح را نمایش می‌دهد',
      icon: HelpCircle,
      color: 'text-purple-500',
      cost: 50
    },
    {
      id: BOOSTER_TYPES.TIME,
      name: 'افزایش زمان',
      description: '10 ثانیه به زمان چالش اضافه می‌کند',
      icon: Clock,
      color: 'text-blue-500',
      cost: 75
    },
    {
      id: BOOSTER_TYPES.SCORE,
      name: 'دو برابر کردن امتیاز',
      description: 'امتیازها را برای 30 ثانیه دو برابر می‌کند',
      icon: Zap,
      color: 'text-yellow-500',
      cost: 100
    }
  ];

  const handleActivateBooster = (boosterId: string) => {
    dispatch(activateBooster(boosterId));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">تقویت‌کننده‌ها</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <span className="text-sm text-blue-700">سکه‌های شما:</span>
          <div className="flex items-center">
            <Coins className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="font-bold text-blue-700">{user.coins || 0}</span>
          </div>
        </div>

        <div className="space-y-4">
          {boosters.map((booster) => {
            const Icon = booster.icon;
            const canAfford = (user.coins || 0) >= booster.cost;
            const owned = user.boosters?.[booster.id] || 0;

            return (
              <div
                key={booster.id}
                className={`p-4 border rounded-lg ${
                  canAfford ? 'bg-white' : 'bg-gray-50 opacity-75'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <Icon className={`w-6 h-6 ${booster.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{booster.name}</h3>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {owned} عدد
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{booster.description}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{booster.cost}</span>
                      </div>
                      <button
                        onClick={() => handleActivateBooster(booster.id)}
                        disabled={!canAfford || owned === 0}
                        className={`px-3 py-1 rounded-md text-sm ${
                          canAfford && owned > 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {owned > 0 ? 'استفاده' : 'خرید'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}