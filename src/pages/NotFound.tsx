
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold text-cyber-primary mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> 
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
