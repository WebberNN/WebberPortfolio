import { motion } from 'framer-motion';
import { completeApps, smallProjects } from '@/data/projectsData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Projects = () => {
  const { ref, controls } = useScrollReveal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-20 relative bg-card/50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            <span className="text-primary">&lt;</span>
            Projects
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A collection of applications and projects I've built using various technologies
          </p>
        </motion.div>
        
        {/* Complete Apps */}
        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-heading font-semibold mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <span className="inline-block w-4 h-4 bg-primary mr-3"></span>
            Complete Applications
          </motion.h3>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {completeApps.map((app, index) => (
              <motion.div 
                key={index}
                className="project-card bg-card rounded-xl overflow-hidden border border-white/5"
                variants={itemVariants}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-heading font-medium">{app.title}</h4>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {app.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className={`text-xs ${
                          techIndex % 3 === 0 ? 'bg-primary/20 text-primary' :
                          techIndex % 3 === 1 ? 'bg-secondary/20 text-secondary' :
                          'bg-white/10 text-muted-foreground'
                        } px-2 py-1 rounded`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground text-sm">
                    {app.description}
                  </p>
                  <div className="mt-6 flex justify-between">
                    {app.demo && (
                      <a href={app.demo} className="text-secondary hover:underline text-sm flex items-center" target="_blank" rel="noopener noreferrer">
                        <i className='bx bx-link-external mr-1'></i> Live Demo
                      </a>
                    )}
                    <a href={app.code} className="text-primary hover:underline text-sm flex items-center" target="_blank" rel="noopener noreferrer">
                      <i className='bx bxl-github mr-1'></i> View Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Small Projects */}
        <div>
          <motion.h3 
            className="text-2xl font-heading font-semibold mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <span className="inline-block w-4 h-4 bg-secondary mr-3"></span>
            Small Projects
          </motion.h3>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {smallProjects.map((project, index) => (
              <motion.div 
                key={index}
                className="project-card bg-card rounded-lg p-6 border border-white/5"
                variants={itemVariants}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-heading font-medium">{project.title}</h4>
                  <i className={`bx ${project.icon} text-2xl text-secondary`}></i>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className={`text-xs ${
                        techIndex % 2 === 0 ? 'bg-primary/20 text-primary' : 'bg-white/10 text-muted-foreground'
                      } px-2 py-1 rounded`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <a href={project.code} className="text-primary hover:underline text-sm flex items-center" target="_blank" rel="noopener noreferrer">
                  <i className='bx bxl-github mr-1'></i> View Code
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
