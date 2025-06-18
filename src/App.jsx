import './App.css'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import Spinner from './components/Spinner'; // Import Spinner

// Lazy load page components
const Home = lazy(() => 
  new Promise(resolve => 
    setTimeout(() => resolve(import('./pages/Home')), 2000)
  )
);
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
            <Suspense fallback={<Spinner />}>
              <Home/>
            </Suspense>
          }/>
          <Route path='/about' element={
            <Suspense fallback={<Spinner />}>
              <About/>
            </Suspense>
          }/>
          <Route path='/contact' element={
            <Suspense fallback={<Spinner />}>
              <Contact/>
            </Suspense>
          }/>
          <Route path='/projects' element={
            <Suspense fallback={<Spinner />}>
              <Projects/>
            </Suspense>
          }/>
          <Route path='/services' element={
            <Suspense fallback={<Spinner />}>
              <Services/>
            </Suspense>
          }/>
          <Route path='/blog/:slug?' element={
            <Suspense fallback={<Spinner />}>
              <Blog/>
            </Suspense>
          }/>
        </Route>
      </Routes>
    </>
  )
}

export default App
