import React, { useState } from 'react';
import { HiMailOpen, HiMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const ContactButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const contactPhrases = [
    "Innovate?",
    "Collaborate?",
    "Build?",
    "Bespoke?",
    "Scaling?",
    "Digital?",
    "Optimize?",
  ];

  const [currentPhrase, setCurrentPhrase] = useState(contactPhrases[0]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const randomPhrase = contactPhrases[Math.floor(Math.random() * contactPhrases.length)];
    setCurrentPhrase(randomPhrase);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate('/contact');
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        flex items-center justify-center 
        px-3 py-2 
        w-40 
        h-10 
        border-0 
        rounded-full 
        shadow-md 
        transition-all 
        duration-300 
        ease-in-out 
        overflow-hidden
        whitespace-nowrap
        ${isHovered 
          ? 'bg-blue-50 text-blue-800 hover:shadow-lg' 
          : 'bg-gray-100 text-gray-800'}
        transform 
        hover:scale-[1.02] 
        active:scale-[0.98]
        relative
      `}
    >
      <div className="flex items-center justify-center gap-2 w-full">
        <div className="flex items-center justify-center w-5">
          {isHovered ? (
            <HiMailOpen className="text-xl" />
          ) : (
            <HiMail className="text-xl " />
          )}
        </div>
        <span className="flex-grow text-center transition-all duration-300 ease-in-out">
          {isHovered ? currentPhrase : "Let's Connect"}
        </span>
      </div>
    </button>
  );
};

export default ContactButton;