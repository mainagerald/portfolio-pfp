import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component handles scrolling to top when navigation occurs
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to the top when the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]); // Re-run this effect when the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
