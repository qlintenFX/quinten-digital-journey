'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize,
  X,
  Minimize2
} from 'lucide-react';
import { 
  PurpleSparkle, 
  KeywordHighlight, 
  SparkleText,
  LensGlare,
  GridDeformation
} from '@/components/presentation/Effects';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = 10;

  // Navigate between slides
  const goToNextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  };

  const goToPrevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-background relative overflow-hidden"
    >
      {/* Slides */}
      <div className="w-full h-full">
        <AnimatePresence mode="wait">
          {/* Intro Slide */}
          {currentSlide === 1 && (
            <SlideContent key="slide-1">
              <div className="flex flex-col h-full items-center justify-center px-12 py-12">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-8xl font-bold mb-10 text-center"
                >
                  <SparkleText>Digitale Reis</SparkleText>
                </motion.h1>
                
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl mb-14 text-center"
                >
                  Een overzicht van mijn ontwikkeling en projecten
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-4xl text-center space-y-4"
                >
                  <p>Door: <span className="font-semibold">Quinten De Meyer</span></p>
                  <p>Toegepaste Informatica - Applicatieontwikkeling</p>
                  <p>Thomas More Hogeschool</p>
                </motion.div>
              </div>
            </SlideContent>
          )}

          {/* About Me Slide */}
          {currentSlide === 2 && (
            <SlideContent key="slide-2">
              <div className="flex flex-col h-full px-12 py-12">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-8xl font-bold mb-10"
                >
                  Over Mij
                </motion.h2>
                
                <div className="flex flex-col md:flex-row flex-grow gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 space-y-8 text-4xl"
                  >
                    <p>Als <KeywordHighlight>applicatieontwikkelaar</KeywordHighlight> combineer ik technische vaardigheden met een sterke <KeywordHighlight>creatieve</KeywordHighlight> inslag.</p>
                    
                    <p>Mijn passie ligt in het bouwen van <KeywordHighlight>gebruiksvriendelijke</KeywordHighlight> en <KeywordHighlight>visueel aantrekkelijke</KeywordHighlight> applicaties die complexe problemen oplossen.</p>
                    
                    <p>Naast programmeren ben ik actief als <KeywordHighlight>content creator</KeywordHighlight> op YouTube, waar ik mijn creativiteit verder ontwikkel.</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full max-w-[600px] max-h-[600px] rounded-full overflow-hidden bg-primary/10 p-2">
                      <img 
                        src="/images/profielfoto.jpg" 
                        alt="Quinten De Meyer" 
                        className="w-full h-full object-cover rounded-full"
                      />
                      <LensGlare />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideContent>
          )}

          {/* Project 1 Slide */}
          {currentSlide === 3 && (
            <SlideContent key="slide-3">
              <div className="flex flex-col h-full px-12 py-12">
                <div className="flex items-center mb-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-5 py-2 bg-primary/20 rounded-full text-primary text-2xl font-semibold mr-4"
                  >
                    SKIL2 Project
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-bold"
                  >
                    IT Polis Voting System
                  </motion.h2>
                </div>
                
                <div className="flex flex-col md:flex-row flex-grow">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 space-y-6 text-3xl pr-6"
                  >
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Context</h3>
                      <p>Ontwikkeling van een <KeywordHighlight>stemsysteem</KeywordHighlight> voor het IT Polis evenement, waarbij bezoekers stemmen op studentenprojecten.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Mijn Bijdrage</h3>
                      <p>Verantwoordelijk voor <KeywordHighlight>database architectuur</KeywordHighlight>, implementatie van <KeywordHighlight>real-time leaderboard</KeywordHighlight>, en UI ontwikkeling.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Wat Ik Leerde</h3>
                      <p>Ervaring opgedaan met <KeywordHighlight>veilig databaseontwerp</KeywordHighlight>, <KeywordHighlight>NFC-technologie</KeywordHighlight>, en <KeywordHighlight>real-time datavisualisatie</KeywordHighlight>.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex-1 flex items-center justify-center p-2"
                  >
                    <div className="relative w-full h-full max-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-muted p-4">
                      <img 
                        src="/images/optimized/project-1-Voting-System.webp" 
                        alt="IT Polis Voting System" 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-lg shadow-primary/30"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideContent>
          )}

          {/* Project 2 Slide */}
          {currentSlide === 4 && (
            <SlideContent key="slide-4">
              <div className="flex flex-col h-full px-12 py-12">
                <div className="flex items-center mb-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-5 py-2 bg-primary/20 rounded-full text-primary text-2xl font-semibold mr-4"
                  >
                    SKIL3 Project
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-bold"
                  >
                    App Hosting Platform
                  </motion.h2>
                </div>
                
                <div className="flex flex-col md:flex-row flex-grow">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 space-y-6 text-3xl pr-6"
                  >
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Context</h3>
                      <p>Ontwikkeling van een platform voor klanten om Docker-gebaseerde applicaties eenvoudig te <KeywordHighlight>hosten en beheren</KeywordHighlight>.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Mijn Bijdrage</h3>
                      <p>Focus op <KeywordHighlight>containerisatie</KeywordHighlight>, implementatie van <KeywordHighlight>CI/CD pipelines</KeywordHighlight>, en ontwikkeling van het gebruikersportaal.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Wat Ik Leerde</h3>
                      <p>Diepe kennis van <KeywordHighlight>Docker</KeywordHighlight>, <KeywordHighlight>containerorkestratie</KeywordHighlight>, en <KeywordHighlight>cloud infrastructuur</KeywordHighlight>.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex-1 flex items-center justify-center p-2"
                  >
                    <div className="relative w-full h-full max-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-muted p-4">
                      <img 
                        src="/images/optimized/project-2-Application-Hosting.webp" 
                        alt="App Hosting Platform for Clients" 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-lg shadow-primary/30"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideContent>
          )}

          {/* Project 3 Slide */}
          {currentSlide === 5 && (
            <SlideContent key="slide-5">
              <div className="flex flex-col h-full px-12 py-12">
                <div className="flex items-center mb-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-5 py-2 bg-primary/20 rounded-full text-primary text-2xl font-semibold mr-4"
                  >
                    SKIL4 Project
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-bold"
                  >
                    Security Awareness Campaign
                  </motion.h2>
                </div>
                
                <div className="flex flex-col md:flex-row flex-grow">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 space-y-6 text-3xl pr-6"
                  >
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Context</h3>
                      <p>Creatie van een <KeywordHighlight>awareness campagne</KeywordHighlight> voor bedrijven over cybersecurity risico's, inclusief een informatieve film.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Mijn Bijdrage</h3>
                      <p>Verantwoordelijk voor het <KeywordHighlight>scriptschrijven</KeywordHighlight>, <KeywordHighlight>videoproductie</KeywordHighlight>, en ontwikkeling van bijbehorende trainingsmaterialen.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Wat Ik Leerde</h3>
                      <p>Expertise in <KeywordHighlight>visuele communicatie</KeywordHighlight>, <KeywordHighlight>videopresentatie</KeywordHighlight>, en <KeywordHighlight>cyberbeveiligingsprincipes</KeywordHighlight>.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex-1 flex items-center justify-center p-2"
                  >
                    <div className="relative w-full h-full max-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-muted p-4">
                      <img 
                        src="/images/optimized/project-3-Security-Campaign.webp" 
                        alt="Security Awareness Campaign Movie" 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-lg shadow-primary/30"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideContent>
          )}

          {/* Project 4 Slide */}
          {currentSlide === 6 && (
            <SlideContent key="slide-6">
              <div className="flex flex-col h-full px-12 py-12">
                <div className="flex items-center mb-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-5 py-2 bg-primary/20 rounded-full text-primary text-2xl font-semibold mr-4"
                  >
                    SKIL5 Project
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-bold"
                  >
                    KeyedColors
                  </motion.h2>
                </div>
                
                <div className="flex flex-col md:flex-row flex-grow">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 space-y-6 text-3xl pr-6"
                  >
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Context</h3>
                      <p>Ontwikkeling van een innovatieve tool voor <KeywordHighlight>kleurencombinaties</KeywordHighlight> gebaseerd op muziektheorie en kleurenleer.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Mijn Bijdrage</h3>
                      <p>Volledige ontwikkeling van het concept, de <KeywordHighlight>gebruikersinterface</KeywordHighlight>, en de <KeywordHighlight>kleurberekeningsalgoritmen</KeywordHighlight>.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-semibold mb-3">Wat Ik Leerde</h3>
                      <p>Verdieping in <KeywordHighlight>UX/UI ontwerp</KeywordHighlight>, <KeywordHighlight>kleurentheorie</KeywordHighlight>, en <KeywordHighlight>algoritmeontwerp</KeywordHighlight>.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex-1 flex items-center justify-center p-2"
                  >
                    <div className="relative w-full h-full max-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-muted p-4">
                      <img 
                        src="/images/optimized/project-4-KeyedColors-dynamic-profile.webp" 
                        alt="KeyedColors Project" 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-lg shadow-primary/30"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideContent>
          )}

          {/* Skills Slide */}
          {currentSlide === 7 && (
            <SlideContent key="slide-7">
              <div className="flex flex-col h-full px-12 py-12">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-8xl font-bold mb-10"
                >
                  Ontwikkelde Vaardigheden
                </motion.h2>
                
                <div className="flex flex-col md:flex-row flex-grow">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 space-y-8 text-4xl"
                  >
                    <div>
                      <h3 className="text-5xl font-semibold mb-3 text-primary">Technische Vaardigheden</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Full-stack applicatieontwikkeling</li>
                        <li>Cloud infrastructuur & DevOps</li>
                        <li>UI/UX ontwerp</li>
                        <li>Cybersecurity principes</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-5xl font-semibold mb-3 text-primary">Soft Skills</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Probleemoplossend denken</li>
                        <li>Projectmanagement</li>
                        <li>Visuele communicatie</li>
                        <li>Creatief denken</li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="w-full max-w-[600px]">
                      <GridDeformation />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideContent>
          )}

          {/* YouTube Slide */}
          {currentSlide === 8 && (
            <SlideContent key="slide-8">
              <div className="flex flex-col h-full px-12 py-12">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-8xl font-bold mb-10"
                >
                  YouTube Kanaal
                </motion.h2>
                
                <div className="flex flex-col md:flex-row flex-grow">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 space-y-8 text-4xl"
                  >
                    <p>Naast mijn studies heb ik een <KeywordHighlight>creatieve uitlaatklep</KeywordHighlight> gevonden in het maken van YouTube content.</p>
                    
                    <p>Op mijn kanaal maak ik video's over <KeywordHighlight>tech reviews</KeywordHighlight>, <KeywordHighlight>programmeren</KeywordHighlight>, en <KeywordHighlight>persoonlijke projecten</KeywordHighlight>.</p>
                    
                    <p>Deze ervaring heeft mijn <KeywordHighlight>communicatievaardigheden</KeywordHighlight> en <KeywordHighlight>visuele storytelling</KeywordHighlight> sterk verbeterd.</p>
                    
                    <div className="pt-4">
                      <a 
                        href="https://youtube.com/@QuintDM" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-primary/20 text-primary rounded-full font-semibold hover:bg-primary/30 transition-colors"
                      >
                        Bekijk Mijn Kanaal
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="relative w-full max-w-[600px] h-[330px] rounded-2xl overflow-hidden shadow-xl shadow-primary/20">
                      <img 
                        src="/images/youtube-thumbnail.jpg" 
                        alt="YouTube Thumbnail" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideContent>
          )}

          {/* Future Plans Slide */}
          {currentSlide === 9 && (
            <SlideContent key="slide-9">
              <div className="flex flex-col h-full px-12 py-12">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-8xl font-bold mb-10"
                >
                  Toekomstplannen
                </motion.h2>
                
                <div className="flex flex-col md:flex-row flex-grow">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 space-y-8 text-4xl"
                  >
                    <div>
                      <h3 className="text-5xl font-semibold mb-3 text-primary">Korte Termijn</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Afronden van mijn opleiding met onderscheiding</li>
                        <li>Stage ervaring opdoen in een dynamisch IT-bedrijf</li>
                        <li>KeyedColors verder ontwikkelen als product</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-5xl font-semibold mb-3 text-primary">Lange Termijn</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Specialiseren in UI/UX en frontend ontwikkeling</li>
                        <li>Eigen projecten en producten lanceren</li>
                        <li>Blijven leren en groeien als ontwikkelaar</li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="relative w-full max-w-[600px] h-[400px]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PurpleSparkle />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideContent>
          )}

          {/* Thank You Slide */}
          {currentSlide === 10 && (
            <SlideContent key="slide-10">
              <div className="flex flex-col h-full items-center justify-center px-12 py-12">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-8xl font-bold mb-10 text-center"
                >
                  <SparkleText>Dank voor uw aandacht!</SparkleText>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl text-center space-y-4"
                >
                  <p>Quinten De Meyer</p>
                  <p>Toegepaste Informatica - Applicatieontwikkeling</p>
                  <p className="text-primary font-semibold">quinten.demeyer@student.thomasmore.be</p>
                </motion.div>
              </div>
            </SlideContent>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-0 w-full flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          <button 
            onClick={goToPrevSlide} 
            disabled={currentSlide === 1}
            className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Vorige slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="text-lg font-medium">
            {currentSlide} / {totalSlides}
          </div>
          
          <button 
            onClick={goToNextSlide} 
            disabled={currentSlide === totalSlides}
            className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Volgende slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <button 
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          aria-label="Volledig scherm"
        >
          {isFullscreen ? (
            <Minimize2 className="h-6 w-6" />
          ) : (
            <Maximize className="h-6 w-6" />
          )}
        </button>
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

export default Presentation; 