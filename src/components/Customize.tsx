import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSettings } from '../store/gameSettingsSlice';
import { GameSettings } from '../types';
import { Settings, Target, Zap, Gift, Crown, Award, BarChart, Bell, Users } from 'lucide-react';

export default function Customize() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFeatures, setSelectedFeatures] = useState<Partial<GameSettings>>({
    challenges: false,
    progressFeedback: false,
    boosters: false,
    randomCoins: false,
    unlockableContent: false,
    levels: false,
    badges: false,
    ranking: false,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateSettings(selectedFeatures));
    navigate('/game');
  };

  const handleFeatureToggle = (featureId: keyof GameSettings) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="flex items-center justify-center mb-8">
          <Settings className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">سفارشی‌سازی بازی</h1>
        </div>
        
        <p className="text-gray-600 text-center mb-8">
          ویژگی‌های مورد نظر خود را برای تجربه بهتر بازی انتخاب کنید
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.id} 
                  className={`relative flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all
                    ${selectedFeatures[feature.id as keyof GameSettings] 
                      ? 'bg-blue-50 border-2 border-blue-500' 
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  onClick={() => handleFeatureToggle(feature.id as keyof GameSettings)}
                >
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      checked={selectedFeatures[feature.id as keyof GameSettings] || false}
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
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              شروع بازی
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}