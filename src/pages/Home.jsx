import React, { useEffect, useState } from 'react'
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
      <div className='fixed inset-0 bg-gray-300 flex items-center justify-center z-50'>
        <div className='fade-in'>
          <h1 className='font-lato font-semibold text-3xl gap-2 text-gray-900'>👋{greeting}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in w-full flex flex-col">
      <div className='fade-in flex items-center justify-center mt-3'>
        <div className='p-2 rounded-full flex flex-row items-center bg-white shadow-md'>
          <p className='font-lato text-lg italic p-2'>Salutations, the name's Maina. Flavian Maina.</p>
        </div>
      </div>
      <div className='p-3'>
        <ProfessionalIdentity />
      </div>
      <div className='text-center p-4 m-2'>
        <div className='flex flex-col items-center space-y-4'>
          <h1 className='text-7xl font-bold text-gray-800 tracking-tight'>
            SCALABLE  SYSTEMS
          </h1>
          <h1 className='text-7xl font-bold text-gray-800 tracking-tight animate-fade-in-up animate-delay-300'>
            & OPTIMIZED  EXPERIENCE
          </h1>
          <div className='flex items-center space-x-4 animate-fade-in-up animate-delay-100'>
            <h1 className='text-7xl font-bold text-gray-800 tracking-tight'>
              ENGINEER
            </h1>
            <p className='text-sm text-gray-600 italic'>
              Based in Nairobi, Kenya
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home