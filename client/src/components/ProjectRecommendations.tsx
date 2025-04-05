import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, Code, BookOpen, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { projectRecommendations as staticRecommendations } from '@/data/recommendationsData';
import { ProjectRecommendation } from '@/lib/ai-service';

interface ProjectRecommendationsProps {
  userSkills: string[];
  userInterests?: string[];
}

export function ProjectRecommendations({ 
  userSkills,
  userInterests = ['Web Development', 'Mobile Apps', 'UI/UX Design']
}: ProjectRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<ProjectRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const getRecommendations = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use static recommendations data
      setRecommendations(staticRecommendations);
      
      toast({
        title: 'Recommendations generated',
        description: 'Here are some project ideas based on your skills and interests',
        variant: 'default'
      });
    } catch (error) {
      console.error('Error getting project recommendations:', error);
      toast({
        title: 'Error',
        description: 'Could not generate project recommendations. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'advanced':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="text-2xl font-bold">Project Recommendations</h3>
          <p className="text-muted-foreground">
            Get personalized project ideas based on your skills and interests
          </p>
        </div>
        <Button 
          onClick={getRecommendations} 
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Ideas
            </>
          )}
        </Button>
      </div>
      
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((project, index) => (
            <Card key={index} className="overflow-hidden border border-border/40 dark:bg-background/80 backdrop-blur">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge className={`${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium flex gap-2 items-center mb-2">
                    <Code className="h-4 w-4" /> Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium flex gap-2 items-center mb-2">
                    <Clock className="h-4 w-4" /> Estimated Time
                  </h4>
                  <p className="text-sm text-muted-foreground">{project.timeEstimate}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium flex gap-2 items-center mb-2">
                    <BookOpen className="h-4 w-4" /> Learning Goals
                  </h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                    {project.learningGoals.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => {
                  // Here you could implement a function to view project details or create a new project
                  toast({
                    title: 'Project Selected',
                    description: `You selected "${project.title}"`,
                  });
                }}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating project recommendations...</p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center bg-muted/30">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary opacity-80" />
          <h3 className="text-xl font-medium mb-2">No recommendations yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Click "Generate Ideas" to get AI-powered project recommendations based on your skills and interests.
          </p>
        </div>
      )}
    </div>
  );
}