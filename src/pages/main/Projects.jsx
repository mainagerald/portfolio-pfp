import ProjectDisplay from "../../components/projects/ProjectDisplay";
import '../../components/layout/responsive.css';
import nai from '../../assets/nai.png';
import daca from '../../assets/daca.png';


const ProjectDetails = {
  'Nairobi AI': {
    fullDescription: 'Nairobi AI is a platform for AI and machine learning enthusiasts. Championing collaboration, innovation, and knowledge sharing for students and early career professionals who are interested in AI and machine learning, and the transformational impact of emerging technologies on society.',
    technologies: ['Django', 'React', 'PostgreSQL', 'Docker', 'Ollama'],
    githubLink: '*',
    liveSiteUrl: 'http://www.nairobiai.org',
    devMode: false,
    industry: 'AI',
    deliverables: ['Resource Management', 'Automation', 'Web Application', 'API Integration'],
    image: nai,
    gradient: 'linear-gradient(to bottom right, #4F46E5, #A78BFA)',
  },
    Volt: {
      fullDescription: 'Building for sustainable movement in East Africa. A logistics platform for tracking and managing shipments, handling last miles, and waste management routing. This will help cut costs and improve efficiency for businesses in East Africa.',
      technologies: ['Spring Boot','Spring Cloud','CrossStack-Microservices','React', 'Redis', 'Django', 'Flutter'],
      githubLink: '*',
      liveSiteUrl: '',
      devMode: true,
      industry: 'Logistics',
      deliverables: ['Management', 'Tracking', 'Web Application', 'Mobile'],
      image: 'https://images.pexels.com/photos/21014/pexels-photo.jpg',
      gradient: 'linear-gradient(to bottom right, #4a4035, #2d2d2d)',
    },
    DACA:{
      fullDescription: 'Data AI & Cloud Association is a non-profit organization that aims to promote the use of AI and cloud technologies in the East African region. The association provides resources and support to individuals and organizations interested in AI and cloud technologies, and works to raise awareness of the benefits of these technologies.',
      technologies: ['Azure AI','React', 'Redis', 'Django', 'Flutter'],
      githubLink: '*',
      liveSiteUrl: '',
      devMode: true,
      industry: 'Data, AI, Cloud',
      deliverables: ['Association', 'News Feeds','Events','Web Application', 'Publications Repo'],
      image: daca,
      gradient: 'linear-gradient(to bottom right, #3B82F6, #1E3A8A)',
    },
    Masqani: {
      fullDescription: 'An integrated property and payments management application leveraging Daraja API for seamless financial transactions and property tracking. Improved tooling for house hunters, owners, and agents. Bridging communication and collaboration gaps for all stakeholders.',
      technologies: ['Spring Boot', 'React', 'MySQL', 'Daraja','Stripe', 'Flutter'],
      githubLink: '*',
      liveSiteUrl: '',
      industry: 'Real Estate / FinTech',
      deliverables: ['Property Management', 'Payment Integration', 'Web Application'],
      image: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg',
      gradient: 'linear-gradient(to bottom right, #6b7f62, #3a3a30)',
    },
    Tradez: {
      fullDescription: 'A comprehensive stocks news and performance tracking platform that aggregates financial news and provides real-time stock insights. Tradez is guided by the principles of transparency, accessibility, and user experience. This will empower users to make informed decisions about their investments. Also great for beginners to understand the stock market, with personalized insights and recommendations.',
      technologies: ['Django', 'React', 'Finnhub API', 'Celery', 'Redis'],
      githubLink: 'https://github.com/',
      liveSiteUrl: '',
      devMode: true,
      industry: 'Finance',
      deliverables: ['Data Aggregation', 'Stock Tracking', 'API Integration'],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhZGV8ZW58MHx8MHx8fDA%3D',
      gradient: 'linear-gradient(to bottom right, #1a1a1a, #000000)',
    }
  };


const Projects=()=>{
  return (
    <div className="min-h-screen bg-black font-sans pt-4 sm:pt-6 md:pt-8 responsive-projects-page">
      <ProjectDisplay projects={ProjectDetails} />
    </div>
  );
}

export default Projects;