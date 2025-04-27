import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, User, Briefcase, Mail, Video, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
}

const Navbar = ({ currentPath }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="text-xl font-bold text-primary"
          >
            E-PORTFOLIO
            <span className="text-xs align-super ml-1">25</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className={`flex items-center gap-1 transition-colors relative ${
              activeSection === 'home' 
                ? 'text-primary font-semibold' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
            {activeSection === 'home' && (
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-primary rounded-full shadow-[0_0_12px_rgba(155,135,245,0.5)] transition-all duration-300"></span>
            )}
          </a>
          <a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
            className={`flex items-center gap-1 transition-colors relative ${
              activeSection === 'about' 
                ? 'text-primary font-semibold' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            <User className="h-4 w-4" />
            <span>About Me</span>
            {activeSection === 'about' && (
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-primary rounded-full shadow-[0_0_12px_rgba(155,135,245,0.5)] transition-all duration-300"></span>
            )}
          </a>
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            className={`flex items-center gap-1 transition-colors relative ${
              activeSection === 'projects' 
                ? 'text-primary font-semibold' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Projects / Achievements</span>
            {activeSection === 'projects' && (
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-primary rounded-full shadow-[0_0_12px_rgba(155,135,245,0.5)] transition-all duration-300"></span>
            )}
          </a>
          <a 
            href="#youtube" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('youtube');
            }}
            className={`flex items-center gap-1 transition-colors relative ${
              activeSection === 'youtube' 
                ? 'text-primary font-semibold' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            <Video className="h-4 w-4" />
            <span>YouTube</span>
            {activeSection === 'youtube' && (
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-primary rounded-full shadow-[0_0_12px_rgba(155,135,245,0.5)] transition-all duration-300"></span>
            )}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className={`flex items-center gap-1 transition-colors relative ${
              activeSection === 'contact' 
                ? 'text-primary font-semibold' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Contact</span>
            {activeSection === 'contact' && (
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-primary rounded-full shadow-[0_0_12px_rgba(155,135,245,0.5)] transition-all duration-300"></span>
            )}
          </a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b shadow-lg animate-fade-in">
          <nav className="container flex flex-col py-4">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                activeSection === 'home' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </a>
            <a 
              href="#about" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                activeSection === 'about' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted'
              }`}
            >
              <User className="h-5 w-5" />
              <span>About Me</span>
            </a>
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                activeSection === 'projects' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted'
              }`}
            >
              <Briefcase className="h-5 w-5" />
              <span>Projects / Achievements</span>
            </a>
            <a 
              href="#youtube" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('youtube');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                activeSection === 'youtube' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted'
              }`}
            >
              <Video className="h-5 w-5" />
              <span>YouTube</span>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                activeSection === 'contact' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted'
              }`}
            >
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
