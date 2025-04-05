import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

type Theme = 'dark' | 'light';
type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  // Check localStorage and system preference for initial theme
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme) return savedTheme;
    
    // Check system preference if no saved theme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'dark'; // Default to dark theme
  });

  useEffect(() => {
    // Update localStorage and apply theme class when theme changes
    localStorage.setItem('theme', theme);
    
    // Apply theme class to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => {
      const newTheme = current === 'dark' ? 'light' : 'dark';
      
      // Show toast notification
      toast({
        title: `${newTheme === 'dark' ? '🌙' : '☀️'} Theme Changed`,
        description: `Switched to ${newTheme} mode`,
        duration: 1500,
      });
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};