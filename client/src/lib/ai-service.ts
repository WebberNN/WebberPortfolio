import * as openaiService from './openai';
import * as perplexityService from './perplexity';

export interface ProjectRecommendation {
  title: string;
  description: string;
  technologies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  skills: string[];
  learningGoals: string[];
}

// Check which API keys are available
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY || '';

const hasOpenAIKey = OPENAI_API_KEY.length > 0;
const hasPerplexityKey = PERPLEXITY_API_KEY.length > 0;

// Determine which service to use based on available keys
// Prefer Perplexity if both are available (as it may be cheaper)
const usePerplexity = hasPerplexityKey;
const useOpenAI = !usePerplexity && hasOpenAIKey;

// Export information about API availability
export const apiInfo = {
  openai: {
    isAvailable: hasOpenAIKey,
    requiresKey: !hasOpenAIKey
  },
  perplexity: {
    isAvailable: hasPerplexityKey,
    requiresKey: !hasPerplexityKey
  },
  anyAvailable: hasOpenAIKey || hasPerplexityKey
};

// Functions that dynamically choose which service to use
export async function getProjectRecommendations(
  skills: string[], 
  interests: string[], 
  completedProjects: string[]
): Promise<ProjectRecommendation[]> {
  if (usePerplexity) {
    return perplexityService.getProjectRecommendations(skills, interests, completedProjects);
  } else if (useOpenAI) {
    return openaiService.getProjectRecommendations(skills, interests, completedProjects);
  } else {
    console.error("No AI service available: missing API keys");
    return [];
  }
}

export async function getProjectTimeline(
  projectTitle: string, 
  technologies: string[]
): Promise<{ milestones: string[] }> {
  if (usePerplexity) {
    return perplexityService.getProjectTimeline(projectTitle, technologies);
  } else if (useOpenAI) {
    return openaiService.getProjectTimeline(projectTitle, technologies);
  } else {
    console.error("No AI service available: missing API keys");
    return { milestones: [] };
  }
}

export async function getLearningPathForSkill(
  skill: string, 
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
): Promise<{ steps: string[], resources: string[] }> {
  if (usePerplexity) {
    return perplexityService.getLearningPathForSkill(skill, currentLevel);
  } else if (useOpenAI) {
    return openaiService.getLearningPathForSkill(skill, currentLevel);
  } else {
    console.error("No AI service available: missing API keys");
    return { steps: [], resources: [] };
  }
}