import React from 'react'
import { HiBriefcase, HiFolder, HiHome, HiIdentification, HiMail, HiMailOpen, HiUserCircle } from 'react-icons/hi'
import { IoMdBriefcase } from 'react-icons/io'
import { MdAccountCircle, MdEmail, MdHomeMax, MdPersonOutline, MdWorkOutline } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const midLinks = [
        {name: 'Home', path:'/', icon: <HiHome className='text-gray-700' size={25}/>},
        {name: 'Projects', path:'/projects', icon: <HiBriefcase className='text-gray-700' size={25} />},
        {name: 'About Me', path:'/about', icon: <HiIdentification className='text-gray-700' size={25}/>}
    ]
  return (
    <div className='flex flex-row justify-between items-center border-b-2 shadow-sm border-gray-300'>
        <div className='flex flex-row items-center gap-2 p-2 m-2 border-2 rounded-3xl border-gray-600 hover:cursor-pointer' onClick={()=>navigate("/")}>
        <HiUserCircle className='text-gray-700' size={25}/>
        <p className='font-lato text-lg font-semibold'>mainagerald</p>
        </div>
        <div className='flex-row flex justify-between gap-4 border-gray-600 border-2 p-2 rounded-3xl'>
    {midLinks.map((midLink)=>(
        <Link key={midLink.path} to={midLink.path} className=' hover:underline hover:bg-gray-300 p-1 rounded-xl cursor-pointer flex flex-row gap-2'>{midLink.icon}{midLink.name}</Link>
    ))}
        </div>
        <Link className='flex items-center m-2 p-2 flex-row gap-1 border-2 rounded-3xl border-gray-600 hover:bg-gray-200' to='/contact'><HiMailOpen size={25}/>Contact Me</Link>
    </div>
  )
}

export default Navbar