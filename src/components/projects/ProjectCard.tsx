import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Download } from 'lucide-react';
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
  // Determine if this is the KeyedColors project
  const isKeyedColors = id === "keyed-colors";
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
      <div className={`overflow-hidden ${isKeyedColors ? 'h-36' : 'h-48'}`}>
        <img 
          src={imageSrc} 
          alt={`${title} project thumbnail`} 
          className={`w-full object-cover transition-transform hover:scale-105 ${isKeyedColors ? 'object-contain py-2' : 'h-full'}`}
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isKeyedColors && (
            <img 
              src="/logokeyedcolors.png" 
              alt="KeyedColors Logo" 
              className="h-6 w-auto"
            />
          )}
          {title}
        </CardTitle>
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
                {isKeyedColors ? (
                  <>
                    <Download className="mr-2 h-4 w-4" /> Free App
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </>
                )}
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
