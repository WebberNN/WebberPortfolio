import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const footerNavItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];
  
  const socialLinks = [
    { 
      platform: 'GitHub',
      icon: 'bxl-github', 
      href: 'https://github.com/easandra',
      color: 'hover:text-[#6e5494]'
    },
    { 
      platform: 'LinkedIn', 
      icon: 'bxl-linkedin', 
      href: 'https://linkedin.com',
      color: 'hover:text-[#0077b5]'
    },
    { 
      platform: 'Twitter', 
      icon: 'bxl-twitter', 
      href: 'https://twitter.com',
      color: 'hover:text-[#1DA1F2]'
    },
    { 
      platform: 'Dribbble', 
      icon: 'bxl-dribbble', 
      href: 'https://dribbble.com',
      color: 'hover:text-[#ea4c89]'
    }
  ];

  return (
    <footer className="py-14 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-heading font-bold text-white flex items-center">
              <span className="text-primary">&lt;</span>
              Emmanuel
              <span className="text-secondary">Adeleke</span>
              <span className="text-primary">/&gt;</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Specializing in creating elegant, performance-optimized digital solutions that blend creativity with technical excellence.
            </p>
            
            <div className="mt-6 flex space-x-3">
              {socialLinks.map((link) => (
                <a 
                  key={link.platform}
                  href={link.href}
                  className={`relative w-10 h-10 flex items-center justify-center rounded-full bg-card border border-white/5 transition-colors ${link.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  onMouseEnter={() => setHoveredIcon(link.platform)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <i className={`bx ${link.icon} text-lg`}></i>
                  
                  {/* Tooltip */}
                  {hoveredIcon === link.platform && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-background border border-white/10 rounded text-xs whitespace-nowrap"
                    >
                      {link.platform}
                    </motion.div>
                  )}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerNavItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <i className='bx bx-chevron-right mr-1 text-primary/60'></i>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className='bx bx-envelope text-primary mr-2 mt-1'></i>
                <a href="mailto:devmighty277@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  devmighty277@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <i className='bx bx-map text-primary mr-2 mt-1'></i>
                <span className="text-muted-foreground">
                  Remote Worldwide
                </span>
              </li>
              <li className="flex items-start">
                <i className='bx bx-time text-primary mr-2 mt-1'></i>
                <span className="text-muted-foreground">
                  Available for freelance
                </span>
              </li>
            </ul>
            
            <a 
              href="#contact" 
              className="mt-5 inline-flex items-center px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
            >
              <i className='bx bx-send mr-2'></i>
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground order-2 md:order-1 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Emmanuel Adeleke. All rights reserved.
          </p>
          
          <div className="flex space-x-6 order-1 md:order-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
