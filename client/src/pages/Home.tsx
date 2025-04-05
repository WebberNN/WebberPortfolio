import { useEffect } from 'react';
import Hero from '@/sections/Hero';
import Projects from '@/sections/Projects';
import About from '@/sections/About';
import Contact from '@/sections/Contact';

const Home = () => {
  // Update page title and metadata
  useEffect(() => {
    document.title = 'Alex Johnson | Full-Stack Developer';
  }, []);

  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  );
};

export default Home;
