import React, { useState } from 'react'
import { HiBriefcase, HiFolder, HiHome, HiIdentification, HiMail, HiMailOpen, HiUserCircle, HiX, HiMenu } from 'react-icons/hi'
import myAvatar from '../assets/avataaars.svg'
import { Link, useNavigate } from 'react-router-dom'
import ContactButton from './ContactButton'

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const midLinks = [
        {name: 'Home', path:'/', icon: <HiHome className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25}/>},
        {name: 'Projects', path:'/projects', icon: <HiBriefcase className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25} />},
        {name: 'About Me', path:'/about', icon: <HiIdentification className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25}/>},
        {name: 'Let\'s Connect', path:'/contact', icon: <HiMail className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25}/>}
    ]

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='relative'>
            <div className='flex flex-row justify-between items-center border-b-0 shadow-sm border-gray-500 m-1'>
                {/* Avatar Section */}
                <div 
                    className='flex flex-row items-center gap-2 p-2 m-2 border-0 text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full hover:cursor-pointer shadow-md' 
                    onClick={()=>navigate("/")}
                >
                    <img className='avatar-medium bg-blue-400 rounded-full' src={myAvatar} alt='avatar' />
                    <p className='font-doto text-lg font-semibold hidden md:block'>mainagerald</p>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex flex-row justify-between gap-4 border-0 p-2 rounded-3xl'>
                    {midLinks.slice(0, 3).map((midLink)=>(
                        <Link 
                            key={midLink.path} 
                            to={midLink.path} 
                            className='p-1 hover:scale-90 ml-1 mr-1 hover:bg-blue-50 hover:text-blue-800 hover:shadow-lg rounded-xl cursor-pointer flex flex-row gap-2 shadow-md text-gray-800'
                        >
                            {midLink.icon}{midLink.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Contact Button */}
                <Link to='/contact' className='hidden md:block'>
                    <ContactButton />
                </Link>

                {/* Mobile Hamburger Menu */}
                <div className='md:hidden flex items-center'>
                    <button 
                        onClick={toggleMenu} 
                        className='p-2 focus:outline-none'
                    >
                        {isMenuOpen ? <HiX size={25} /> : <HiMenu size={25} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Modal */}
            {isMenuOpen && (
                <div className='absolute z-50 right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 md:hidden'>
                    <div className='flex flex-col p-4 space-y-2'>
                        {midLinks.map((midLink)=>(
                            <Link 
                                key={midLink.path} 
                                to={midLink.path} 
                                className='p-2 hover:bg-blue-50 hover:text-blue-800 hover:shadow-lg rounded-xl cursor-pointer flex flex-row gap-2 items-center'
                                onClick={toggleMenu}
                            >
                                {midLink.icon}{midLink.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar