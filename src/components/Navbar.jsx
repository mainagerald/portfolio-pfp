import React from 'react'
import { HiBriefcase, HiFolder, HiHome, HiIdentification, HiMail, HiMailOpen, HiUserCircle } from 'react-icons/hi'
import { IoMdBriefcase } from 'react-icons/io'
import { MdAccountCircle, MdEmail, MdHomeMax, MdPersonOutline, MdWorkOutline } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import myAvatar from '../assets/avataaars.svg'
import { Link, useNavigate } from 'react-router-dom'
import ContactButton from './Contact'

const Navbar = () => {

    const navigate = useNavigate();

    const midLinks = [
        {name: 'Home', path:'/', icon: <HiHome className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25}/>},
        {name: 'Projects', path:'/projects', icon: <HiBriefcase className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25} />},
        {name: 'About Me', path:'/about', icon: <HiIdentification className='text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full' size={25}/>}
    ]
  return (
    <div className='flex flex-row justify-between items-center border-b-0 shadow-sm border-gray-500 m-1'>
        <div className='flex flex-row items-center gap-2 p-2 m-2 border-0 text-neutral-50 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full hover:cursor-pointer shadow-md' onClick={()=>navigate("/")}>
        <img className='avatar-medium bg-blue-400 rounded-full' src={myAvatar} alt='avatar' />
        <p className='font-doto text-lg font-semibold'>mainagerald</p>
        </div>
        <div className='flex-row flex justify-between gap-4 border-0 p-2 rounded-3xl'>
    {midLinks.map((midLink)=>(
        <Link key={midLink.path} to={midLink.path} className='p-1 hover:scale-90 ml-1 mr-1 hover:bg-blue-50 hover:text-blue-800 hover:shadow-lg rounded-xl cursor-pointer flex flex-row gap-2 shadow-md text-gray-800'>{midLink.icon}{midLink.name}</Link>
    ))}
        </div>
        <Link to='/contact'>
        <ContactButton />
        </Link>
    </div>
  )
}

export default Navbar