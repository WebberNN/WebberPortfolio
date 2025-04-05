import { useEffect } from 'react';
import Hero from '@/sections/Hero';
import Projects from '@/sections/Projects';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import { AITools } from '@/sections/AITools';

const Home = () => {
  // Update page title and metadata
  useEffect(() => {
    document.title = 'Emmanuel Adeleke | Full-Stack Developer';
  }, []);

  return (
    <>
      <Hero />
      <Projects />
      <About />
      <AITools />
      <Contact />
    </>
  );
};

export default Home;
