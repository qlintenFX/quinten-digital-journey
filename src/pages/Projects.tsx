
import React from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectsData } from '@/data/projects';

const Projects = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-b from-cyber-light to-background py-16">
        <div className="container">
          <h1 className="text-center mb-6">Projects / Achievements</h1>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            A showcase of my academic and personal projects in the fields of Cloud Computing and Cybersecurity.
          </p>
        </div>
      </section>

      {/* Main Projects Section */}
      <section className="section">
        <div className="container">
          <h2 className="mb-12 text-cyber-primary">Academic Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projectsData
              .filter(project => project.category === 'academic')
              .map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
          </div>
          
          <h2 className="mb-12 text-cyber-primary">Personal Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projectsData
              .filter(project => project.category === 'personal')
              .map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
          </div>
          
          <h2 className="mb-12 text-cyber-primary">Additional Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData
              .filter(project => project.category === 'additional')
              .map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
