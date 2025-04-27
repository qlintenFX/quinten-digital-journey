import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowLeft, Download } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { projectsData } from '@/data/projects';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);
  
  // Check if this is the KeyedColors project
  const isKeyedColors = id === "keyed-colors";

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-b from-cyber-light to-background py-16">
        <div className="container">
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <h1 className="mb-4 flex items-center gap-3">
            {isKeyedColors && (
              <img 
                src="/logokeyedcolors.png" 
                alt="KeyedColors Logo" 
                className="h-8 w-auto"
              />
            )}
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <div className="mb-12">
            <img 
              src={project.imageSrc} 
              alt={`${project.title} project`}
              className={`w-full rounded-lg shadow-lg mb-6 ${isKeyedColors ? 'max-w-2xl mx-auto' : 'h-auto'}`} 
            />

            <div className="flex flex-wrap gap-4 mb-8">
              {project.repoUrl && (
                <Button variant="outline" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Repository
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button asChild>
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    {isKeyedColors ? (
                      <>
                        <Download className="mr-2 h-4 w-4" /> Download Free App
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </>
                    )}
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Context & Background</h3>
              <p>{project.context}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">My Contribution</h3>
              <p>{project.contribution}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">What I Learned</h3>
              <p>{project.lessons}</p>
            </Card>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Concrete Realizations</h3>
            <div className="prose max-w-none">
              <p>{project.realizations}</p>
            </div>
          </div>

          {project.additionalImages && project.additionalImages.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.additionalImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Additional visual ${index + 1} for ${project.title}`}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
