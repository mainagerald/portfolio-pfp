import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectPanels.css';


const projectsData = [
  {
    id: 'volt-inc',
    name: 'Volt Inc',
    description: 'Building for sustainable movement in East Africa.',
    stack: 'Django, React, PostgreSQL, Docker, Flutter',
    image: 'https://images.pexels.com/photos/21014/pexels-photo.jpg',
    industry: 'Logistics',
    gradient: 'linear-gradient(to bottom right, #4a4035, #2d2d2d)',
  },
  {
    id: 'masqani',
    name: 'Masqani',
    description: 'Integrated property and payments management with Daraja API.',
    stack: 'Spring Boot, React, MySQL, Daraja API, Flutter',
    image: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg',
    industry: 'Real Estate / FinTech',
    gradient: 'linear-gradient(to bottom right, #6b7f62, #3a3a30)',
  },
  {
    id: 'tradez',
    name: 'Tradez',
    description: 'Stocks news and performance tracking with real-time insights.',
    stack: 'Django, React, Finnhub API, Celery, Redis',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhZGV8ZW58MHx8MHx8fDA%3D',
    industry: 'Finance',
    gradient: 'linear-gradient(to bottom right, #1a1a1a, #000000)',
  },
  // Add more projects if needed, component will take the first 3
];

const ProjectPanels = () => {
  const displayedProjects = projectsData.slice(0, 3);

  return (
    <section className="py-10 md:py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {/* First project - Large card spanning 2/3 of the width */}
          <Link
            to={`/projects#${displayedProjects[0].id}`}
            key={displayedProjects[0].id}
            className="col-span-12 md:col-span-8 group relative rounded-3xl overflow-hidden h-[500px] md:h-[600px] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]"
            style={{ background: displayedProjects[0].gradient }}
          >
            <img
              src={displayedProjects[0].image}
              alt={displayedProjects[0].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
                  {displayedProjects[0].name}
                </h3>
                <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">
                  {displayedProjects[0].description}
                </p>
                <span className="inline-block text-[#FF7518] font-semibold text-sm md:text-base group-hover:underline">
                  View Project &rarr;
                </span>
              </div>
            </div>
          </Link>

          {/* Second column - Stacked cards */}
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4 md:gap-6 lg:gap-8">
            {/* Second project */}
            <Link
              to={`/projects#${displayedProjects[1].id}`}
              key={displayedProjects[1].id}
              className="group relative rounded-3xl overflow-hidden h-[240px] md:h-[290px] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]"
              style={{ background: displayedProjects[1].gradient }}
            >
              <img
                src={displayedProjects[1].image}
                alt={displayedProjects[1].name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                    {displayedProjects[1].name}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm mb-2 line-clamp-2">
                    {displayedProjects[1].description}
                  </p>
                  <span className="inline-block text-[#FF7518] font-semibold text-xs md:text-sm group-hover:underline">
                    View Project &rarr;
                  </span>
                </div>
              </div>
            </Link>

            {/* Third project */}
            <Link
              to={`/projects#${displayedProjects[2].id}`}
              key={displayedProjects[2].id}
              className="group relative rounded-3xl overflow-hidden h-[240px] md:h-[290px] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]"
              style={{ background: displayedProjects[2].gradient }}
            >
              <img
                src={displayedProjects[2].image}
                alt={displayedProjects[2].name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                    {displayedProjects[2].name}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm mb-2 line-clamp-2">
                    {displayedProjects[2].description}
                  </p>
                  <span className="inline-block text-[#FF7518] font-semibold text-xs md:text-sm group-hover:underline">
                    View Project &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
};

export default ProjectPanels;