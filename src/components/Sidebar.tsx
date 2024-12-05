import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { User, Trophy, LogOut, Info, Award, Target, Zap, Gift, Crown, Star, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { updateSettings } from '../store/gameSettingsSlice';
import AvatarSelector from './AvatarSelector';
import ScoreDetails from './ScoreDetails';
import AboutModal from './AboutModal';
import ChallengeModal from './ChallengeModal';
import GameSettingsModal from './GameSettingsModal';
import UnlockableContentModal from './UnlockableContentModal';
import LevelsModal from './LevelsModal';
import BadgesDisplay from './BadgesDisplay';
import LeaderboardModal from './LeaderboardModal';
import BoostersModal from './BoostersModal';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const gameSettings = useSelector((state: RootState) => state.gameSettings);
  
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showScoreDetails, setShowScoreDetails] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showGameSettings, setShowGameSettings] = useState(false);
  const [showUnlockableContent, setShowUnlockableContent] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showBoosters, setShowBoosters] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const renderGameFeatures = () => {
    const features = [];

    features.push(
      <button
        key="settings"
        onClick={() => setShowGameSettings(true)}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-md transition-colors"
      >
        <Settings className="w-5 h-5 text-gray-500" />
        <span>تنظیمات بازی</span>
      </button>
    );

    if (gameSettings.unlockableContent) {
      features.push(
        <button
          key="unlockable"
          onClick={() => setShowUnlockableContent(true)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-md transition-colors"
        >
          <Gift className="w-5 h-5 text-green-500" />
          <span>محتوای قابل باز کردن</span>
        </button>
      );
    }

    if (gameSettings.levels) {
      features.push(
        <button
          key="levels"
          onClick={() => setShowLevels(true)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-md transition-colors"
        >
          <Star className="w-5 h-5 text-purple-500" />
          <span>سطوح بازی</span>
        </button>
      );
    }

    if (gameSettings.badges) {
      features.push(
        <button
          key="badges"
          onClick={() => setShowBadges(true)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-md transition-colors"
        >
          <Award className="w-5 h-5 text-orange-500" />
          <span>نشان‌ها</span>
        </button>
      );
    }

    if (gameSettings.ranking) {
      features.push(
        <button
          key="leaderboard"
          onClick={() => setShowLeaderboard(true)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-md transition-colors"
        >
          <Crown className="w-5 h-5 text-blue-500" />
          <span>جدول رتبه‌بندی</span>
        </button>
      );
    }

    if (gameSettings.challenges) {
      features.push(
        <button
          key="challenges"
          onClick={() => setShowChallenges(true)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-md transition-colors"
        >
          <Target className="w-5 h-5 text-purple-500" />
          <span>چالش‌ها</span>
        </button>
      );
    }

    if (gameSettings.boosters) {
      features.push(
        <button
          key="boosters"
          onClick={() => setShowBoosters(true)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-md transition-colors"
        >
          <Zap className="w-5 h-5 text-yellow-500" />
          <span>تقویت‌کننده‌ها</span>
        </button>
      );
    }

    return features;
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">پروفایل</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <button
                onClick={() => setShowAvatarSelector(true)}
                className="relative group inline-block"
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-20 h-20 rounded-full mx-auto transition-opacity group-hover:opacity-75"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                  تغییر
                </span>
              </button>
              <div className="mt-3">
                <p className="font-medium text-lg">{user.username}</p>
                <div className="flex justify-center items-center space-x-2 mt-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <p className="text-sm text-gray-600">امتیاز: {user.score}</p>
                </div>
                {gameSettings.levels && (
                  <div className="flex justify-center items-center mt-1">
                    <Star className="w-4 h-4 text-purple-500 mr-1" />
                    <p className="text-sm text-gray-600">سطح {user.level}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              {renderGameFeatures()}

              <button
                onClick={() => setShowAbout(true)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full p-2 rounded-md transition-colors"
              >
                <Info className="w-5 h-5" />
                <span>درباره ما</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 w-full p-2 rounded-md transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAvatarSelector && (
        <AvatarSelector onClose={() => setShowAvatarSelector(false)} />
      )}

      {showScoreDetails && (
        <ScoreDetails onClose={() => setShowScoreDetails(false)} />
      )}

      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}

      {showChallenges && gameSettings.challenges && (
        <ChallengeModal 
          onClose={() => setShowChallenges(false)}
          onSelectChallenge={(type) => {
            setShowChallenges(false);
            onClose();
          }}
        />
      )}

      {showGameSettings && (
        <GameSettingsModal
          onClose={() => setShowGameSettings(false)}
          currentSettings={gameSettings}
          onUpdateSettings={(newSettings) => {
            dispatch(updateSettings(newSettings));
            setShowGameSettings(false);
          }}
        />
      )}

      {showUnlockableContent && gameSettings.unlockableContent && (
        <UnlockableContentModal onClose={() => setShowUnlockableContent(false)} />
      )}

      {showLevels && gameSettings.levels && (
        <LevelsModal onClose={() => setShowLevels(false)} />
      )}

      {showBadges && gameSettings.badges && (
        <BadgesDisplay onClose={() => setShowBadges(false)} />
      )}

      {showLeaderboard && gameSettings.ranking && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
      )}

      {showBoosters && gameSettings.boosters && (
        <BoostersModal onClose={() => setShowBoosters(false)} />
      )}
    </>
  );
}