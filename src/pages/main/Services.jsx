import React, { useEffect, useRef } from 'react';
import { FaDocker, FaAws, FaReact } from 'react-icons/fa';
import { SiSpring, SiDjango } from 'react-icons/si';
import { SiJenkins } from '@icons-pack/react-simple-icons';
import { BsCloudCheck } from 'react-icons/bs';
import { GiServerRack } from 'react-icons/gi';
import { HiCode, HiLightningBolt } from 'react-icons/hi';
import { MdAutoFixHigh, MdSecurity, MdIntegrationInstructions } from 'react-icons/md';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../components/layout/responsive.css';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRefs = useRef([]);
  const cardRefs = useRef([]);
  const principleCardRefs = useRef([]);
  const particleRefs = useRef([]);
  const aboutMeRef = useRef(null);

  const softwareEngineeringPrinciples = {
    readability: "Code so clear, it practically sings! Meaningful names and tidy formatting make it a breeze to read.",
    maintainability: "Built to last! Modular designs and clean interfaces keep updates smooth and stress-free.",
    performance: "Fast and furious! Optimized algorithms ensure your app runs like a dream.",
    testability: "Ready for the spotlight! Easy-to-test code with unit and integration tests for rock-solid reliability.",
    security: "Locked down tight! Secure practices and vigilant updates keep your data safe.",
    userExperience: "Users first! Intuitive designs and seamless flows make every interaction a joy."
  };

  // GSAP Animations with optimized performance
  useEffect(() => {
    const animations = [];
    const triggers = [];
    const eventListeners = [];
    
    // Preload all animations at once to avoid jank
    gsap.set([...sectionRefs.current, ...cardRefs.current, ...principleCardRefs.current].filter(el => el), { autoAlpha: 0 });
    
    // Use a single master timeline for better performance
    // const masterTimeline = gsap.timeline();
    
    // Batch animations by section type for better performance
    // 1. Main sections animation (batched)
    const validSections = sectionRefs.current.filter(section => section);
    if (validSections.length > 0) {
      const sectionsTl = gsap.timeline({
        scrollTrigger: {
          trigger: validSections[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
      
      sectionsTl.fromTo(
        validSections, 
        { autoAlpha: 0, y: 30 },
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.3, 
          stagger: 0.15, 
          ease: 'power2.out',
          clearProps: 'all' // Clean up to improve performance
        }
      );
      
      animations.push(sectionsTl);
      triggers.push(ScrollTrigger.getAll().pop());
    }
    
    // 2. Service cards animation (batched)
    const validCards = cardRefs.current.filter(card => card);
    if (validCards.length > 0) {
      // Group cards by their parent to create fewer timelines
      const cardsByParent = {};
      validCards.forEach(card => {
        const parentKey = card.parentElement?.id || 'default';
        if (!cardsByParent[parentKey]) cardsByParent[parentKey] = [];
        cardsByParent[parentKey].push(card);
      });
      
      // Create one timeline per parent group
      Object.values(cardsByParent).forEach(cardGroup => {
        if (cardGroup.length === 0) return;
        
        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardGroup[0].parentElement,
            start: 'top 85%'
          }
        });
        
        cardsTl.fromTo(
          cardGroup,
          { autoAlpha: 0, y: 15 },
          { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.25, 
            stagger: 0.05, 
            ease: 'power1.out',
            clearProps: 'transform' // Clean up to improve performance
          }
        );
        
        animations.push(cardsTl);
        triggers.push(ScrollTrigger.getAll().pop());
      });
    }
    
    // 3. Principle cards animation (batched)
    const validPrincipleCards = principleCardRefs.current.filter(card => card);
    if (validPrincipleCards.length > 0) {
      const principleCardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: validPrincipleCards[0].parentElement,
          start: 'top 85%'
        }
      });
      
      principleCardsTl.fromTo(
        validPrincipleCards,
        { 
          autoAlpha: 0, 
          y: 15,
          scale: 0.95
        },
        { 
          autoAlpha: 1, 
          y: 0,
          scale: 1,
          duration: 0.2, 
          stagger: 0.04, // Faster stagger
          ease: 'power1.out'
        }
      );
      
      animations.push(principleCardsTl);
      triggers.push(ScrollTrigger.getAll().pop());
    }
    
    // Add lightweight hover effects
    principleCardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Simplified hover animation handlers
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.03, // Smaller scale change
          rotation: (index % 2 === 0 ? 1 : -1), // Smaller rotation
          duration: 0.2, // Faster animation
          ease: 'power1.out',
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          rotation: 0,
          duration: 0.2, // Faster animation
          ease: 'power1.out',
        });
      };
      
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      eventListeners.push({ element: card, type: 'mouseenter', handler: handleMouseEnter });
      eventListeners.push({ element: card, type: 'mouseleave', handler: handleMouseLeave });
    });

    // About Me animation (simplified)
    if (aboutMeRef.current) {
      const aboutMeTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutMeRef.current,
          start: 'top 90%',
        }
      });
      
      aboutMeTl.fromTo(
        aboutMeRef.current, 
        { autoAlpha: 0, y: 30 }, // Simplified initial state
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.4, // Much faster
          ease: 'power2.out' // Simpler easing
        }
      );
      
      animations.push(aboutMeTl);
      triggers.push(ScrollTrigger.getAll().pop());
    }

    // Cleanup function
    return () => {
      animations.forEach(animation => animation.kill());
      triggers.forEach(trigger => trigger.kill());
      particleRefs.current.forEach(anim => anim && anim.kill());
      eventListeners.forEach(({ element, type, handler }) => {
        if (element) {
          element.removeEventListener(type, handler);
        }
      });
      ScrollTrigger.getAll().forEach(st => st.kill(true));
      gsap.globalTimeline.clear();
    };
  }, []);

  const serviceCategories = [
    {
      id: '01',
      title: 'DevOps',
      description: 'Automating pipelines, scaling containers, and optimizing cloud infrastructure.',
      services: [
        {
          title: 'Container Orchestration',
          description: 'Scalable Docker and Kubernetes setups for resilient apps.',
          icon: <FaDocker size={28} className="text-purple-400 group-hover:text-purple-300 transition-colors" />,
        },
        {
          title: 'Cloud Infrastructure',
          description: 'Cost-efficient AWS solutions built for performance.',
          icon: <FaAws size={28} className="text-amber-400 group-hover:text-amber-300 transition-colors" />,
        },
        {
          title: 'CI/CD Pipelines',
          description: 'Automated workflows with Azure Repos and CI/CD tools.',
          icon: <SiJenkins size={28} className="text-teal-500 group-hover:text-teal-400 transition-colors" />,
        },
        {
          title: 'Infrastructure as Code',
          description: 'Declarative automation for consistent infrastructure.',
          icon: <HiCode size={28} className="text-green-400 group-hover:text-green-300 transition-colors" />,
        },
      ],
    },
    {
      id: '02',
      title: 'Code',
      description: 'Crafting scalable apps with modern frameworks.',
      services: [
        {
          title: 'Java Spring Development',
          description: 'Microservices and enterprise apps with Spring Boot.',
          icon: <SiSpring size={28} className="text-emerald-500 group-hover:text-emerald-400 transition-colors" />,
        },
        {
          title: 'Python Django Solutions',
          description: 'Secure, rapid web apps and APIs with Django.',
          icon: <SiDjango size={28} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />,
        },
        {
          title: 'React Frontend',
          description: 'Responsive, modern UI with React ecosystems.',
          icon: <FaReact size={28} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
        },
        {
          title: 'Payment Integrations',
          description: 'Secure payment processing solutions.',
          icon: <MdIntegrationInstructions size={28} className="text-rose-400 group-hover:text-rose-300 transition-colors" />,
        },
      ],
    },
    {
      id: '03',
      title: 'Architecture',
      description: 'Designing scalable, resilient systems for growth.',
      services: [
        {
          title: 'Microservices Design',
          description: 'Loosely coupled, deployable service architectures.',
          icon: <GiServerRack size={28} className="text-red-400 group-hover:text-red-300 transition-colors" />,
        },
        {
          title: 'Self-Healing Systems',
          description: 'Automated recovery for resilient designs.',
          icon: <MdAutoFixHigh size={28} className="text-amber-400 group-hover:text-amber-300 transition-colors" />,
        },
        {
          title: 'Performance Optimization',
          description: 'Boosting throughput and system efficiency.',
          icon: <HiLightningBolt size={28} className="text-yellow-400 group-hover:text-yellow-300 transition-colors" />,
        },
        {
          title: 'Security Architecture',
          description: 'Robust security across the app lifecycle.',
          icon: <MdSecurity size={28} className="text-violet-400 group-hover:text-violet-300 transition-colors" />,
        },
      ],
    },
  ];

  const principles = [
    {
      title: 'You Build It, You Run It',
      description: 'Owning the full software lifecycle from code to production.',
      icon: <BsCloudCheck size={40} className="text-purple-400 group-hover:text-purple-300 transition-colors" />,
    },
    {
      title: 'Infrastructure as Code',
      description: 'Automating infrastructure for reliability and scale.',
      icon: <HiCode size={40} className="text-teal-400 group-hover:text-teal-300 transition-colors" />,
    },
    {
      title: 'Continuous Improvement',
      description: 'Refining systems for performance and security.',
      icon: <MdAutoFixHigh size={40} className="text-amber-400 group-hover:text-amber-300 transition-colors" />,
    },
  ];

  const createParticleAnimation = (el) => {
    if (!el) return null;
    
    const initialX = Math.random() * 100;
    const initialY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    gsap.set(el, { left: `${initialX}%`, top: `${initialY}%`, opacity: 0.2 });
    
    return gsap.to(el, {
      x: `random(-50, 50)`,
      y: `random(-50, 50)`,
      opacity: `random(0.1, 0.4)`,
      duration: duration,
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white font-sans">
      {/* Hero Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,144,255,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-300">
            Services & Expertise
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 leading-relaxed">
            Solving complex challenges with elegant, scalable solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {principles.map((principle, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="group relative bg-purple-500/10 backdrop-blur-sm p-8 rounded-xl border-none transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                {/* <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-400 rounded-full animate-pulse"></div> */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{principle.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{principle.title}</h3>
                <p className="text-gray-300 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, index) => (
        <section
          key={category.id}
          ref={(el) => (sectionRefs.current[index + 1] = el)}
          className={`py-24 px-6 md:px-12 lg:px-24 relative ${index % 2 === 1 ? 'bg-gray-900/50' : 'bg-gray-950/50'}`}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-baseline mb-12">
              <span className="text-gray-500 text-xl mr-4 font-mono">({category.id})</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-cyan-300">
                {category.title}
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mb-16 leading-relaxed">{category.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.services.map((service, serviceIndex) => (
                <div
                  key={serviceIndex}
                  ref={(el) => (cardRefs.current[principles.length + index * category.services.length + serviceIndex] = el)}
                  className="group relative bg-none backdrop-blur-sm p-6 rounded-xl  transition-all duration-300 hover:-translate-y-1"
                >
                  {/* <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div> */}
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* About Me Summary */}
      <section
        ref={(el) => (sectionRefs.current[serviceCategories.length + 1] = el)}
        className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,144,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const size = Math.random() * 8 + 2;
            return (
              <div 
                key={i}
                className="absolute rounded-full bg-purple-500/20"
                style={{ width: size, height: size }}
                ref={(el) => {
                  if (el) {
                    particleRefs.current[i] = createParticleAnimation(el);
                  }
                }}
              />
            );
          })}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-amber-300">
            My Approach
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
            My work is guided by core principles that ensure high-quality, maintainable, and user-focused software solutions.
          </p>
          
          {/* Mobile-friendly approach cards */}
          <div className="hidden md:block relative h-[80vh] mb-16">
            {/* Original desktop layout with absolute positioning - only shown on md screens and up */}
            {Object.entries(softwareEngineeringPrinciples).map(([key, value], index) => {
              const positions = [
                { top: '5%', left: '10%', width: '35%', rotation: -3 },
                { top: '15%', left: '55%', width: '40%', rotation: 2 },
                { top: '40%', left: '5%', width: '38%', rotation: 1 },
                { top: '35%', left: '60%', width: '35%', rotation: -2 },
                { top: '65%', left: '20%', width: '36%', rotation: 3 },
                { top: '60%', left: '65%', width: '30%', rotation: -1 },
              ];
              
              const pos = positions[index % positions.length];
              
              return (
                <div
                  key={`desktop-${key}`}
                  ref={(el) => (principleCardRefs.current[index] = el)}
                  className="group absolute bg-amber-500/10 backdrop-blur-sm p-6 rounded-xl border border-amber-400/30 hover:bg-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer z-10 hover:z-30"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    transform: `rotate(${pos.rotation}deg)`,
                  }}
                >
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-violet-400 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold mb-3 text-white capitalize">{key}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{value}</p>
                </div>
              );
            })}
          </div>
          
          {/* New mobile-friendly card layout - only shown on smaller screens */}
          <div className="md:hidden space-y-4 mb-16">
            {Object.entries(softwareEngineeringPrinciples).map(([key, value]) => (
              <div
                key={`mobile-${key}`}
                className="bg-gradient-to-r from-amber-500/10 to-violet-500/10 backdrop-blur-sm p-5 rounded-lg border border-amber-400/30 transition-all duration-300 shadow-lg shadow-amber-500/5"
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-violet-400 rounded-full mr-3 animate-pulse"></div>
                  <h3 className="text-lg font-bold text-white capitalize">{key}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>

          <div className="inline-block relative h-[20vh]">
                  <a href="/contact" className="px-6 py-3 bg-purple-500/20 rounded-full border border-purple-400/30 text-purple-300 hover:bg-purple-500/30 transition-all cursor-pointer">
                    Collaborate on Your Next Project
                  </a>
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></span>
                </div>
          
          {/* <div 
            ref={aboutMeRef}
            className="mt-16 text-center max-w-3xl mx-auto opacity-0"
          >
            <h3 className="text-2xl font-bold mb-6 text-purple-300">Professional Background</h3>
            <div className="prose prose-lg prose-invert space-y-6 mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed">
                I specialize in designing and implementing robust cloud infrastructure using tools such as Docker, Kubernetes, and AWS. My expertise ensures efficient, scalable systems with seamless CI/CD pipelines.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-purple-500/30 pl-6">
                Proficient in Java Spring, Python Django, and React, I develop secure and responsive applications that prioritize performance and user experience, tailored to meet diverse business requirements.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed bg-gradient-to-r from-gray-800/50 to-transparent px-6 py-4 rounded-lg">
                I adhere to the principle of end-to-end ownership, overseeing projects from development through to production. This approach guarantees reliable, high-quality solutions that align with strategic objectives.
              </p>
              
              <div className="flex justify-center pt-6">
                <div className="inline-block relative">
                  <span className="px-6 py-3 bg-purple-500/20 rounded-full border border-purple-400/30 text-purple-300 hover:bg-purple-500/30 transition-all cursor-pointer">
                    Collaborate on Your Next Project
                  </span>
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Services;