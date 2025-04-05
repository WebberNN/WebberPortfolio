import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      {/* Geometric Shapes */}
      <div className="geometric-shape w-96 h-96 rounded-full bg-primary top-0 -left-48"></div>
      <div className="geometric-shape w-64 h-64 bg-secondary bottom-20 -right-20"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
              <span className="text-white">Hi, I'm</span><br/>
              <span className="text-primary">Alex Johnson</span><br/>
              <span className="text-secondary">Full-Stack Developer</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Building web experiences that blend creativity with technical excellence. 
              Specialized in React, Node.js, and modern web technologies.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a 
                href="#contact" 
                className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
              <motion.a 
                href="#projects" 
                className="px-8 py-3 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full h-80 md:h-[450px] bg-card rounded-xl overflow-hidden relative floating">
              <img 
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2106&q=80" 
                alt="Developer at work" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 terminal-block">
                <p className="text-sm text-muted-foreground">
                  <span className="text-secondary">const</span> <span className="text-primary">developer</span> = {'{'}
                  <br/>&nbsp;&nbsp;name: <span className="text-success">'Alex Johnson'</span>,
                  <br/>&nbsp;&nbsp;specialty: <span className="text-success">'Full-Stack'</span>,
                  <br/>&nbsp;&nbsp;experience: <span className="text-error">5</span> + <span className="text-success">' years'</span>
                  <br/>{'}'};
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Quote */}
        <motion.div 
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-8 bg-card rounded-xl border-l-4 border-primary">
            <p className="text-xl italic text-muted-foreground">
              "Code is like humor. When you have to explain it, it's bad."
            </p>
            <p className="mt-4 text-right text-secondary">- Cory House</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
