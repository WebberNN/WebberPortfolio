import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useScrollActive } from '@/hooks/useScrollActive';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollActive(['home', 'projects', 'about', 'contact']);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? '' : 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const headerClasses = `fixed w-full top-0 z-50 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ${
    isScrolled ? 'bg-background/80' : 'bg-transparent'
  }`;

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold text-white flex items-center">
          <span className="text-primary">&lt;</span>
          Dev
          <span className="text-secondary">Portfolio</span>
          <span className="text-primary">/&gt;</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          <a 
            href="#home" 
            className={`nav-link text-foreground hover:text-secondary transition-colors ${
              activeSection === 'home' ? 'active' : ''
            }`}
          >
            Home
          </a>
          <a 
            href="#projects" 
            className={`nav-link text-foreground hover:text-secondary transition-colors ${
              activeSection === 'projects' ? 'active' : ''
            }`}
          >
            Projects
          </a>
          <a 
            href="#about" 
            className={`nav-link text-foreground hover:text-secondary transition-colors ${
              activeSection === 'about' ? 'active' : ''
            }`}
          >
            About
          </a>
          <a 
            href="#contact" 
            className={`nav-link text-foreground hover:text-secondary transition-colors ${
              activeSection === 'contact' ? 'active' : ''
            }`}
          >
            Contact
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-foreground focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className='bx bx-menu text-2xl'></i>
        </button>
      </nav>
      
      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 z-50 flex flex-col items-center justify-center space-y-8"
          >
            <button 
              onClick={closeMobileMenu} 
              className="absolute top-6 right-6 text-foreground"
              aria-label="Close menu"
            >
              <i className='bx bx-x text-3xl'></i>
            </button>
            <motion.a 
              href="#home" 
              onClick={closeMobileMenu}
              className="text-2xl font-heading hover:text-secondary transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Home
            </motion.a>
            <motion.a 
              href="#projects" 
              onClick={closeMobileMenu}
              className="text-2xl font-heading hover:text-secondary transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Projects
            </motion.a>
            <motion.a 
              href="#about" 
              onClick={closeMobileMenu}
              className="text-2xl font-heading hover:text-secondary transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              About
            </motion.a>
            <motion.a 
              href="#contact" 
              onClick={closeMobileMenu}
              className="text-2xl font-heading hover:text-secondary transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Contact
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
