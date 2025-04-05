import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useScrollActive } from '@/hooks/useScrollActive';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

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

  const headerClasses = `fixed w-full top-0 z-50 backdrop-blur-lg border-b border-border transition-all duration-300 ${
    isScrolled ? 'bg-background/95 shadow-md' : 'bg-background/80'
  }`;

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold text-white flex items-center">
          <span className="text-primary">&lt;</span>
          Emmanuel
          <span className="text-secondary">Adeleke</span>
          <span className="text-primary">/&gt;</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-8 mr-6">
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
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
        
        {/* Mobile Nav Actions */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Theme Toggle (Mobile) */}
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu} 
            className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Toggle menu"
          >
            <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeMobileMenu}
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-xs bg-background/95 border-l border-border shadow-xl z-50 flex flex-col justify-between py-20 px-6"
            >
              <div className="flex flex-col space-y-8">
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-heading text-foreground/80 mb-4"
                >
                  Navigation
                </motion.h3>
                
                {[
                  { id: 'home', label: 'Home', icon: 'bx-home', delay: 0.1 },
                  { id: 'projects', label: 'Projects', icon: 'bx-code-alt', delay: 0.2 },
                  { id: 'about', label: 'About', icon: 'bx-user', delay: 0.3 },
                  { id: 'contact', label: 'Contact', icon: 'bx-envelope', delay: 0.4 }
                ].map((item) => (
                  <motion.a 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={closeMobileMenu}
                    className={`group text-xl font-heading relative flex items-center space-x-3 px-4 py-2 rounded-lg ${
                      activeSection === item.id 
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : 'text-foreground hover:bg-card/50 hover:text-primary/80'
                    } transition-all duration-300`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: item.delay }}
                  >
                    <i className={`bx ${item.icon} text-xl ${activeSection === item.id ? 'text-primary' : 'text-primary/70'}`}></i>
                    <span>{item.label}</span>
                    
                    {activeSection === item.id && (
                      <motion.span 
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary"
                        layoutId="activeMobileDot"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="border-t border-border pt-4"
                >
                  <h4 className="text-sm font-medium text-foreground/60 mb-3">Connect with me</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/easandra" 
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border text-foreground hover:text-[#6e5494] hover:border-[#6e5494]/30 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <i className='bx bxl-github text-xl'></i>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border text-foreground hover:text-[#0077b5] hover:border-[#0077b5]/30 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <i className='bx bxl-linkedin text-xl'></i>
                    </a>
                    <a 
                      href="https://twitter.com" 
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border text-foreground hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <i className='bx bxl-twitter text-xl'></i>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
