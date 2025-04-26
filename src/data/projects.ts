
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
    title: "Semester 1 Project (SKIL2)",
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
    title: "Semester 2 Project (SKIL2)",
    description: "[Placeholder: Brief description of the semester 2 project]",
    context: "[Placeholder: What subject (mention ECTS if applicable)? Who was involved? What was the purpose?]",
    contribution: "[Placeholder: What parts were you responsible for?]",
    lessons: "[Placeholder: Key technical or personal lessons from the project]",
    realizations: "[Placeholder: What was specifically built, solved, or achieved?]",
    imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "academic"
  },
  {
    id: "azure-infrastructure",
    title: "Azure Infrastructure as Code",
    description: "Assignment 2 - Implementation of infrastructure as code principles using Azure.",
    context: "[Placeholder: Detailed information about the academic context, requirements and goals of this Azure project]",
    contribution: "[Placeholder: Your specific contributions to the infrastructure code, deployment strategies, and problem-solving]",
    lessons: "[Placeholder: Key takeaways about Azure services, IaC methodologies, and DevOps practices]",
    realizations: "[Placeholder: Description of the Azure resources created, automation achieved, and problems solved]",
    imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    repoUrl: "https://github.com/yourusername/azure-infrastructure-as-code",
    category: "academic"
  },
  
  // Personal Projects
  {
    id: "keyed-colors",
    title: "KeyedColors",
    description: "A personal project focused on color management and visualization.",
    context: "[Placeholder: Background information on why you created this project, what problem it solves, and your personal interest in this area]",
    contribution: "[Placeholder: As a personal project, describe your role as the sole developer or your collaboration with others]",
    lessons: "[Placeholder: What technical skills and personal insights you gained from building this color-focused application]",
    realizations: "[Placeholder: Details about the features implemented, technologies used, and challenges overcome]",
    imageSrc: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    repoUrl: "https://github.com/yourusername/keyed-colors",
    demoUrl: "https://keyed-colors.example.com",
    category: "personal"
  },
  
  // Additional Projects
  {
    id: "additional1",
    title: "[Placeholder: Additional Project 1]",
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
    title: "[Placeholder: Additional Project 2]",
    description: "[Placeholder: Brief description of additional project]",
    context: "[Placeholder: Context and background information]",
    contribution: "[Placeholder: Your contribution to the project]",
    lessons: "[Placeholder: Key learnings from the project]",
    realizations: "[Placeholder: Concrete achievements and implementations]",
    imageSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    category: "additional"
  }
];
