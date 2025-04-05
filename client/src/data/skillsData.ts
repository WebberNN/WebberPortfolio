export interface Skill {
  name: string;
  proficiency: number;
  color?: string;
  yearsOfExperience?: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React", proficiency: 92, color: "#61DAFB", yearsOfExperience: 4 },
      { name: "Next.js", proficiency: 88, color: "#000000", yearsOfExperience: 3 },
      { name: "JavaScript", proficiency: 95, color: "#F7DF1E", yearsOfExperience: 5 },
      { name: "TypeScript", proficiency: 86, color: "#007ACC", yearsOfExperience: 3 },
      { name: "HTML5", proficiency: 98, color: "#E34F26", yearsOfExperience: 5 },
      { name: "CSS3", proficiency: 94, color: "#1572B6", yearsOfExperience: 5 },
      { name: "Tailwind", proficiency: 89, color: "#38B2AC", yearsOfExperience: 2 },
      { name: "Styled Components", proficiency: 87, color: "#DB7093", yearsOfExperience: 3 },
      { name: "Framer Motion", proficiency: 82, color: "#0055FF", yearsOfExperience: 2 }
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", proficiency: 90, color: "#339933", yearsOfExperience: 4 },
      { name: "Express", proficiency: 88, color: "#000000", yearsOfExperience: 4 },
      { name: "NestJS", proficiency: 80, color: "#E0234E", yearsOfExperience: 2 },
      { name: "GraphQL", proficiency: 85, color: "#E535AB", yearsOfExperience: 3 },
      { name: "REST APIs", proficiency: 94, color: "#4285F4", yearsOfExperience: 4 },
      { name: "Authentication & Authorization", proficiency: 88, color: "#FF6B6B", yearsOfExperience: 4 }
    ]
  },
  {
    name: "Databases",
    skills: [
      { name: "MongoDB", proficiency: 86, color: "#47A248", yearsOfExperience: 3 },
      { name: "PostgreSQL", proficiency: 89, color: "#336791", yearsOfExperience: 3 },
      { name: "MySQL", proficiency: 84, color: "#4479A1", yearsOfExperience: 4 },
      { name: "Redis", proficiency: 78, color: "#DC382D", yearsOfExperience: 2 },
      { name: "Prisma", proficiency: 85, color: "#2D3748", yearsOfExperience: 2 },
      { name: "Drizzle ORM", proficiency: 79, color: "#8B5CF6", yearsOfExperience: 1 }
    ]
  },
  {
    name: "Tools & DevOps",
    skills: [
      { name: "Git", proficiency: 92, color: "#F05032", yearsOfExperience: 5 },
      { name: "GitHub Actions", proficiency: 83, color: "#2088FF", yearsOfExperience: 2 },
      { name: "Docker", proficiency: 80, color: "#2496ED", yearsOfExperience: 3 },
      { name: "AWS", proficiency: 77, color: "#FF9900", yearsOfExperience: 2 },
      { name: "Vercel", proficiency: 90, color: "#000000", yearsOfExperience: 3 },
      { name: "CI/CD", proficiency: 82, color: "#4285F4", yearsOfExperience: 3 },
      { name: "Jest", proficiency: 85, color: "#C21325", yearsOfExperience: 3 },
      { name: "Vitest", proficiency: 81, color: "#729B1B", yearsOfExperience: 1 }
    ]
  },
  {
    name: "Mobile & Others",
    skills: [
      { name: "React Native", proficiency: 86, color: "#61DAFB", yearsOfExperience: 3 },
      { name: "Expo", proficiency: 87, color: "#000020", yearsOfExperience: 3 },
      { name: "Progressive Web Apps", proficiency: 83, color: "#5A0FC8", yearsOfExperience: 2 },
      { name: "Responsive Design", proficiency: 94, color: "#38B2AC", yearsOfExperience: 5 },
      { name: "Accessibility", proficiency: 88, color: "#0369A1", yearsOfExperience: 3 }
    ]
  }
];

export const funFacts = [
  {
    text: "I've written code in 8 different programming languages",
    highlight: "8 different programming languages"
  },
  {
    text: "I've contributed to 5 open-source projects",
    highlight: "5 open-source projects"
  },
  {
    text: "I learned to code by building a clone of Instagram",
    highlight: "clone of Instagram"
  },
  {
    text: "I once debugged a production issue while on vacation at the beach",
    highlight: "on vacation at the beach"
  }
];
