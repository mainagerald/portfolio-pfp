import { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { HiLockClosed } from 'react-icons/hi2';
import './Layout/responsive.css';

export default function ProjectDisplay({ projects }) {
  const projectKeys = Object.keys(projects);
  const projectRefs = useRef([]);

  // Set up IntersectionObserver to trigger animations when projects enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectElement = entry.target;
            projectElement.style.opacity = 1;
            projectElement.style.transform = 'translateY(0)';
            // Optionally stop observing after animation to optimize
            observer.unobserve(projectElement);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    projectRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [projectKeys]);

  return (
    <div className="min-h-screen bg-black text-white font-sans project-display-container">
      {/* Scrollable Project List */}
      <div className="flex flex-col space-y-0 p-4 pt-10">
        {projectKeys.map((key, idx) => {
          const project = projects[key];
          return (
            <div
              key={key}
              ref={(el) => (projectRefs.current[idx] = el)}
              className="p-3 h-auto md:h-[96vh] w-full flex flex-col md:flex-row transition-all duration-700 ease-in-out opacity-0 translate-y-10 shadow-2xl overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Left Side - Project Image */}
              <div className="w-full md:w-1/2 bg-gray-400 relative overflow-hidden rounded-xl project-image-container">
                <img
                  src={project.image || '/api/placeholder/800/600'}
                  alt={key}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Right Side - Project Details */}
              <div className="w-full md:w-1/2 text-white p-6 md:p-8 flex flex-col project-details-container">
                {/* Project Header */}
                <section className='mb-5'>
                  <div className="w-full flex flex-row items-baseline justify-between mb-3">
                    <h1 className="text-3xl font-bold text-white uppercase">{key}</h1>
                    <span className="text-sm font-mono text-gray-400">({String(idx + 1).padStart(2, '0')})</span>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {project.fullDescription}
                  </p>
                </section>

                {/* Project Details */}
                <div className="mt-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 project-details-grid">
                    {/* Live Site */}
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 tracking-wider mb-2 font-semibold">Site</h4>
                      <p className="font-medium">
                        {project.liveSiteUrl ? (
                          <a
                            href={project.liveSiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            {new URL(project.liveSiteUrl).hostname}
                            <ExternalLink size={16} className="ml-1" />
                          </a>
                        ) : (
                          <span className="text-gray-500">Coming Soon</span>
                        )}
                      </p>
                    </div>

                    {/* Industry */}
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 tracking-wider mb-2 font-semibold">Industry</h4>
                      <p className="text-md text-gray-200">{project.industry}</p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 tracking-wider mb-2 font-semibold">Technology</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="inline-block px-3 py-1 text-sm font-medium bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors mb-2"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 tracking-wider mb-2 font-semibold">Deliverables</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.deliverables.map((deliverable) => (
                          <span 
                            key={deliverable} 
                            className="inline-block px-3 py-1 text-sm font-medium bg-gray-900 text-gray-300 rounded-md mb-2"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* GitHub Link */}
                    {project.githubLink && (
                      <div className="col-span-1 lg:col-span-2 text-xs">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                        >
                          <Github size={18} className="mr-2" />
                          <HiLockClosed/>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* View More Button */}
      
    </div>
  );
}