import { useState } from 'react';
import './MissionTimeline.css';

interface Mission {
  year: number;
  name: string;
  description: string;
  target: string;
  image?: string;
}

const MissionTimeline = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const missions: Mission[] = [
    {
      year: 1962,
      name: "Mariner 2",
      description: "First successful interplanetary mission, flew by Venus and confirmed its hot surface temperatures.",
      target: "Venus"
    },
    {
      year: 1969,
      name: "Apollo 11",
      description: "First human landing on the Moon. Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins orbited above.",
      target: "Moon"
    },
    {
      year: 1976,
      name: "Viking 1 & 2",
      description: "First spacecraft to successfully land on Mars and return images of the surface. They also conducted biological experiments searching for signs of life.",
      target: "Mars"
    },
    {
      year: 1977,
      name: "Voyager 1 & 2",
      description: "Grand Tour of the outer planets, providing unprecedented views of Jupiter, Saturn, Uranus, and Neptune. Both spacecraft are now in interstellar space.",
      target: "Multiple"
    },
    {
      year: 1990,
      name: "Hubble Space Telescope",
      description: "Revolutionary space telescope that has made over 1.4 million observations and helped determine the age of the universe.",
      target: "Multiple"
    },
    {
      year: 1997,
      name: "Mars Pathfinder & Sojourner",
      description: "Delivered the first rover to the surface of Mars, demonstrating new landing technologies.",
      target: "Mars"
    },
    {
      year: 2004,
      name: "Cassini-Huygens",
      description: "Detailed study of Saturn, its rings, and moons. The Huygens probe landed on Titan, revealing its Earth-like features.",
      target: "Saturn"
    },
    {
      year: 2006,
      name: "New Horizons",
      description: "First mission to Pluto, revealing its complex geology and atmosphere. Later visited Kuiper Belt object Arrokoth.",
      target: "Pluto"
    },
    {
      year: 2012,
      name: "Curiosity Rover",
      description: "Mars rover with advanced scientific instruments that found evidence Mars once had conditions suitable for microbial life.",
      target: "Mars"
    },
    {
      year: 2015,
      name: "Dawn",
      description: "First spacecraft to orbit two different extraterrestrial bodies: the asteroid Vesta and dwarf planet Ceres.",
      target: "Multiple"
    },
    {
      year: 2018,
      name: "Parker Solar Probe",
      description: "Mission to study the Sun's outer corona, flying closer to the Sun than any previous spacecraft.",
      target: "Sun"
    },
    {
      year: 2021,
      name: "Perseverance & Ingenuity",
      description: "Mars rover searching for signs of ancient microbial life, with the first helicopter to fly on another planet.",
      target: "Mars"
    },
    {
      year: 2021,
      name: "James Webb Space Telescope",
      description: "Most powerful space telescope ever built, designed to observe the most distant objects in the universe.",
      target: "Multiple"
    },
    {
      year: 2022,
      name: "DART Mission",
      description: "First demonstration of asteroid deflection technology by intentionally crashing into asteroid Dimorphos.",
      target: "Asteroid"
    }
  ];
  
  // Get unique targets for filter
  const targets = ['all', ...new Set(missions.map(mission => mission.target))];
  
  // Filter missions based on active filter
  const filteredMissions = activeFilter === 'all' 
    ? missions 
    : missions.filter(mission => mission.target === activeFilter);
  
  return (
    <div className="mission-timeline">
      <h2>Space Mission Timeline</h2>
      <p className="timeline-intro">
        Explore key missions that have expanded our understanding of the solar system over the decades.
      </p>
      
      <div className="timeline-filters">
        {targets.map(target => (
          <button 
            key={target} 
            className={`filter-btn ${activeFilter === target ? 'active' : ''}`}
            onClick={() => setActiveFilter(target)}
          >
            {target === 'all' ? 'All Missions' : target}
          </button>
        ))}
      </div>
      
      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        {filteredMissions.map((mission, index) => (
          <div 
            key={`${mission.name}-${index}`} 
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-content">
              <div className="timeline-year">{mission.year}</div>
              <h3 className="timeline-title">{mission.name}</h3>
              <div className="timeline-target">Target: {mission.target}</div>
              <p className="timeline-description">{mission.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionTimeline;
