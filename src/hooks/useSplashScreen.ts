import { useState } from "react";

/**
  * Controls splash screen visibility.
  * Shows on every single page load / refresh.
  */
export const useSplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleComplete = () => {
    setShowSplash(false);
  };

  return {
    showSplash,
    handleComplete,
  };
};
