import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Zap, Clock, HelpCircle } from 'lucide-react';
import { useBooster } from '../hooks/useBooster';
import { BOOSTER_TYPES } from '../types';

interface BoosterModalProps {
  onClose: () => void;
}

const BOOSTERS = [
  {
    id: BOOSTER_TYPES.SCORE,
    name: 'تقویت‌کننده امتیاز',
    description: 'امتیاز شما برای 30 ثانیه دو برابر می‌شود',
    icon: Zap,
    color: 'text-yellow-500',
    duration: 30,
    multiplier: 2
  },
  {
    id: BOOSTER_TYPES.TIME,
    name: 'زمان اضافی',
    description: '10 ثانیه به زمان شما اضافه می‌شود',
    icon: Clock,
    color: 'text-blue-500',
    duration: 10
  },
  {
    id: BOOSTER_TYPES.HINT,
    name: 'نشانه',
    description: 'یک برچسب مرتبط با تصویر را نمایش می‌دهد',
    icon: HelpCircle,
    color: 'text-purple-500'
  }
];

export default function BoosterModal({ onClose }: BoosterModalProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { activateBooster } = useBooster();

  const handleActivateBooster = (boosterId: string) => {
    activateBooster(boosterId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">تقویت‌کننده‌ها</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {BOOSTERS.map((booster) => {
            const amount = user.boosters?.[booster.id] || 0;
            return (
              <button
                key={booster.id}
                onClick={() => amount > 0 && handleActivateBooster(booster.id)}
                disabled={amount === 0}
                className={`w-full p-4 bg-white border rounded-lg transition-colors flex items-start space-x-4
                  ${amount > 0 ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}
              >
                <booster.icon className={`w-6 h-6 ${booster.color} flex-shrink-0`} />
                <div className="text-right flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{booster.name}</h3>
                    <span className="text-sm text-gray-500">×{amount}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{booster.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}