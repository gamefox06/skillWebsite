import { useEffect, useRef } from 'react';
import './ScrollableContent.css';

interface ScrollableContentProps {
  isDarkMode: boolean;
}

const ScrollableContent = ({ isDarkMode }: ScrollableContentProps) => {
  // Apply theme-specific styling based on isDarkMode
  useEffect(() => {
    const contentElement = document.querySelector('.scrollable-content');
    if (contentElement) {
      contentElement.classList.toggle('dark-theme', isDarkMode);
      contentElement.classList.toggle('light-theme', !isDarkMode);
    }
  }, [isDarkMode]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="scrollable-content">
      <section 
        ref={el => sectionRefs.current[0] = el} 
        className="content-section intro-section"
      >
        <h2>Our Solar System</h2>
        <p>
          Our solar system consists of the Sun, eight planets, five officially recognized dwarf planets, 
          hundreds of moons, and thousands of asteroids, comets, and other celestial objects. Located in 
          the Milky Way galaxy, our solar system orbits the galactic center at approximately 515,000 mph (828,000 kph).
        </p>
        <p>
          The Sun, a yellow dwarf star, sits at the center of our solar system and accounts for 99.86% of 
          the system's mass. Through nuclear fusion in its core, the Sun generates the energy that sustains 
          life on Earth and influences all objects in the solar system.
        </p>
      </section>

      <section 
        ref={el => sectionRefs.current[1] = el} 
        className="content-section planet-types-section"
      >
        <h2>Types of Planets</h2>
        <div className="planet-types">
          <div className="planet-type">
            <h3>Terrestrial Planets</h3>
            <p>
              Mercury, Venus, Earth, and Mars are terrestrial planets. They are primarily composed of 
              rock and metal with solid surfaces. These planets are relatively small and dense, located 
              closest to the Sun.
            </p>
          </div>
          <div className="planet-type">
            <h3>Gas Giants</h3>
            <p>
              Jupiter and Saturn are gas giants, composed mainly of hydrogen and helium. They are massive 
              planets with thick atmospheres, no solid surfaces, and numerous moons. Both planets have 
              distinctive ring systems, with Saturn's being the most prominent.
            </p>
          </div>
          <div className="planet-type">
            <h3>Ice Giants</h3>
            <p>
              Uranus and Neptune are ice giants, containing more "ices" such as water, ammonia, and methane 
              in addition to hydrogen and helium. They have thick atmospheres and are characterized by their 
              blue coloration due to methane in their atmospheres.
            </p>
          </div>
        </div>
      </section>

      <section 
        ref={el => sectionRefs.current[2] = el} 
        className="content-section formation-section"
      >
        <h2>Formation of the Solar System</h2>
        <p>
          Our solar system formed about 4.6 billion years ago from a dense cloud of interstellar gas and dust. 
          This cloud, called a solar nebula, collapsed due to its own gravity and began to spin.
        </p>
        <p>
          As the nebula collapsed, it flattened into a spinning disk with our Sun forming at the center. The 
          remaining material in the disk began to clump together. Small particles drew together, forming larger 
          and larger bodies. Some of these bodies became big enough for their gravity to shape them into spheres, 
          becoming planets, dwarf planets, and large moons. The rest of the objects became asteroids, comets, and 
          small moons.
        </p>
      </section>

      <section 
        ref={el => sectionRefs.current[3] = el} 
        className="content-section exploration-section"
      >
        <h2>Space Exploration</h2>
        <p>
          Humans have been exploring the solar system for decades through telescopes, robotic spacecraft, 
          and human missions. Notable missions include:
        </p>
        <ul className="mission-list">
          <li>
            <strong>Voyager 1 & 2 (1977)</strong>: These twin spacecraft have explored all the giant planets of our 
            outer solar system and are now heading toward interstellar space.
          </li>
          <li>
            <strong>Hubble Space Telescope (1990)</strong>: This space-based observatory has revolutionized 
            astronomy by providing deep and clear views of the universe.
          </li>
          <li>
            <strong>Mars Rovers</strong>: Various rovers including Sojourner, Spirit, Opportunity, Curiosity, 
            and Perseverance have explored the Martian surface.
          </li>
          <li>
            <strong>New Horizons (2006)</strong>: This mission provided the first close-up images of Pluto 
            and is now exploring the Kuiper Belt.
          </li>
          <li>
            <strong>James Webb Space Telescope (2021)</strong>: The successor to Hubble, designed to observe 
            the most distant objects in the universe.
          </li>
        </ul>
      </section>

      <section 
        ref={el => sectionRefs.current[4] = el} 
        className="content-section future-section"
      >
        <h2>The Future of Solar System Exploration</h2>
        <p>
          Future missions aim to further our understanding of the solar system and search for signs of life. 
          These include missions to Jupiter's moon Europa, which may harbor an ocean beneath its icy crust, 
          and more advanced Mars missions that could eventually lead to human exploration of the Red Planet.
        </p>
        <p>
          Scientists are also studying near-Earth objects to better understand potential impact threats and 
          developing technologies for asteroid mining and deflection. As our technology advances, so does our 
          ability to explore and understand the vast cosmic neighborhood we call home.
        </p>
      </section>
    </div>
  );
};

export default ScrollableContent;
