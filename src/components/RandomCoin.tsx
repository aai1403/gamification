import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addCoins } from '../store/userSlice';

interface RandomCoinProps {
  isVisible: boolean;
  position: { x: number; y: number };
  value: number;
  onCollect: () => void;
}

export default function RandomCoin({ isVisible, position, value, onCollect }: RandomCoinProps) {
  const dispatch = useDispatch();
  const [collected, setCollected] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCollected(false);
    }
  }, [isVisible]);

  const handleCollect = () => {
    if (!collected && isVisible) {
      setCollected(true);
      dispatch(addCoins(value));
      onCollect();
    }
  };

  if (!isVisible || collected) return null;

  return (
    <div
      className="absolute animate-bounce cursor-pointer transition-transform hover:scale-110"
      style={{ left: position.x, top: position.y }}
      onClick={handleCollect}
    >
      <div className="relative">
        <Coins className="w-8 h-8 text-yellow-500" />
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {value}
        </span>
      </div>
    </div>
  );
}