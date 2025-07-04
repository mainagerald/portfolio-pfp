import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../../components/layout/responsive.css";
import { GiSkills } from "react-icons/gi";
import { SiTechcrunch, SiGithub } from "react-icons/si";
import {
  MdRocketLaunch,
  MdSecurity,
  MdArchitecture,
} from "react-icons/md";
import {
  FaUserGraduate,
  FaCode,
  FaServer,
  FaDocker,
  FaUniversalAccess,
} from "react-icons/fa";
import { BiPlay, BiTestTube } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import { AiFillApi } from "react-icons/ai";

import aws from "../../assets/aws.svg";
import django from "../../assets/django.svg";
import docker from "../../assets/docker.svg";
import git from "../../assets/git.svg";
import go from "../../assets/go.svg";
import grafana from "../../assets/grafana.svg";
import java from "../../assets/java.svg";
import javascript from "../../assets/javascript.svg";
import mssql from "../../assets/mssql.svg";
import mysql from "../../assets/mysql.svg";
import prometheus from "../../assets/prometheus.svg";
import python from "../../assets/python.svg";
import reactjs from "../../assets/reactjs.svg";
import spring from "../../assets/spring.svg";
import typescript from "../../assets/typescript.svg";

import ProjectPanels from "../../components/projectPanels/ProjectPanels";
import TechStackSection from "../../components/home/TechStackSection ";
import ViewMore from "../../components/projectPanels/ViewMore";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const aboutRef = useRef(null);
  const contentRefs = useRef([]);
  const [loadedImages, setLoadedImages] = useState({});
  const imageRefs = useRef({});

  const skillsAndServices = [
    {
      title: "UI Design",
      description:
        "Creating responsive, intuitive, and accessible user interfaces with modern frameworks.",
      icon: <FaCode size={32} className="text-accent-primary" />,
      size: "medium",
      color: "bg-gradient-to-br from-blue-500/10 to-purple-500/10",
      image:
        "https://images.unsplash.com/photo-1699040309386-11c615ed64d5?w=800&auto=format&fit=crop",
    },
    {
      title: "API Development",
      description:
        "Building robust RESTful and GraphQL APIs with comprehensive documentation and security.",
      icon: <AiFillApi size={32} className="text-accent-primary" />,
      size: "large",
      color: "bg-gradient-to-br from-green-500/10 to-teal-500/10",
      image:
        "https://images.unsplash.com/photo-1658204191944-374e8115a2de?w=800&auto=format&fit=crop",
    },
    {
      title: "DevOps",
      description:
        "Implementing CI/CD pipelines, containerization, and infrastructure as code for seamless deployment.",
      icon: <FaDocker size={32} className="text-accent-primary" />,
      size: "medium",
      color: "bg-gradient-to-br from-blue-600/10 to-cyan-500/10",
      image:
        "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?w=800&auto=format&fit=crop",
    },
    {
      title: "Architecture",
      description:
        "Designing scalable, maintainable system architectures with a focus on performance and reliability.",
      icon: <MdArchitecture size={32} className="text-accent-primary" />,
      size: "large",
      color: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
      image:
        "https://images.pexels.com/photos/17485633/pexels-photo-17485633.png?w=800&h=800&auto=format&fit=crop",
    },
    {
      title: "Platform Engineering",
      description:
        "Building and maintaining robust platforms that enable developer productivity and system reliability.",
      icon: <FaServer size={32} className="text-accent-primary" />,
      size: "medium",
      color: "bg-gradient-to-br from-indigo-500/10 to-purple-600/10",
      image:
        "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&auto=format&fit=crop",
    },
    {
      title: "LLM Applications",
      description:
        "Developing AI-powered applications leveraging large language models for intelligent solutions.",
      icon: <BsRobot size={32} className="text-accent-primary" />,
      size: "medium",
      color: "bg-gradient-to-br from-pink-500/10 to-rose-500/10",
      image:
        "https://images.unsplash.com/photo-1645839057098-5ea8761a6b09?w=800&auto=format&fit=crop",
    },
    {
      title: "Security",
      description:
        "Implementing industry best practices for application security, data protection, and compliance.",
      icon: <MdSecurity size={32} className="text-accent-primary" />,
      size: "small",
      color: "bg-gradient-to-br from-red-500/10 to-orange-600/10",
      image:
        "https://images.unsplash.com/photo-1618482914248-29272d021005?w=400&auto=format&fit=crop",
    },
    {
      title: "WCAG",
      description:
        "Ensuring digital accessibility through adherence to Web Content Accessibility Guidelines.",
      icon: <FaUniversalAccess size={32} className="text-accent-primary" />,
      size: "small",
      color: "bg-gradient-to-br from-green-600/10 to-emerald-500/10",
      image:
        "https://images.unsplash.com/photo-1523998956902-6d4f549de43d?w=400&auto=format&fit=crop",
    },
    {
      title: "Testing",
      description:
        "Comprehensive testing strategies including unit, integration, and end-to-end testing for quality assurance.",
      icon: <BiTestTube size={32} className="text-accent-primary" />,
      size: "small",
      color: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      image:
        "https://images.pexels.com/photos/18069694/pexels-photo-18069694.png?w=400&h=400&auto=format&fit=crop",
    },
    {
      title: "Jack With Play",
      description:
        "Bringing fun to the table",
      icon: <BiPlay size={32} className="text-accent-primary" />,
      size: "small",
      color: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      image:
        "https://images.unsplash.com/photo-1536301910723-17920a960bc7?w=400&auto=format&fit=crop",
    },
  ];

  const techStack = [
    java,
    python,
    reactjs,
    spring,
    typescript,
    aws,
    django,
    docker,
    git,
    go,
    grafana,
    javascript,
    mssql,
    mysql,
    prometheus,
  ];

  // Impact Stats
  const impactStats = [
    { number: <GiSkills />, label: "4+ Years", sublabel: "Experience" },
    {
      number: <SiTechcrunch />,
      label: "20+ Tools",
      sublabel: "Stack Proficiency",
    },
    {
      number: <MdRocketLaunch />,
      label: "20+ Projects",
      sublabel: "Launched & Deployed",
    },
    { number: <SiGithub />, label: "1000+ Commits", sublabel: "Activity" },
    {
      number: <FaUserGraduate />,
      label: "Lifelong",
      sublabel: "Learning Mindset",
    },
  ];

  // About Section Animations
  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '100px', // Start loading images when they're 100px from entering the viewport
      threshold: 0.1 // Trigger when at least 10% of the target is visible
    };

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.id;
          if (id && !loadedImages[id]) {
            setLoadedImages(prev => ({ ...prev, [id]: true }));
          }
          // Unobserve after loading to save resources
          imageObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all image containers
    const refs = imageRefs.current;
    Object.keys(refs).forEach(id => {
      const el = refs[id];
      if (el) {
        imageObserver.observe(el);
      }
    });

    return () => {
      // Cleanup observer
      Object.keys(refs).forEach(id => {
        const el = refs[id];
        if (el) {
          imageObserver.unobserve(el);
        }
      });
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(aboutRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          id: "about-section-trigger", // Add ID to avoid conflicts
          markers: false, // For debugging if needed
        },
      });

      contentRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            id: `about-content-${index}`, // Add unique ID for each content element
          },
        });
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero min-h-screen flex flex-col bg-black text-white responsive-hero">
        {/* Full-width name at the top */}
        <div className="w-[96vw] m-0 px-0 pt-0 md:pt-0 overflow-hidden mb-8">
          <h1
            className="text-white text-start whitespace-nowrap overflow-hidden pt-0 m-0 uppercase text-[14vw] font-black tracking-tight"
            style={{
              width: "96vw",
              maxWidth: "96vw",
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-48vw",
              marginRight: "-50vw",
            }}
          >
            MAINA GERALD
          </h1>
        </div>

        {/* Content container for title and stats */}
        <div className="container mx-auto px-4 max-w-6xl mt-8 md:mt-12 flex-grow flex flex-col justify-center">
          <h1 className="hero-title text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
            scalable systems <br />
            & optimized experience <br />
            engineer
          </h1>
          <div className="stats-grid mt-8 sm:mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="stat-label text-sm uppercase opacity-70">
                  {stat.label}
                </div>
                <div className="stat-number text-4xl font-bold">
                  {stat.number}
                </div>
                <div className="stat-sublabel text-xs uppercase">
                  {stat.sublabel}
                </div>
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
                I’m a Software Engineer at Equity Group Holdings, building
                innovative payment systems. Driven by curiosity, I craft
                scalable, secure, and user-focused solutions that deliver
                results.
              </p>
            </div>
            <div ref={(el) => (contentRefs.current[1] = el)}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 lowercase tracking-tight">
                beyond the codeverse
              </h2>
              <p className="text-gray-300 text-lg">
                From board games to hyperrealist sketches, I draw inspiration
                from diverse passions. These shape my approach to
                problem-solving and design, equiping me to build standout
                systems.
              </p>
            </div>
          </div>
          <div className="mt-16 sm:mt-16 md:mt-16 text-center">
            <Link
              to="/about"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300 lowercase"
            >
              discover more about me
            </Link>
          </div>
        </div>
      </section>
      <section className="p-4">
        <div className="text-center text-[#FF5F1F] text-4xl sm:text-5xl md:text-7xl font-bold font-sans mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-6 md:mb-8">
          Selected Works
        </div>
        <ProjectPanels />
        <ViewMore />
      </section>

      {/* Skills and Services Section */}
      <section className="p-4 py-16 mt-6 sm:mt-8 md:mt-10 bg-white responsive-services-section">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl sm:text-5xl md:text-7xl text-black font-bold mb-2">
            Skills & Services
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Expertise across the full software development lifecycle
          </p>

          <div className="bento-grid grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {skillsAndServices.map((item) => {
              // Responsive grid classes
              const sizeClasses = {
                small: "md:col-span-1 row-span-1",
                medium: "md:col-span-2 row-span-1",
                large: "md:col-span-2 md:row-span-2",
              };

              // Explicit dimensions to prevent layout shift
              const sizeDimensions = {
                small: { width: 400, height: 400 },
                medium: { width: 800, height: 400 },
                large: { width: 800, height: 800 },
              };

              return (
                <div
                  key={item.title}
                  ref={(el) => (imageRefs.current[item.title] = el)}
                  data-id={item.title}
                  className={`bento-card ${sizeClasses[item.size]} ${item.color} rounded-2xl overflow-hidden border border-gray-200/10 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm relative`}
                >
                  <img
                    src={loadedImages[item.title] ? item.image : ''}
                    alt={item.title}
                    width={sizeDimensions[item.size].width}
                    height={sizeDimensions[item.size].height}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ opacity: loadedImages[item.title] ? 1 : 0 }}
                  />
                  <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-5 md:p-6">
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      {item.icon}
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-lg sm:text-xl font-bold text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm mt-1 bg-[#FF7518]/40 backdrop-blur-sm rounded-2xl p-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStackSection techStack={techStack} />
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
      <section
        className="section"
        style={{ background: "var(--color-accent-gradient)" }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">Get in Touch</h2>
            <p className="text-xl mb-12 text-white">
              Interested in working together? I'm always open to discussing new
              projects, creative ideas or opportunities to be part of your
              vision.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{ background: "#000", border: "1px solid #000" }}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
