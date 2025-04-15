import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../components/Layout/responsive.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Refs for animations
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const categoriesRef = useRef(null);
  const sectionsRef = useRef([]);

  // Define categories and their details
  const categories = [
    {
      title: "Engineer",
      intro: "sustainable engineering",
      description: "I like to build resilient and lasting solutions. I align with sustainable practices to build robust systems that are resource aware, user focused, and meet business needs altogether.",
      skills: [
        "java", "spring boot", "python", "django", "javascript", 
        "react", "docker", "kubernetes", "aws", "azure devops", 
        "elk stack", "kafka"
      ],
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Gamer",
      intro: "kicks and giggles",
      description: "Win. Lose. Improvise. Adapt. Iterate. Win. This hones problem-solving skills that I apply to daily technical and non-technical challenges.",
      favorites: ["ea fc", "mk","board games", "outfield ball", ],
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Film Enthusiast",
      intro: "adapting to genres",
      description: "I'm rarely guided by genre - a recipe for missing out. I like to indulge in narratives, cinematography, and visual storytelling techniques that inspire my approach to user experience in general.",
      favorites: ["Inglorious Bastards", "MidSommar", "Etc"],
      color: "from-green-400 to-green-600"
    },
    {
      title: "Artist",
      intro: "sketch warrior, apprentice hyperrealist",
      description: "charcoal and pencil sketches capture depth, light, and shadow. This artistic practice hones my attention to detail and influences my approach to clarity and elegance.",
      color: "from-amber-400 to-amber-600"
    },
    {
      title: "Fitness wannabe",
      intro: "High frequency, low volume",
      description: "It's a lifestyle, not a means to an end. incorporate cardio. aesthetics and functionality is key.",
      color: "from-red-400 to-red-600"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.from(headerRef.current, {
        y: 100,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
      });

      gsap.from(categoriesRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.5,
        ease: "back.out(1.2)"
      });

      // Create grid lines
      const gridContainer = document.createElement('div');
      gridContainer.className = 'absolute inset-0 z-0 overflow-hidden pointer-events-none';
      containerRef.current.appendChild(gridContainer);

      const gridSize = 110; // Increased grid cell size in pixels
      const width = window.innerWidth;
      const height = window.innerHeight * 3; // Make it taller for scrolling

      // Create vertical lines with glow animation
      for (let x = 0; x < width; x += gridSize) {
        const line = document.createElement('div');
        line.className = 'absolute top-0 bottom-0 w-px bg-gray-600/30';
        line.style.left = `${x}px`;
        
        // Add glow animation to vertical lines
        if (x % (gridSize * 3) === 0) { // Add glow to every third line for subtle effect
          line.classList.add('vertical-line-glow');
          const glowIntensity = Math.random() * 0.5 + 0.2; // Random intensity between 0.2 and 0.7
          const glowDuration = Math.random() * 4 + 3; // Random duration between 3 and 7 seconds
          
          // Create keyframe animation
          gsap.to(line, {
            boxShadow: `0 0 8px 1px rgba(100, 100, 255, ${glowIntensity})`,
            repeat: -1,
            yoyo: true,
            duration: glowDuration,
            ease: "sine.inOut",
            delay: Math.random() * 2 // Random delay for varied effect
          });
        }
        
        gridContainer.appendChild(line);
      }

      // Animate grid lines
      gsap.from(gridContainer.children, {
        opacity: 0,
        duration: 2,
        stagger: 0.005,
        ease: "power1.inOut"
      });

      // Fixed header effect that stays in background
      gsap.to(headerRef.current, {
        opacity: 0.05,
        scale: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      
      headerRef.current.style.position = 'fixed';
      headerRef.current.style.left = '0';
      headerRef.current.style.right = '0';
      headerRef.current.style.margin = '0 auto'; // Centers the element
      headerRef.current.style.top = '20%';
      headerRef.current.style.width = '100%'; // Or set a specific width if needed
      headerRef.current.style.textAlign = 'center'; // Centers text inside the header
      headerRef.current.style.zIndex = '1';
      headerRef.current.style.padding = '0 1rem'; // Add padding for small screens

      categoriesRef.current.style.position = 'fixed';
      categoriesRef.current.style.top = '70%';
      categoriesRef.current.style.width = '100%';
      categoriesRef.current.style.textAlign = 'center';
      categoriesRef.current.style.zIndex = '2'; 

      // Categories fade and move as user scrolls
      gsap.to(categoriesRef.current, {
        yPercent: -30,
        opacity: 0.35,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        }
      });
      
      // Ensure content sections appear above the fixed header
      const contentSections = document.querySelector('.relative.z-20');
      if (contentSections) {
        contentSections.style.position = 'relative';
        contentSections.style.zIndex = '5'; // Higher z-index to appear above header
      }

      // Animate each section
      sectionsRef.current.forEach((section, index) => {
        // Only proceed if section exists
        if (!section) return;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
        
        tl.from(section, {
          y: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out"
        });
        
        // Get all elements inside the section
        const elements = section.querySelectorAll('.animate-item');
        
        tl.from(elements, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)"
        }, "-=0.4");
      });
    }, containerRef);

    // Clean up animations when component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden lowercase">
      {/* Hero section with big bold text */}
      <div className="h-screen flex flex-col justify-center items-center relative z-10 px-4">
        <h1 
          ref={headerRef}
          className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-12 pointer-events-none"
          
        >
          about maina gerald
        </h1>
        
        <div 
          ref={categoriesRef}
          className="flex flex-wrap justify-between w-full max-w-5xl"
        >
          {categories.map((category, index) => (
            <div key={index} className="px-4 py-2 text-center">
              <h2 className="text-xl uppercase md:text-2xl font-bold opacity-90">{category.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Content sections that appear above the header as user scrolls */}
      <div className="relative z-50 bg-transparent">
        {categories.map((category, index) => (
          <section
            key={index}
            ref={el => (sectionsRef.current[index] = el)}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-4xl w-full backdrop-blur-2xl bg-black/10 border border-gray-800 rounded-2xl p-8 md:p-12">
              <div className="mb-8 animate-item">
                <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${category.color} mb-4`}>
                  <h2 className="text-lg font-semibold">{category.title}</h2>
                </div>
                <h3 className="text-3xl md:text-3xl font-bold">{category.intro}</h3>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 animate-item">
                {category.description}
              </p>
              
              {/* Conditionally render skills or favorites */}
              {category.skills && (
                <div className="animate-item">
                  <h4 className="text-xl font-semibold mb-4">Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {category.favorites && (
                <div className="animate-item">
                  <h4 className="text-xl font-semibold mb-4">Favorites</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.favorites.map((item, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Visual decorations */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-900/30 to-transparent" />
      </div>
    </div>
  );
};

export default About;