import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import './responsive.css'

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
        <Navbar />
        <main className='flex-grow flex-col w-full'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout