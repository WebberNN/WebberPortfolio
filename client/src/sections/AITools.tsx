import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectRecommendations } from '@/components/ProjectRecommendations';
import { ProjectTimeline } from '@/components/ProjectTimeline';
import { LearningPath } from '@/components/LearningPath';
import { skills } from '@/data/skillsData';
import { motion } from 'framer-motion';
import { apiInfo } from '@/lib/ai-service';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function AITools() {
  const [activeTab, setActiveTab] = useState('recommendations');
  const { toast } = useToast();
  
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

  // Show a toast notification about which AI provider is being used
  useEffect(() => {
    if (apiInfo.perplexity.isAvailable) {
      toast({
        title: "Using Perplexity AI",
        description: "AI features are powered by Perplexity LLM",
        duration: 5000,
      });
    } else if (apiInfo.openai.isAvailable) {
      toast({
        title: "Using OpenAI",
        description: "AI features are powered by OpenAI GPT-4o",
        duration: 5000,
      });
    } else {
      toast({
        title: "AI features unavailable",
        description: "API keys for AI services are missing",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [toast]);
  
  // Determine which badge to show
  const getAIBadge = () => {
    if (apiInfo.perplexity.isAvailable) {
      return <Badge variant="secondary" className="ml-2">Powered by Perplexity</Badge>;
    } else if (apiInfo.openai.isAvailable) {
      return <Badge variant="secondary" className="ml-2">Powered by OpenAI</Badge>;
    }
    return <Badge variant="destructive" className="ml-2">AI Unavailable</Badge>;
  };
  
  return (
    <section id="ai-tools" className="py-16 container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-2">
            <h2 className="text-3xl md:text-4xl font-bold">AI Developer Tools</h2>
            {getAIBadge()}
          </div>
          <p className="text-muted-foreground">
            Leverage the power of AI to enhance your development journey. 
            Get personalized project recommendations, development timelines, and learning paths.
          </p>
          {!apiInfo.anyAvailable && (
            <div className="mt-4 p-3 bg-destructive/10 rounded-md text-destructive">
              AI features require an API key for OpenAI or Perplexity. 
              Please add them to your environment variables to enable these features.
            </div>
          )}
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