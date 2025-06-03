import { useEffect, useState } from 'react';
import './App.css';
import SolarSystem from './components/SolarSystem';
import ScrollableContent from './components/ScrollableContent';
import CustomCursor from './components/CustomCursor';
import DayNightToggle from './components/DayNightToggle';
import ScaleComparison from './components/ScaleComparison';
import OrbitVisualization from './components/OrbitVisualization';
import MissionTimeline from './components/MissionTimeline';
import PlanetInfo from './components/PlanetInfo';
import planetsDataImport from './data/planets.json';

// Define the Planet interface
export interface Planet {
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
}

// Define the PlanetsData interface with index signature
export interface PlanetsData {
  [key: string]: Planet;
}

// Cast the imported data to the interface
const planetsData: PlanetsData = planetsDataImport as PlanetsData;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [showScaleComparison, setShowScaleComparison] = useState(false);
  const [showOrbitVisualization, setShowOrbitVisualization] = useState(false);

  // Apply theme to body element
  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handlePlanetClick = (planetName: string) => {
    // Convert planetName to lowercase to match keys in planetsData
    const planetKey = planetName.toLowerCase();
    if (planetsData[planetKey]) {
      setSelectedPlanet(planetKey);
    }
  };

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleScaleComparison = () => {
    setShowScaleComparison(!showScaleComparison);
    if (showOrbitVisualization) setShowOrbitVisualization(false);
  };

  const toggleOrbitVisualization = () => {
    setShowOrbitVisualization(!showOrbitVisualization);
    if (showScaleComparison) setShowScaleComparison(false);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <CustomCursor isDarkMode={isDarkMode} />
      
      <header>
        <h1>Explore Our Solar System</h1>
        <div className="header-controls">
          <DayNightToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
          <button 
            className="control-btn"
            onClick={toggleScaleComparison}
          >
            {showScaleComparison ? 'Hide Scale Comparison' : 'Show Scale Comparison'}
          </button>
          <button 
            className="control-btn"
            onClick={toggleOrbitVisualization}
          >
            {showOrbitVisualization ? 'Hide Orbit Visualization' : 'Show Orbit Visualization'}
          </button>
        </div>
      </header>
      
      <main>
        {showScaleComparison ? (
          <ScaleComparison planets={planetsData} />
        ) : showOrbitVisualization ? (
          <OrbitVisualization planets={planetsData} />
        ) : (
          <SolarSystem 
            planets={planetsData} 
            onPlanetClick={handlePlanetClick} 
            isDarkMode={isDarkMode} 
          />
        )}
        
        <ScrollableContent isDarkMode={isDarkMode} />
        
        <section className="mission-section">
          <MissionTimeline />
        </section>
      </main>
      
      <footer>
        <p>Data sources: NASA, European Space Agency (ESA), and other international space agencies.</p>
        <p>© 2025 Solar System Explorer - An Interactive Educational Website</p>
      </footer>
      
      {/* Show planet info in normal mode (not fullscreen) */}
      {selectedPlanet && planetsData[selectedPlanet] && !document.fullscreenElement && (
        <PlanetInfo 
          planet={planetsData[selectedPlanet]} 
          onClose={handleCloseInfo} 
        />
      )}
    </div>
  );
};

export default App;
