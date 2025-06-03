import { useState, useEffect } from 'react';
import './SolarSystem.css';
import PlanetInfo from './PlanetInfo';

interface Planet {
  name: string;
  diameter: number;
  distance_from_sun: number;
  color: string;
  image: string;
  type: string;
  description: string;
  mass: number;
  temperature: number;
  rotation_period?: number;
  length_of_day?: number;
  orbital_period?: number;
  orbital_velocity?: number;
  gravity?: number;
  moons?: number;
  ring_system?: boolean;
  global_magnetic_field?: boolean | string;
  fun_facts: string[];
}

interface SolarSystemProps {
  planets: Record<string, Planet>;
  onPlanetClick: (planetName: string) => void;
  isDarkMode: boolean;
}

const SolarSystem = ({ planets, onPlanetClick, isDarkMode }: SolarSystemProps) => {
  const [animating, setAnimating] = useState(true);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  // Convert planets object to array and sort by distance from sun
  const planetArray = Object.values(planets).sort((a, b) => 
    a.distance_from_sun - b.distance_from_sun
  );

  useEffect(() => {
    // Start animation when component mounts
    setAnimating(true);

    // Set up fullscreen change event listener
    const handleFullscreenChange = () => {
      const fullscreenActive = !!document.fullscreenElement;
      setIsFullscreen(fullscreenActive);
      setShowCustomCursor(fullscreenActive);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Cleanup
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isFullscreen) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (isFullscreen) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isFullscreen]);

  const handlePlanetClick = (planetName: string) => {
    console.log(`Planet clicked: ${planetName}`); // Debug log
    
    // If in fullscreen mode, show the info popup directly
    if (isFullscreen) {
      setSelectedPlanet(planetName.toLowerCase());
    } else {
      // Otherwise, delegate to parent component
      onPlanetClick(planetName);
    }
  };

  const handlePlanetHover = (planetName: string) => {
    setHoveredPlanet(planetName);
  };

  const handlePlanetLeave = () => {
    setHoveredPlanet(null);
  };

  const toggleFullscreen = () => {
    const solarSystemContainer = document.querySelector('.solar-system-container');
    
    if (!solarSystemContainer) return;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (solarSystemContainer.requestFullscreen) {
        solarSystemContainer.requestFullscreen()
          .catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .catch(err => {
            console.error(`Error attempting to exit fullscreen: ${err.message}`);
          });
      }
    }
  };

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
  };

  return (
    <div className={`solar-system-container ${isDarkMode ? 'dark' : 'light'} ${isFullscreen ? 'fullscreen' : ''}`}>
      {showCustomCursor && (
        <div 
          className="custom-fullscreen-cursor" 
          style={{ 
            left: `${cursorPosition.x}px`, 
            top: `${cursorPosition.y}px`,
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
          }}
        />
      )}
      
      <div className="sun-container">
        <div 
          className="sun" 
          onClick={() => handlePlanetClick('sun')}
          onMouseEnter={() => handlePlanetHover('sun')}
          onMouseLeave={handlePlanetLeave}
          style={{
            backgroundImage: `url('/src/assets/planets/sun.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '60px',  /* Increased from default size */
            height: '60px', /* Increased from default size */
            transform: 'scale(2.25)' /* Additional scaling to make sun 2.25x larger */
          }}
        >
          {hoveredPlanet === 'sun' && (
            <div className="planet-label">Sun</div>
          )}
        </div>
      </div>
      
      <div className="orbits-container">
        {planetArray.map((planet, index) => {
          // Skip the sun as it's rendered separately
          if (planet.name.toLowerCase() === 'sun') return null;
          
          // Calculate orbit size based on distance from sun with reduced scale
          // Reduce the base size and scaling factor to keep orbits in view
          const orbitSize = 30 + Math.log(planet.distance_from_sun) * 10;
          
          // Calculate planet size based on diameter (logarithmic scale for better visualization)
          // Double the size as requested by the user
          const planetSize = Math.max(16, Math.log(planet.diameter) * 3);
          
          // Calculate orbit duration based on distance (farther planets orbit slower)
          const orbitDuration = 20 + index * 10;
          
          // Determine the image path for the planet
          const planetName = planet.name.toLowerCase();
          // Handle special cases for Venus and Pluto
          let planetImagePath;
          if (planetName === 'venus') {
            planetImagePath = `/src/assets/planets/venus_surface.jpg`;
          } else {
            planetImagePath = `/src/assets/planets/${planetName}.jpg`;
          }
          
          return (
            <div 
              key={planet.name}
              className="orbit"
              style={{ 
                width: `${orbitSize}%`, 
                height: `${orbitSize}%`,
                animationDuration: `${orbitDuration}s`,
                animationPlayState: animating ? 'running' : 'paused'
              }}
            >
              <div 
                id={`planet-${planet.name.toLowerCase()}`}
                className="planet"
                style={{ 
                  width: `${planetSize}px`, 
                  height: `${planetSize}px`,
                  backgroundImage: `url('${planetImagePath}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 50, // Ensure planets are clickable with a much higher z-index
                  pointerEvents: 'auto' // Explicitly enable pointer events
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Stop event bubbling
                  handlePlanetClick(planet.name);
                }}
                onMouseEnter={() => handlePlanetHover(planet.name)}
                onMouseLeave={handlePlanetLeave}
              >
                {hoveredPlanet === planet.name && (
                  <div className="planet-label">{planet.name}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="controls">
        <button onClick={() => setAnimating(!animating)}>
          {animating ? 'Pause Orbits' : 'Resume Orbits'}
        </button>
        <button onClick={toggleFullscreen} className="fullscreen-btn">
          {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </button>
      </div>

      {/* Show planet info in fullscreen mode */}
      {isFullscreen && selectedPlanet && planets[selectedPlanet] && (
        <PlanetInfo 
          planet={planets[selectedPlanet]} 
          onClose={handleCloseInfo} 
        />
      )}
    </div>
  );
};

export default SolarSystem;
