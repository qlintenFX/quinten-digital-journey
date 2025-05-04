import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Timer } from 'lucide-react';
import SlideContainer, { SlideAnimation } from '@/components/presentation/SlideContainer';

// Import the specific components needed from Home.tsx with the correct path
import { KeywordHighlight, PurpleSparkle, GridDeformation } from './Home';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [time, setTime] = useState(360); // 6 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const totalSlides = 10;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'n') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'p') {
        prevSlide();
      } else if (e.key === 'f') {
        toggleFullscreen();
      } else if (e.key === 't') {
        toggleTimer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);
  
  // Timer functionality
  useEffect(() => {
    if (isTimerRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsTimerRunning(false);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning, time]);
  
  const toggleTimer = () => {
    setIsTimerRunning(prev => !prev);
  };
  
  const resetTimer = () => {
    setTime(360);
    setIsTimerRunning(false);
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
  
  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background flex flex-col">
      {/* Background effects */}
      <GridDeformation />
      <PurpleSparkle count={10} />
      
      {/* Timer control */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-card/50 p-2 rounded-lg backdrop-blur-sm">
        <button 
          onClick={toggleTimer}
          className="p-1 hover:bg-primary/20 rounded"
        >
          <Timer size={16} className={isTimerRunning ? "text-red-500" : "text-primary"} />
        </button>
        <span className={`text-sm font-mono ${time < 60 ? "text-red-500 font-bold" : ""}`}>
          {formatTime(time)}
        </span>
        <button 
          onClick={resetTimer}
          className="text-xs hover:text-primary"
        >
          Reset
        </button>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-primary/20 hover:bg-primary/40 rounded-full p-2"
        disabled={currentSlide === 0}
      >
        <ChevronLeft size={24} className={currentSlide === 0 ? "opacity-30" : "opacity-100"} />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-primary/20 hover:bg-primary/40 rounded-full p-2"
        disabled={currentSlide === totalSlides - 1}
      >
        <ChevronRight size={24} className={currentSlide === totalSlides - 1 ? "opacity-30" : "opacity-100"} />
      </button>
      
      {/* Slide progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-primary w-4" : "bg-gray-400 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Slide content */}
      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <SlideAnimation slideKey={0}>
            <SlideContainer isCentered>
              <div className="flex flex-col items-center max-w-6xl mx-auto">
                <h1 className="text-6xl font-bold mb-6 text-primary bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent">Jury Presentatie</h1>
                <h2 className="text-5xl font-bold mb-6">Quinten De Meyer</h2>
                <p className="text-2xl mb-8 text-muted-foreground">Applied Computer Science / Electronics - ICT</p>
                <div className="relative w-72 h-72 my-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-full blur-3xl"></div>
                  <img 
                    src="/images/optimized/profile-photo.webp" 
                    alt="Quinten De Meyer" 
                    className="w-full h-full object-cover rounded-full border-4 border-primary/50 relative z-10"
                    style={{ 
                      filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.7))"
                    }}
                  />
                </div>
                <p className="text-2xl mt-8 text-muted-foreground italic">
                  "Een reis door mijn groei als student en ontwikkelaar"
                </p>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {currentSlide === 1 && (
          <SlideAnimation slideKey={1}>
            <SlideContainer title="Wie Ben Ik?">
              <div className="grid md:grid-cols-2 gap-12 h-full items-center">
                <div className="flex items-center justify-center h-full">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/20 to-primary/20 rounded-2xl blur-lg"></div>
                    <img 
                      src="/images/optimized/profile-photo.webp"
                      alt="Profile Photo" 
                      className="w-full max-w-md rounded-xl shadow-lg relative z-10"
                      style={{ 
                        border: "2px solid rgba(168, 85, 247, 0.3)"
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-8 h-full flex flex-col justify-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-primary">Waarom Applied Computer Science / Electronics - ICT?</h3>
                    <ul className="space-y-3 text-xl">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Fascinatie voor <KeywordHighlight>technologie die echte problemen oplost</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Balans tussen <KeywordHighlight>theorie</KeywordHighlight> en <KeywordHighlight>praktijk</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Mogelijkheid om creatieve ideeën om te zetten in functionele oplossingen</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-primary">Mijn Creatieve Bezigheden</h3>
                    <ul className="space-y-3 text-xl">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span><KeywordHighlight>YouTube-kanaal</KeywordHighlight> voor cinematics (Assetto Corsa)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Ontwikkeling van <KeywordHighlight>persoonlijke softwareprojecten</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-primary">Professionele Ambities</h3>
                    <ul className="space-y-3 text-xl">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Specialisatie in <KeywordHighlight>containerisatie</KeywordHighlight> en <KeywordHighlight>beveiligingssystemen</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Creëren van robuuste, veilige technologische oplossingen</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {currentSlide === 2 && (
          <SlideAnimation slideKey={2}>
            <SlideContainer title="Mijn Projecten - Overzicht">
              <div className="flex flex-col h-full justify-center">
                <div className="mb-8 max-w-4xl mx-auto">
                  <p className="text-xl mb-8 text-center">
                    Vier sleutelprojecten die verschillende aspecten van mijn vaardigheden demonstreren:
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-8 max-w-6xl mx-auto">
                  <div className="bg-card/50 p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.01] duration-300">
                    <h3 className="text-2xl font-semibold mb-2 text-primary">IT Polis Voting System</h3>
                    <p className="text-muted-foreground mb-4">SKIL2 Project</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Real-time stemsysteem met NFC-technologie</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Focus op database-architectuur en UI</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/50 p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.01] duration-300">
                    <h3 className="text-2xl font-semibold mb-2 text-primary">App Hosting Platform</h3>
                    <p className="text-muted-foreground mb-4">SKIL2.2 Project</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Kubernetes-gebaseerd hostingplatform</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Geautomatiseerde deployment voor PHP/Laravel</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/50 p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.01] duration-300">
                    <h3 className="text-2xl font-semibold mb-2 text-primary">Security Awareness Campaign</h3>
                    <p className="text-muted-foreground mb-4">Media Project</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Educatieve film over cybersecurity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Regie, productie en visual storytelling</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/50 p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.01] duration-300">
                    <h3 className="text-2xl font-semibold mb-2 text-primary">KeyedColors</h3>
                    <p className="text-muted-foreground mb-4">Persoonlijk Project</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Windows-app voor beeldschermprofielen</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Hotkey-ondersteuning & gebruikersinterface</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center max-w-4xl mx-auto">
                  <p className="text-xl">
                    Deze projecten tonen mijn groei in <KeywordHighlight>technische vaardigheden</KeywordHighlight>, <KeywordHighlight>projectmanagement</KeywordHighlight>, en <KeywordHighlight>creatieve ontwikkeling</KeywordHighlight>.
                  </p>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Project 1: IT Polis Voting System */}
        {currentSlide === 3 && (
          <SlideAnimation slideKey={3}>
            <SlideContainer title="Project 1: IT Polis Voting System">
              <div className="grid grid-cols-2 gap-12 h-full">
                <div className="flex flex-col justify-center space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Context & Achtergrond</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span><KeywordHighlight>Stemsysteem</KeywordHighlight> voor IT Polis evenement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Garandeert <KeywordHighlight>één stem per bezoeker</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span><KeywordHighlight>Real-time</KeywordHighlight> stemmentracking</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Mijn Bijdrage</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Opzet van <KeywordHighlight>database-architectuur</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Implementatie <KeywordHighlight>live scorebord</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Samenwerking in <KeywordHighlight>multidisciplinair team</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Database Design</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">NFC Technology</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">UI/UX</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Real-time Systems</span>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center space-y-6 h-full">
                  <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-lg">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500/20 to-primary/20 rounded-xl blur-md"></div>
                      <img 
                        src="/images/optimized/project-1-Voting-System.webp" 
                        alt="IT Polis Voting System" 
                        className="rounded-xl shadow-lg shadow-primary/20 w-full object-contain relative z-10"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-card/50 p-5 rounded-xl border border-primary/20 mt-4">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Persoonlijke Groei</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Leerde het belang van <KeywordHighlight>teamcommunicatie</KeywordHighlight> over codestandaarden</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Ontdekte talent voor structureren van complexe datastructuren</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Verbeterde <KeywordHighlight>prioriteringsvaardigheden</KeywordHighlight> onder tijdsdruk</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Project 2: App Hosting Platform */}
        {currentSlide === 4 && (
          <SlideAnimation slideKey={4}>
            <SlideContainer title="Project 2: App Hosting Platform">
              <div className="grid grid-cols-2 gap-12 h-full">
                <div className="flex flex-col justify-center space-y-6 h-full">
                  <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-lg">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500/20 to-primary/20 rounded-xl blur-md"></div>
                      <img 
                        src="/images/optimized/project-2-hosting-platform.webp" 
                        alt="App Hosting Platform" 
                        className="rounded-xl shadow-lg shadow-primary/20 w-full object-contain relative z-10"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-card/50 p-5 rounded-xl border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Teamdynamiek</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Nam <KeywordHighlight>leiderschapsrol</KeywordHighlight> binnen infrastructuurtak</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Organiseerde wekelijkse <KeywordHighlight>kennisoverdrachtsessies</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Ontwikkelde systemen voor <KeywordHighlight>documentatie</KeywordHighlight> en kennisdeling</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Context & Achtergrond</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span><KeywordHighlight>Hostingplatform</KeywordHighlight> voor PHP/Laravel</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span><KeywordHighlight>Geautomatiseerd deployment</KeywordHighlight> proces</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Schaalbaar systeem voor <KeywordHighlight>meerdere applicaties</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Mijn Bijdrage</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Rol als <KeywordHighlight>Kubernetes-specialist</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span><KeywordHighlight>Pionieren</KeywordHighlight> met nieuwe technologieën</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Balans tussen <KeywordHighlight>autonomie</KeywordHighlight> en <KeywordHighlight>teamwerk</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Kubernetes</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Docker</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">CI/CD</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">GitLab</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Ansible</span>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Project 3: Security Awareness Campaign */}
        {currentSlide === 5 && (
          <SlideAnimation slideKey={5}>
            <SlideContainer title="Project 3: Security Awareness Campaign">
              <div className="grid grid-cols-2 gap-12 h-full">
                <div className="flex flex-col justify-center space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Context & Achtergrond</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span><KeywordHighlight>Educatieve film</KeywordHighlight> over cybersecurity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Focus op gevaren van <KeywordHighlight>malware</KeywordHighlight> via USB-apparaten</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Verhalende aanpak voor <KeywordHighlight>bewustwording</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Mijn Bijdrage</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Functie als <KeywordHighlight>creatief directeur</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Toepassing van <KeywordHighlight>videoproductie</KeywordHighlight> ervaring</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Vertaling van <KeywordHighlight>technische concepten</KeywordHighlight> naar visuele verhalen</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Video Editing</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Cinematography</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Storytelling</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Security Awareness</span>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center space-y-6 h-full">
                  <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-lg">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500/20 to-primary/20 rounded-xl blur-md"></div>
                      <img 
                        src="/images/optimized/project-3-video-editing-awareness-movie.webp" 
                        alt="Security Awareness Campaign Movie" 
                        className="rounded-xl shadow-lg shadow-primary/20 w-full object-contain relative z-10"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-card/50 p-5 rounded-xl border border-primary/20 mt-4">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Creatief Leiderschap</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Uitdaging bij <KeywordHighlight>motiveren</KeywordHighlight> van divers team</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Ontwikkeling van <KeywordHighlight>constructieve feedback</KeywordHighlight> technieken</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Ontdekking van kracht van <KeywordHighlight>visuele communicatie</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Project 4: KeyedColors */}
        {currentSlide === 6 && (
          <SlideAnimation slideKey={6}>
            <SlideContainer title="Project 4: KeyedColors">
              <div className="grid grid-cols-2 gap-12 h-full">
                <div className="flex flex-col justify-center space-y-6 h-full">
                  <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-lg flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500/20 to-primary/20 rounded-xl blur-md"></div>
                        <img 
                          src="/images/project-4-KeyedColors-logo.png" 
                          alt="KeyedColors Logo" 
                          className="rounded-xl shadow-lg shadow-primary/20 h-40 object-contain relative z-10 bg-white/5 p-4"
                        />
                      </div>
                      
                      <div className="relative mt-6">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500/20 to-primary/20 rounded-xl blur-md"></div>
                        <img 
                          src="/images/project-4-KeyedColors-profiles.png" 
                          alt="KeyedColors Profiles" 
                          className="rounded-xl shadow-lg shadow-primary/20 w-full object-contain relative z-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card/50 p-5 rounded-xl border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Persoonlijk Initiatief</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Ontstaan uit <KeywordHighlight>persoonlijke behoefte</KeywordHighlight> als content creator</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span><KeywordHighlight>"Zelf maken"</KeywordHighlight> mentaliteit als drijfveer</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Volledige <KeywordHighlight>zelfstandige ontwikkeling</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Context & Achtergrond</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Windows-app voor <KeywordHighlight>beeldschermprofielen</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Schakelen tussen profielen met <KeywordHighlight>sneltoetsen</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Gamma- en <KeywordHighlight>contrastaanpassingen</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Mijn Ervaring</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Complete <KeywordHighlight>autonomie</KeywordHighlight> als solo-ontwikkelaar</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Beheer van alle projectaspecten: van <KeywordHighlight>concept tot implementatie</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Iteratieve ontwikkeling via <KeywordHighlight>gebruikersfeedback</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">C#</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">.NET</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Windows API</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">UI/UX</span>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">Global Hotkeys</span>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Slide 8: Vaardigheden Analyse */}
        {currentSlide === 7 && (
          <SlideAnimation slideKey={7}>
            <SlideContainer title="Vaardigheden Analyse">
              <div className="flex flex-col h-full justify-center">
                <div className="text-center mb-8">
                  <p className="text-xl max-w-4xl mx-auto">
                    Tijdens mijn opleiding heb ik de volgende ITF-competenties ontwikkeld:
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-6xl mx-auto">
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20 transform transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-semibold text-primary">Analyseren</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-sm font-semibold">Sterk</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full overflow-hidden">
                          <div className="bg-primary h-3 rounded-full w-[85%]"></div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Database architectuur in IT Polis Voting System</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Requirements opstellen voor complexe systemen</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20 transform transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-semibold text-primary">Realiseren</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-sm font-semibold">Zeer sterk</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full overflow-hidden">
                          <div className="bg-primary h-3 rounded-full w-[90%]"></div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Ontwikkeling KeyedColors applicatie</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Kubernetes-cluster voor App Hosting Platform</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20 transform transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-semibold text-primary">Beheren</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-sm font-semibold">Goed</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full overflow-hidden">
                          <div className="bg-primary h-3 rounded-full w-[70%]"></div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Kubernetes infrastructuur monitoring</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Maintenance van live deployment systemen</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20 transform transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-semibold text-primary">Communiceren</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-sm font-semibold">Goed</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full overflow-hidden">
                          <div className="bg-primary h-3 rounded-full w-[75%]"></div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Uitleg complexe concepten in Security Awareness project</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Kennisoverdrachtsessies in teamprojecten</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20 transform transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-semibold text-primary">Managen</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-sm font-semibold">Ontwikkelend</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full overflow-hidden">
                          <div className="bg-primary h-3 rounded-full w-[60%]"></div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Creatief directeur bij Security Awareness Project</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Leiderschapsrollen binnen kleine teams</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20 transform transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-semibold text-primary">Professioneel Handelen</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-sm font-semibold">Sterk</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full overflow-hidden">
                          <div className="bg-primary h-3 rounded-full w-[85%]"></div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Consistent professioneel gedrag in teams</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>Ethisch handelen bij beveiligingssystemen</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Slide 9: Groeipunten */}
        {currentSlide === 8 && (
          <SlideAnimation slideKey={8}>
            <SlideContainer title="Groeipunten">
              <div className="flex flex-col h-full justify-center">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-8 text-center">
                    <p className="text-xl max-w-3xl mx-auto">
                      Areas waar ik me verder in wil ontwikkelen:
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-8">
                    <div className="bg-card/40 p-6 rounded-xl border border-primary/20 hover:shadow-xl hover:border-primary/40 transition-all transform hover:-translate-y-2 duration-300">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-full w-16 h-16 blur-xl"></div>
                        <div className="relative z-10 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-full w-16 h-16 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-4 text-primary">Projectmanagement</h3>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>Plannen van grotere projecten</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>Management van team resources</span>
                        </li>
                      </ul>
                      
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Mijn plan:</h4>
                        <p className="text-sm">Agile certificering & praktijkervaring in projectleiding</p>
                      </div>
                    </div>
                    
                    <div className="bg-card/40 p-6 rounded-xl border border-primary/20 hover:shadow-xl hover:border-primary/40 transition-all transform hover:-translate-y-2 duration-300">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-full w-16 h-16 blur-xl"></div>
                        <div className="relative z-10 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-full w-16 h-16 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-4 text-primary">Cloud Architectuur</h3>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>Multi-cloud strategieën</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>Serverless architectuur</span>
                        </li>
                      </ul>
                      
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Mijn plan:</h4>
                        <p className="text-sm">AWS & Azure certificeringen behalen en praktijkervaring opdoen</p>
                      </div>
                    </div>
                    
                    <div className="bg-card/40 p-6 rounded-xl border border-primary/20 hover:shadow-xl hover:border-primary/40 transition-all transform hover:-translate-y-2 duration-300">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-full w-16 h-16 blur-xl"></div>
                        <div className="relative z-10 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-full w-16 h-16 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-4 text-primary">Soft Skills</h3>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>Presentatie vaardigheden</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>Teamcommunicatie</span>
                        </li>
                      </ul>
                      
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Mijn plan:</h4>
                        <p className="text-sm">Actief deelnemen aan presentaties en training in conflictoplossing</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-10">
                    <p className="text-lg max-w-3xl mx-auto">
                      Door deze groeipunten te adresseren streef ik ernaar een meer afgeronde IT-professional te worden
                    </p>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Slide 10: Conclusie */}
        {currentSlide === 9 && (
          <SlideAnimation slideKey={9}>
            <SlideContainer title="Conclusie">
              <div className="grid grid-cols-2 gap-12 h-full">
                <div className="flex flex-col justify-center space-y-8">
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20">
                    <h3 className="text-2xl font-semibold mb-4 text-primary">Mijn Groeipad</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Evolutie naar <KeywordHighlight>veelzijdige IT-professional</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Solide basis in diverse technologieën</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Balans tussen <KeywordHighlight>technisch</KeywordHighlight> en <KeywordHighlight>creatief</KeywordHighlight></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20">
                    <h3 className="text-2xl font-semibold mb-4 text-primary">Toekomstvisie</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Focus op <KeywordHighlight>cloud architectuur</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Specialisatie in <KeywordHighlight>containerisatie</KeywordHighlight></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span>Communicatie van complexe concepten</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between h-full">
                  <div className="bg-card/30 p-6 rounded-xl border border-primary/20 mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-primary">Kern Verworven Vaardigheden</h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Databaseontwerp</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Containerisatie</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Kubernetes</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>UI/UX Design</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Video Editing</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>App Development</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Security Systems</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Problem Solving</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-full blur-xl"></div>
                      <img 
                        src="/images/optimized/profile-photo.webp" 
                        alt="Quinten De Meyer" 
                        className="w-full h-full object-cover rounded-full border-4 border-primary/30 relative z-10"
                      />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">Contact</h3>
                    <div className="flex justify-center gap-4 mb-1">
                      <a 
                        href="https://github.com/qlintenFX/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary/30 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary/30 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                      <a 
                        href="https://www.youtube.com/@qlintenFX" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary/30 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                      </a>
                    </div>
                    <p className="text-sm">quinten1508@gmail.com</p>
                  </div>
                  
                  <div className="text-center mt-4 p-6 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-xl border border-primary/20">
                    <h3 className="text-2xl font-bold">Bedankt voor uw aandacht!</h3>
                    <p className="text-lg mt-2">Vragen?</p>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
      </AnimatePresence>
      
      {/* Fullscreen button */}
      <button 
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 z-50 bg-primary/20 hover:bg-primary/40 p-2 rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      </button>
    </div>
  );
};

export default Presentation; 