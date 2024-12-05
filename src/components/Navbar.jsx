import React, { useState } from 'react';
import { HiBriefcase, HiHome, HiIdentification } from 'react-icons/hi';
import myAvatar from '../assets/avataaars.svg';
import { Link, useNavigate } from 'react-router-dom';
import ContactButton from './ContactButton';
import { HiMenu, HiX } from 'react-icons/hi';
import { color } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const midLinks = [
        { name: 'Home', path: '/', icon: <HiHome className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25} /> },
        { name: 'Projects', path: '/projects', icon: <HiBriefcase className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25} /> },
        { name: 'About Me', path: '/about', icon: <HiIdentification className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25} /> }
    ];

    return (
        <div className='flex flex-col md:flex-row justify-between items-center border-b-0 shadow-sm border-gray-500 m-1 p-2'>
            <div className='flex flex-row items-center gap-2 p-2 text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full hover:cursor-pointer shadow-md' onClick={() => navigate("/")}>
                <img className='avatar-medium bg-blue-400 rounded-full' src={myAvatar} alt='avatar' />
                <p className='font-doto text-lg font-semibold'>mainagerald</p>
            </div>
            <div className='md:hidden flex items-center'>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-neutral-50'>
                    {isMenuOpen ? <HiX size={30} className='m-1 rounded-md text-gray-800 hover:scale-110'/> : <HiMenu size={30} className='m-1 rounded-md text-gray-800 hover:scale-110'/>}
                </button>
            </div>
            <div className={`flex flex-col md:flex-row md:justify-between gap-4 p-2 rounded-3xl ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
                {midLinks.map((midLink) => (
                    <Link key={midLink.path} to={midLink.path} className='p-1 hover:scale-90 ml-1 mr-1 hover:bg-blue-50 hover:text-blue-800 hover:shadow-lg rounded-xl cursor-pointer flex flex-row gap-2 shadow-md text-gray-800'>
                        {midLink.icon}{midLink.name}
                    </Link>
                ))}
            </div>
            <Link to='/contact'>
                <ContactButton />
            </Link>
        </div>
    );
}

export default Navbar;
