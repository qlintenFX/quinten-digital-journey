import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui-optimized/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import CursorEffectsProvider from "./components/ui/CursorEffectsProvider";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CursorEffectsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CursorEffectsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
