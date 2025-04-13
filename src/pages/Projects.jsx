import ProjectDisplay from "../components/ProjectDisplay";
import '../components/Layout/responsive.css';


const ProjectDetails = {
    "Volt Inc": {
      fullDescription: 'Building for sustainable movement in East Africa.',
      technologies: ['Django', 'React', 'PostgreSQL', 'Docker', 'Flutter'],
      githubLink: '*',
      liveSiteUrl: 'http://itscomingsoon.com',
      industry: 'Logistics',
      deliverables: ['Management', 'Tracking', 'Web Application', 'Mobile'],
      image: 'https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    Masqani: {
      fullDescription: 'An integrated property and payments management application leveraging Daraja API for seamless financial transactions and property tracking.',
      technologies: ['Spring Boot', 'React', 'MySQL', 'Daraja API', 'Flutter'],
      githubLink: '*',
      liveSiteUrl: 'http://itscomingsoon.com',
      industry: 'Real Estate / FinTech',
      deliverables: ['Property Management', 'Payment Integration', 'Web Application'],
      image: 'https://images.pexels.com/photos/333837/pexels-photo-333837.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    Motion: {
        fullDescription: 'SME business ecosystem for one-stop-shop for business processes.',
        technologies: ['Spring Boot', 'React', 'Kubernetes', 'Docker', 'Keycloak'],
        githubLink: '*',
        liveSiteUrl: 'http://itscomingsoon.com',
        industry: 'E-commerce',
        deliverables: ['Microservices', 'Authentication', 'Online Store'],
        image: 'https://images.pexels.com/photos/934062/pexels-photo-934062.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
    Tradez: {
      fullDescription: 'A comprehensive stocks news and performance tracking platform that aggregates financial news and provides real-time stock insights.',
      technologies: ['Django', 'React', 'Finnhub API', 'Celery', 'Redis'],
      githubLink: 'https://github.com/',
      liveSiteUrl: 'http://itscomingsoon.com',
      industry: 'Finance',
      deliverables: ['Data Aggregation', 'Stock Tracking', 'API Integration'],
      image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    Assigna: {
      fullDescription: 'An assignment submission and review portal designed to streamline academic collaboration and assessment processes.',
      technologies: ['Spring Boot', 'React', 'MySQL', 'WebSocket'],
      githubLink: '*',
      liveSiteUrl: 'http://itscomingsoon.com',
      industry: 'EdTech',
      deliverables: ['UIUX', 'Review System', 'Real-time Updates'],
      image: 'https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  };


const Projects=()=>{
  return (
    <div className="min-h-screen bg-black font-sans pt-4 sm:pt-6 md:pt-8 responsive-projects-page">
      <ProjectDisplay projects={ProjectDetails} />
    </div>
  );
}

export default Projects;