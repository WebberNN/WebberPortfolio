import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, funFacts, SkillCategory } from '@/data/skillsData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@iconify/react';
import { AnimatedSkillBar } from '@/components/AnimatedSkillBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  const { ref, controls } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string>(skills[0].name);

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
            A glimpse into my journey, expertise, and what drives me as a developer
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
            <div className="prose prose-invert max-w-none space-y-6">
              <div>
                <h3 className="text-xl font-heading font-medium mb-3 flex items-center">
                  <i className='bx bx-user text-secondary mr-2'></i> Who I Am
                </h3>
                <p className="text-lg">
                  I'm a <span className="text-secondary">full-stack developer</span> with a passion for creating 
                  intuitive, accessible, and high-performance web applications that deliver exceptional user experiences.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-heading font-medium mb-3 flex items-center">
                  <i className='bx bx-briefcase text-secondary mr-2'></i> My Approach
                </h3>
                <p>
                  I believe in <span className="text-primary">clean, maintainable code</span> and thoughtful architecture.
                  I enjoy working at the intersection of design and development, creating solutions 
                  that are both technically sound and visually impressive.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-heading font-medium mb-3 flex items-center">
                  <i className='bx bx-book-open text-secondary mr-2'></i> My Journey
                </h3>
                <p>
                  With a background in computer science, I've continuously expanded my knowledge through 
                  self-directed learning and practical experience. I stay current with emerging technologies 
                  and best practices to ensure I'm delivering modern, forward-thinking solutions.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-heading font-medium mb-3 flex items-center">
                  <i className='bx bx-bulb text-secondary mr-2'></i> Beyond Coding
                </h3>
                <p>
                  When I'm not writing code, I enjoy exploring new technologies, contributing to open-source 
                  projects, and sharing my knowledge through mentoring. I'm also passionate about cybersecurity
                  and creating secure, resilient applications.
                </p>
              </div>
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
                    className="bg-card rounded-lg p-4 border border-white/5 hover:border-primary/20 transition-all duration-300"
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
                    whileHover={{ y: -5 }}
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
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-heading font-medium mb-6 flex items-center">
                <i className='bx bx-code-alt text-secondary mr-2'></i> Skills & Technologies
              </h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="bg-card/50 rounded-xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300"
              >
                <Tabs 
                  defaultValue={skills[0].name} 
                  onValueChange={setActiveCategory}
                  className="w-full"
                >
                  <TabsList className="mb-6 w-full justify-start overflow-x-auto flex-nowrap">
                    {skills.map((category) => (
                      <TabsTrigger 
                        key={category.name} 
                        value={category.name}
                        className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                      >
                        {category.name === "Frontend" && <i className='bx bx-layout mr-2'></i>}
                        {category.name === "Backend" && <i className='bx bx-server mr-2'></i>}
                        {category.name === "Databases" && <i className='bx bx-data mr-2'></i>}
                        {category.name === "Tools & DevOps" && <i className='bx bx-wrench mr-2'></i>}
                        {category.name === "Mobile & Others" && <i className='bx bx-devices mr-2'></i>}
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {skills.map((category) => (
                    <TabsContent 
                      key={category.name} 
                      value={category.name}
                      className="space-y-3 mt-2"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid grid-cols-1 gap-2">
                            {category.skills.map((skill, index) => (
                              <AnimatedSkillBar 
                                key={skill.name} 
                                skill={skill} 
                                delay={index * 50}
                                showDetails={true}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </TabsContent>
                  ))}
                </Tabs>
              </motion.div>
              
              <div className="mt-4 text-sm text-muted-foreground px-2">
                <p>Hover over skills for more details • Proficiency based on years of experience and project complexity</p>
              </div>
            </div>
            
            {/* Certifications or Education */}
            <motion.div
              className="mt-8 bg-card/50 rounded-xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }
              }}
            >
              <h4 className="text-lg font-medium mb-4 text-primary flex items-center">
                <i className='bx bx-certification text-secondary mr-2'></i> Continuous Learning
              </h4>
              <p className="text-muted-foreground mb-4">
                I believe in constant growth and staying current with industry advancements.
                Here are some of my recent learning focus areas:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className='bx bx-check text-success mr-2 mt-1'></i>
                  <span>Advanced React patterns and performance optimization</span>
                </li>
                <li className="flex items-start">
                  <i className='bx bx-check text-success mr-2 mt-1'></i>
                  <span>Modern backend architectures with Node.js</span>
                </li>
                <li className="flex items-start">
                  <i className='bx bx-check text-success mr-2 mt-1'></i>
                  <span>Microservices and containerization with Docker</span>
                </li>
                <li className="flex items-start">
                  <i className='bx bx-check text-success mr-2 mt-1'></i>
                  <span>Web accessibility standards and implementation</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
