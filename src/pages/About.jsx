import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BsLightningCharge } from 'react-icons/bs';

const About = () => {
  const skills = [
    'Java', 'Python', 'JavaScript', 'Spring', 'Django', 
    'Angular', 'React', 'Docker', 'Kubernetes', 'Azure DevOps', 'AWS'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="flex-grow container mx-auto grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-wash-gradient p-8 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="p-3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
            >
              <BsLightningCharge className="w-6 h-6 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-800 leading-relaxed mb-6"
          >
            Hi there! I'm Flavian, a Software Engineer currently driving innovation in payment systems at Equity Group Holdings. My journey is fueled by curiosity and a desire to create impactful technological solutions.
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Technical Expertise
              <span className="text-violet-500">{'</>'}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium
                    hover:bg-gradient-to-r hover:from-violet-500 hover:to-cyan-500 hover:text-white
                    transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Current Role Highlight</h3>
            <p className="text-gray-800 leading-relaxed">
              At Equity Bank, I'm spearheading payment system innovations. I've optimized biller payment APIs to reduce system downtime by 30% through scalable microservices architecture and advanced Kafka queue management. My work involves developing high-volume payment systems using Django, Golang, and Java, while integrating complex payment services with core banking systems.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex space-x-4"
          >
            {[
              { icon: <FaLinkedin className="w-5 h-5" />, label: 'LinkedIn', href: import.meta.env.VITE_LINKEDIN_URL, color: 'hover:text-blue-600' },
              { icon: <FaGithub className="w-5 h-5" />, label: 'GitHub', href: import.meta.env.VITE_GITHUB_URL, color: 'hover:text-gray-900' }
            ].map((social) => (
              <motion.a
                key={social.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 text-gray-800 hover:scale-150
                  transition-colors duration-300 ${social.color}`}
              >
                {social.icon}
                <span>{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-cloud-soft-gradient p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            Beyond Code
            <span className="text-cyan-500">✨</span>
          </h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {[
              {
                title: 'Artistic Dimension',
                content: 'As a Graphite and Charcoal Artist, I bring creativity into my problem-solving approach. My artistic background allows me to think outside the box and approach technical challenges with unique perspectives.'
              },
              {
                title: 'Personal Philosophy',
                content: '"Don\'t end on a loss" - A mantra that drives my commitment to continuous learning, resilience, and personal growth. Every challenge is an opportunity to improve and innovate.'
              },
              {
                title: 'Interests',
                content: 'When I\'m not coding, I enjoy playing football, staying fit, reading fiction books, and staying updated with the latest tech and product insights.'
              }
            ].map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h4>
                <p className="text-gray-700">{section.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
