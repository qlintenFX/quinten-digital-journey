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
  const [showControls, setShowControls] = useState(false);
  const presentationRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = 10;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
        showControlsTemporarily();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        showControlsTemporarily();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isFullscreen]);

  // Show controls temporarily when mouse moves
  useEffect(() => {
    const handleMouseMove = () => {
      showControlsTemporarily();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Function to show controls temporarily
  const showControlsTemporarily = () => {
    setShowControls(true);
    
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

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
                    Welkom bij mijn <SparkleText>Portfolio</SparkleText> presentatie
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
                      className="text-7xl font-bold mb-12 text-purple-900"
                    >
                      Over Mij
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="space-y-12 relative">
                        {/* Timeline line */}
                        <div className="absolute top-4 bottom-0 left-4 w-1 bg-primary/50" />
                        
                        {/* Timeline points */}
                        <div className="relative flex items-start pl-16">
                          <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            1
                          </div>
                          <div className="text-4xl">
                            <p className="font-semibold">Vroege interesse</p>
                            <p>Al sinds vroeg <KeywordHighlight>gefascineerd</KeywordHighlight> door computers en technologie.</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start pl-16">
                          <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            2
                          </div>
                          <div className="text-4xl">
                            <p className="font-semibold">Ontdekking van mijn passie</p>
                            <p>Interesse in <KeywordHighlight>beveiliging</KeywordHighlight> en <KeywordHighlight>software</KeywordHighlight> ontwikkeling.</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start pl-16">
                          <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            3
                          </div>
                          <div className="text-4xl">
                            <p className="font-semibold">Keuze voor ICT</p>
                            <p>Start IT-opleiding vanuit <KeywordHighlight>persoonlijke interesse</KeywordHighlight>.</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start pl-16">
                          <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            4
                          </div>
                          <div className="text-4xl">
                            <p className="font-semibold">Specialisatie</p>
                            <p>Focus op <KeywordHighlight>Cloud & Cyber Security</KeywordHighlight>.</p>
                          </div>
                        </div>
                      </div>
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
                    className="text-7xl font-bold mb-16 text-center text-purple-900"
                  >
                    Mijn Projecten
                  </motion.h2>
                  <div className="flex-grow flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="w-full max-w-7xl"
                    >
                      {/* Project Grid */}
                      <div className="grid grid-cols-2 gap-12">
                        <ProjectTile 
                          title="IT Polis Voting System" 
                          description="SKIL2 Project"
                          delay={0.4}
                          iconClass="i-lucide-vote"
                        />
                        
                        <ProjectTile 
                          title="Security Awareness Movie" 
                          description="Media Project"
                          delay={0.6}
                          iconClass="i-lucide-film"
                        />

                        <ProjectTile 
                          title="KeyedColors" 
                          description="Mijn Eigen Project"
                          delay={0.8}
                          iconClass="i-lucide-palette"
                        />
                        
                        <ProjectTile 
                          title="YouTube Kanaal" 
                          description="Creative Platform"
                          delay={1.0}
                          iconClass="i-lucide-youtube"
                        />
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
                      className="px-5 py-2 bg-primary/20 rounded-full text-purple-900 text-2xl font-semibold mr-4"
                    >
                      SKIL2 Project
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-7xl font-bold text-purple-900"
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
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat het is</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li>Een <KeywordHighlight>stem systeem</KeywordHighlight> voor IT Polis</li>
                          <li>Bezoekers stemmen op projecten van studenten</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat ik deed</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li>De <KeywordHighlight>database</KeywordHighlight> architectuur</li>
                          <li>Het <KeywordHighlight>real-time scorebord</KeywordHighlight></li>
                          <li>De user interface ontwikkeling</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat ik leerde</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li><KeywordHighlight>Veilige databases</KeywordHighlight> ontwerpen</li>
                          <li>Werken met <KeywordHighlight>NFC-technologie</KeywordHighlight></li>
                          <li><KeywordHighlight>Data visualisatie</KeywordHighlight> techniek</li>
                        </ul>
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
                      className="px-5 py-2 bg-primary/20 rounded-full text-purple-900 text-2xl font-semibold mr-4"
                    >
                      Media Project
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-7xl font-bold text-purple-900"
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
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat het is</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li>Een <KeywordHighlight>film</KeywordHighlight> over cybersecurity</li>
                          <li>Laat zien waarom je geen USB sticks moet oprapen</li>
                          <li>Educatief materiaal voor awareness</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat ik deed</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li>De <KeywordHighlight>editor</KeywordHighlight> van de film</li>
                          <li><KeywordHighlight>Creative director</KeywordHighlight> voor het verhaal</li>
                          <li>Verantwoordelijk voor de <KeywordHighlight>look en feel</KeywordHighlight></li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat ik leerde</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li><KeywordHighlight>Visueel vertellen</KeywordHighlight> van verhalen</li>
                          <li><KeywordHighlight>Video productie</KeywordHighlight> voor security</li>
                          <li>Effectieve educatieve content maken</li>
                        </ul>
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

            {currentSlide === 5 && (
              <SlideContent key="slide-5">
                <div className="flex flex-col h-full px-20 py-16">
                  <div className="flex items-center mb-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-5 py-2 bg-primary/20 rounded-full text-purple-900 text-2xl font-semibold mr-4"
                    >
                      Mijn Eigen Project
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-7xl font-bold text-purple-900"
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
                          <div className="w-1/3 mx-auto">
                            <img 
                              src="/images/project-4-KeyedColors-logo.png" 
                              alt="KeyedColors Logo" 
                              className="w-full object-contain rounded-xl"
                              style={{
                                filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-8">
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
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat het is</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li>Windows app voor <KeywordHighlight>display profielen</KeywordHighlight></li>
                          <li>Instellen van gamma en contrast</li>
                          <li>Snel wisselen tussen profielen</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat ik deed</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li>Zelf bedacht en ontwikkeld</li>
                          <li>Implementatie van <KeywordHighlight>sneltoetsen</KeywordHighlight></li>
                          <li>Volledig ontwerp en uitvoering</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl font-semibold mb-4 text-purple-900">Wat ik leerde</h3>
                        <ul className="space-y-3 text-4xl list-disc pl-10">
                          <li>Werken met <KeywordHighlight>Windows API</KeywordHighlight></li>
                          <li>Implementeren van <KeywordHighlight>systeemiconen</KeywordHighlight></li>
                          <li><KeywordHighlight>Sneltoetsbeheer</KeywordHighlight> voor desktop apps</li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 6 && (
              <SlideContent key="slide-6">
                <div className="flex flex-col h-full px-20 py-16">
                  <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-bold mb-10 text-center text-purple-900"
                  >
                    Professionele Groei
                  </motion.h2>
                  
                  <div className="flex-grow grid grid-cols-2 gap-16">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col border-r-2 border-primary/30 pr-12"
                    >
                      <h3 className="text-6xl font-semibold text-purple-900 mb-8">Mijn Groei</h3>
                      
                      <div className="space-y-8 flex-grow">
                        <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
                          <h4 className="text-4xl font-semibold mb-5 text-purple-800">Hard Skills</h4>
                          <ul className="space-y-4 text-3xl list-disc pl-8">
                            <li><KeywordHighlight>Databases</KeywordHighlight> ontwerpen & optimaliseren</li>
                            <li><KeywordHighlight>Docker</KeywordHighlight> & containerization</li>
                            <li><KeywordHighlight>Video</KeywordHighlight> productie & bewerking</li>
                            <li><KeywordHighlight>Interfaces</KeywordHighlight> ontwerpen</li>
                          </ul>
                        </div>
                        
                        <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
                          <h4 className="text-4xl font-semibold mb-5 text-purple-800">Soft Skills</h4>
                          <ul className="space-y-4 text-3xl list-disc pl-8">
                            <li>Project <KeywordHighlight>management</KeywordHighlight></li>
                            <li><KeywordHighlight>Probleemoplossend</KeywordHighlight> denken</li>
                            <li><KeywordHighlight>Teamwork</KeywordHighlight> & communicatie</li>
                          </ul>
                        </div>
                        
                        <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
                          <h4 className="text-4xl font-semibold mb-5 text-purple-800">Vaardigheden in Actie</h4>
                          <ul className="space-y-4 text-3xl list-disc pl-8">
                            <li>IT Polis: <KeywordHighlight>database-ontwerp</KeywordHighlight> toegepast</li>
                            <li>Security Movie: <KeywordHighlight>visueel verhalen</KeywordHighlight> vertellen</li>
                            <li>YouTube: <KeywordHighlight>creatieve communicatie</KeywordHighlight></li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col pl-12"
                    >
                      <h3 className="text-6xl font-semibold text-purple-900 mb-8">Toekomstige Ontwikkeling</h3>
                      
                      <div className="space-y-8 flex-grow">
                        <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
                          <h4 className="text-4xl font-semibold mb-5 text-purple-800">Te Verbeteren Vaardigheden</h4>
                          <ul className="space-y-4 text-3xl list-disc pl-8">
                            <li>Enterprise <KeywordHighlight>cloud infrastructuren</KeywordHighlight></li>
                            <li>Moderne <KeywordHighlight>frontend frameworks</KeywordHighlight> door <KeywordHighlight>meer apps</KeywordHighlight> te maken</li>
                            <li><KeywordHighlight>DevOps</KeywordHighlight> automatisering & CI/CD</li>
                            <li><KeywordHighlight>Schaalbare applicaties</KeywordHighlight> ontwikkelen</li>
                          </ul>
                        </div>
                        
                        <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
                          <h4 className="text-4xl font-semibold mb-5 text-purple-800">Mijn Actieplan</h4>
                          <ul className="space-y-4 text-3xl list-disc pl-8">
                            <li><KeywordHighlight>Meer certificaten</KeywordHighlight> behalen</li>
                            <li><KeywordHighlight>Open-source</KeywordHighlight> bijdragen leveren</li>
                            <li><KeywordHighlight>CI/CD</KeywordHighlight> in eigen projecten toepassen</li>
                          </ul>
                        </div>
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
                    className="text-7xl font-bold mb-12 text-center text-purple-900"
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
                      
                      <ul className="space-y-4 text-4xl list-disc pl-10">
                        <li><KeywordHighlight>Video's bewerken</KeywordHighlight> en monteren</li>
                        <li><KeywordHighlight>Online community</KeywordHighlight> onderhouden</li>
                        <li>Visuele storytelling technieken</li>
                      </ul>
                      
                      <p>
                        Deze skills helpen me bij IT projecten:
                      </p>
                      
                      <ul className="space-y-4 text-4xl list-disc pl-10">
                        <li>Betere user interfaces ontwerpen</li>
                        <li>Effectieve visualisaties maken</li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex-1 flex items-center justify-center"
                    >
                      <div className="relative w-full max-w-[600px] flex flex-col gap-8">
                        {/* Featured video */}
                        <div className="w-full overflow-hidden rounded-2xl shadow-lg relative"
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))",
                            border: "3px solid rgba(168, 85, 247, 0.3)",
                          }}
                        >
                          <img 
                            src="/images/optimized/embedvid.webp" 
                            alt="Featured YouTube Video" 
                            className="w-full h-auto"
                            style={{
                              borderRadius: "0.75rem"
                            }}
                          />
                          <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full text-white font-medium flex items-center">
                            <span className="text-xl">30K views</span>
                          </div>
                        </div>
                        
                        {/* Channel info */}
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

            {currentSlide === 8 && (
              <SlideContent key="slide-8">
                <div className="flex flex-col h-full px-20 py-16">
                  <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-8xl font-bold mb-16 text-center text-purple-900"
                  >
                    Conclusie & Toekomst
                  </motion.h2>
                  
                  <div className="flex-grow grid grid-cols-2 gap-20">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col space-y-8 border-r-2 border-primary/30 pr-12"
                    >
                      <h3 className="text-6xl font-semibold text-purple-900 mb-8">Conclusie</h3>
                      
                      <div className="text-4xl space-y-8">
                        <p>
                          Door mijn opleiding ben ik een <KeywordHighlight>veelzijdige ontwikkelaar</KeywordHighlight> geworden die zowel technisch als creatief is.
                        </p>
                        
                        <p>
                          Ik heb veel geleerd over:
                        </p>
                        
                        <ul className="space-y-4 list-disc pl-10">
                          <li><KeywordHighlight>Databases</KeywordHighlight> ontwerpen en optimaliseren</li>
                          <li><KeywordHighlight>Containers</KeywordHighlight> en Kubernetes</li>
                          <li><KeywordHighlight>Video's maken</KeywordHighlight> en bewerken</li>
                          <li><KeywordHighlight>Apps ontwikkelen</KeywordHighlight> voor verschillende platforms</li>
                        </ul>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col space-y-8 pl-12"
                    >
                      <h3 className="text-6xl font-semibold text-purple-900 mb-8">Toekomst</h3>
                      
                      <div className="text-4xl space-y-8">
                        <p>
                          In de toekomst wil ik:
                        </p>
                        
                        <ul className="space-y-4 list-disc pl-10">
                          <li>Meer leren over <KeywordHighlight>cloud</KeywordHighlight> en DevOps</li>
                          <li>Beter worden in <KeywordHighlight>UI/UX</KeywordHighlight></li>
                          <li>Meehelpen aan <KeywordHighlight>open-source</KeywordHighlight> projecten</li>
                          <li><KeywordHighlight>Techniek</KeywordHighlight> en <KeywordHighlight>creativiteit</KeywordHighlight> blijven combineren</li>
                        </ul>
                        
                        <p className="pt-4">
                          Ik wil certificaten halen voor AWS/Azure en experimenteren met CI/CD in mijn eigen projecten.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideContent>
            )}

            {currentSlide === 9 && (
              <SlideContent key="slide-9">
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
                    <p className="text-purple-900 font-semibold">Quinten De Meyer</p>
                    <p className="text-purple-800">quinten1508@gmail.com</p>
                    <p className="text-2xl text-muted-foreground mt-16">2CCS01 - Cloud & Cyber Security</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8 text-4xl flex flex-col items-center"
                  >
                    <p className="text-purple-900 font-semibold">Als volgende ga ik jullie mijn e-portfolio tonen</p>
                    <div className="flex items-center mt-4">
                      <ChevronRight className="text-primary animate-pulse" size={32} />
                      <a 
                        href="https://quinten-de-meyer.be" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-2 text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                      >
                        E-Portfolio Demo
                      </a>
                      <ChevronRight className="text-primary animate-pulse ml-2" size={32} />
                    </div>
                  </motion.div>
                </div>
              </SlideContent>
            )}
          </AnimatePresence>
        </div>
        
        {/* Navigation Controls */}
        <div className="absolute inset-x-0 bottom-8 px-8 flex justify-between items-center">
          {/* Previous slide button - only visible when showControls is true */}
          <motion.button 
            onClick={() => {
              prevSlide();
              showControlsTemporarily();
            }}
            className={`p-5 rounded-full bg-primary/30 text-primary-foreground hover:bg-primary/50 transition-colors ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            disabled={currentSlide === 0}
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft size={36} />
          </motion.button>
          
          {/* Slide tabs - only visible when showControls is true */}
          <motion.div 
            className="flex space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  showControlsTemporarily();
                }}
                className={`w-5 h-5 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-primary scale-125 border-2 border-primary-foreground' 
                    : 'bg-primary/30 hover:bg-primary/60'
                }`}
                aria-label={`Ga naar slide ${index + 1}`}
              />
            ))}
          </motion.div>
          
          <div className="flex items-center">
            {/* Fullscreen button - always visible */}
            <button 
              onClick={toggleFullscreen}
              className="p-5 rounded-full bg-primary/30 text-primary-foreground hover:bg-primary/50 transition-colors mr-5"
              aria-label={isFullscreen ? "Volledig scherm afsluiten" : "Volledig scherm"}
            >
              <Maximize size={28} />
            </button>
            
            {/* Next slide button - only visible when showControls is true */}
            <motion.button 
              onClick={() => {
                nextSlide();
                showControlsTemporarily();
              }}
              className={`p-5 rounded-full bg-primary/30 text-primary-foreground hover:bg-primary/50 transition-colors ${currentSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
              disabled={currentSlide === totalSlides - 1}
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight size={36} />
            </motion.button>
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

// Project tile component for the projects slide
const ProjectTile: React.FC<{ 
  title: string; 
  description: string;
  delay: number;
  iconClass?: string;
}> = ({ title, description, delay, iconClass }) => {
  return (
    <motion.div 
      className="flex flex-col items-center p-8 rounded-2xl bg-primary/10 border-2 border-purple-800/30 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{
        boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)"
      }}
    >
      <div className="w-28 h-28 rounded-full bg-purple-800/30 flex items-center justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-purple-800 shadow-lg shadow-purple-800/50 z-10"></div>
      </div>
      <div className="text-center">
        <h3 className="text-4xl font-bold text-purple-900 mb-4">{title}</h3>
        <p className="text-2xl text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

// Image carousel component for cycling through project images
const ProjectImageCarousel: React.FC<{
  images: { src: string; alt: string }[];
  isActive: boolean;
}> = ({ images, isActive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Reset index when slide changes
  useEffect(() => {
    if (!isActive) {
      setCurrentIndex(0);
    }
  }, [isActive]);
  
  // Only run the timer when the slide is active
  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(timer);
  }, [images.length, isActive]);
  
  return (
    <div className="relative w-full aspect-video flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center"
        >
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt}
            className="w-4/5 h-auto object-contain rounded-xl mx-auto"
            style={{
              filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
            }}
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index 
                ? 'bg-purple-800 scale-125' 
                : 'bg-purple-500/40 hover:bg-purple-500/60'
            }`}
            aria-label={`Ga naar afbeelding ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Presentation; 