
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, Briefcase, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-cyber-primary">
            E-PORTFOLIO
            <span className="text-xs align-super ml-1">23</span>
          </Link>
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
          <Link to="/" className="flex items-center gap-1 text-foreground hover:text-cyber-primary transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/about" className="flex items-center gap-1 text-foreground hover:text-cyber-primary transition-colors">
            <User className="h-4 w-4" />
            <span>About Me</span>
          </Link>
          <Link to="/projects" className="flex items-center gap-1 text-foreground hover:text-cyber-primary transition-colors">
            <Briefcase className="h-4 w-4" />
            <span>Projects / Achievements</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b shadow-lg animate-fade-in">
          <nav className="container flex flex-col py-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-3 hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-2 px-4 py-3 hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              <User className="h-5 w-5" />
              <span>About Me</span>
            </Link>
            <Link 
              to="/projects" 
              className="flex items-center gap-2 px-4 py-3 hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              <Briefcase className="h-5 w-5" />
              <span>Projects / Achievements</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
