import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBooster } from '../store/userSlice';
import { BOOSTER_TYPES, BoosterType } from '../types';

export function useBooster() {
  const dispatch = useDispatch();
  const [activeBooster, setActiveBooster] = useState<BoosterType | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (activeBooster) {
      setActiveBooster(null);
    }
    return () => clearInterval(timer);
  }, [timeLeft, activeBooster]);

  const activateBooster = (boosterId: BoosterType) => {
    dispatch(updateBooster({ type: boosterId, amount: -1 }));
    
    switch (boosterId) {
      case BOOSTER_TYPES.SCORE:
        setActiveBooster(BOOSTER_TYPES.SCORE);
        setTimeLeft(30);
        break;
      case BOOSTER_TYPES.TIME:
        setActiveBooster(BOOSTER_TYPES.TIME);
        setTimeLeft(10);
        break;
      case BOOSTER_TYPES.HINT:
        setActiveBooster(BOOSTER_TYPES.HINT);
        break;
    }
  };

  return {
    activeBooster,
    timeLeft,
    activateBooster,
  };
}