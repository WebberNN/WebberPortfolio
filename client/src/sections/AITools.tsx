import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectRecommendations } from '@/components/ProjectRecommendations';
import { ProjectTimeline } from '@/components/ProjectTimeline';
import { LearningPath } from '@/components/LearningPath';
import { skills } from '@/data/skillsData';
import { motion } from 'framer-motion';

export function AITools() {
  const [activeTab, setActiveTab] = useState('recommendations');
  
  // Extract all skills as strings from the skills data
  const userSkills = skills
    .flatMap(category => category.skills)
    .map(skill => skill.name);
    
  // Define user interests for recommendations
  const userInterests = [
    'Web Development',
    'UI/UX Design',
    'Mobile App Development',
    'Machine Learning',
    'Cloud Computing'
  ];
  
  return (
    <section id="ai-tools" className="py-16 container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Developer Tools</h2>
          <p className="text-muted-foreground">
            Leverage the power of AI to enhance your development journey. 
            Get personalized project recommendations, development timelines, and learning paths.
          </p>
        </div>
        
        <Tabs 
          defaultValue="recommendations" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="recommendations">Project Ideas</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="learning">Learning Path</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="focus-visible:outline-none focus-visible:ring-0">
            <ProjectRecommendations 
              userSkills={userSkills} 
              userInterests={userInterests} 
            />
          </TabsContent>
          
          <TabsContent value="timeline" className="focus-visible:outline-none focus-visible:ring-0">
            <ProjectTimeline />
          </TabsContent>
          
          <TabsContent value="learning" className="focus-visible:outline-none focus-visible:ring-0">
            <LearningPath />
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
}