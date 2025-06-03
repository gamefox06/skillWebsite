import './PlanetInfo.css';

interface PlanetInfoProps {
  planet: {
    name: string;
    type: string;
    description: string;
    diameter: number;
    mass: number;
    distance_from_sun: number;
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
    color: string;
    image: string;
  };
  onClose: () => void;
}

const PlanetInfo = ({ planet, onClose }: PlanetInfoProps) => {
  // Format mass value to prevent overflow
  const formatMass = (mass: number) => {
    if (mass >= 1e24) {
      // For large values like the Sun, use scientific notation
      return `${(mass / 1e24).toFixed(2)} × 10²⁴ kg`;
    }
    return `${mass.toLocaleString()} × 10²⁴ kg`;
  };

  // Get planet image path
  const planetImagePath = `/src/assets/planets/${planet.name.toLowerCase()}.jpg`;
  const planetName = planet.name.toLowerCase();
  // Handle special case for Venus which has "venus_surface.jpg" instead of "venus.jpg"
  const imagePath = planetName === 'venus' ? `/src/assets/planets/venus_surface.jpg` : planetImagePath;

  return (
    <div className="planet-info-overlay">
      <div className="planet-info-container">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="planet-info-header">
          <div 
            className="planet-image" 
            style={{ 
              backgroundImage: `url('${imagePath}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: `0 0 30px ${planet.color}80`
            }}
          >
            {/* Using background image instead of color */}
          </div>
          <div className="planet-title">
            <h2>{planet.name}</h2>
            <p className="planet-type">{planet.type}</p>
          </div>
        </div>
        
        <div className="planet-description">
          <p>{planet.description}</p>
        </div>
        
        <div className="planet-stats">
          <div className="stat-group">
            <h3>Physical Characteristics</h3>
            <div className="stat-grid">
              <div className="stat">
                <span className="stat-label">Diameter</span>
                <span className="stat-value">{planet.diameter.toLocaleString()} km</span>
              </div>
              <div className="stat">
                <span className="stat-label">Mass</span>
                <span className="stat-value">{formatMass(planet.mass)}</span>
              </div>
              {planet.gravity !== undefined && (
                <div className="stat">
                  <span className="stat-label">Gravity</span>
                  <span className="stat-value">{planet.gravity} m/s²</span>
                </div>
              )}
              <div className="stat">
                <span className="stat-label">Temperature</span>
                <span className="stat-value">{planet.temperature}°C</span>
              </div>
            </div>
          </div>
          
          {(planet.rotation_period !== undefined || planet.orbital_period !== undefined) && (
            <div className="stat-group">
              <h3>Orbital Characteristics</h3>
              <div className="stat-grid">
                {planet.distance_from_sun !== undefined && (
                  <div className="stat">
                    <span className="stat-label">Distance from Sun</span>
                    <span className="stat-value">{planet.distance_from_sun.toLocaleString()} × 10⁶ km</span>
                  </div>
                )}
                {planet.orbital_period !== undefined && (
                  <div className="stat">
                    <span className="stat-label">Orbital Period</span>
                    <span className="stat-value">{planet.orbital_period.toLocaleString()} days</span>
                  </div>
                )}
                {planet.orbital_velocity !== undefined && (
                  <div className="stat">
                    <span className="stat-label">Orbital Velocity</span>
                    <span className="stat-value">{planet.orbital_velocity} km/s</span>
                  </div>
                )}
                {planet.rotation_period !== undefined && (
                  <div className="stat">
                    <span className="stat-label">Rotation Period</span>
                    <span className="stat-value">{Math.abs(planet.rotation_period)} hours</span>
                  </div>
                )}
                {planet.length_of_day !== undefined && (
                  <div className="stat">
                    <span className="stat-label">Length of Day</span>
                    <span className="stat-value">{planet.length_of_day} hours</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="stat-group">
            <h3>Other Features</h3>
            <div className="stat-grid">
              {planet.moons !== undefined && (
                <div className="stat">
                  <span className="stat-label">Moons</span>
                  <span className="stat-value">{planet.moons}</span>
                </div>
              )}
              {planet.ring_system !== undefined && (
                <div className="stat">
                  <span className="stat-label">Ring System</span>
                  <span className="stat-value">{planet.ring_system ? 'Yes' : 'No'}</span>
                </div>
              )}
              {planet.global_magnetic_field !== undefined && (
                <div className="stat">
                  <span className="stat-label">Global Magnetic Field</span>
                  <span className="stat-value">
                    {typeof planet.global_magnetic_field === 'boolean' 
                      ? (planet.global_magnetic_field ? 'Yes' : 'No')
                      : planet.global_magnetic_field}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="fun-facts">
          <h3>Fun Facts</h3>
          <ul>
            {planet.fun_facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanetInfo;
