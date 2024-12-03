import React, { useEffect, useState } from 'react'

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

  useEffect(()=>{
    let index =0;
    let intervalTime=400;
    const updateGreeting=()=>{
      if(index<greetings.length){
        setGreeting(greetings[index]);
        index++;
      }else{
        clearInterval(greetingInterval);
        setIsLoading(false);
      }
    }

    let greetingInterval=setInterval(()=>{
      updateGreeting();
      if(index>greetings.length/2){
        intervalTime=Math.max(intervalTime-50, 50);
        clearInterval(greetingInterval);
        greetingInterval=setInterval(updateGreeting, intervalTime);
      }
    }, intervalTime);

    return ()=>clearInterval(greetingInterval);
  }, [])

  if(isLoading){
    return(
      <div className='fixed inset-0 bg-gray-900 flex items-center justify-center z-50'>
        <div className='fade-in'>
        <h1 className='font-lato font-semibold text-3xl gap-2 text-gray-200'>👋{greeting}</h1>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fade-in">
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to My Portfolio</h1>
        {/* Your Home Page content */}
      </div>
    </div>
  )
}

export default Home