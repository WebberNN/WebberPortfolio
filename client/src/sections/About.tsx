import { motion } from 'framer-motion';
import { skills, funFacts } from '@/data/skillsData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const About = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      {/* Geometric Shapes */}
      <div className="geometric-shape w-72 h-72 bg-primary/30 -rotate-12 top-40 -right-20"></div>
      
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
            About Me
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A little bit about my background, skills, and interests
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
            }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg">
                I'm a <span className="text-secondary">full-stack developer</span> with 5+ years of experience creating web applications
                and digital experiences that are both functional and visually appealing.
              </p>
              <p className="mt-4">
                With a background in computer science and a passion for clean code, I enjoy tackling complex
                problems and turning them into simple, elegant solutions. I'm constantly learning
                new technologies and approaches to stay at the forefront of web development.
              </p>
              <p className="mt-4">
                When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting
                with new cooking recipes.
              </p>
            </div>
            
            {/* Fun Facts */}
            <div className="mt-12">
              <h3 className="text-xl font-heading font-medium mb-6 flex items-center">
                <i className='bx bx-bulb text-secondary mr-2'></i> Fun Facts
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {funFacts.map((fact, index) => (
                  <motion.div 
                    key={index}
                    className="bg-card rounded-lg p-4 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { delay: 0.1 * index, duration: 0.5 } 
                      }
                    }}
                  >
                    <p className="text-sm text-muted-foreground">
                      {fact.text.split(fact.highlight).map((part, i, array) => (
                        i === array.length - 1 ? (
                          <span key={i}>{part}</span>
                        ) : (
                          <span key={i}>
                            {part}<span className="text-secondary">{fact.highlight}</span>
                          </span>
                        )
                      ))}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
            }}
          >
            <h3 className="text-xl font-heading font-medium mb-6 flex items-center">
              <i className='bx bx-code-alt text-secondary mr-2'></i> Skills & Technologies
            </h3>
            
            <div className="space-y-8">
              {skills.map((category, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { delay: 0.1 * index, duration: 0.5 } 
                    }
                  }}
                >
                  <h4 className="text-lg font-medium mb-3 text-primary">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="bg-card px-3 py-2 rounded border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
