import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Layout/responsive.css';

const TechStackSection = ({ techStack }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    const icons = container.querySelectorAll('.tech-icon');

    // Calculate total width of icons
    const totalWidth = Array.from(icons).reduce((sum, icon) => sum + icon.offsetWidth, 0);

    // Duplicate icons for seamless loop
    container.innerHTML += container.innerHTML;

    // GSAP animation
    gsap.to(container, {
      x: -totalWidth,
      duration: 100, // Adjust for speed
      ease: 'none',
      repeat: -1, // Infinite loop
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // Seamless loop
      },
    });
  }, [techStack]);

  return (
    <section className="py-24 bg-black tech-stack-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-white mb-16 text-center tech-stack-title">My Stack</h2>
        <div className="overflow-hidden">
          <div className="flex flex-nowrap gap-10" ref={scrollRef}>
            {techStack.map((tech, index) => (
              <img
                key={index}
                src={tech}
                alt="Technology icon"
                className="tech-icon w-35 h-35 flex-shrink-0"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;