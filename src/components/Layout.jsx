import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='h-screen flex flex-col bg-soft-gradient'>
        <Navbar/>
        <main className='flex flex-grow flex-col overflow-y-auto  bg-soft-gradient'>
            <Outlet/>
            <Footer/>
        </main>
    </div>
  )
}

export default Layout