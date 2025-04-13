import React, { useState, useEffect } from 'react';
import { Banknote, Brain, Code, Palette, ServerCog } from 'lucide-react';
import './Layout/responsive.css';

const ProfessionalIdentity = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    {
      title: 'Software Engineer',
      description: 'Crafting digital solutions with precision and creativity',
      icon: <Code className="text-blue-500 w-8 h-8" />
    },
    {
      title: 'Payments Engineer',
      description: 'Architecting secure and seamless financial applications',
      icon: <Banknote className="text-green-500 w-8 h-8" />
    },
    {
      title: 'Creative Problem Solver',
      description: 'Bringing an artist\'s eye for detail and innovation to technical challenges, shaped by fine art experience',
      icon: <Palette className="text-purple-600 w-8 h-8" />
    },
    {
      title: 'Continuous Learner',
      description: 'Passionate about emerging technologies and learning new skills',
      icon: <Brain className="text-orange-600 w-8 h-8" />
    },
  ];

  useEffect(() => {
    let timer;

    const typeText = () => {
      const currentRoleObj = roles[currentRole];
      const fullText = currentRoleObj.title;

      if (isTyping) {
        // Typing out the text
        if (displayText.length < fullText.length) {
          setDisplayText(prevText => fullText.slice(0, prevText.length + 1));
          timer = setTimeout(typeText, 100);
        } else {
          // Finished typing, pause before deleting
          console.log('Finished typing, pausing...');
          setIsTyping(false);
          // Explicitly call delete after a pause
          setTimeout(() => {
            console.log('Starting deletion...');
            setIsDeleting(true);
          }, 2000); // 2 seconds pause before starting deletion
        }
      } else if (isDeleting) {
        // Deleting the text
        if (displayText.length > 0) {
          setDisplayText(prevText => prevText.slice(0, -1));
          timer = setTimeout(typeText, 50); // Deletion speed
        } else {
          // Finished deleting
          console.log('Finished deleting, moving to next role');
          setIsDeleting(false);
          setCurrentRole(prev => (prev + 1) % roles.length); // Move to next role
          setIsTyping(true); // Start typing the next role
        }
      }
    };

    // Start or continue the typing/deleting process
    if (isTyping || isDeleting) {
      timer = setTimeout(typeText, 100);
    }

    return () => {
      clearTimeout(timer); // Cleanup the timer
    };
  }, [currentRole, displayText, isTyping, isDeleting]);

  const CurrentRoleInfo = roles[currentRole];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-tech-gradient rounded-lg shadow-lg professional-identity-container">
      <div className="flex items-center space-x-4 mb-4">
        {CurrentRoleInfo.icon}
        <h2 className="text-2xl font-bold text-gray-800 tracking-wider professional-identity-title">
          {displayText}
          <span className="animate-pulse">|</span>
        </h2>
      </div>
      <p className="text-gray-600 text-lg italic professional-identity-description">
        {CurrentRoleInfo.description}
      </p>
    </div>
  );
};

export default ProfessionalIdentity;
