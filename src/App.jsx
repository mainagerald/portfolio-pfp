import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/util/ScrollToTop'
import Spinner from './components/util/Spinner'
import { LoadingProvider, useLoading } from './context/LoadingContext'
import { AuthProvider } from './context/AuthContext'
import { queryClient } from './lib/queryClient'

const Home = lazy(() => import('./pages/main/Home'));
const About = lazy(() => import('./pages/main/About'))
const Contact = lazy(() => import('./pages/main/contact/Contact'))
const Projects = lazy(() => import('./pages/main/Projects'))
const Services = lazy(() => import('./pages/main/Services'))
const Blog = lazy(() => import('./pages/main/Blog'))
const NotFound = lazy(() => import('./pages/error/notFound'));
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
      navigate('/admin/mg/login');
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
      <Route path='*' element={<NotFound />} />
      {/* Admin routes */}
      <Route path='/admin/mg/login' element={<Login />} />
      <Route path='/admin/mg/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/admin/mg/posts/new' element={
        <ProtectedRoute>
          <PostEditor />
        </ProtectedRoute>
      } />
      <Route path='/admin/mg/posts/edit/:slug' element={
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
