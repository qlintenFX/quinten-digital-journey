'use client';
import React, { useState, useEffect, useRef } from 'react';
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
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isFullscreen]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (presentationRef.current?.requestFullscreen) {
        presentationRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Check fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={presentationRef}
      className="relative w-full h-screen bg-background text-foreground overflow-hidden"
    >
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-cyber-light/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_50%)]" />
      </div>
      
      <GridDeformation />
      <PurpleSparkle count={8} />
      <LensGlare />

      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Slides */}
        <div className="flex-grow relative">
          <AnimatePresence mode="wait">
            {currentSlide === 0 && (
              <SlideContent key="slide-0">
                <div className="flex flex-col items-center justify-center h-full text-center px-20">
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-8xl font-bold mb-8"
                  >
                    Welkom bij mijn <SparkleText>Portfolio Presentatie</SparkleText>
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-5xl mb-12"
                  >
                    Quinten De Meyer
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-4xl text-primary/90"
                  >
                    2CCS01 - Cloud & Cyber Security
                  </motion.p>
                </div>
              </SlideContent>
            )}

            {currentSlide === 1 && (
              <SlideContent key="slide-1">
                <div className="flex flex-col md:flex-row h-full px-20 py-16">
                  <div className="flex-1 pr-12 flex flex-col justify-center">
                    <motion.h2
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-7xl font-bold mb-12 text-primary/90"
                    >
                      Over Mij
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-8 text-4xl"
                    >
                      <p>
                        Ik droomde altijd al van een eigen computer. Zodra ik er één had, was ik constant bezig om <KeywordHighlight>dingen te maken</KeywordHighlight> en meer te <KeywordHighlight>leren</KeywordHighlight> over technologie.
                      </p>
                      <p>
                        Ik zoek steeds naar oplossingen voor wat <KeywordHighlight>ik wil</KeywordHighlight> en wat <KeywordHighlight>anderen kunnen gebruiken</KeywordHighlight> - dit motiveert mij om apps te ontwikkelen die echt waarde toevoegen.
                      </p>
                      <p>
                        Ik koos deze IT-opleiding omdat ik zo <KeywordHighlight>gepassioneerd</KeywordHighlight> ben over technologie dat ik er mijn <KeywordHighlight>carrière</KeywordHighlight> van wil maken en er altijd in wil blijven <KeywordHighlight>werken en leren</KeywordHighlight>.
                      </p>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="flex-1 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="relative w-[500px] h-[500px] rounded-2xl overflow-hidden">
                      <img 
                        src="/images/optimized/profile-photo.webp" 
                        alt="Profielfoto"
                        className="w-full h-full object-cover rounded-2xl"
                        style={{ 
                          filter: "drop-shadow(0 0 25px rgba(168, 85, 247, 0.7))",
                          border: "4px solid rgba(168, 85, 247, 0.5)",
                          boxShadow: "0 0 30px 10px rgba(168, 85, 247, 0.5)"
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 2 && (
              <SlideContent key="slide-2">
                <div className="flex flex-col h-full px-20 py-16">
                  <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-bold mb-12 text-center text-primary/90"
                  >
                    Mijn Reis
                  </motion.h2>
                  <div className="flex-grow flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="w-full max-w-6xl"
                    >
                      <div className="relative">
                        {/* Timeline */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-3 bg-primary/40"></div>
                        
                        {/* Timeline points */}
                        <div className="space-y-20 relative">
                          <TimelinePoint 
                            title="IT Polis Voting System" 
                            description="SKIL2 Project"
                            delay={0.4}
                          />
                          
                          <TimelinePoint 
                            title="App Hosting Platform" 
                            description="SKIL2.2 Project"
                            delay={0.6}
                          />
                          
                          <TimelinePoint 
                            title="Security Awareness Campaign" 
                            description="Media Project"
                            delay={0.8}
                          />

                          <TimelinePoint 
                            title="KeyedColors" 
                            description="Persoonlijk Project"
                            delay={1.0}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 3 && (
              <SlideContent key="slide-3">
                <div className="flex flex-col h-full px-20 py-16">
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
                      className="text-7xl font-bold text-primary/90"
                    >
                      IT Polis Voting System
                    </motion.h2>
                  </div>
                  
                  <div className="flex flex-col md:flex-row flex-grow">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex-1 space-y-8 text-4xl pr-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Context</h3>
                        <p>Ontwikkeling van een <KeywordHighlight>stemsysteem</KeywordHighlight> voor het IT Polis evenement, waarbij bezoekers stemmen op studentenprojecten.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Mijn Bijdrage</h3>
                        <p>Verantwoordelijk voor <KeywordHighlight>database architectuur</KeywordHighlight>, implementatie van <KeywordHighlight>real-time leaderboard</KeywordHighlight>, en UI ontwikkeling.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat Ik Leerde</h3>
                        <p>Ervaring opgedaan met <KeywordHighlight>veilig databaseontwerp</KeywordHighlight>, <KeywordHighlight>NFC-technologie</KeywordHighlight>, en <KeywordHighlight>real-time datavisualisatie</KeywordHighlight>.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex-1 flex items-center justify-center p-4"
                    >
                      <div className="relative w-full h-full max-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-muted/60 p-6">
                        <img 
                          src="/images/optimized/project-1-Voting-System.webp" 
                          alt="IT Polis Voting System" 
                          className="max-w-full max-h-full object-contain rounded-xl"
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))",
                            border: "3px solid rgba(168, 85, 247, 0.4)",
                            boxShadow: "0 0 20px 5px rgba(168, 85, 247, 0.4)"
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 4 && (
              <SlideContent key="slide-4">
                <div className="flex flex-col h-full px-20 py-16">
                  <div className="flex items-center mb-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-5 py-2 bg-primary/20 rounded-full text-primary text-2xl font-semibold mr-4"
                    >
                      SKIL2.2 Project
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-7xl font-bold text-primary/90"
                    >
                      App Hosting Platform
                    </motion.h2>
                  </div>
                  
                  <div className="flex flex-col md:flex-row flex-grow">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex-1 flex items-center justify-center p-4"
                    >
                      <div className="relative w-full h-full max-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-muted/60 p-6">
                        <img 
                          src="/images/optimized/project-2-hosting-platform.webp" 
                          alt="App Hosting Platform" 
                          className="max-w-full max-h-full object-contain rounded-xl"
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))",
                            border: "3px solid rgba(168, 85, 247, 0.4)",
                            boxShadow: "0 0 20px 5px rgba(168, 85, 247, 0.4)"
                          }}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex-1 space-y-8 text-4xl pl-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Context</h3>
                        <p>Ontwikkeling van een <KeywordHighlight>hosting platform</KeywordHighlight> voor PHP/Laravel applicaties binnen Thomas More's datacenter.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Mijn Bijdrage</h3>
                        <p>Verantwoordelijk voor het opzetten en beheren van de <KeywordHighlight>Kubernetes cluster</KeywordHighlight> en implementeren van <KeywordHighlight>geautomatiseerde schaalbaarheid</KeywordHighlight>.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat Ik Leerde</h3>
                        <p>Ervaring met <KeywordHighlight>containerization technologieën</KeywordHighlight>, Kubernetes, en implementatie van <KeywordHighlight>CIS security controls</KeywordHighlight>.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 5 && (
              <SlideContent key="slide-5">
                <div className="flex flex-col h-full px-20 py-16">
                  <div className="flex items-center mb-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-5 py-2 bg-primary/20 rounded-full text-primary text-2xl font-semibold mr-4"
                    >
                      Media Project
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-7xl font-bold text-primary/90"
                    >
                      Security Awareness Campaign
                    </motion.h2>
                  </div>
                  
                  <div className="flex flex-col md:flex-row flex-grow">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex-1 space-y-8 text-4xl pr-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Context</h3>
                        <p>Ontwikkeling van een <KeywordHighlight>educatieve film</KeywordHighlight> over cybersecurity, met focus op de gevaren van gevonden USB-apparaten.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Mijn Bijdrage</h3>
                        <p>Ik was de <KeywordHighlight>hoofdeditor</KeywordHighlight> en <KeywordHighlight>creative director</KeywordHighlight>, verantwoordelijk voor het visuele verhaal en de cinematische kwaliteit.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat Ik Leerde</h3>
                        <p>Verbetering van vaardigheden in <KeywordHighlight>visueel storytelling</KeywordHighlight> en <KeywordHighlight>technische videoproductie</KeywordHighlight> in security-context.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex-1 flex items-center justify-center p-4"
                    >
                      <div className="relative w-full h-full max-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-muted/60 p-6">
                        <img 
                          src="/images/optimized/project-3-video-editing-awareness-movie.webp" 
                          alt="Security Awareness Campaign" 
                          className="max-w-full max-h-full object-contain rounded-xl"
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))",
                            border: "3px solid rgba(168, 85, 247, 0.4)",
                            boxShadow: "0 0 20px 5px rgba(168, 85, 247, 0.4)"
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 6 && (
              <SlideContent key="slide-6">
                <div className="flex flex-col h-full px-20 py-16">
                  <div className="flex items-center mb-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-5 py-2 bg-primary/20 rounded-full text-primary text-2xl font-semibold mr-4"
                    >
                      Persoonlijk Project
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-7xl font-bold text-primary/90"
                    >
                      KeyedColors
                    </motion.h2>
                  </div>
                  
                  <div className="flex flex-col md:flex-row flex-grow">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex-1 flex items-center justify-center p-4"
                    >
                      <div className="relative w-full h-full max-h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-muted/60 p-6">
                        <img 
                          src="/images/project-4-KeyedColors-logo.png" 
                          alt="KeyedColors" 
                          className="max-w-full max-h-full object-contain rounded-xl"
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))",
                            border: "3px solid rgba(168, 85, 247, 0.4)",
                            boxShadow: "0 0 20px 5px rgba(168, 85, 247, 0.4)"
                          }}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex-1 space-y-8 text-4xl pl-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Context</h3>
                        <p>Windows-applicatie voor het maken van <KeywordHighlight>aangepaste display profielen</KeywordHighlight> met gamma- en contrastaanpassingen.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Mijn Bijdrage</h3>
                        <p>Identificeerde een gat in de markt en ontwikkelde volledig zelf deze tool met <KeywordHighlight>hotkey ondersteuning</KeywordHighlight>.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat Ik Leerde</h3>
                        <p>Hands-on ervaring met <KeywordHighlight>Windows API</KeywordHighlight>, <KeywordHighlight>systeemtray integratie</KeywordHighlight> en <KeywordHighlight>global hotkey management</KeywordHighlight>.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 7 && (
              <SlideContent key="slide-7">
                <div className="flex flex-col h-full px-20 py-16">
                  <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-bold mb-12 text-center text-primary/90"
                  >
                    Vaardigheden Ontwikkeling
                  </motion.h2>
                  
                  <div className="flex-grow grid grid-cols-2 gap-20">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-6 text-primary/80">Sterke Vaardigheden</h3>
                        <ul className="space-y-5 text-4xl list-disc pl-12">
                          <li>Database ontwerp en optimalisatie</li>
                          <li>Containerisatie (Docker, Kubernetes)</li>
                          <li>Visueel storytelling en videoproductie</li>
                          <li>UI/UX ontwerp en ontwikkeling</li>
                          <li>Windows applicatie ontwikkeling</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-6 text-primary/80">Zachte Vaardigheden</h3>
                        <ul className="space-y-5 text-4xl list-disc pl-12">
                          <li>Projectmanagement</li>
                          <li>Creatief probleemoplossend denken</li>
                          <li>Teamwork en communicatie</li>
                        </ul>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-6 text-primary/80">Te Verbeteren Vaardigheden</h3>
                        <ul className="space-y-5 text-4xl list-disc pl-12">
                          <li>Cloud infrastructuur op grotere schaal</li>
                          <li>Frontend frameworks verdieping</li>
                          <li>DevOps automatisering</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-6 text-primary/80">Mijn Plan</h3>
                        <p className="text-4xl pl-4">
                          Verdiepen in AWS/Azure certificeringen, bijdragen aan open-source projecten, en experimenteren met CI/CD pipelines in persoonlijke projecten.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 8 && (
              <SlideContent key="slide-8">
                <div className="flex flex-col h-full px-20 py-16">
                  <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-bold mb-12 text-center text-primary/90"
                  >
                    YouTube Kanaal
                  </motion.h2>
                  
                  <div className="flex flex-col md:flex-row flex-grow items-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex-1 space-y-8 text-4xl pr-12"
                    >
                      <p>
                        Mijn YouTube kanaal <KeywordHighlight>@qlintenFX</KeywordHighlight> is een creatieve uitlaatklep waar ik custom cinematics maak voor Assetto Corsa.
                      </p>
                      
                      <p>
                        Dit project heeft mijn vaardigheden versterkt in:
                      </p>
                      
                      <ul className="space-y-5 list-disc pl-12">
                        <li>Video editing en postproductie</li>
                        <li>Visuele compositie en cinematografie</li>
                        <li>Storytelling door visuele middelen</li>
                        <li>Technische optimalisatie voor online platforms</li>
                      </ul>
                      
                      <p>
                        Deze creatieve vaardigheden versterken mijn technische projecten door betere gebruikerservaringen en intuïtieve interfaces te creëren.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex-1 flex items-center justify-center"
                    >
                      <div className="relative w-full max-w-[600px]">
                        <div className="w-full overflow-hidden rounded-2xl shadow-lg bg-muted/60"
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))",
                            border: "3px solid rgba(168, 85, 247, 0.3)",
                          }}
                        >
                          <img 
                            src="/images/optimized/banner.webp" 
                            alt="YouTube Channel Banner" 
                            className="w-full h-auto object-cover"
                          />
                          <div className="p-8">
                            <div className="flex items-center mb-4">
                              <div className="w-20 h-20 rounded-2xl overflow-hidden mr-6 border-2 border-primary">
                                <img 
                                  src="/images/optimized/pfp.webp"
                                  alt="YouTube Profile Picture" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="text-4xl font-bold text-primary">@qlintenFX</h3>
                                <p className="text-2xl text-muted-foreground">Custom cinematics</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 9 && (
              <SlideContent key="slide-9">
                <div className="flex flex-col h-full px-20 py-16">
                  <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-bold mb-16 text-center text-primary/90"
                  >
                    Conclusie & Toekomst
                  </motion.h2>
                  
                  <div className="flex-grow flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-6xl space-y-12 text-4xl text-center"
                    >
                      <p>
                        Mijn reis door Applied Computer Science / Electronics - ICT heeft mij gevormd tot een <KeywordHighlight>veelzijdige ontwikkelaar</KeywordHighlight> met zowel technische als creatieve vaardigheden.
                      </p>
                      
                      <p>
                        Ik heb mij gespecialiseerd in <KeywordHighlight>database architectuur</KeywordHighlight>, <KeywordHighlight>containerizatie</KeywordHighlight>, <KeywordHighlight>videoproductie</KeywordHighlight> en <KeywordHighlight>applicatieontwikkeling</KeywordHighlight>.
                      </p>
                      
                      <p>
                        Mijn toekomstplannen omvatten:
                      </p>
                      
                      <ul className="space-y-6 list-none">
                        <li>Verdieping in cloud infrastructuur en DevOps</li>
                        <li>Verdere ontwikkeling van mijn vaardigheden in UI/UX</li>
                        <li>Bijdragen aan open-source projecten</li>
                        <li>Blijven combineren van technische en creatieve vaardigheden</li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 10 && (
              <SlideContent key="slide-10">
                <div className="flex flex-col items-center justify-center h-full text-center px-20">
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-8xl font-bold mb-16"
                  >
                    <SparkleText>Dank u voor uw aandacht</SparkleText>
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-5xl mb-12 space-y-8"
                  >
                    <p className="text-primary/90 font-semibold">Quinten De Meyer</p>
                    <p className="text-primary/70">quinten1508@gmail.com</p>
                    <p className="text-2xl text-muted-foreground mt-16">Applied Computer Science / Electronics - ICT</p>
                  </motion.div>
                </div>
              </SlideContent>
            )}
          </AnimatePresence>
        </div>
        
        {/* Navigation controls */}
        <div className="absolute inset-x-0 bottom-8 px-8 flex justify-between items-center">
          <button 
            onClick={prevSlide}
            className={`p-5 rounded-full bg-primary/30 text-primary-foreground hover:bg-primary/50 transition-colors ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
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
                    ? 'bg-primary scale-125 border-2 border-primary-foreground' 
                    : 'bg-primary/30 hover:bg-primary/60'
                }`}
                aria-label={`Ga naar slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={toggleFullscreen}
              className="p-5 rounded-full bg-primary/30 text-primary-foreground hover:bg-primary/50 transition-colors mr-5"
              aria-label={isFullscreen ? "Volledig scherm afsluiten" : "Volledig scherm"}
            >
              <Maximize size={28} />
            </button>
            
            <button 
              onClick={nextSlide}
              className={`p-5 rounded-full bg-primary/30 text-primary-foreground hover:bg-primary/50 transition-colors ${currentSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight size={36} />
            </button>
          </div>
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