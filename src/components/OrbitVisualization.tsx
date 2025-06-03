import { useEffect, useRef } from 'react';
import './OrbitVisualization.css';

interface Planet {
  name: string;
  distance_from_sun: number;
  orbital_period?: number;
  color: string;
}

interface OrbitVisualizationProps {
  planets: Record<string, Planet>;
}

const OrbitVisualization = ({ planets }: OrbitVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  
  // Convert planets object to array and sort by distance from sun
  const planetArray = Object.values(planets)
    .filter(planet => planet.name.toLowerCase() !== 'sun' && planet.orbital_period)
    .sort((a, b) => a.distance_from_sun - b.distance_from_sun);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Center point
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Scale factor for orbit sizes (logarithmic scale for better visualization)
    const maxOrbitRadius = Math.min(canvas.width, canvas.height) * 0.45;
    const minDistance = Math.min(...planetArray.map(p => p.distance_from_sun));
    const maxDistance = Math.max(...planetArray.map(p => p.distance_from_sun));
    
    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw sun
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#FDB813';
      ctx.fill();
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#FDB813';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw orbits and planets
      planetArray.forEach((planet, index) => {
        // Calculate orbit radius using logarithmic scale
        const orbitRadius = 30 + (maxOrbitRadius - 30) * 
          (Math.log(planet.distance_from_sun) - Math.log(minDistance)) / 
          (Math.log(maxDistance) - Math.log(minDistance));
        
        // Draw orbit path
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
        
        // Calculate planet position based on orbital period
        // Faster planets (smaller orbital_period) move faster
        const orbitalPeriod = planet.orbital_period || 365; // Default to 365 days if undefined
        const speed = 0.001 / (orbitalPeriod / 365); // Adjust for reasonable animation speed
        const angle = timeRef.current * speed;
        const x = centerX + orbitRadius * Math.cos(angle);
        const y = centerY + orbitRadius * Math.sin(angle);
        
        // Draw planet
        const planetSize = Math.max(3, 8 - index * 0.5); // Size decreases with distance
        ctx.beginPath();
        ctx.arc(x, y, planetSize, 0, Math.PI * 2);
        ctx.fillStyle = planet.color || '#ffffff';
        ctx.fill();
        
        // Draw planet label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, x, y - planetSize - 5);
      });
      
      // Update time
      timeRef.current += 16; // Approximately 60fps
      
      // Request next frame
      animationRef.current = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [planetArray]);
  
  return (
    <div className="orbit-visualization">
      <h2>Planetary Orbits</h2>
      <p className="orbit-note">Watch as planets orbit the Sun at different speeds based on their actual orbital periods.</p>
      <canvas ref={canvasRef} className="orbit-canvas"></canvas>
      <p className="orbit-disclaimer">Note: Orbits are not to scale. Actual distances between planets are much greater relative to their sizes.</p>
    </div>
  );
};

export default OrbitVisualization;
