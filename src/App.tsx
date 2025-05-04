import React, { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui-optimized/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import CursorEffectsProvider from "./components/ui/CursorEffectsProvider";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Presentation = lazy(() => import("./pages/Presentation"));

// Function to detect if we're on GitHub Pages
const isGitHubPages = () => {
  return window.location.hostname === "quinten-de-meyer.be" || 
         window.location.hostname === "qlintenfx.github.io";
};

const App = () => {
  // Handle URL format for GitHub Pages
  useEffect(() => {
    // If we're on GitHub Pages and using a hash URL but it's not recognized
    if (isGitHubPages() && window.location.hash.startsWith('#/')) {
      const path = window.location.hash.substring(1); // Remove the # character
      
      // Redirect to the non-hash version since that's what's working
      window.location.href = path;
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CursorEffectsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/presentation" element={<Presentation />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CursorEffectsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const queryClient = new QueryClient();

export default App;
