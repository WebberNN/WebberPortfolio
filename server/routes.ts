import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
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

  const httpServer = createServer(app);

  return httpServer;
}
