import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Sun, Moon, MousePointer, MousePointerClick } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Switch } from '@/components/ui-optimized/switch';
import { useLocation } from 'react-router-dom';
import { useCursor } from '@/components/ui/CursorEffectsProvider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { cursorEnabled, toggleCursor } = useCursor();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar currentPath={location.pathname} />
      
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-4 bg-card p-2 px-4 rounded-full shadow-lg">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Custom Cursor</p>
            </TooltipContent>
          </Tooltip>
          <Switch 
            checked={cursorEnabled} 
            onCheckedChange={toggleCursor} 
            aria-label="Toggle custom cursor effect"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <MousePointerClick className="h-4 w-4 dark:text-primary text-primary" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Custom Cursor</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="w-px h-6 bg-border"></div>
        
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 dark:text-muted-foreground text-primary" />
          <Switch 
            checked={theme === 'dark'} 
            onCheckedChange={toggleTheme} 
            aria-label="Toggle dark mode"
          />
          <Moon className="h-4 w-4 text-muted-foreground dark:text-primary" />
        </div>
      </div>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
