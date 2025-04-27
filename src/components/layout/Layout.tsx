import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Switch } from '@/components/ui-optimized/switch';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar currentPath={location.pathname} />
      
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-card p-2 rounded-full shadow-lg">
        <Sun className="h-4 w-4 dark:text-muted-foreground text-primary" />
        <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        <Moon className="h-4 w-4 text-muted-foreground dark:text-primary" />
      </div>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
