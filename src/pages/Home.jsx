import React, { useEffect, useState } from 'react'
import ProfessionalIdentity from '../components/ProfesionalIdentity';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { HiPaintBrush } from 'react-icons/hi2';
import CustomCard from '../components/CustomCard';
import { MdEditNote, MdHandyman, MdUmbrella } from 'react-icons/md';
import { IoMdUmbrella } from 'react-icons/io';
import { BsLightningCharge } from 'react-icons/bs';
import { Card, CardContent } from '@mui/material';


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


const Home = () => {
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const tasksArray = [
    {
      title: 'Design',
      description: 'Architect comprehensive system schemas and API interfaces, optimizing application performance and creating intuitive frontend designs that elevate user experience and engagement.',
      icon: <HiPaintBrush size={50} className='text-violet-400' />
    },
    {
      title: 'Build',
      description: 'Develop robust applications with a strategic focus on performance optimization, advanced security protocols, and enterprise-grade fault tolerance, maintaining pristine and scalable code architecture.',
      icon: <MdHandyman size={50} className='text-amber-400' />
    },
    {
      title: 'Document',
      description: 'Maintain comprehensive technical documentation spanning the entire application lifecycle, ensuring clear, maintainable, and knowledge-transfer-friendly resources for long-term project sustainability.',
      icon: <MdEditNote size={50} className='text-teal-700' />
    },
    {
      title: 'Own',
      description: 'Engage comprehensively in the Software Development Life Cycle, implementing best practices, driving cross-functional collaboration, and ensuring end-to-end project excellence and operational productivity.',
      icon: <IoMdUmbrella size={50} className='text-cyan-400' />
    }
  ]

  const myProjects = [
    { name: 'Suluhu', description: 'A dynamic software license management platform', stack: 'Django, React, &more' },
    { name: 'Masqani', description: 'Property and payments management application', stack: 'Daraja API, Spring, React, MySql' },
    { name: 'TraderSentiment', description: 'A stocks news outlet and performance tracker', stack: 'Django, React, Finnhub API' },
    { name: 'Assigno', description: 'An assignment submission and review portal for tutors and peers', stack: 'Spring, React, MySql' },
    { name: 'LijaShop', description: 'A microserviced e-commerce platform for perfume sales', stack: 'Spring, React, Keycloak, K8s, Docker' },
    { name: 'CodeCollabo', description: 'Upcoming platform for code review and collaboration', stack: 'React ...' },

  ]

  const skillSvg = [
    java, python, reactjs, spring, typescript, aws, django, docker, git, go, grafana, javascript, 
    mssql, mysql, prometheus
  ]
  const greetings = [
    'Hello',
    'Konnichiwa',
    'Bonjour',
    'Jambo',
    'Ni hao',
    'Hola',
    'Ciao',
    'Namaste',
    'Oi Oi',
    'Salaam',
  ];

  useEffect(() => {
    let index = 0;
    let intervalTime = 400;
    const updateGreeting = () => {
      if (index < greetings.length) {
        setGreeting(greetings[index]);
        index++;
      } else {
        clearInterval(greetingInterval);
        setIsLoading(false);
      }
    }

    let greetingInterval = setInterval(() => {
      updateGreeting();
      if (index > greetings.length / 2) {
        intervalTime = Math.max(intervalTime - 80, 25);
        clearInterval(greetingInterval);
        greetingInterval = setInterval(updateGreeting, intervalTime);
      }
    }, intervalTime);

    return () => clearInterval(greetingInterval);
  }, [])

 
  if (isLoading) {
    return (
      <div className='fixed inset-0 bg-tech-mist-gradient flex items-center justify-center z-50'>
        <div className='fade-in'>
          <h1 className='font-doto font-semibold text-7xl gap-2 text-gray-900'>👋{greeting}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in w-full flex flex-col">
      <div className='fade-in flex items-center justify-center mt-3'>
        <div className='p-2 rounded-full flex flex-row items-center'>
          <p className='font text-lg text-gray-900 font-normal p-2'>Salutations, the name's Maina. Flavian Maina.</p>
        </div>
      </div>
      <div className='p-3'>
        <ProfessionalIdentity />
      </div>
      <div className='text-center p-4 m-2'>
        <div className='flex flex-col items-center space-y-4 border-b-2 border-gray-300 p-2'>
          <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 tracking-tight'>
            SCALABLE SYSTEMS
          </h1>
          <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 tracking-tight animate-fade-in-up animate-delay-300'>
            & OPTIMIZED EXPERIENCE
          </h1>
          <div className='flex items-center space-x-4 animate-fade-in-up animate-delay-100'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 tracking-tight'>
              ENGINEER
            </h1>
            <p className='text-gray-600 italic'>
              Based in Nairobi, Kenya
            </p>
          </div>
        </div>
        <div className='fade-in mt-2 p-3 flex justify-between gap-4 w-full md:w-1/2 text-start text-balance text-lg'>
          <p className='font-lato text-gray-800'>
            I’m a passionate Software Engineer currently driving innovation in payment systems at Equity Group Holdings.
            My ethic is fueled by curiosity and a desire to create impactful and bespoke solutions.
            My passions lie in distributed systems, robust application performance, optimization, and security throughout the software development cycle,
            while constantly seeking to expand my expertise in emerging technologies that shape the future of digital productivity.
          </p>
        </div>
        <div className='fade-in flex justify-end'>
          <button onClick={() => navigate('/about')} className='text-white rounded-full flex items-center flex-row font-lato text-lg font-semibold shadow-md p-1 m-2 hover:cursor-pointer bg-gradient-to-r from-violet-500 to-cyan-500 hover:scale-125 transition transform'>
            About Me <FiArrowRight size={20} />
          </button>
        </div>
        <div className='m-2 mt-3 p-2 border-t-2 border-gray-300'>
          <p className='text-center text-xl font-bold text-blue-500'>What I Do ...</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4'>
          {tasksArray.map((task) => (
            <CustomCard key={task.title} icon={task.icon} title={task.title} description={task.description} />
          ))}
        </div>
        <div className='m-2 p-2'>
          <h1 className='font-bold font-lato text-2xl text-gray-800 flex-row flex gap-2 justify-center p-2'>My Projects<BsLightningCharge size={30} /></h1>
          <div className='grid grid-cols-1 space-y-1 m-2 p-2'>
            {myProjects.map((project) => (
              <div className='bg-digital-whisper-gradient hover:cursor-pointer border rounded-lg hover:scale-105 transition transform' 
              key={project.name} onClick={() => navigate('/projects')}>
              <Card style={{ boxShadow: 'none', background:'none' }} className='project-list-card'>
                  <CardContent className='flex justify-between items-center'>
                    <div className='p-1 m-2'>
                      <h1 className='font-bold text-xl text-start p-2 text-gray-800'>{project.name}</h1>
                      <p className='flex items-end italic text-sm'>{project.description}</p>
                    </div>
                    <h4 className='p-2 m-2 text-sm'>{project.stack}</h4>
                  </CardContent>
              </Card>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-2 mb-3 p-2 border-b-2 border-gray-300'>
            <button onClick={() => navigate('/projects')}
              className='flex flex-row items-center gap-1 text-xl shadow-md m-2 p-2 rounded-full text-white bg-gradient-to-r from-violet-500 to-cyan-500 transition transform hover:scale-110'>Project Details<FiArrowRight /></button>
          </div>
          <div className='p-2 m-2'>
            <h1 className='text-2xl font-lato font-bold text-amber-900 p-2 m-2'>My Stack</h1>
            <div className='flex flex-wrap justify-center'>
              {skillSvg.map((skill, index) => (
                <img key={index} src={skill} style={{ width: '60px', height: '60px', animationDelay: `${index * 0.5}s` }} className='skill-icon m-2' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
