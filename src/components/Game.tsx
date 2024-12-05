import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateScore, addCoins } from '../store/userSlice';
import Sidebar from './Sidebar';
import ProgressModal from './ProgressModal';
import ChallengeModal from './ChallengeModal';
import { GAME_IMAGES } from '../data/images';
import { Tag, Zap, ArrowLeft, Clock, Target, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const TOTAL_IMAGES = 15;
const TIME_LIMIT = 10;
const REQUIRED_TAGS = 3;
const FEEDBACK_DURATION = 3000;
const HINT_COST = 20;

export default function Game() {
  const dispatch = useDispatch();
  const gameSettings = useSelector((state: RootState) => state.gameSettings);
  const user = useSelector((state: RootState) => state.user);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userTag, setUserTag] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [canProceed, setCanProceed] = useState(true);
  const [attempts, setAttempts] = useState(1);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [showChallenge, setShowChallenge] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [correctTags, setCorrectTags] = useState<string[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const preloadCount = 3;
    for (let i = currentImageIndex; i < Math.min(currentImageIndex + preloadCount, TOTAL_IMAGES); i++) {
      const img = new Image();
      img.src = GAME_IMAGES[i].url;
    }
  }, [currentImageIndex]);

  const handleShowHint = () => {
    if (user.coins >= HINT_COST) {
      const currentImage = GAME_IMAGES[currentImageIndex];
      const randomTag = currentImage.tags[Math.floor(Math.random() * currentImage.tags.length)];
      dispatch(addCoins(-HINT_COST));
      setFeedbackMessage(`🎯 راهنمایی: یکی از برچسب‌های صحیح "${randomTag}" است`);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), FEEDBACK_DURATION);
    } else {
      setFeedbackMessage('⚠️ سکه کافی ندارید! برای راهنمایی به 20 سکه نیاز دارید');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), FEEDBACK_DURATION);
    }
  };

  const handleSubmitTag = () => {
    if (!userTag.trim()) return;

    const currentImage = GAME_IMAGES[currentImageIndex];
    const isCorrect = currentImage.tags.some(tag => 
      tag.toLowerCase().includes(userTag.toLowerCase()) || 
      userTag.toLowerCase().includes(tag.toLowerCase())
    );

    const timeSpent = (Date.now() - startTime) / 1000;
    let points = isCorrect ? 10 : 0;

    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const starRating = timeSpent <= 3 && attempts === 1 ? '⭐⭐⭐' :
                        timeSpent <= 5 && attempts <= 2 ? '⭐⭐' : '⭐';

      setFeedbackMessage(
        `${starRating}\n` +
        `✅ آفرین! ${points} امتیاز کسب کردید!\n\n` +
        `🎯 تعداد پاسخ‌های درست: ${user.totalCorrect + 1} از ${TOTAL_IMAGES}\n` +
        `⭐ سطح فعلی: ${user.level}\n` +
        `🏆 امتیاز کل: ${user.score + points}`
      );
    } else {
      setFeedbackMessage(
        `❌ متأسفانه اشتباه بود!\n\n` +
        `🎯 تعداد پاسخ‌های درست: ${user.totalCorrect} از ${TOTAL_IMAGES}\n` +
        `⭐ سطح فعلی: ${user.level}\n` +
        `🏆 امتیاز فعلی: ${user.score}`
      );
      setAttempts(prev => prev + 1);
    }

    dispatch(updateScore({ 
      points, 
      correct: isCorrect, 
      time: timeSpent, 
      attempts
    }));
    
    setUserTag('');
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), FEEDBACK_DURATION);
  };

  const handleNextImage = () => {
    setShowFeedback(false);
    setCanProceed(true);
    setAttempts(1);
    setStartTime(Date.now());
    setTimeLeft(TIME_LIMIT);
    setCorrectTags([]);
    
    if (currentImageIndex + 1 < TOTAL_IMAGES) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setShowProgress(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">دسته‌بندی تصاویر</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShowHint}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
            >
              <HelpCircle className="w-5 h-5 ml-2" />
              راهنمایی (20 سکه)
            </button>
            <span className="text-sm bg-yellow-100 px-3 py-1 rounded-full text-yellow-800">
              🪙 {user.coins} سکه
            </span>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="mb-6 relative">
              <img
                ref={imageRef}
                src={GAME_IMAGES[currentImageIndex].url}
                alt={GAME_IMAGES[currentImageIndex].title}
                loading="eager"
                className="w-full h-64 object-cover rounded-lg"
              />
              {showFeedback && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 mx-4 max-w-sm w-full">
                    <pre className="whitespace-pre-wrap text-center text-lg">
                      {feedbackMessage}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  value={userTag}
                  onChange={(e) => setUserTag(e.target.value)}
                  placeholder="برچسب تصویر را وارد کنید..."
                  className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmitTag();
                    }
                  }}
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleSubmitTag}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  ثبت برچسب
                </button>
                <button
                  onClick={handleNextImage}
                  className="px-4 py-2 text-white rounded-md flex items-center bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 ml-1" />
                  تصویر بعدی
                </button>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentImageIndex + 1) / TOTAL_IMAGES) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {currentImageIndex + 1} از {TOTAL_IMAGES} تصویر
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showProgress && <ProgressModal onClose={() => setShowProgress(false)} />}
      {showChallenge && (
        <ChallengeModal 
          onClose={() => setShowChallenge(false)}
          onSelectChallenge={(type) => {
            setActiveChallenge(type);
            setShowChallenge(false);
          }}
        />
      )}
    </div>
  );
}