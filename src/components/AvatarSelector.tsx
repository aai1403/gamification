import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateAvatar } from '../store/userSlice';
import { Lock } from 'lucide-react';

interface AvatarSelectorProps {
  onClose: () => void;
}

// آواتارهای موجود با سطح مورد نیاز برای باز شدن
const AVATARS = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
  requiredLevel: Math.floor(i / 4) + 1 // هر 4 آواتار نیاز به یک سطح بالاتر دارد
}));

export default function AvatarSelector({ onClose }: AvatarSelectorProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleSelectAvatar = (avatarUrl: string) => {
    dispatch(updateAvatar(avatarUrl));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">انتخاب آواتار</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {AVATARS.map((avatar) => {
            const isLocked = user.level < avatar.requiredLevel;
            return (
              <div
                key={avatar.id}
                className={`relative group ${isLocked ? 'opacity-50' : 'cursor-pointer hover:opacity-75'}`}
              >
                <img
                  src={avatar.url}
                  alt={`آواتار ${avatar.id}`}
                  className="w-full h-auto rounded-lg"
                  onClick={() => !isLocked && handleSelectAvatar(avatar.url)}
                />
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 rounded-lg p-2">
                      <Lock className="w-6 h-6 text-white" />
                      <p className="text-white text-xs text-center mt-1">
                        سطح {avatar.requiredLevel}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}