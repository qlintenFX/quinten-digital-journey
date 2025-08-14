import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-card border shadow-sm p-5 ${className}`}>{children}</div>
);

const projects = [
  { key: 'project1', title: 'IT Polis Voting System', img: '/images/optimized/project-1-Voting-System.webp' },
  { key: 'project2', title: 'App Hosting Platform for Clients', img: '/images/optimized/project-2-hosting-platform.webp' },
  { key: 'project3', title: 'Security Awareness Campaign Movie', img: '/images/optimized/project-3-video-editing-awareness-movie.webp' },
  { key: 'project4', title: 'KeyedColors', img: '/images/project-4-KeyedColors-logo.png' },
];

const Projects: React.FC = () => {
  return (
    <section className="container pt-12 md:pt-16">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {projects.map((p) => (
          <Card key={p.key}>
            <div className="aspect-video w-full rounded-md overflow-hidden bg-muted/40 border mb-3 flex items-center justify-center">
              <img src={p.img} alt={p.title} className="object-contain w-full h-full" />
            </div>
            <p className="text-sm font-medium line-clamp-2">{p.title}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;


