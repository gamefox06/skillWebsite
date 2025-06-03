import { CSSProperties, useEffect, useState } from 'react';
import './CustomCursor.css';

interface CustomCursorProps {
  isDarkMode: boolean;
}

const CustomCursor = ({ isDarkMode }: CustomCursorProps) => {
  // Initialize with default values to prevent undefined errors
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  const cursorStyle: CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: isVisible ? 1 : 0,
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
    boxShadow: isDarkMode 
      ? '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(100, 200, 255, 0.3)' 
      : '0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 100, 200, 0.2)'
  };

  return <div className="custom-cursor" style={cursorStyle} />;
};

export default CustomCursor;
