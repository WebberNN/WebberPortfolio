import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import OpenAI from "openai";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

// AI related schemas
const projectRecommendationSchema = z.object({
  skills: z.array(z.string()),
  interests: z.array(z.string()),
  completedProjects: z.array(z.string())
});

const projectTimelineSchema = z.object({
  projectTitle: z.string(),
  technologies: z.array(z.string())
});

const learningPathSchema = z.object({
  skill: z.string(),
  currentLevel: z.enum(['beginner', 'intermediate', 'advanced'])
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact route for form submission
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate request body
      const result = contactSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: result.error.format() 
        });
      }
      
      const { name, email, message } = result.data;
      
      // Here you would typically send an email or store the contact in a database
      // For now, we'll just log it and return success
      console.log('Contact form submission:', { name, email, message });
      
      return res.status(200).json({ 
        message: 'Message received successfully' 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ 
        message: 'Server error processing your request' 
      });
    }
  });

  // AI-powered Project Recommendations
  app.post('/api/ai/project-recommendations', async (req, res) => {
    try {
      const result = projectRecommendationSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: result.error.format() 
        });
      }
      
      const { skills, interests, completedProjects } = result.data;
      
      // Initialize OpenAI with server-side API key
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || ''
      });
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // The newest OpenAI model
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
              }`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 1000,
      });

      const content = response.choices[0].message.content || '{"recommendations": []}';
      const recommendations = JSON.parse(content);
      
      return res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error generating project recommendations:', error);
      return res.status(500).json({ 
        message: 'Error generating project recommendations' 
      });
    }
  });

  // Project Timeline Generation
  app.post('/api/ai/project-timeline', async (req, res) => {
    try {
      const result = projectTimelineSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: result.error.format() 
        });
      }
      
      const { projectTitle, technologies } = result.data;
      
      // Initialize OpenAI with server-side API key
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || ''
      });
      
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
      const timeline = JSON.parse(content);
      
      return res.status(200).json(timeline);
    } catch (error) {
      console.error('Error generating project timeline:', error);
      return res.status(500).json({ 
        message: 'Error generating project timeline' 
      });
    }
  });

  // Learning Path Generation for Skills
  app.post('/api/ai/learning-path', async (req, res) => {
    try {
      const result = learningPathSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: result.error.format() 
        });
      }
      
      const { skill, currentLevel } = result.data;
      
      // Initialize OpenAI with server-side API key
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || ''
      });
      
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
      const learningPath = JSON.parse(content);
      
      return res.status(200).json(learningPath);
    } catch (error) {
      console.error('Error generating learning path:', error);
      return res.status(500).json({ 
        message: 'Error generating learning path' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
