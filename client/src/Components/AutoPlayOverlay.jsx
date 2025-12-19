
import React, { useState, useEffect } from 'react';
import { useMusic } from './BackgroundMusic';

const AutoPlayOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const { playMusic } = useMusic();

  const handleEnableMusic = () => {
    playMusic();
    setShowOverlay(false);
    localStorage.setItem('musicEnabled', 'true');
  };

  const handleSkip = () => {
    setShowOverlay(false);
    localStorage.setItem('musicEnabled', 'false');
  };

  useEffect(() => {
    // Check if user already made a choice
    const musicEnabled = localStorage.getItem('musicEnabled');
    if (musicEnabled === 'true') {
      playMusic();
      setShowOverlay(false);
    }
  }, [playMusic]);

  if (!showOverlay) return null;

  return (
    <div className="auto-play-overlay">
      <h2>🎵 Background Music</h2>
      <p>Enable background music for the full gaming experience?</p>
      <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>
        (You can control volume from the navbar)
      </p>
      <button onClick={handleEnableMusic} className="auto-play-button">
        🎮 Enable Music
      </button>
      <button 
        onClick={handleSkip} 
        style={{ 
          background: 'transparent', 
          color: '#ccc', 
          border: 'none', 
          marginTop: '15px',
          cursor: 'pointer'
        }}
      >
        Skip for now
      </button>
    </div>
  );
};

export default AutoPlayOverlay;
