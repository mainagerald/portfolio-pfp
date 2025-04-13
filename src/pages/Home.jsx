import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../components/Layout/responsive.css';
import { GiSkills } from 'react-icons/gi';
import { SiTechcrunch, SiGithub } from 'react-icons/si';
import { MdEditNote, MdHandyman, MdRocketLaunch } from 'react-icons/md';
import { FaUserGraduate } from 'react-icons/fa';

import aws from '../assets/aws.svg';
import django from '../assets/django.svg';
import docker from '../assets/docker.svg';
import git from '../assets/git.svg';
import go from '../assets/go.svg';
import grafana from '../assets/grafana.svg';
import java from '../assets/java.svg';
import javascript from '../assets/javascript.svg';
import mssql from '../assets/mssql.svg';
import mysql from '../assets/mysql.svg';
import prometheus from '../assets/prometheus.svg';
import python from '../assets/python.svg';
import reactjs from '../assets/reactjs.svg';
import spring from '../assets/spring.svg';
import typescript from '../assets/typescript.svg';

import { HiPaintBrush } from 'react-icons/hi2';
import { BsUmbrella } from 'react-icons/bs';
import ProjectPanels from '../components/ProjectPanels/ProjectPanels';
import ServiceCards from '../components/ServiceCards/ServiceCards';
import TechStackSection from '../components/TechStackSection ';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const contentRefs = useRef([]);

  const services = [
    {
      title: 'Design',
      description: 'Architect comprehensive system schemas and API interfaces, optimizing application performance and creating intuitive frontend designs.',
      icon: <HiPaintBrush size={36} className='text-accent-primary' />
    },
    {
      title: 'Build',
      description: 'Develop robust applications with a strategic focus on performance optimization, advanced security protocols, and enterprise-grade fault tolerance.',
      icon: <MdHandyman size={36} className='text-accent-primary' />
    },
    {
      title: 'Document',
      description: 'Maintain comprehensive technical documentation spanning the entire application lifecycle, ensuring clear, maintainable resources.',
      icon: <MdEditNote size={36} className='text-accent-primary' />
    },
    {
      title: 'Own',
      description: 'Engage comprehensively in the Software Development Life Cycle, implementing best practices and ensuring end-to-end project excellence.',
      icon: <BsUmbrella size={36} className='text-accent-primary' />
    }
  ];

  const techStack = [
    java, python, reactjs, spring, typescript, aws, django, docker, git, go, grafana, javascript,
    mssql, mysql, prometheus
  ];

  // Impact Stats
  const impactStats = [
    { number: <GiSkills />, label: '4+ Years', sublabel: 'Experience' },
    { number: <SiTechcrunch />, label: '20+ Tools', sublabel: 'Stack Proficiency' },
    { number: <MdRocketLaunch />, label: '20+ Projects', sublabel: 'Launched & Deployed' },
    { number: <SiGithub />, label: '1000+ Commits', sublabel: 'Activity' },
    { number: <FaUserGraduate />, label: 'Lifelong', sublabel: 'Learning Mindset' },
  ];



  // About Section Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(aboutRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
          id: 'about-section-trigger',  // Add ID to avoid conflicts
          markers: false,                // For debugging if needed
        },
      });

      contentRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            id: `about-content-${index}`,  // Add unique ID for each content element
          },
        });
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);


  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero min-h-screen flex items-center bg-black text-white responsive-hero">
        <div className="container mx-auto px-4 max-w-6xl pt-24 md:pt-28">
          <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-black tracking-tight lowercase">
            scalable systems <br />
            & optimized experience <br />
            engineer
          </h1>
          <div className="stats-grid mt-8 sm:mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="stat-label text-sm uppercase opacity-70">{stat.label}</div>
                <div className="stat-number text-4xl font-bold">{stat.number}</div>
                <div className="stat-sublabel text-xs uppercase">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="section min-h-[80vh] md:h-[100vh] py-16 sm:py-20 md:py-32 bg-black text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div ref={(el) => (contentRefs.current[0] = el)}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 lowercase tracking-tight">
                engineering impact
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                I’m a Software Engineer at Equity Group Holdings, building innovative payment systems. Driven by curiosity, I craft scalable, secure, and user-focused solutions that deliver results.
              </p>
            </div>
            <div ref={(el) => (contentRefs.current[1] = el)}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 lowercase tracking-tight">
                beyond the codeverse
              </h2>
              <p className="text-gray-300 text-lg">
                From board games to hyperrealist sketches, I draw inspiration from diverse passions. These shape my approach to problem-solving and design, helping startups and tech companies build standout systems.
              </p>
            </div>
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12 text-center">
            <Link
              to="/about"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300 lowercase"
            >
              discover more about me
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-transparent" />
        </div>
      </section>
<section><div className='text-center text-amber-500 text-4xl sm:text-5xl md:text-7xl font-bold mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-6 md:mb-8'>Selected Works</div></section>
      <ProjectPanels/> 
      {/* <ServiceCards/> */}
      {/* Services Section */}
      <section className="p-0 mt-6 sm:mt-8 md:mt-10 bg-white responsive-services-section">
        <div className="bg-white">
          <h2 className="text-4xl sm:text-5xl md:text-7xl text-black font-bold">Services</h2>

          <div className="services-grid mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <div className="mb-4 text-green-500">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStackSection techStack={techStack}/>
      {/* <section className="section">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">My Tech Stack</h2>
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <img
                key={index}
                src={tech}
                alt="Technology icon"
                className="tech-icon skill-icon"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="section" style={{ background: 'var(--color-accent-gradient)' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">Get in Touch</h2>
            <p className="text-xl mb-12 text-white">
              Interested in working together? I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <a
              // href="mailto:mainagerald910@gmail.com"
              href='/contact'
              className="btn btn-primary"
              style={{ background: '#000', border: '1px solid #000' }}
            >
Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
