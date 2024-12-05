import React from 'react';
import { Award, Clock, Target, Shield, ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

interface BadgesDisplayProps {
  onClose: () => void;
}

export default function BadgesDisplay({ onClose }: BadgesDisplayProps) {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const availableBadges = [
    {
      id: 'accuracy',
      name: 'نشان دقت',
      description: 'برچسب‌گذاری بدون خطا در یک مرحله',
      icon: Target,
      color: 'text-blue-500',
      requirement: '5 پاسخ صحیح متوالی'
    },
    {
      id: 'speed',
      name: 'نشان سرعت',
      description: 'برچسب‌گذاری سریع تصاویر',
      icon: Clock,
      color: 'text-yellow-500',
      requirement: 'تکمیل 10 تصویر در کمتر از 2 دقیقه'
    },
    {
      id: 'endurance',
      name: 'نشان استقامت',
      description: 'تکمیل تعداد زیادی تصویر',
      icon: Shield,
      color: 'text-purple-500',
      requirement: 'تکمیل 50 تصویر در یک جلسه'
    }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-40">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Award className="w-5 h-5 text-yellow-500 mr-2" />
            نشان‌های کسب شده
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {user.badges.length} از {availableBadges.length} نشان
            </span>
            <button
              onClick={() => navigate('/game')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              بازگشت به بازی
            </button>
          </div>
        </div>

        <div className="flex space-x-4">
          {availableBadges.map((badge) => {
            const Icon = badge.icon;
            const earned = user.badges.some(b => b.id === badge.id);

            return (
              <div
                key={badge.id}
                className={`flex-1 p-3 rounded-lg border ${
                  earned ? 'bg-white' : 'bg-gray-50 opacity-75'
                }`}
              >
                <div className="flex items-center mb-2">
                  <Icon className={`w-5 h-5 ${badge.color} mr-2`} />
                  <h3 className="font-medium">{badge.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-1">{badge.description}</p>
                <p className="text-xs text-gray-500">{badge.requirement}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}