import React from 'react';
import { Clock, Target, Copy } from 'lucide-react';

interface ChallengeModalProps {
  onClose: () => void;
  onSelectChallenge: (type: string) => void;
}

const challenges = [
  {
    id: 'time-limit',
    name: 'چالش زمان محدود',
    description: 'در مدت ۱۰ ثانیه برچسب مناسب را وارد کنید. هرچه سریع‌تر پاسخ دهید، امتیاز بیشتری می‌گیرید!',
    icon: Clock,
    color: 'text-yellow-500'
  },
  {
    id: 'accuracy',
    name: 'چالش دقت برچسب‌گذاری',
    description: '۳ برچسب صحیح از ۵ گزینه را انتخاب کنید. دقت کنید، هر اشتباه امتیاز شما را کم می‌کند!',
    icon: Target,
    color: 'text-blue-500'
  },
  {
    id: 'similar',
    name: 'چالش تصاویر مشابه',
    description: 'از بین تصاویر مشابه، تصویر درست را انتخاب و برچسب‌گذاری کنید.',
    icon: Copy,
    color: 'text-purple-500'
  }
];

export default function ChallengeModal({ onClose, onSelectChallenge }: ChallengeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">انتخاب چالش</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => onSelectChallenge(challenge.id)}
              className="w-full p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors flex items-start space-x-4"
            >
              <challenge.icon className={`w-6 h-6 ${challenge.color} flex-shrink-0`} />
              <div className="text-right">
                <h3 className="font-semibold text-lg">{challenge.name}</h3>
                <p className="text-gray-600 text-sm">{challenge.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}