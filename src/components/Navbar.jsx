import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import './Layout/responsive.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const lastScrollY = useRef(0);
    
    // Simplified navigation links
    const navLinks = [
        {name: 'PROJECTS', path:'/projects'},
        {name: 'SERVICES', path:'/services'},
        {name: 'ABOUT', path:'/about'},
        {name: 'CONNECT', path:'/contact'}
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    // Handle scroll behavior - hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const navbar = navbarRef.current;
            
            if (!navbar) return;
            
            // Scrolling down - hide navbar (only if we're not at the bottom of the page)
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                // Check if we're not at the bottom of the page
                const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
                
                if (!isAtBottom) {
                    gsap.to(navbar, {
                        yPercent: -100,
                        duration: 0.3,
                        ease: 'power3.out'
                    });
                }
            } 
            // Scrolling up - show navbar
            else if (currentScrollY < lastScrollY.current) {
                gsap.to(navbar, {
                    yPercent: 0,
                    duration: 0.3,
                    ease: 'power3.out'
                });
            }
            
            lastScrollY.current = currentScrollY;
        };
        
        // Initial setup - make sure navbar is visible
        gsap.set(navbarRef.current, { yPercent: 0 });
        
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll); // Also check on resize
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <header ref={navbarRef} className='navbar' aria-label="Main navigation">
            <div className='container'>
                <div className='navbar-content'>
                    {/* Logo/Name Section */}
                    <div 
                        className='navbar-logo' 
                        onClick={() => navigate('/')}
                    >
                        <Link to='/' className='logo-link'>
                            MG
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className='navbar-links'>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className='navbar-menu-button'>
                        <button 
                            onClick={toggleMenu} 
                            className='menu-toggle'
                            aria-label='Toggle menu'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='mobile-menu' aria-expanded={isMenuOpen}>
                    <div className='mobile-menu-content' role="menu">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={toggleMenu}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;