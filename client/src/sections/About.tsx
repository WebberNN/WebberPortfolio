import React from 'react';
import { motion } from 'framer-motion';
import { funFacts, skills } from '../data/skillsData';
import AnimatedSkillBar from '@/components/AnimatedSkillBar';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-20 container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate Full-Stack Developer with expertise in modern web technologies.
            I love turning complex problems into elegant solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <i className='bx bx-bulb text-secondary mr-2'></i> Fun Facts
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {funFacts.map((fact, index) => (
                    <motion.div 
                      key={index}
                      className="p-4 rounded-lg bg-card border border-border"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-medium mb-2">{fact.title}</h4>
                      <p className="text-sm text-muted-foreground">{fact.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <i className='bx bx-code-alt text-secondary mr-2'></i> Skills & Technologies
              </h3>

              <div className="space-y-4">
                {skills[0].skills.map((skill, index) => (
                  <AnimatedSkillBar key={index} skill={skill} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;