import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { HiPaintBrush } from 'react-icons/hi2';
import { MdHandyman, MdEditNote } from 'react-icons/md';
import { BsUmbrella } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import '../Layout/responsive.css'
import './ServiceCards.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Design',
    description:
      'Architect comprehensive system schemas and API interfaces, optimizing application performance and creating intuitive frontend designs.',
    icon: <HiPaintBrush size={36} className="text-accent-primary" />,
  },
  {
    title: 'Build',
    description:
      'Develop robust applications with a strategic focus on performance optimization, advanced security protocols, and enterprise-grade fault tolerance.',
    icon: <MdHandyman size={36} className="text-accent-primary" />,
  },
  {
    title: 'Document',
    description:
      'Maintain comprehensive technical documentation spanning the entire application lifecycle, ensuring clear, maintainable resources.',
    icon: <MdEditNote size={36} className="text-accent-primary" />,
  },
  {
    title: 'Own',
    description:
      'Engage comprehensively in the Software Development Life Cycle, implementing best practices and ensuring end-to-end project excellence.',
    icon: <BsUmbrella size={36} className="text-accent-primary" />,
  },
];

const ServiceCards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current;
    const background = bgRef.current;

    // Background gradient animation
    gsap.to(background, {
      backgroundPosition: '100% 0%',
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Card animations
    cards.forEach((card, index) => {
      const icon = card.querySelector('.service-icon');
      const content = card.querySelector('.service-content');

      gsap.set(card, { y: 100, opacity: 0, rotateY: 15 });
      gsap.set(icon, { scale: 0.8 });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        end: 'bottom 20%',
        scrub: 0.5,
        animation: gsap
          .timeline()
          .to(card, {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.6,
            ease: 'power3.out',
          })
          .to(
            icon,
            {
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            },
            '-=0.4'
          )
          .to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.3'
          ),
      });

      // Initial content setup
      gsap.set(content, { opacity: 0, y: 20 });
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="service-cards responsive-service-cards" ref={sectionRef}>
      <div className="service-bg" ref={bgRef}></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12 service-title">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 service-grid">
          {services.map((service, index) => (
            <div
              className="service-card"
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <Link
                  to="/services"
                  className="text-accent-primary hover:underline font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;