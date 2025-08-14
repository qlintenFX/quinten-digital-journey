import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui-optimized/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import CursorEffectsProvider from "./components/ui/CursorEffectsProvider";

// Lazy load components
const Intro = lazy(() => import("./pages/Intro"));
const Index = lazy(() => import("./pages/Index"));
const Professional = lazy(() => import("./pages/Professional"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CursorEffectsProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/style" element={<Index />} />
                <Route path="/professional" element={<Professional />} />
                <Route path="*" element={<Intro />} />
              </Routes>
            </Suspense>
          </HashRouter>
        </CursorEffectsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
