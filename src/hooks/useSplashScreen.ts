import { useState, useEffect } from "react";

/**
  * Controls splash screen visibility.
  * Shows on every single page load / refresh.
  * Includes a hard 5-second fallback timeout in case the animation callback
  * fails (e.g., framer-motion onAnimationComplete is unreliable in Safari).
  */
export const useSplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleComplete = () => {
    setShowSplash(false);
  };

  // Hard fallback: force hide splash after 5s no matter what
  // SplashScreen total duration ≈ 3.5s, so 5s gives plenty of buffer
  useEffect(() => {
    const fallback = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return () => clearTimeout(fallback);
  }, []);

  return {
    showSplash,
    handleComplete,
  };
};
