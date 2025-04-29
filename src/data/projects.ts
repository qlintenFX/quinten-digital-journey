import { ProjectCardProps } from "@/components/projects/ProjectCard";

export interface ProjectData extends ProjectCardProps {
  category: 'academic' | 'personal' | 'additional';
  realizations: string;
  additionalImages?: string[];
}

export const projectsData: ProjectData[] = [
  // Academic Projects
  {
    id: "semester1",
    title: "[SKIL2 Semester 1 Project]",
    description: "[Placeholder: Brief description of the semester 1 project]",
    context: "[Placeholder: What subject (mention ECTS if applicable)? Who was involved? What was the purpose?]",
    contribution: "[Placeholder: What parts were you responsible for?]",
    lessons: "[Placeholder: Key technical or personal lessons from the project]",
    realizations: "[Placeholder: What was specifically built, solved, or achieved?]",
    imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "academic"
  },
  {
    id: "semester2",
    title: "[SKIL2 Semester 2 Project]",
    description: "[Placeholder: Brief description of the semester 2 project]",
    context: "[Placeholder: What subject (mention ECTS if applicable)? Who was involved? What was the purpose?]",
    contribution: "[Placeholder: What parts were you responsible for?]",
    lessons: "[Placeholder: Key technical or personal lessons from the project]",
    realizations: "[Placeholder: What was specifically built, solved, or achieved?]",
    imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "academic"
  },
  {
    id: "academic-project3",
    title: "[Academic Project 3]",
    description: "[Placeholder: Brief description of the project]",
    context: "[Placeholder: What subject (mention ECTS if applicable)? Who was involved? What was the purpose?]",
    contribution: "[Placeholder: What parts were you responsible for?]",
    lessons: "[Placeholder: Key technical or personal lessons from the project]",
    realizations: "[Placeholder: What was specifically built, solved, or achieved?]",
    imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    repoUrl: "https://github.com/yourusername/project-repository",
    category: "academic"
  },
  
  // Personal Projects
  {
    id: "personal-project1",
    title: "[Personal Project 1]",
    description: "[Placeholder: Brief description of personal project]",
    context: "[Placeholder: Why did you create this project? What problem does it solve?]",
    contribution: "[Placeholder: What technologies or methods did you use? What was your approach?]",
    lessons: "[Placeholder: What skills did you gain or improve?]",
    realizations: "[Placeholder: What was the end result? How does it function?]",
    imageSrc: "/placeholder-image.png",
    repoUrl: "https://github.com/yourusername/personal-project1",
    demoUrl: "https://demo-link-here.com",
    category: "personal"
  },
  
  // Additional Projects
  {
    id: "additional1",
    title: "[Additional Project 1]",
    description: "[Placeholder: Brief description of additional project]",
    context: "[Placeholder: Context and background information]",
    contribution: "[Placeholder: Your contribution to the project]",
    lessons: "[Placeholder: Key learnings from the project]",
    realizations: "[Placeholder: Concrete achievements and implementations]",
    imageSrc: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "additional"
  },
  {
    id: "additional2",
    title: "[Additional Project 2]",
    description: "[Placeholder: Brief description of additional project]",
    context: "[Placeholder: Context and background information]",
    contribution: "[Placeholder: Your contribution to the project]",
    lessons: "[Placeholder: Key learnings from the project]",
    realizations: "[Placeholder: Concrete achievements and implementations]",
    imageSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    category: "additional"
  }
];
