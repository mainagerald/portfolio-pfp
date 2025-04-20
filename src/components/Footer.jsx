import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Layout/responsive.css';

const Footer = () => {
  const mainLinks = [{ name: 'MAINA GERALD', path: '/' }];
  const secondaryLinks = [
    { name: 'Work', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Connect', path: '/contact' },
  ];
  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin size={20} />, url: 'https://www.linkedin.com/in/flavian-maina-gerald/' },
    { name: 'X', icon: <FaXTwitter size={20} />, url: 'https://x.com/flavianmaina' },
    { name: 'GitHub', icon: <FaGithub size={20} />, url: 'https://github.com/mainagerald' },
  ];

  return (
    <footer className="mt-10 bg-black text-white min-h-[60vh] z-20 footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-12 footer-grid">
          {/* Branding Section */}
          <div className="flex flex-col items-center sm:items-start">
            {mainLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-4xl font-semibold hover:text-[#ff5500] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col items-center sm:items-start">
            <ul className="space-y-2">
              {secondaryLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-base hover:text-[#ff5500] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center sm:items-start">
            <a
              href="mailto:mainagerald910@gmail.com"
              className="mb-4 text-base hover:text-gray-300 transition-colors duration-300"
            >
              mainagerald910@gmail.com
            </a>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center py-4 border-t border-gray-800 footer-bottom">
          <p className="text-sm">©MG {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;