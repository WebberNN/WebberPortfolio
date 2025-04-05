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
    name: "Development",
    skills: [
      { name: "React", proficiency: 90, yearsOfExperience: 4 },
      { name: "TypeScript", proficiency: 85, yearsOfExperience: 3 },
      { name: "Node.js", proficiency: 88, yearsOfExperience: 4 },
      { name: "Python", proficiency: 80, yearsOfExperience: 3 },
    ]
  }
];

export const funFacts = [
  {
    title: "Coffee Lover",
    description: "I run on coffee and code. ☕"
  },
  {
    title: "Night Owl",
    description: "Most productive during quiet nights 🌙"
  },
  {
    title: "Open Source",
    description: "Active contributor to open source projects 🌟"
  },
  {
    title: "Learning",
    description: "Always learning something new 📚"
  }
];