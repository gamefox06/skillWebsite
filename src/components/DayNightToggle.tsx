import { useState } from 'react';
import './DayNightToggle.css';

interface DayNightToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const DayNightToggle = ({ isDarkMode, onToggle }: DayNightToggleProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    onToggle();
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div 
      className={`day-night-toggle ${isDarkMode ? 'dark' : 'light'} ${isAnimating ? 'animating' : ''}`}
      onClick={handleToggle}
    >
      <div className="toggle-track">
        <div className="sun-moon-container">
          {/* Sun icon */}
          <div className="sun">
            <div className="sun-rays"></div>
          </div>
          
          {/* Moon icon */}
          <div className="moon">
            <div className="moon-crater"></div>
            <div className="moon-crater"></div>
          </div>
        </div>
        
        <div className="toggle-thumb"></div>
      </div>
      <label>{isDarkMode ? 'Night Mode' : 'Day Mode'}</label>
    </div>
  );
};

export default DayNightToggle;
