import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

const CardLink = ({ to, title, description, icon: Icon, accent }: { to: string, title: string, description: string, icon: any, accent: 'primary' | 'foreground' }) => {
  return (
    <Link to={to} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-lg transition-shadow"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`rounded-lg p-2 bg-${accent}/10 text-${accent}`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
};

const Intro: React.FC = () => {
  const professionalUrl = (import.meta as any)?.env?.VITE_PROFESSIONAL_URL || 'http://localhost:3000';
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.08)_0%,transparent_50%)]" />
      </div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Choose your experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mt-3"
          >
            Select between the current style-forward version or a minimal and professional view.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <CardLink
            to="/style"
            title="Style version"
            description="Rich visuals, animations, and interactive effects."
            icon={Sparkles}
            accent="primary"
          />

          <a href={professionalUrl} target="_blank" rel="noopener noreferrer" className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`rounded-lg p-2 bg-foreground/10 text-foreground`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold">Professional version</h3>
                </div>
                <p className="text-muted-foreground">Clean, minimal presentation-focused layout.</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Intro;


