import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-card border shadow-sm p-5 ${className}`}>{children}</div>
);

const YouTube: React.FC = () => {
  return (
    <section className="container pt-12 md:pt-16">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">YouTube</h2>
          <a href="https://www.youtube.com/@qlintenFX" target="_blank" className="text-sm underline underline-offset-4">Visit Channel</a>
        </div>
        <div className="relative rounded-lg overflow-hidden border bg-muted/40" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/LAHGY-rWtbk`}
            title="Featured video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Card>
    </section>
  );
};

export default YouTube;


