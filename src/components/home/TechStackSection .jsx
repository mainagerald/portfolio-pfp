import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../layout/responsive.css';

const TechStackSection = ({ techStack }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const icons = container.querySelectorAll('.tech-icon');
    if (icons.length === 0) return;

    // Calculate total width of icons including gaps for a more accurate animation
    const gap = parseFloat(getComputedStyle(container).gap) || 40; // Get gap from CSS, fallback to 40px (gap-10)
    const totalWidth = Array.from(icons).reduce((sum, icon) => sum + icon.offsetWidth + gap, 0);

    // Duplicate icons for seamless loop
    const originalHTML = container.innerHTML;
    container.innerHTML += container.innerHTML;

    // GSAP animation for a smooth, constant scroll speed
    const speed = 80; // pixels per second, adjust for desired speed
    const duration = totalWidth / speed;

    const tween = gsap.to(container, {
      x: -totalWidth,
      duration: duration,
      ease: 'none',
      repeat: -1, // Infinite loop
    });

    // Cleanup function to prevent memory leaks
    return () => {
      tween.kill();
      if (container) {
        container.innerHTML = originalHTML;
      }
    };
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