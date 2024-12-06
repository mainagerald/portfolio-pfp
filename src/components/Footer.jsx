import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaDiscord, FaTwitter, FaCoffee } from 'react-icons/fa'
import { BsLightningCharge } from 'react-icons/bs'
import { FaX } from 'react-icons/fa6'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
    // { name: 'Contact', path: '/contact' }
  ]

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: <FaLinkedin size={25} className='text-blue-500'/>, 
      url: import.meta.env.VITE_LINKEDIN_URL
    },
    { 
      name: 'GitHub', 
      icon: <FaGithub size={25} />, 
      url: import.meta.env.VITE_GITHUB_URL
    },
    {
      name: 'Discord', 
      icon: <FaDiscord size={25} className='bg-blue-500 text-white rounded-full'/>, 
      url: import.meta.env.VITE_DISCORD_URL
    },
    { 
      name: 'Twitter', 
      icon: <FaTwitter size={25} className='text-blue-500'/>, 
      url: import.meta.env.VITE_TWITTER_URL
    }
  ]

  return (
    <footer className="bg-seafoam-subtle-gradient shadow-md border-t border-gray-300 p-6 bottom-0 right-0 left-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Quick Links <BsLightningCharge className="text-amber-500" />
          </h3>
          <div className="flex flex-col space-y-2">
            {quickLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="m-1 text-gray-600 hover:text-gray-900 hover:underline transition duration-300 flex items-center gap-2 group hover:scale-110"
              >
                <span className="group-hover:translate-x-1 transition-transform">→</span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Get in Touch <FaCoffee className="text-brown-500" />
          </h3>
          <div className="text-gray-600 space-y-2">
            <p className="hover:text-blue-600 transition duration-300">
              🌍 Nairobi
            </p>
            <p className="hover:text-green-600 transition duration-300">
              ✉️ mainagerald910@gmail.com
            </p>
            <p className="italic text-sm text-gray-500">
              "Turning caffeine into code since forever" 
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Connect With Me</h3>
          <div className="flex space-x-4 items-center">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 hover:scale-150 transition duration-300 transform"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500 italic">
            Let's collaborate and innovate!
          </div>
        </div>
      </div>

      <div className="text-center mt-6 pt-4 border-t border-gray-300 text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Flavian Maina. 
          <span className="block text-xs mt-1 text-gray-400">
            Powered by curiosity and Stromae on repeat
          </span>
        </p>
      </div>
    </footer>
  )
}

export default Footer