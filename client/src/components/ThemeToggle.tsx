import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        // Sun icon for dark mode (switch to light)
        <motion.i 
          className="bx bx-sun text-xl"
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        // Moon icon for light mode (switch to dark)
        <motion.i 
          className="bx bx-moon text-xl"
          initial={{ opacity: 0, rotate: 30 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-background border border-white/10 rounded text-xs whitespace-nowrap"
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </motion.div>
      )}
    </motion.button>
  );
}