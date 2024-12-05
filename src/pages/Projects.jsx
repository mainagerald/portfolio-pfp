import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { IoLayersOutline } from 'react-icons/io5';

const ProjectDetails = {
  Suluhu: {
    fullDescription: 'A comprehensive software license management platform designed to streamline license tracking, allocation, and compliance for enterprise environments.',
    technologies: ['Django', 'React', 'PostgreSQL', 'Docker'],
    challenges: [
      'Implementing robust license validation mechanisms',
      'Creating a scalable multi-tenant architecture',
      'Developing intuitive user management interfaces'
    ],
    githubLink: 'https://github.com/',
    liveLink: null
  },
  Masqani: {
    fullDescription: 'An integrated property and payments management application leveraging Daraja API for seamless financial transactions and property tracking.',
    technologies: ['Spring Boot', 'React', 'MySQL', 'Daraja API'],
    challenges: [
      'Integrating mobile money payment systems',
      'Designing a flexible property management workflow',
      'Implementing secure transaction tracking'
    ],
    githubLink: 'https://github.com/',
    liveLink: null
  },
  TraderSentiment: {
    fullDescription: 'A comprehensive stocks news and performance tracking platform that aggregates financial news and provides real-time stock insights.',
    technologies: ['Django', 'React', 'Finnhub API', 'Celery', 'Redis'],
    challenges: [
      'Real-time data aggregation and processing',
      'Sentiment analysis of financial news',
      'Creating predictive stock performance visualizations'
    ],
    githubLink: 'https://github.com/',
    liveLink: null
  },
  Assigno: {
    fullDescription: 'An advanced assignment submission and review portal designed to streamline academic collaboration and assessment processes.',
    technologies: ['Spring Boot', 'React', 'MySQL', 'WebSocket'],
    challenges: [
      'Implementing secure file submission mechanisms',
      'Creating a dynamic peer review system',
      'Developing real-time feedback interfaces'
    ],
    githubLink: 'https://github.com/',
    liveLink: null
  },
  LijaShop: {
    fullDescription: 'A microserviced e-commerce platform specializing in perfume sales, featuring advanced containerization and authentication.',
    technologies: ['Spring Boot', 'React', 'Kubernetes', 'Docker', 'Keycloak'],
    challenges: [
      'Implementing microservices architecture',
      'Managing distributed system communication',
      'Integrating robust authentication mechanisms'
    ],
    githubLink: 'https://github.com/',
    liveLink: null
  },
  CodeCollabo: {
    fullDescription: 'An upcoming collaborative platform designed to facilitate code reviews, knowledge sharing, and developer interactions.',
    technologies: ['React', 'Node.js', 'GraphQL'],
    challenges: [
      'Designing an intuitive code review interface',
      'Implementing collaborative editing features',
      'Creating a scalable knowledge sharing system'
    ],
    githubLink: 'https://github.com/',
    liveLink: null
  }
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const ProjectCard = ({ project, details }) => {
    const handleProjectClick = () => {
      setSelectedProject(project);
    };

    return (
      <motion.div 
        className="bg-professional-gradient rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
        onClick={handleProjectClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{project}</h2>
            <IoLayersOutline className="text-blue-500" size={30} />
          </div>
          <p className="text-gray-600 italic mb-4">{details.technologies.join(' | ')}</p>
          <p className="text-gray-700 line-clamp-3">{details.fullDescription}</p>
        </div>
      </motion.div>
    );
  };

  const ProjectModal = ({ project, details, onClose }) => {
    if (!project) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-tech-mist-gradient rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-gray-800">{project}</h1>
              <div className="flex space-x-4">
                {details.githubLink && (
                  <a 
                    href={details.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <FaGithub size={30} />
                  </a>
                )}
                {details.liveLink && (
                  <a 
                    href={details.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <FaExternalLinkAlt size={30} />
                  </a>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Project Description</h3>
                <p className="text-gray-700 mb-6">{details.fullDescription}</p>
                
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {details.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Key Challenges</h3>
                <ul className="space-y-2">
                  {details.challenges.map((challenge, index) => (
                    <li 
                      key={index} 
                      className="flex items-start text-gray-700"
                    >
                      <svg 
                        className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={onClose}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-gray-800 mb-4"
        >
          My Project Portfolio
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A collection of innovative solutions that showcase my passion for solving complex problems through thoughtful software engineering.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(ProjectDetails).map(([project, details]) => (
          <ProjectCard key={project} project={project} details={details} />
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} 
        details={selectedProject ? ProjectDetails[selectedProject] : null}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
};

export default Projects;