import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, BookOpen, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { learningPaths } from '@/data/recommendationsData';

interface LearningPathProps {
  defaultSkill?: string;
  defaultLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export function LearningPath({ 
  defaultSkill = '', 
  defaultLevel = 'intermediate' 
}: LearningPathProps) {
  const [skill, setSkill] = useState(defaultSkill);
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(defaultLevel);
  const [steps, setSteps] = useState<string[]>([]);
  const [resources, setResources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const getLearningPath = async () => {
    if (!skill.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter a skill',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the closest matching skill
      let matchedPath = { steps: [], resources: [] };
      
      if (skill.toLowerCase().includes('react') || skill.toLowerCase().includes('frontend')) {
        matchedPath = {
          steps: learningPaths['React'][currentLevel].steps,
          resources: learningPaths['React'][currentLevel].resources
        };
      } else if (skill.toLowerCase().includes('node') || skill.toLowerCase().includes('backend')) {
        matchedPath = {
          steps: learningPaths['Node.js'][currentLevel].steps,
          resources: learningPaths['Node.js'][currentLevel].resources
        };
      } else if (skill.toLowerCase().includes('python') || skill.toLowerCase().includes('data')) {
        matchedPath = {
          steps: learningPaths['Python'][currentLevel].steps,
          resources: learningPaths['Python'][currentLevel].resources
        };
      } else {
        // Default to React if no match
        matchedPath = {
          steps: learningPaths['React'][currentLevel].steps,
          resources: learningPaths['React'][currentLevel].resources
        };
      }
      
      setSteps(matchedPath.steps);
      setResources(matchedPath.resources);
      
      toast({
        title: 'Learning path generated',
        description: `A personalized path to master ${skill} has been created`,
      });
    } catch (error) {
      console.error('Error getting learning path:', error);
      toast({
        title: 'Error',
        description: 'Could not generate learning path. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Learning Path</h3>
        <p className="text-muted-foreground">
          Get a personalized learning path to improve your skills
        </p>
      </div>
      
      <Card className="border border-border/40 dark:bg-background/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Skill Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skill">Skill to Learn</Label>
            <Input 
              id="skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="E.g., React, Node.js, UI Design, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="level">Current Level</Label>
            <Select 
              value={currentLevel} 
              onValueChange={(value) => setCurrentLevel(value as 'beginner' | 'intermediate' | 'advanced')}
            >
              <SelectTrigger id="level">
                <SelectValue placeholder="Select your current level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={getLearningPath} 
            disabled={isLoading || !skill.trim()}
            className="w-full gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Path...
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4" />
                Generate Learning Path
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {(steps.length > 0 || resources.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          {steps.length > 0 && (
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  {steps.map((step, index) => (
                    <li key={index} className="pl-2">
                      <div className="p-3 rounded-lg border bg-muted/30">
                        <p className="text-sm">
                          {step.includes(':') ? step.split(':').slice(1).join(':').trim() : step}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}
          
          {resources.length > 0 && (
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Recommended Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {resources.map((resource, index) => {
                    // Extract any URLs from the resource text
                    const urlMatch = resource.match(/https?:\/\/[^\s]+/);
                    const url = urlMatch ? urlMatch[0] : '';
                    
                    return (
                      <li key={index} className="flex gap-2">
                        <div className="p-3 rounded-lg border bg-muted/30 w-full">
                          <div className="flex justify-between items-start gap-2">
                            <p className="text-sm">{resource}</p>
                            {url && (
                              <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 shrink-0 mt-0.5"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      
      {isLoading && (
        <div className="h-48 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating learning path...</p>
          </div>
        </div>
      )}
    </div>
  );
}