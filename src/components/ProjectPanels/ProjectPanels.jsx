import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './ProjectPanels.css';
import '../Layout/responsive.css'

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Volt Inc',
    description: 'Building for sustainable movement in East Africa.',
    stack: 'Django, React, PostgreSQL, Docker, Flutter',
    image: 'https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=600',
    industry: 'Logistics',
  },
  {
    name: 'Masqani',
    description: 'Integrated property and payments management with Daraja API.',
    stack: 'Spring Boot, React, MySQL, Daraja API, Flutter',
    image: 'https://images.pexels.com/photos/333837/pexels-photo-333837.jpeg?auto=compress&cs=tinysrgb&w=600',
    industry: 'Real Estate / FinTech',
  },
  {
    name: 'Tradez',
    description: 'Stocks news and performance tracking with real-time insights.',
    stack: 'Django, React, Finnhub API, Celery, Redis',
    image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600',
    industry: 'Finance',
  },
];

const ProjectPanels = () => {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);
  const imagesRef = useRef([]);
  const contentsRef = useRef([]);

  useEffect(() => {
    const panels = panelsRef.current;
    const images = imagesRef.current;
    const contents = contentsRef.current;

    // Set up initial states
    gsap.set(panels, { opacity: 0.7 });
    gsap.set(images, { scale: 0.2, opacity: 0.5 });
    gsap.set(contents, { x: -50, opacity: 0 });

    panels.forEach((panel, index) => {
      const image = images[index];
      const content = contents[index];

      // Create ScrollTrigger for each panel
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        animation: gsap
          .timeline()
          .to(panel, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          })
          .to(
            image,
            {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
            },
            '-=0.4'
          )
          .to(
            content,
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.3'
          ),
      });
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="project-panels responsive-project-panels" ref={sectionRef}>
      {projects.map((project, index) => (
        <div
          className="panel"
          key={index}
          ref={(el) => (panelsRef.current[index] = el)}
        >
          <div
            className="panel-content"
            ref={(el) => (contentsRef.current[index] = el)}
          >
            <h2>{project.name}</h2>
            <p className="description">{project.description}</p>
            <p className="stack"><strong>Stack:</strong> {project.stack}</p>
            <p className="industry"><strong>Industry:</strong> {project.industry}</p>
          </div>
          <div className="panel-image-container">
            <img
              className="panel-image"
              src={project.image}
              alt={project.name}
              ref={(el) => (imagesRef.current[index] = el)}
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectPanels;