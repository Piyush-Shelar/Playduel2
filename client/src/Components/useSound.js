
import { useRef, useEffect } from 'react';

// Custom hook for playing sound effects
const useSound = (soundFile, volume = 0.3) => {
  const audioRef = useRef(null);

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio(soundFile);
    audioRef.current.volume = volume;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundFile, volume]);

  // Play sound function
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to start
      audioRef.current.play().catch(error => {
        console.log('Sound play failed:', error);
      });
    }
  };

  return playSound;
};

export default useSound;
