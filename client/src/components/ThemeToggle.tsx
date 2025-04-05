import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 overflow-hidden"
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.i 
              className="bx bxs-sun text-xl text-amber-400" 
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 0 
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <i className="bx bxs-moon text-xl text-indigo-400" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-background border border-border rounded text-xs whitespace-nowrap shadow-md"
          >
            {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}