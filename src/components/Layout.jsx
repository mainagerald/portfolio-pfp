import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='h-screen flex flex-col'>
        <Navbar/>
        <main className='flex flex-grow'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout