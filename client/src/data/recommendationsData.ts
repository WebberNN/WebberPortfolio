import { ProjectRecommendation } from '@/lib/ai-service';

export const projectRecommendations: ProjectRecommendation[] = [
  {
    title: "Full-Stack E-commerce Platform",
    description: "Build a complete e-commerce solution with product listings, shopping cart, user authentication, and payment processing. Focus on creating a seamless user experience with responsive design.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    difficulty: "advanced",
    timeEstimate: "4-6 weeks",
    skills: ["Frontend Development", "Backend Development", "API Integration", "Database Design"],
    learningGoals: ["Payment gateway integration", "State management for complex applications", "User authentication and authorization"]
  },
  {
    title: "AI-Powered Content Generator",
    description: "Create a web application that uses machine learning to generate blog posts, social media content, or code snippets based on user prompts and preferences.",
    technologies: ["React", "Python", "Flask", "TensorFlow/PyTorch", "OpenAI API"],
    difficulty: "intermediate",
    timeEstimate: "2-3 weeks",
    skills: ["Frontend Development", "API Integration", "Machine Learning"],
    learningGoals: ["Machine learning integration", "Natural language processing", "API design"]
  },
  {
    title: "Real-time Collaborative Whiteboard",
    description: "Develop a collaborative drawing and diagramming tool where multiple users can work simultaneously. Include features like text notes, shapes, and free-hand drawing.",
    technologies: ["React", "Socket.io", "Node.js", "Canvas API", "Redis"],
    difficulty: "intermediate",
    timeEstimate: "3-4 weeks",
    skills: ["Frontend Development", "Real-time Applications", "WebSockets"],
    learningGoals: ["Real-time data synchronization", "Canvas manipulation", "Collaborative features"]
  }
];

export const projectTimelines = {
  "Portfolio Website": {
    milestones: [
      "Project Setup: Initialize repository, set up development environment, and create project structure",
      "Design Phase: Create wireframes, choose color palette, and design component systems",
      "Core Components: Develop reusable UI components like header, footer, cards, and navigation",
      "Content Sections: Implement hero section, about section, projects showcase, and contact form",
      "Animation & Interaction: Add scroll animations, hover effects, and interactive elements",
      "Responsive Design: Ensure site works perfectly on all device sizes from mobile to desktop",
      "Testing & Optimization: Test functionality across browsers, optimize performance, and fix any issues",
      "Deployment: Set up CI/CD pipeline and deploy to production environment"
    ]
  },
  "E-commerce Platform": {
    milestones: [
      "Requirements & Planning: Define features, user stories, and database schema",
      "Backend Development: Set up API routes, database models, and authentication system",
      "Product Catalog: Implement product listing, categories, search, and filtering functionality",
      "User Management: Create user registration, profiles, and address management",
      "Shopping Cart: Develop shopping cart functionality with persistent storage",
      "Checkout Process: Implement payment processing integration and order completion",
      "Admin Dashboard: Create administrative interface for product and order management",
      "Testing & Launch: Perform thorough testing and deploy to production"
    ]
  },
  "Mobile App": {
    milestones: [
      "Concept & Design: Define app concept, create wireframes and mockups",
      "Frontend Framework: Set up React Native or Flutter project and navigation structure",
      "Core Features: Implement main functionality and screens",
      "Data Management: Connect to backend APIs and implement state management",
      "User Authentication: Add login, registration, and profile management",
      "Polish UI/UX: Refine animations, transitions, and overall user experience",
      "Testing: Perform device testing, fix bugs and optimize performance",
      "App Store Preparation: Prepare screenshots, descriptions, and submit to app stores"
    ]
  }
};

export interface LearningPathLevel {
  steps: string[];
  resources: string[];
}

export interface LearningPathSkill {
  beginner: LearningPathLevel;
  intermediate: LearningPathLevel;
  advanced: LearningPathLevel;
}

export interface LearningPathsData {
  [key: string]: LearningPathSkill;
}

export const learningPaths: LearningPathsData = {
  "React": {
    beginner: {
      steps: [
        "Step 1: Learn HTML, CSS, and JavaScript fundamentals",
        "Step 2: Understand modern JavaScript (ES6+) features",
        "Step 3: Build your first React component",
        "Step 4: Learn about JSX and component composition",
        "Step 5: Explore state and props management",
        "Step 6: Practice with simple applications (todo list, calculator)"
      ],
      resources: [
        "Resource 1: React Official Documentation - https://reactjs.org/docs/getting-started.html",
        "Resource 2: freeCodeCamp React Course - https://www.freecodecamp.org/learn/front-end-development-libraries/",
        "Resource 3: Egghead.io Beginner's Guide to React - https://egghead.io/courses/the-beginner-s-guide-to-react",
        "Resource 4: React for Beginners by Wes Bos - https://reactforbeginners.com/"
      ]
    },
    intermediate: {
      steps: [
        "Step 1: Master React hooks (useState, useEffect, useContext, etc.)",
        "Step 2: Learn advanced patterns (render props, HOCs, compound components)",
        "Step 3: Explore React Router for navigation",
        "Step 4: Implement form handling and validation",
        "Step 5: Study state management libraries (Redux, Zustand, Context API)",
        "Step 6: Build a full-featured application with multiple routes and components"
      ],
      resources: [
        "Resource 1: React Hooks Documentation - https://reactjs.org/docs/hooks-intro.html",
        "Resource 2: Kent C. Dodds Blog - https://kentcdodds.com/blog/",
        "Resource 3: Epic React by Kent C. Dodds - https://epicreact.dev/",
        "Resource 4: Redux Documentation - https://redux.js.org/introduction/getting-started"
      ]
    },
    advanced: {
      steps: [
        "Step 1: Master performance optimization techniques",
        "Step 2: Learn server-side rendering with Next.js",
        "Step 3: Implement code splitting and lazy loading",
        "Step 4: Study advanced state management patterns",
        "Step 5: Explore testing strategies (unit, integration, e2e)",
        "Step 6: Learn about architecture patterns for large applications"
      ],
      resources: [
        "Resource 1: React Performance Documentation - https://reactjs.org/docs/optimizing-performance.html",
        "Resource 2: Next.js Documentation - https://nextjs.org/docs",
        "Resource 3: Testing Library - https://testing-library.com/docs/react-testing-library/intro/",
        "Resource 4: React Patterns on GitHub - https://github.com/krasimir/react-in-patterns"
      ]
    }
  },
  "Node.js": {
    beginner: {
      steps: [
        "Step 1: Learn JavaScript fundamentals",
        "Step 2: Install Node.js and understand its architecture",
        "Step 3: Learn about npm and package management",
        "Step 4: Create simple CLI applications",
        "Step 5: Build a basic HTTP server",
        "Step 6: Study asynchronous programming with callbacks and promises"
      ],
      resources: [
        "Resource 1: Node.js Official Documentation - https://nodejs.org/en/docs/",
        "Resource 2: freeCodeCamp Node.js Course - https://www.freecodecamp.org/learn/apis-and-microservices/",
        "Resource 3: Node.js Crash Course by Traversy Media - https://www.youtube.com/watch?v=fBNz5xF-Kx4",
        "Resource 4: The Complete Node.js Developer Course on Udemy"
      ]
    },
    intermediate: {
      steps: [
        "Step 1: Master Express.js framework",
        "Step 2: Learn about Middleware concept",
        "Step 3: Explore database integration (MongoDB, PostgreSQL)",
        "Step 4: Study authentication and security best practices",
        "Step 5: Implement REST APIs with validation",
        "Step 6: Learn about error handling and logging"
      ],
      resources: [
        "Resource 1: Express.js Documentation - https://expressjs.com/",
        "Resource 2: MongoDB University - https://university.mongodb.com/",
        "Resource 3: JWT Authentication Tutorial - https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs",
        "Resource 4: REST API Design Best Practices - https://restfulapi.net/"
      ]
    },
    advanced: {
      steps: [
        "Step 1: Learn about microservices architecture",
        "Step 2: Study message queues and event-driven architecture",
        "Step 3: Implement advanced performance optimization techniques",
        "Step 4: Master testing strategies (unit, integration, e2e)",
        "Step 5: Learn about deployment and DevOps practices",
        "Step 6: Explore GraphQL and real-time applications with Socket.io"
      ],
      resources: [
        "Resource 1: Microservices with Node.js - https://www.nginx.com/blog/building-microservices-using-an-api-gateway/",
        "Resource 2: RabbitMQ Tutorials - https://www.rabbitmq.com/getstarted.html",
        "Resource 3: Node.js Performance Guide - https://nodejs.org/en/docs/guides/dont-block-the-event-loop/",
        "Resource 4: Socket.io Documentation - https://socket.io/docs/v4/"
      ]
    }
  },
  "Python": {
    beginner: {
      steps: [
        "Step 1: Learn Python syntax and basic concepts",
        "Step 2: Understand data types, variables, and operators",
        "Step 3: Practice with control structures (if/else, loops)",
        "Step 4: Learn about functions and modules",
        "Step 5: Explore basic data structures (lists, dictionaries, sets)",
        "Step 6: Build simple scripts and command-line programs"
      ],
      resources: [
        "Resource 1: Python Official Documentation - https://docs.python.org/3/tutorial/",
        "Resource 2: Automate the Boring Stuff with Python - https://automatetheboringstuff.com/",
        "Resource 3: Python Crash Course by Eric Matthes",
        "Resource 4: freeCodeCamp Python Course - https://www.freecodecamp.org/learn/scientific-computing-with-python/"
      ]
    },
    intermediate: {
      steps: [
        "Step 1: Master object-oriented programming in Python",
        "Step 2: Learn file I/O and data handling",
        "Step 3: Explore web development with Flask or Django",
        "Step 4: Study database integration and ORMs",
        "Step 5: Learn about API development",
        "Step 6: Implement error handling and testing"
      ],
      resources: [
        "Resource 1: Real Python OOP Articles - https://realpython.com/python3-object-oriented-programming/",
        "Resource 2: Flask Documentation - https://flask.palletsprojects.com/",
        "Resource 3: Django Documentation - https://docs.djangoproject.com/",
        "Resource 4: SQLAlchemy Tutorial - https://docs.sqlalchemy.org/en/14/orm/tutorial.html"
      ]
    },
    advanced: {
      steps: [
        "Step 1: Explore data science with NumPy, Pandas, and Matplotlib",
        "Step 2: Learn about machine learning with scikit-learn or TensorFlow",
        "Step 3: Study advanced Python concepts (decorators, generators, context managers)",
        "Step 4: Implement performance optimization techniques",
        "Step 5: Learn about concurrent programming (threading, multiprocessing, asyncio)",
        "Step 6: Explore deployment and DevOps practices"
      ],
      resources: [
        "Resource 1: Python Data Science Handbook - https://jakevdp.github.io/PythonDataScienceHandbook/",
        "Resource 2: TensorFlow Documentation - https://www.tensorflow.org/learn",
        "Resource 3: Advanced Python Features - https://realpython.com/python-advanced-features/",
        "Resource 4: Fluent Python by Luciano Ramalho"
      ]
    }
  }
};