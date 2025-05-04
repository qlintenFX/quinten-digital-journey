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
                    Welkom bij mijn <SparkleText>Portfolio</SparkleText>
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
                        Ik wou altijd al een computer hebben. Vanaf dat ik er een had, was ik ermee bezig om <KeywordHighlight>dingen te maken</KeywordHighlight> en ermee te <KeywordHighlight>leren</KeywordHighlight>.
                      </p>
                      <p>
                        Ik was altijd het meest geïnteresseerd in het <KeywordHighlight>beveiligen</KeywordHighlight> en <KeywordHighlight>optimaliseren</KeywordHighlight> van apps. Cybersecurity trok me aan omdat ik wil zorgen dat wat ik en anderen maken ook echt <KeywordHighlight>veilig</KeywordHighlight> is.
                      </p>
                      <p>
                        Ik koos deze IT opleiding omdat ik het zo <KeywordHighlight>leuk vond</KeywordHighlight> dat ik er mijn <KeywordHighlight>carrière</KeywordHighlight> van wil maken en ermee altijd wil <KeywordHighlight>werken en leren</KeywordHighlight>.
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
                    Mijn Projecten
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
                            title="Security Awareness Movie" 
                            description="Media Project"
                            delay={0.8}
                          />

                          <TimelinePoint 
                            title="KeyedColors" 
                            description="Mijn Eigen Project"
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
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat het is</h3>
                        <p>Een <KeywordHighlight>stem systeem</KeywordHighlight> voor IT Polis waar bezoekers stemmen op de projecten van studenten.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat ik deed</h3>
                        <p>Ik maakte de <KeywordHighlight>database</KeywordHighlight>, de <KeywordHighlight>real-time scorebord</KeywordHighlight>, en de user interface.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat ik leerde</h3>
                        <p>Ik leerde over <KeywordHighlight>veilige databases</KeywordHighlight>, <KeywordHighlight>NFC-technologie</KeywordHighlight>, en <KeywordHighlight>data visualisatie</KeywordHighlight>.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex-1 flex items-center justify-center p-4"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="flex flex-col gap-6 w-4/5">
                          <img 
                            src="/images/optimized/project-1-Voting-System.webp" 
                            alt="IT Polis Voting System" 
                            className="w-full h-auto object-contain rounded-xl"
                            style={{
                              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                            }}
                          />
                          <img 
                            src="/images/optimized/project-1-group-picture.png" 
                            alt="Project Team" 
                            className="w-full h-auto object-contain rounded-xl"
                            style={{
                              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                            }}
                          />
                        </div>
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
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-6 w-3/4">
                          <img 
                            src="/images/optimized/project-2-hosting-platform.webp" 
                            alt="App Hosting Platform" 
                            className="w-full object-contain rounded-xl"
                            style={{
                              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                            }}
                          />
                          <img 
                            src="/images/optimized/project-2-hardware-diagram.webp" 
                            alt="Hardware Diagram" 
                            className="w-full object-contain rounded-xl"
                            style={{
                              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                            }}
                          />
                          <img 
                            src="/images/optimized/project-2-software-diagram.webp" 
                            alt="Software Diagram" 
                            className="w-full object-contain rounded-xl"
                            style={{
                              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                            }}
                          />
                          <img 
                            src="/images/optimized/project-2-hosting-platform-repository.webp" 
                            alt="Repository Structure" 
                            className="w-full object-contain rounded-xl"
                            style={{
                              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex-1 space-y-8 text-4xl pl-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat het is</h3>
                        <p>Een <KeywordHighlight>hosting platform</KeywordHighlight> voor PHP/Laravel apps in het datacenter.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat ik deed</h3>
                        <p>Ik maak de <KeywordHighlight>Kubernetes cluster</KeywordHighlight> en zorg voor <KeywordHighlight>automatische schaalbaarheid</KeywordHighlight>.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat ik leerde</h3>
                        <p>Ik leerde werken met <KeywordHighlight>containers</KeywordHighlight>, Kubernetes, en <KeywordHighlight>security controls</KeywordHighlight>.</p>
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
                      Security Awareness Movie
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
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat het is</h3>
                        <p>Een <KeywordHighlight>film</KeywordHighlight> over cybersecurity, die laat zien waarom je geen USB sticks moet oprapen.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat ik deed</h3>
                        <p>Ik was de <KeywordHighlight>editor</KeywordHighlight> en <KeywordHighlight>creative director</KeywordHighlight>, verantwoordelijk voor het verhaal en de look.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat ik leerde</h3>
                        <p>Ik werd beter in <KeywordHighlight>visueel vertellen</KeywordHighlight> en <KeywordHighlight>video productie</KeywordHighlight> voor security awareness.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex-1 flex items-center justify-center p-4"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="flex flex-col gap-6 w-3/4">
                          <img 
                            src="/images/optimized/project-3-video-editing-awareness-movie.webp" 
                            alt="Security Awareness Movie" 
                            className="w-full object-contain rounded-xl"
                            style={{
                              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                            }}
                          />
                          <img 
                            src="/images/optimized/project-3-video-editiing-awareness-movie-2.webp" 
                            alt="Movie Scene" 
                            className="w-full object-contain rounded-xl"
                            style={{
                              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                            }}
                          />
                        </div>
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
                      Mijn Eigen Project
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
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="flex flex-col gap-6 w-3/4">
                          <div className="w-1/2 mx-auto">
                            <img 
                              src="/images/project-4-KeyedColors-logo.png" 
                              alt="KeyedColors Logo" 
                              className="w-full object-contain rounded-xl"
                              style={{
                                filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <img 
                              src="/images/optimized/project-4-KeyedColors-dynamic-profile.webp" 
                              alt="Dynamic Profile" 
                              className="w-full object-contain rounded-xl"
                              style={{
                                filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                              }}
                            />
                            <img 
                              src="/images/optimized/project-4-KeyedColors-profiles.webp" 
                              alt="Profiles" 
                              className="w-full object-contain rounded-xl"
                              style={{
                                filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex-1 space-y-8 text-4xl pl-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat het is</h3>
                        <p>Windows app om <KeywordHighlight>display profielen</KeywordHighlight> te maken met gamma en contrast instellingen.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat ik deed</h3>
                        <p>Ik zag dat er niks was zoals dit en heb het zelf gemaakt met <KeywordHighlight>sneltoetsen</KeywordHighlight>.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-primary/80">Wat ik leerde</h3>
                        <p>Ik leerde werken met <KeywordHighlight>Windows API</KeywordHighlight>, <KeywordHighlight>systeemiconen</KeywordHighlight> en <KeywordHighlight>sneltoetsbeheer</KeywordHighlight>.</p>
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
                    Mijn Skills
                  </motion.h2>
                  
                  <div className="flex-grow grid grid-cols-2 gap-20">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-12"
                    >
                      <div>
                        <h3 className="text-5xl font-semibold mb-6 text-primary/80">Waar ik goed in ben</h3>
                        <ul className="space-y-5 text-4xl list-disc pl-12">
                          <li>Databases maken en verbeteren</li>
                          <li>Docker en Kubernetes gebruiken</li>
                          <li>Video's maken en bewerken</li>
                          <li>Interfaces ontwerpen</li>
                          <li>Windows apps maken</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-6 text-primary/80">Persoonlijke skills</h3>
                        <ul className="space-y-5 text-4xl list-disc pl-12">
                          <li>Projecten organiseren</li>
                          <li>Creatief problemen oplossen</li>
                          <li>Samenwerken en communiceren</li>
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
                        <h3 className="text-5xl font-semibold mb-6 text-primary/80">Wat ik wil verbeteren</h3>
                        <ul className="space-y-5 text-4xl list-disc pl-12">
                          <li>Grote cloud infrastructuren</li>
                          <li>Frontend frameworks</li>
                          <li>DevOps automatisering</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-6 text-primary/80">Mijn Plan</h3>
                        <p className="text-4xl pl-4">
                          AWS/Azure certificaten halen, meewerken aan open-source projecten, en experimenteren met CI/CD in mijn eigen projecten.
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
                        Op mijn YouTube kanaal <KeywordHighlight>@qlintenFX</KeywordHighlight> maak ik custom cinematics voor Assetto Corsa.
                      </p>
                      
                      <p>
                        Hierdoor ben ik beter geworden in:
                      </p>
                      
                      <ul className="space-y-5 list-disc pl-12">
                        <li>Video bewerken</li>
                        <li>Camera composities maken</li>
                        <li>Verhalen vertellen met beeld</li>
                        <li>Videos optimaliseren voor online</li>
                      </ul>
                      
                      <p>
                        Deze skills helpen me ook bij IT projecten omdat ik betere user interfaces kan maken.
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
                    className="text-8xl font-bold mb-16 text-center text-primary/90"
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
                        Door mijn opleiding ben ik een <KeywordHighlight>veelzijdige ontwikkelaar</KeywordHighlight> geworden die zowel technisch als creatief is.
                      </p>
                      
                      <p>
                        Ik heb veel geleerd over <KeywordHighlight>databases</KeywordHighlight>, <KeywordHighlight>containers</KeywordHighlight>, <KeywordHighlight>video's maken</KeywordHighlight> en <KeywordHighlight>apps ontwikkelen</KeywordHighlight>.
                      </p>
                      
                      <p>
                        In de toekomst wil ik:
                      </p>
                      
                      <ul className="space-y-6 list-none">
                        <li>Meer leren over cloud en DevOps</li>
                        <li>Beter worden in UI/UX</li>
                        <li>Meehelpen aan open-source projecten</li>
                        <li>Techniek en creativiteit blijven combineren</li>
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
                    <SparkleText>Bedankt voor het kijken</SparkleText>
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-5xl mb-12 space-y-8"
                  >
                    <p className="text-primary/90 font-semibold">Quinten De Meyer</p>
                    <p className="text-primary/70">quinten1508@gmail.com</p>
                    <p className="text-2xl text-muted-foreground mt-16">2CCS01 - Cloud & Cyber Security</p>
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