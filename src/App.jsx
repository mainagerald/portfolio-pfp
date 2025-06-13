import './App.css'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import { Loader2 } from 'lucide-react'

// Lazy load page components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Projects = lazy(() => import('./pages/Projects'))
const Services = lazy(() => import('./pages/Services'))
const Blog = lazy(() => import('./pages/Blog'))


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={24} className="animate-spin" /></div>}>
              <Home/>
            </Suspense>
          }/>
          <Route path='/about' element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={24} className="animate-spin" /></div>}>
              <About/>
            </Suspense>
          }/>
          <Route path='/contact' element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={24} className="animate-spin" /></div>}>
              <Contact/>
            </Suspense>
          }/>
          <Route path='/projects' element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={24} className="animate-spin" /></div>}>
              <Projects/>
            </Suspense>
          }/>
          <Route path='/services' element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={24} className="animate-spin" /></div>}>
              <Services/>
            </Suspense>
          }/>
          <Route path='/blog/:slug?' element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={24} className="animate-spin" /></div>}>
              <Blog/>
            </Suspense>
          }/>
        </Route>
      </Routes>
    </>
  )
}

export default App
