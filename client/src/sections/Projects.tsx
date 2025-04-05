import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { completeApps, smallProjects } from '@/data/projectsData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Projects = () => {
  const { ref, controls } = useScrollReveal();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

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

  const handleProjectExpand = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
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
            Featured Projects
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Curated selection of my most impactful work showcasing my skills and problem-solving abilities
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
            Major Projects
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
                className="project-card bg-card rounded-xl overflow-hidden border border-border flex flex-col h-full cursor-pointer"
                variants={itemVariants}
                onClick={() => handleProjectExpand(index)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h4 className="text-xl font-heading font-medium">{app.title}</h4>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {app.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className={`text-xs ${
                          techIndex % 3 === 0 ? 'bg-primary/20 text-primary' :
                          techIndex % 3 === 1 ? 'bg-secondary/20 text-secondary' :
                          'bg-card/50 text-muted-foreground'
                        } px-2 py-1 rounded`}
                      >
                        {tech}
                      </span>
                    ))}
                    {app.technologies.length > 3 && (
                      <span className="text-xs bg-card/50 text-muted-foreground px-2 py-1 rounded">
                        +{app.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-muted-foreground text-sm">
                    {app.description}
                  </p>
                  
                  {/* Project Details - Expandable */}
                  <div className="mt-4 flex-grow">
                    <button 
                      onClick={() => handleProjectExpand(index)}
                      className="text-xs text-primary hover:text-primary/80 flex items-center transition-colors"
                      aria-expanded={expandedProject === index}
                    >
                      {expandedProject === index ? (
                        <>
                          <i className='bx bx-chevron-up mr-1'></i> Hide details
                        </>
                      ) : (
                        <>
                          <i className='bx bx-chevron-down mr-1'></i> Show details
                        </>
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedProject === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 space-y-2 text-sm">
                            <div>
                              <span className="text-secondary font-medium">Role: </span>
                              <span className="text-muted-foreground">{app.role}</span>
                            </div>
                            <div>
                              <span className="text-secondary font-medium">Challenge: </span>
                              <span className="text-muted-foreground">{app.challenges}</span>
                            </div>
                            <div>
                              <span className="text-secondary font-medium">Solution: </span>
                              <span className="text-muted-foreground">{app.solution}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    {app.demo && (
                      <a href={app.demo} className="text-secondary hover:text-secondary/80 text-sm flex items-center transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className='bx bx-link-external mr-1'></i> Live Demo
                      </a>
                    )}
                    <a href={app.code} className="text-primary hover:text-primary/80 text-sm flex items-center transition-colors" target="_blank" rel="noopener noreferrer">
                      <i className='bx bxl-github mr-1'></i> Source Code
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
            Side Projects
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
                className="project-card relative bg-card rounded-lg p-6 border border-border transition-colors cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 30px -15px rgba(var(--primary), 0.2)',
                  borderColor: 'rgba(var(--primary), 0.2)'
                }}
                onClick={() => window.open(project.code, '_blank', 'noopener,noreferrer')}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-heading font-medium">{project.title}</h4>
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <i className={`bx ${project.icon} text-xl text-secondary`}></i>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className={`text-xs ${
                        techIndex % 2 === 0 ? 'bg-primary/20 text-primary' : 'bg-card/50 text-muted-foreground'
                      } px-2 py-1 rounded`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="text-primary hover:text-primary/80 text-sm flex items-center transition-colors">
                  <i className='bx bxl-github mr-1'></i> View Source
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
