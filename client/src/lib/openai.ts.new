import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true // Used for client-side API calls
});

export interface ProjectRecommendation {
  title: string;
  description: string;
  technologies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  skills: string[];
  learningGoals: string[];
}

export async function getProjectRecommendations(
  skills: string[], 
  interests: string[], 
  completedProjects: string[]
): Promise<ProjectRecommendation[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are a helpful AI assistant that recommends personalized coding projects. " +
            "Based on a developer's skills, interests, and completed projects, suggest 3 new projects " +
            "that would help them grow their skills while aligning with their interests. " +
            "Include appropriate technologies, difficulty level, time estimates, and learning goals."
        },
        {
          role: "user",
          content: 
            `Please recommend 3 projects for me based on the following information:\n\n` +
            `Skills: ${skills.join(", ")}\n` +
            `Interests: ${interests.join(", ")}\n` +
            `Completed Projects: ${completedProjects.join(", ")}\n\n` +
            `Provide the recommendations in JSON format with the following structure for each project:\n` +
            `{
              "title": "Project Name",
              "description": "Brief description of the project",
              "technologies": ["Tech1", "Tech2", "Tech3"],
              "difficulty": "beginner|intermediate|advanced",
              "timeEstimate": "X hours/days/weeks",
              "skills": ["skill1", "skill2"],
              "learningGoals": ["goal1", "goal2"]
            }`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content || '{"recommendations": []}';
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
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are a helpful AI assistant that creates project timelines. " +
            "For a given project and its technologies, create a realistic timeline with key milestones."
        },
        {
          role: "user",
          content: 
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
            }`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || '{"milestones": []}';
    const result = JSON.parse(content);
    return result;
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
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are a helpful AI assistant that creates personalized learning paths. " +
            "For a given skill and current proficiency level, create a step-by-step path to mastery."
        },
        {
          role: "user",
          content: 
            `Create a learning path for:\n\n` +
            `Skill: ${skill}\n` +
            `Current Level: ${currentLevel}\n\n` +
            `Provide steps and recommended learning resources in JSON format:\n` +
            `{
              "steps": ["Step 1: description", "Step 2: description", ...],
              "resources": ["Resource 1: name and link", "Resource 2: name and link", ...]
            }`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || '{"steps":[],"resources":[]}';
    const result = JSON.parse(content);
    return result;
  } catch (error) {
    console.error("Error getting learning path:", error);
    return { steps: [], resources: [] };
  }
}

export default openai;