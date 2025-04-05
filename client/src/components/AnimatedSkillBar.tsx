import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/data/skillsData';

interface AnimatedSkillBarProps {
  skill: Skill;
  delay?: number;
  showDetails?: boolean;
}

export const AnimatedSkillBar = ({ skill, delay = 0, showDetails = false }: AnimatedSkillBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Small delay before starting animation
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className="mb-5" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2 flex-wrap gap-1.5">
        <div className="flex items-center flex-wrap">
          <span className="font-medium break-words">{skill.name}</span>
          {showDetails && skill.yearsOfExperience && (
            <span className="ml-2 text-xs rounded px-2 py-0.5 bg-secondary/20 text-secondary whitespace-nowrap">
              {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{skill.proficiency}%</span>
      </div>

      <div className="h-2 w-full bg-card/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ 
            backgroundColor: skill.color || 'var(--primary)',
            originX: 0 
          }}
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: isInView ? skill.proficiency / 100 : 0 
          }}
          transition={{ 
            duration: 1.5, 
            delay: delay / 10,
            ease: "easeOut" 
          }}
        />
      </div>

      <AnimatePresence>
        {isHovered && showDetails && (
          <motion.div 
            className="mt-2 text-xs text-muted-foreground"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="block break-words">
              {getSkillDescription(skill.name, skill.proficiency)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper function to generate descriptions
function getSkillDescription(skillName: string, proficiency: number): string {
  if (proficiency >= 90) {
    return `Expert level proficiency with ${skillName}. Regularly use advanced techniques and can lead teams on complex implementations.`;
  } else if (proficiency >= 80) {
    return `Strong proficiency with ${skillName}. Comfortable with advanced concepts and can develop sophisticated solutions.`;
  } else if (proficiency >= 70) {
    return `Solid working knowledge of ${skillName}. Can implement most features and solve common problems independently.`;
  } else {
    return `Working knowledge of ${skillName}. Familiar with core concepts and continuing to develop expertise.`;
  }
}