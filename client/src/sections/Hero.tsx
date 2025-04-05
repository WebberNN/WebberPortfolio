import { motion } from 'framer-motion';
import profileImage from '../assets/emmanuel-profile.jpg';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-32 md:pt-28 pb-20 relative overflow-hidden">
      {/* Geometric Shapes */}
      <div className="geometric-shape w-96 h-96 rounded-full bg-primary top-0 -left-48 opacity-50 md:opacity-100"></div>
      <div className="geometric-shape w-64 h-64 bg-secondary bottom-20 -right-20 opacity-50 md:opacity-100"></div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold leading-tight">
              <span className="text-white">Hi, I'm</span><br/>
              <motion.span 
                className="text-primary"
                initial={{ backgroundPosition: "0% 0%" }}
                animate={{ backgroundPosition: "100% 0%" }}
                transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                style={{ backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text" }}
              >
                Emmanuel Adeleke
              </motion.span><br/>
              <span className="text-secondary">Full-Stack Developer</span>
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground max-w-full sm:max-w-lg break-words">
              Building web experiences that blend creativity with technical excellence.
              <br className="hidden xs:block" /> Specialized in React, Node.js, and modern web technologies.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a 
                href="#contact" 
                className="btn btn-primary btn-icon"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className='bx bx-envelope'></i>
                Contact Me
              </motion.a>
              <motion.a 
                href="#projects" 
                className="btn btn-outline btn-icon"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className='bx bx-code-alt'></i>
                View Projects
              </motion.a>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <a 
                href="https://github.com/easandra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <i className='bx bxl-github text-2xl'></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <i className='bx bxl-linkedin text-2xl'></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <i className='bx bxl-twitter text-2xl'></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            className="relative mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full h-64 sm:h-80 md:h-[450px] bg-card rounded-xl overflow-hidden relative floating">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl">
                  <img 
                    src={profileImage}
                    alt="Emmanuel Adeleke" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 terminal-block overflow-hidden">
                <p className="text-xs sm:text-sm text-muted-foreground break-words max-w-full">
                  <span className="text-secondary">const</span> <span className="text-primary">dev</span> = {'{'}
                  <br/>&nbsp;&nbsp;name: <span className="text-success">'Emmanuel'</span>,
                  <br/>&nbsp;&nbsp;role: <span className="text-success">'Full-Stack'</span>,
                  <br/>&nbsp;&nbsp;loc: <span className="text-success">'Remote'</span>,
                  <br/>&nbsp;&nbsp;gh: <span className="text-success">'easandra'</span>
                  <br/>{'}'};
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Quote */}
        <motion.div 
          className="mt-12 md:mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-5 md:p-8 bg-card rounded-xl border-l-4 border-primary">
            <p className="text-base md:text-xl italic text-muted-foreground">
              "Code is like humor. When you have to explain it, it's bad."
            </p>
            <p className="mt-3 md:mt-4 text-right text-secondary">- Cory House</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
