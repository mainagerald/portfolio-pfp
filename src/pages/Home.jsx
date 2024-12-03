import React, { useEffect, useState } from 'react'
import myAvatar from '../assets/avataaars.svg'
import ProfessionalIdentity from '../components/ProfesionalIdentity';

const Home = () => {
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const greetings = [
    'Hello',
    'Konnichiwa',
    'Bonjour',
    'Jambo',
    'Nǐ hǎo',
    'Hola',
    'Ciao',
    'Namaste',
    'Merhaba',
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
        intervalTime = Math.max(intervalTime - 50, 50);
        clearInterval(greetingInterval);
        greetingInterval = setInterval(updateGreeting, intervalTime);
      }
    }, intervalTime);

    return () => clearInterval(greetingInterval);
  }, [])

  if (isLoading) {
    return (
      <div className='fixed inset-0 bg-gray-900 flex items-center justify-center z-50'>
        <div className='fade-in'>
          <h1 className='font-lato font-semibold text-3xl gap-2 text-gray-200'>👋{greeting}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in w-full flex flex-col">
      <div className=' flex items-center justify-center mt-3'>
        <div className='border-2 border-gray-300 p-2 rounded-full flex flex-row items-center'>
          <img className='avatar-medium' src={myAvatar} alt='avatar' /><p className='font-lato text-lg'>Salutations, the name's Maina. Flavian Maina.</p>
        </div>
      </div>
      <div className='p-3'>
        <ProfessionalIdentity />
      </div>
      <div className='p-5 mt-4 mr-2 ml-2 rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-white'>
        <h1 className='font-lato font-bold text-3xl text-center leading-relaxed text-gray-900'>
          I craft intuitive digital experiences that seamlessly blend creativity with technical precision.
          My expertise lies in designing and developing optimized, high-performance systems that solve complex challenges.
          With a keen eye for innovation and a rapid adaptability,
          I transform technical problems and ideas into elegant, scalable solutions.
          I thrive on pushing the boundaries of what's possible through efficient code and strategic problem-solving.
        </h1>
      </div>
    </div>
  )
}

export default Home