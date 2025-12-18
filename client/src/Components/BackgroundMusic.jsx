
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

// Create context
const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // 30% volume (0.3)
  const audioRef = useRef(null);

  // Initialize audio on component mount
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/audio/bg-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.preload = 'auto';

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
          // Some browsers require user interaction first
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Play music
  const playMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
      setIsPlaying(true);
    }
  };

  // Pause music
  const pauseMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Set volume
  const changeVolume = (newVolume) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolume(vol);
  };

  return (
    <MusicContext.Provider value={{
      isPlaying,
      volume,
      togglePlay,
      playMusic,
      pauseMusic,
      changeVolume
    }}>
      {children}
    </MusicContext.Provider>
  );
};

// Music Control Component (can be placed in navbar)
export const MusicControls = () => {
  const { isPlaying, togglePlay, volume, changeVolume } = useMusic();

  return (
    <div className="music-controls">
      <button 
        onClick={togglePlay} 
        className="music-btn"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => changeVolume(parseFloat(e.target.value))}
        className="volume-slider"
        aria-label="Volume control"
      />
      <span className="volume-indicator">{Math.round(volume * 100)}%</span>
    </div>
  );
};
