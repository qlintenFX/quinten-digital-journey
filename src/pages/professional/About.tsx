import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-card border shadow-sm p-5 ${className}`}>{children}</div>
);

const About: React.FC = () => {
  return (
    <section className="container pt-12 md:pt-16">
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        <Card className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-3">About Me</h2>
          <p className="text-muted-foreground">
            I’m Quinten, a passionate student in Applied Computer Science / Electronics – ICT. I design and develop digital
            experiences with creativity and technical expertise. My interests span UI/UX, real-time systems, security, and
            video production.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">Why ICS? Real-world problem solving</div>
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">YouTube cinematics sharpen storytelling</div>
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">Personal projects like KeyedColors</div>
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">Focus on secure, robust solutions</div>
          </div>
        </Card>
        <Card>
          <div className="rounded-lg overflow-hidden bg-muted/40 border aspect-square flex items-center justify-center">
            <img src="/images/optimized/profile-photo.webp" alt="Profile" className="object-cover w-full h-full" />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;


