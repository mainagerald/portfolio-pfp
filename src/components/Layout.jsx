import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='h-screen flex flex-col'>
        <Navbar/>
        <main className='flex flex-grow flex-col overflow-y-auto  bg-gradient-to-r from-gray-100 to-white'>
            <Outlet/>
            <Footer/>
        </main>
    </div>
  )
}

export default Layout