import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-card border shadow-sm p-5 ${className}`}>{children}</div>
);

const Contact: React.FC = () => {
  return (
    <section className="container pt-12 md:pt-16 pb-20">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-base font-semibold mb-3">Email</h3>
          <a href="mailto:quinten1508@gmail.com" className="text-sm underline underline-offset-4">quinten1508@gmail.com</a>
        </Card>
        <Card>
          <h3 className="text-base font-semibold mb-3">LinkedIn</h3>
          <a href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/" target="_blank" className="text-sm underline underline-offset-4">Profile</a>
        </Card>
        <Card>
          <h3 className="text-base font-semibold mb-3">GitHub</h3>
          <a href="https://github.com/qlintenFX/" target="_blank" className="text-sm underline underline-offset-4">qlintenFX</a>
        </Card>
      </div>
    </section>
  );
};

export default Contact;


