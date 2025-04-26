
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { useTheme } from '@/hooks/use-theme';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/about':
        return 'About Me';
      case '/projects':
        return 'Projects';
      default:
        if (path.startsWith('/projects/')) return 'Project Detail';
        return 'Not Found';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {location.pathname !== '/' && (
              <BreadcrumbItem>
                <BreadcrumbLink>{getPageTitle(location.pathname)}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-purple-dark"
          />
          <Moon className="h-4 w-4" />
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
