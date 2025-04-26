
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  context: string;
  contribution: string;
  lessons: string;
  imageSrc: string;
  repoUrl?: string;
  demoUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  context,
  imageSrc,
  repoUrl,
  demoUrl
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={`${title} project thumbnail`} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <p className="text-muted-foreground mb-4 flex-grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={repoUrl} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
          )}
          {demoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </a>
            </Button>
          )}
          <Button asChild size="sm">
            <Link to={`/projects/${id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
