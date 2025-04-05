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
    isScrolled ? 'bg-background/90' : 'bg-transparent'
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
          {[
            { id: 'home', label: 'Home' },
            { id: 'projects', label: 'Projects' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              className={`relative px-1 py-2 font-medium group ${
                activeSection === item.id ? 'text-primary' : 'text-foreground hover:text-primary/80'
              } transition-colors duration-300`}
            >
              {item.label}
              {/* Active indicator */}
              {activeSection === item.id && (
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  layoutId="activeSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-foreground focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl transition-transform duration-300`}></i>
        </button>
      </nav>
      
      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/95 z-50 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {[
                { id: 'home', label: 'Home', delay: 0.1 },
                { id: 'projects', label: 'Projects', delay: 0.2 },
                { id: 'about', label: 'About', delay: 0.3 },
                { id: 'contact', label: 'Contact', delay: 0.4 }
              ].map((item) => (
                <motion.a 
                  key={item.id}
                  href={`#${item.id}`} 
                  onClick={closeMobileMenu}
                  className={`text-2xl font-heading relative ${
                    activeSection === item.id ? 'text-primary' : 'text-foreground'
                  } hover:text-primary/80 transition-colors`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: item.delay }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span 
                      className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary"
                      layoutId="activeMobileSection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="absolute bottom-8 flex space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a 
                href="https://github.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className='bx bxl-github text-2xl'></i>
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className='bx bxl-linkedin text-2xl'></i>
              </a>
              <a 
                href="https://twitter.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className='bx bxl-twitter text-2xl'></i>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
