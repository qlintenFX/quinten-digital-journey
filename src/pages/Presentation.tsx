'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize,
  X
} from 'lucide-react';
import { 
  PurpleSparkle, 
  KeywordHighlight, 
  SparkleText,
  LensGlare,
  GridDeformation
} from '@/components/presentation/Effects';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const presentationRef = useRef<HTMLDivElement>(null);
  const totalSlides = 11;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlide < totalSlides - 1) {
          setCurrentSlide(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        }
      } else if (e.key === 'F' || e.key === 'f') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, isFullscreen]);

  // Handle fullscreen changes from browser controls
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <div 
      ref={presentationRef}
      className="relative w-full h-screen bg-background overflow-hidden"
    >
      <PurpleSparkle count={30} />
      <LensGlare />
      <GridDeformation />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center px-8"
        >
          {/* Slide content */}
          <div className="relative max-w-7xl w-full mx-auto bg-background/60 backdrop-blur-sm rounded-xl shadow-xl p-12 border border-border">
            
            {/* Slide 1: Introduction */}
            {currentSlide === 0 && (
              <div className="flex flex-col items-center justify-center h-[80vh]">
                <h1 className="text-6xl font-bold mb-8">
                  <SparkleText>Welkom</SparkleText>
                </h1>
                <div className="text-4xl text-center mt-4 max-w-4xl">
                  Digital Journey Presentatie <br />
                  <span className="text-2xl mt-4 block">Quinten De Meyer</span>
                </div>
              </div>
            )}

            {/* ... remaining slides ... */}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="absolute inset-x-0 bottom-8 px-8 flex justify-between items-center">
        <button 
          onClick={prevSlide}
          className={`p-5 rounded-full bg-primary/40 text-white hover:bg-primary/60 transition-colors ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={36} />
        </button>
        
        <div className="flex space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-5 h-5 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-primary scale-125 shadow-lg shadow-primary/40' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              aria-label={`Ga naar slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={toggleFullscreen}
            className="p-5 rounded-full bg-primary/40 text-white hover:bg-primary/60 transition-colors mr-5"
            aria-label={isFullscreen ? "Volledig scherm afsluiten" : "Volledig scherm"}
          >
            <Maximize size={28} />
          </button>
          
          <button 
            onClick={nextSlide}
            className={`p-5 rounded-full bg-primary/40 text-white hover:bg-primary/60 transition-colors ${currentSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Slide content wrapper with animation
const SlideContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Timeline point component for the journey slide
const TimelinePoint: React.FC<{ 
  title: string; 
  description: string;
  delay: number;
}> = ({ title, description, delay }) => {
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="w-1/2 pr-10 text-right">
        <h3 className="text-4xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-2xl text-muted-foreground">{description}</p>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
      <div className="w-1/2 pl-10"></div>
    </motion.div>
  );
};

export default Presentation; 