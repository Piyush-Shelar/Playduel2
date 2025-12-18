
import React from 'react';
import { NavLink } from 'react-router-dom';
import useSound from './useSound';

const NavLinkWithSound = ({ to, children, className, onClick, ...props }) => {
  const playClickSound = useSound('/audio/nav-click.mp3', 0.2); // 20% volume

  const handleClick = (e) => {
    // Play the click sound
    playClickSound();
    
    // Call the original onClick if it exists
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <NavLink
      to={to}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default NavLinkWithSound;
