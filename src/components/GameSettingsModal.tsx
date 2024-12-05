import React, { useState } from 'react';
import { Settings, Target, Zap, Gift, Crown, Award, BarChart, Bell, Users } from 'lucide-react';
import { GameSettings } from '../types';

interface GameSettingsModalProps {
  onClose: () => void;
  currentSettings: GameSettings;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
}

export default function GameSettingsModal({ onClose, currentSettings, onUpdateSettings }: GameSettingsModalProps) {
  const [settings, setSettings] = useState<Partial<GameSettings>>(currentSettings);

  const gameFeatures = [
    { 
      id: 'challenges', 
      label: 'چالش‌ها', 
      description: 'چالش‌های هیجان‌انگیز برای افزایش مهارت',
      icon: Target,
      color: 'text-purple-500'
    },
    { 
      id: 'progressFeedback', 
      label: 'بازخورد پیشرفت', 
      description: 'نمایش میزان پیشرفت در بازی',
      icon: BarChart,
      color: 'text-blue-500'
    },
    { 
      id: 'boosters', 
      label: 'تقویت‌کننده‌ها', 
      description: 'ابزارهای کمکی برای افزایش امتیاز',
      icon: Zap,
      color: 'text-yellow-500'
    },
    { 
      id: 'randomCoins', 
      label: 'سکه‌های تصادفی', 
      description: 'دریافت پاداش‌های تصادفی',
      icon: Gift,
      color: 'text-green-500'
    },
    { 
      id: 'unlockableContent', 
      label: 'محتوای قابل باز کردن', 
      description: 'دسترسی به محتوای ویژه با کسب امتیاز',
      icon: Crown,
      color: 'text-orange-500'
    },
    { 
      id: 'levels', 
      label: 'سطوح', 
      description: 'سیستم ارتقای سطح با پیشرفت در بازی',
      icon: Award,
      color: 'text-indigo-500'
    },
    { 
      id: 'badges', 
      label: 'نشان‌ها', 
      description: 'کسب نشان‌های افتخار',
      icon: Bell,
      color: 'text-red-500'
    },
    { 
      id: 'ranking', 
      label: 'رتبه‌بندی', 
      description: 'رقابت با سایر بازیکنان',
      icon: Users,
      color: 'text-teal-500'
    },
  ];

  const handleFeatureToggle = (featureId: keyof GameSettings) => {
    setSettings(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const handleSave = () => {
    onUpdateSettings(settings);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Settings className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">تنظیمات بازی</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {gameFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id} 
                className={`relative flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all
                  ${settings[feature.id as keyof GameSettings] 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                onClick={() => handleFeatureToggle(feature.id as keyof GameSettings)}
              >
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    checked={settings[feature.id as keyof GameSettings] || false}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="mr-3 flex-1">
                  <div className="flex items-center">
                    <Icon className={`w-5 h-5 ${feature.color} mr-2`} />
                    <label className="block text-sm font-medium text-gray-900">
                      {feature.label}
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
}