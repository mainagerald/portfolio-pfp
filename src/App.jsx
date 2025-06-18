import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import Spinner from './components/Spinner'
import { LoadingProvider, useLoading } from './context/LoadingContext'
import { AuthProvider } from './context/AuthContext'
import { queryClient } from './lib/queryClient'

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Projects = lazy(() => import('./pages/Projects'))
const Services = lazy(() => import('./pages/Services'))
const Blog = lazy(() => import('./pages/Blog'))

// Admin pages
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const PostEditor = lazy(() => import('./pages/admin/PostEditor'))

function NavigationHandler() {
  const location = useLocation();
  const { showLoader, hideLoader } = useLoading();
  
  useEffect(() => {
    hideLoader();
    showLoader();
    
    const timer = setTimeout(() => {
      hideLoader();
    }, 300);
    
    return () => {
      clearTimeout(timer);
      hideLoader();
    };
  }, [location.pathname, showLoader, hideLoader]);
  
  return null;
}

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);
  
  if (loading) return <Spinner />;
  return user ? children : null;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/services' element={<Services />} />
        <Route path='/blog/:slug?' element={<Blog />} />
      </Route>
      
      {/* Admin routes */}
      <Route path='/admin/login' element={<Login />} />
      <Route path='/admin/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/admin/posts/new' element={
        <ProtectedRoute>
          <PostEditor />
        </ProtectedRoute>
      } />
      <Route path='/admin/posts/edit/:id' element={
        <ProtectedRoute>
          <PostEditor />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

// Import useAuth at the top level to avoid reference errors
import { useAuth } from './context/AuthContext';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoadingProvider>
          <ScrollToTop />
          <NavigationHandler />
          <Suspense fallback={<Spinner />}>
            <AppRoutes />
          </Suspense>
        </LoadingProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
