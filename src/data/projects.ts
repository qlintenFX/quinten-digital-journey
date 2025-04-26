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
    description: "A Windows desktop application for color management and visualization.",
    context: "KeyedColors is a personal project developed to provide an intuitive interface for color management in Windows applications.",
    contribution: "Developed the entire application from concept to implementation, including the user interface and color manipulation functionality.",
    lessons: "Gained deep understanding of color spaces, Windows desktop application development, and user interface design principles.",
    realizations: "Successfully implemented a fully functional color management system with an intuitive user interface, supporting various color formats and providing real-time visualization.",
    imageSrc: "/keyedcolorsapp.png",
    repoUrl: "https://github.com/qlintenFX/KeyedColors",
    demoUrl: "https://github.com/qlintenFX/KeyedColors/releases",
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
