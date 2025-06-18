import React, { Suspense } from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import './responsive.css'
import Spinner from '../Spinner'

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
        <Navbar />
        <main className='flex-grow flex-col w-full'>
            <Suspense fallback={<Spinner />}>
                <Outlet />
            </Suspense>
        </main>
        <Footer />
    </div>
  )
}

export default Layout