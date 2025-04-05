import axios from 'axios';

// Define types for Perplexity API responses
interface PerplexityResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  citations: string[];
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta: {
      role: string;
      content: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Check if Perplexity API key is available
const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY || '';
const hasPerplexityKey = PERPLEXITY_API_KEY.length > 0;

// Types matching the OpenAI interface for drop-in replacement
export interface ProjectRecommendation {
  title: string;
  description: string;
  technologies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  skills: string[];
  learningGoals: string[];
}

// Helper function for making Perplexity API calls
async function callPerplexityAPI(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  if (!hasPerplexityKey) {
    throw new Error('Perplexity API key is not available');
  }

  try {
    const response = await axios.post<PerplexityResponse>(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    throw error;
  }
}

export async function getProjectRecommendations(
  skills: string[], 
  interests: string[], 
  completedProjects: string[]
): Promise<ProjectRecommendation[]> {
  try {
    const systemPrompt = 
      "You are a helpful AI assistant that recommends personalized coding projects. " +
      "Based on a developer's skills, interests, and completed projects, suggest 3 new projects " +
      "that would help them grow their skills while aligning with their interests. " +
      "Include appropriate technologies, difficulty level, time estimates, and learning goals.";
    
    const userPrompt = 
      `Please recommend 3 projects for me based on the following information:\n\n` +
      `Skills: ${skills.join(", ")}\n` +
      `Interests: ${interests.join(", ")}\n` +
      `Completed Projects: ${completedProjects.join(", ")}\n\n` +
      `Provide the recommendations in JSON format with the following structure:\n` +
      `{
        "recommendations": [
          {
            "title": "Project Name",
            "description": "Brief description of the project",
            "technologies": ["Tech1", "Tech2", "Tech3"],
            "difficulty": "beginner|intermediate|advanced",
            "timeEstimate": "X hours/days/weeks",
            "skills": ["skill1", "skill2"],
            "learningGoals": ["goal1", "goal2"]
          }
        ]
      }`;

    const content = await callPerplexityAPI(systemPrompt, userPrompt);
    const result = JSON.parse(content);
    return result.recommendations || [];
  } catch (error) {
    console.error("Error getting project recommendations:", error);
    return [];
  }
}

export async function getProjectTimeline(
  projectTitle: string, 
  technologies: string[]
): Promise<{ milestones: string[] }> {
  try {
    const systemPrompt = 
      "You are a helpful AI assistant that creates project timelines. " +
      "For a given project and its technologies, create a realistic timeline with key milestones.";
    
    const userPrompt = 
      `Create a development timeline for the following project:\n\n` +
      `Project: ${projectTitle}\n` +
      `Technologies: ${technologies.join(", ")}\n\n` +
      `Provide 5-8 key milestones in the project's development journey in JSON format:\n` +
      `{
        "milestones": [
          "Milestone 1: description",
          "Milestone 2: description",
          ...
        ]
      }`;

    const content = await callPerplexityAPI(systemPrompt, userPrompt);
    return JSON.parse(content);
  } catch (error) {
    console.error("Error getting project timeline:", error);
    return { milestones: [] };
  }
}

export async function getLearningPathForSkill(
  skill: string, 
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
): Promise<{ steps: string[], resources: string[] }> {
  try {
    const systemPrompt = 
      "You are a helpful AI assistant that creates personalized learning paths. " +
      "For a given skill and current proficiency level, create a step-by-step path to mastery.";
    
    const userPrompt = 
      `Create a learning path for:\n\n` +
      `Skill: ${skill}\n` +
      `Current Level: ${currentLevel}\n\n` +
      `Provide steps and recommended learning resources in JSON format:\n` +
      `{
        "steps": ["Step 1: description", "Step 2: description", ...],
        "resources": ["Resource 1: name and link", "Resource 2: name and link", ...]
      }`;

    const content = await callPerplexityAPI(systemPrompt, userPrompt);
    return JSON.parse(content);
  } catch (error) {
    console.error("Error getting learning path:", error);
    return { steps: [], resources: [] };
  }
}

// Information about whether the API is available
export const perplexityApiInfo = {
  isAvailable: hasPerplexityKey,
  requiresKey: !hasPerplexityKey
};

export default {
  getProjectRecommendations,
  getProjectTimeline,
  getLearningPathForSkill,
  perplexityApiInfo
};