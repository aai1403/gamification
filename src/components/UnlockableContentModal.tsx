import React from 'react';
import { Lock, Image, Palette, GamepadIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateUnlockableContent } from '../store/gameSettingsSlice';

interface UnlockableContentModalProps {
  onClose: () => void;
}

export default function UnlockableContentModal({ onClose }: UnlockableContentModalProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  
  const unlockableItems = [
    {
      id: 'new-images',
      title: 'مجموعه تصاویر جدید',
      description: 'دسترسی به تصاویر جدید و متنوع',
      icon: Image,
      cost: 100,
      color: 'text-blue-500'
    },
    {
      id: 'tag-themes',
      title: 'تم‌های برچسب‌گذاری',
      description: 'تم‌های مختلف برای برچسب‌ها',
      icon: Palette,
      cost: 150,
      color: 'text-purple-500'
    },
    {
      id: 'game-modes',
      title: 'حالت‌های بازی',
      description: 'حالت‌های ویژه و چالش‌های جدید',
      icon: GamepadIcon,
      cost: 200,
      color: 'text-green-500'
    }
  ];

  const handleUnlock = (itemId: string, cost: number) => {
    if (user.score >= cost) {
      dispatch(updateUnlockableContent(itemId));
      // Deduct coins/score logic here
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">محتوای قابل باز کردن</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {unlockableItems.map((item) => {
            const Icon = item.icon;
            const isLocked = user.score < item.cost;

            return (
              <div
                key={item.id}
                className={`p-4 border rounded-lg ${
                  isLocked ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        هزینه: {item.cost} سکه
                      </span>
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : (
                        <button
                          onClick={() => handleUnlock(item.id, item.cost)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                        >
                          باز کردن
                        </button>
                      )}
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