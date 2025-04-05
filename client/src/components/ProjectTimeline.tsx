import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Clock, Milestone } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface ProjectTimelineProps {
  defaultProjectTitle?: string;
  defaultTechnologies?: string[];
}

export function ProjectTimeline({ 
  defaultProjectTitle = '', 
  defaultTechnologies = [] 
}: ProjectTimelineProps) {
  const [projectTitle, setProjectTitle] = useState(defaultProjectTitle);
  const [technologies, setTechnologies] = useState(
    defaultTechnologies.length > 0 ? defaultTechnologies.join(', ') : ''
  );
  const [milestones, setMilestones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const getProjectTimeline = async () => {
    if (!projectTitle.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter a project title',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Split the technologies string by commas and trim whitespace
      const techArray = technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);
      
      // Update the apiRequest to use the correct type
      const response = await apiRequest<{ milestones: string[] }>({
        url: '/api/ai/project-timeline',
        method: 'POST',
        data: {
          projectTitle,
          technologies: techArray
        }
      });
      
      setMilestones(response.milestones || []);
      
      toast({
        title: 'Timeline generated',
        description: 'Project development timeline has been created',
      });
    } catch (error) {
      console.error('Error getting project timeline:', error);
      toast({
        title: 'Error',
        description: 'Could not generate timeline. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Project Timeline</h3>
        <p className="text-muted-foreground">
          Generate a development timeline for your project with key milestones
        </p>
      </div>
      
      <Card className="border border-border/40 dark:bg-background/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input 
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="E.g., E-commerce Website, Mobile Game, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input 
              id="technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="E.g., React, Node.js, MongoDB, etc."
            />
          </div>
          
          <Button 
            onClick={getProjectTimeline} 
            disabled={isLoading || !projectTitle.trim()}
            className="w-full gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Timeline...
              </>
            ) : (
              <>
                <Clock className="h-4 w-4" />
                Generate Timeline
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {milestones.length > 0 ? (
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Milestone className="h-5 w-5" />
              Development Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-primary/20 ml-3 space-y-6 py-2">
              {milestones.map((milestone, index) => (
                <li key={index} className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-background bg-primary/20">
                    {index + 1}
                  </span>
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="text-base font-semibold mb-1.5">{milestone.split(':')[0]}</h4>
                    <p className="text-sm text-muted-foreground">
                      {milestone.includes(':') ? milestone.split(':').slice(1).join(':').trim() : milestone}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating timeline...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}