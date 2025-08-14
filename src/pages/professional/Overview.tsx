import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-card border shadow-sm p-5 ${className}`}>{children}</div>
);

const Overview: React.FC = () => {
  return (
    <section className="container pt-12 md:pt-16">
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        <Card className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Quinten De Meyer</h1>
          <p className="text-muted-foreground mt-2">Applied Computer Science / Electronics - ICT • Cloud & Cyber Security</p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">UI/UX & Interactions</div>
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">Kubernetes & Docker</div>
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">Real-time Systems</div>
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">Video Editing</div>
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">Security Awareness</div>
            <div className="rounded-lg bg-muted/40 border p-3 text-sm">Windows Apps</div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Download CV</p>
              <p className="font-medium">PDF Resume</p>
            </div>
            <a
              href="/files/Quinten De Meyer.pdf"
              download
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            >
              Download
            </a>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <a href="https://github.com/qlintenFX/" target="_blank" className="rounded-md bg-muted/40 border py-2 text-center text-sm hover:bg-muted">GitHub</a>
            <a href="https://www.youtube.com/@qlintenFX" target="_blank" className="rounded-md bg-muted/40 border py-2 text-center text-sm hover:bg-muted">YouTube</a>
            <a href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/" target="_blank" className="rounded-md bg-muted/40 border py-2 text-center text-sm hover:bg-muted">LinkedIn</a>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Overview;


