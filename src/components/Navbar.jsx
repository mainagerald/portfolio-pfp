import React from 'react'
import { HiBriefcase, HiFolder, HiHome, HiIdentification, HiMail, HiMailOpen, HiUserCircle } from 'react-icons/hi'
import { IoMdBriefcase } from 'react-icons/io'
import { MdAccountCircle, MdEmail, MdHomeMax, MdPersonOutline, MdWorkOutline } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import myAvatar from '../assets/avataaars.svg'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const midLinks = [
        {name: 'Home', path:'/', icon: <HiHome className='text-gray-700' size={25}/>},
        {name: 'Projects', path:'/projects', icon: <HiBriefcase className='text-gray-700' size={25} />},
        {name: 'About Me', path:'/about', icon: <HiIdentification className='text-gray-700' size={25}/>}
    ]
  return (
    <div className='flex flex-row justify-between items-center border-b-0 shadow-sm border-gray-500'>
        <div className='flex flex-row items-center gap-2 p-2 m-2 border-0 rounded-3xl border-gray-600 hover:cursor-pointer shadow-md' onClick={()=>navigate("/")}>
        <img className='avatar-medium bg-blue-400 rounded-full' src={myAvatar} alt='avatar' />
        <p className='font-lato text-lg font-semibold'>mainagerald</p>
        </div>
        <div className='flex-row flex justify-between gap-4 border-0 p-2 rounded-3xl'>
    {midLinks.map((midLink)=>(
        <Link key={midLink.path} to={midLink.path} className=' hover:underline hover:bg-gray-200 p-1 rounded-xl cursor-pointer flex flex-row gap-2 shadow-md text-gray-800'>{midLink.icon}{midLink.name}</Link>
    ))}
        </div>
        <Link className='flex items-center m-2 p-2 flex-row gap-1 border-0 rounded-3xl shadow-md hover:bg-gray-200' to='/contact'><HiMailOpen size={25}/>A fun button</Link>
    </div>
  )
}

export default Navbar