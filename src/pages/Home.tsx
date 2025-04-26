
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden gradient-light gradient-dark py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="animate-fade-up mb-4 text-purple-dark dark:text-purple-light">Welcome to My E-Portfolio</h1>
            <div className="parallax-medium">
              <p className="text-xl mb-8 text-muted-foreground">
                Cloud and Cybersecurity student specializing in Applied Computer Science / Electronics - ICT
              </p>
            </div>
            <div className="flex justify-center gap-4 parallax-slow">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/about">
                  About Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-accent">
                <Link to="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-primary">Brief Introduction</h2>
              <p className="mb-4 text-lg">
                [Placeholder: Professional introduction text. This will include a brief overview of who I am professionally,
                my area of specialization in Cloud and Cybersecurity, and what I bring to the field.]
              </p>
              <p className="text-lg">
                [Placeholder: Additional context about my educational journey and why I'm passionate about technology and
                cybersecurity specifically.]
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Placeholder image showing technology workspace"
                className="rounded-md w-full h-auto object-cover"
              />
              <div className="mt-6 bg-secondary p-6 rounded-md shadow-md">
                <h3 className="text-lg font-medium mb-2 text-foreground">Professional Skills</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary rounded-full"></span>
                    <span className="text-foreground">[Placeholder: Skill 1]</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary rounded-full"></span>
                    <span className="text-foreground">[Placeholder: Skill 2]</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary rounded-full"></span>
                    <span className="text-foreground">[Placeholder: Skill 3]</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-accent text-accent-foreground py-16">
        <div className="container text-center">
          <h2 className="mb-4 text-accent-foreground">Explore My Journey</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
            [Placeholder: Inviting text encouraging visitors to explore the different sections of the portfolio
            to learn more about my projects, skills, and ambitions in the field of cybersecurity.]
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link to="/about">About Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              <Link to="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
