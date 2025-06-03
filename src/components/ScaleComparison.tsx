import { useState } from 'react';
import './ScaleComparison.css';

interface Planet {
  name: string;
  diameter: number;
  distance_from_sun: number;
  color: string;
  image: string;
  type: string;
}

interface ScaleComparisonProps {
  planets: Record<string, Planet>;
}

const ScaleComparison = ({ planets }: ScaleComparisonProps) => {
  const [compareMode, setCompareMode] = useState<'size' | 'distance'>('size');
  
  // Convert planets object to array and sort by diameter (for size comparison)
  // or by distance from sun (for distance comparison)
  const planetArray = Object.values(planets).sort((a, b) => 
    compareMode === 'size' 
      ? b.diameter - a.diameter 
      : a.distance_from_sun - b.distance_from_sun
  );

  return (
    <div className="scale-comparison">
      <h2>Planet Scale Comparison</h2>
      
      <div className="comparison-controls">
        <button 
          className={`compare-btn ${compareMode === 'size' ? 'active' : ''}`}
          onClick={() => setCompareMode('size')}
        >
          Compare Sizes
        </button>
        <button 
          className={`compare-btn ${compareMode === 'distance' ? 'active' : ''}`}
          onClick={() => setCompareMode('distance')}
        >
          Compare Distances
        </button>
      </div>
      
      <div className="planets-comparison">
        {planetArray.map((planet) => {
          // Skip any non-planet objects like asteroids or comets
          if (!planet.diameter) return null;
          
          // Calculate size based on diameter (logarithmic scale for better visualization)
          const size = compareMode === 'size'
            ? Math.max(50, Math.log(planet.diameter) * 30)
            : 50;
          
          // Calculate position based on distance from sun (only for distance comparison)
          const position = compareMode === 'distance'
            ? `${Math.min(90, Math.log(planet.distance_from_sun) * 10)}%`
            : 'auto';
          
          // Determine the image path for the planet
          const planetName = planet.name.toLowerCase();
          // Handle special case for Venus which has "venus_surface.jpg" instead of "venus.jpg"
          const planetImagePath = planetName === 'venus' 
            ? `/src/assets/planets/venus_surface.jpg` 
            : `/src/assets/planets/${planetName}.jpg`;
          
          return (
            <div 
              key={planet.name}
              className="planet-item"
              style={{ 
                marginLeft: compareMode === 'distance' ? position : 'auto',
              }}
            >
              <div 
                className="planet-image-container"
                style={{ 
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                <div
                  className="planet-image"
                  style={{
                    backgroundImage: `url('${planetImagePath}')`,
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '50%',
                    transform: 'scale(1.05)', /* Slightly scale up to eliminate black edges */
                    overflow: 'hidden'
                  }}
                />
              </div>
              <div className="planet-info">
                <span className="planet-name">{planet.name}</span>
                <span className="planet-diameter">{planet.diameter.toLocaleString()} km</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="comparison-note">
        {compareMode === 'size' 
          ? 'Planet sizes shown to scale relative to each other. Jupiter is the largest planet with a diameter of 142,984 km.'
          : 'Planet distances shown to approximate scale. Neptune is the farthest planet at about 4.5 billion km from the Sun.'}
      </p>
    </div>
  );
};

export default ScaleComparison;
