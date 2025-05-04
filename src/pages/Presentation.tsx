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
              <h1 className="text-5xl font-bold mb-8 text-primary">Jury Presentatie</h1>
              <h2 className="text-4xl font-bold mb-4">Quinten De Meyer</h2>
              <p className="text-xl mb-6">Applied Computer Science / Electronics - ICT</p>
              <div className="relative w-64 h-64 mx-auto my-8">
                <img 
                  src="/images/optimized/profile-photo.webp" 
                  alt="Quinten De Meyer" 
                  className="w-full h-full object-cover rounded-full border-4 border-primary/30"
                  style={{ 
                    filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.7))"
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent"></div>
              </div>
              <p className="text-xl mt-8 max-w-2xl mx-auto">
                Een reis door mijn groei als student en ontwikkelaar
              </p>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {currentSlide === 1 && (
          <SlideAnimation slideKey={1}>
            <SlideContainer title="Wie Ben Ik?">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src="/images/optimized/profile-photo.webp"
                    alt="Profile Photo" 
                    className="w-full rounded-xl shadow-lg"
                    style={{ 
                      filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))",
                      border: "2px solid rgba(168, 85, 247, 0.3)"
                    }}
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Waarom Applied Computer Science / Electronics - ICT?</h3>
                    <p className="text-lg">
                      Ik heb gekozen voor Applied Computer Science / Electronics - ICT omdat ik gefascineerd ben door hoe technologie <KeywordHighlight>echte problemen kan oplossen</KeywordHighlight>. De combinatie van <KeywordHighlight>theoretische kennis</KeywordHighlight> en <KeywordHighlight>praktische toepassingen</KeywordHighlight> stelt me in staat om mijn creatieve ideeën om te zetten in functionele oplossingen.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mijn Creatieve Bezigheden</h3>
                    <p className="text-lg">
                      Naast mijn studie, beheer ik een <KeywordHighlight>YouTube-kanaal</KeywordHighlight> gericht op het maken van cinematics voor Assetto Corsa, wat mijn <KeywordHighlight>video-editing</KeywordHighlight> en storytelling vaardigheden heeft verbeterd. Ik ontwikkel ook <KeywordHighlight>persoonlijke softwareprojecten</KeywordHighlight> zoals KeyedColors.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Professionele Ambities</h3>
                    <p className="text-lg">
                      Mijn ervaringen met <KeywordHighlight>containerisatie</KeywordHighlight>, <KeywordHighlight>beveiligingssystemen</KeywordHighlight>, en <KeywordHighlight>applicatieontwikkeling</KeywordHighlight> hebben mijn professionele richting gevormd. Ik wil me specialiseren in het creëren van robuuste, veilige technologische oplossingen.
                    </p>
                  </div>
                </div>
              </div>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {currentSlide === 2 && (
          <SlideAnimation slideKey={2}>
            <SlideContainer title="Mijn Projecten - Overzicht">
              <p className="text-lg mb-6">
                Tijdens mijn opleiding heb ik aan diverse projecten gewerkt die mijn groei en ontwikkeling als IT professional weerspiegelen. Hieronder presenteer ik vier sleutelprojecten die verschillende aspecten van mijn vaardigheden demonstreren:
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-card/50 p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all">
                  <h3 className="text-xl font-semibold mb-2">IT Polis Voting System</h3>
                  <p className="text-muted-foreground">SKIL2 Project</p>
                  <p className="mt-2">Een stemsysteem voor het IT Polis evenement met real-time tracking en NFC-technologie.</p>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all">
                  <h3 className="text-xl font-semibold mb-2">App Hosting Platform</h3>
                  <p className="text-muted-foreground">SKIL2.2 Project</p>
                  <p className="mt-2">Een hostingplatform voor PHP/Laravel applicaties met geautomatiseerde deployment via Kubernetes.</p>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all">
                  <h3 className="text-xl font-semibold mb-2">Security Awareness Campaign</h3>
                  <p className="text-muted-foreground">Media Project</p>
                  <p className="mt-2">Een educatieve film over cybersecurity awareness en de gevaren van gevonden USB-apparaten.</p>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-all">
                  <h3 className="text-xl font-semibold mb-2">KeyedColors</h3>
                  <p className="text-muted-foreground">Persoonlijk Project</p>
                  <p className="mt-2">Een Windows-applicatie voor het creëren van aangepaste beeldschermprofielen met hotkey-ondersteuning.</p>
                </div>
              </div>
              
              <p className="text-lg">
                Deze projecten tonen niet alleen mijn <KeywordHighlight>technische vaardigheden</KeywordHighlight>, maar ook mijn groei in <KeywordHighlight>projectmanagement</KeywordHighlight>, <KeywordHighlight>probleemoplossend denken</KeywordHighlight>, en <KeywordHighlight>creatieve ontwikkeling</KeywordHighlight>. In de volgende slides zal ik elk project in detail toelichten.
              </p>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Project 1: IT Polis Voting System */}
        {currentSlide === 3 && (
          <SlideAnimation slideKey={3}>
            <SlideContainer title="Project 1: IT Polis Voting System">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Context & Achtergrond</h3>
                    <p className="text-lg">
                      Ontwikkelde een <KeywordHighlight>stemsysteem</KeywordHighlight> voor het IT Polis evenement, waar bezoekers konden stemmen op hun favoriete studentenprojecten. Het systeem moest verzekeren dat elke bezoeker <KeywordHighlight>slechts één keer kon stemmen</KeywordHighlight>, stemmen <KeywordHighlight>real-time</KeywordHighlight> bijhouden, en evenementorganisatoren administratieve controle bieden.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mijn Bijdrage & Ervaring</h3>
                    <p className="text-lg">
                      Ik heb de <KeywordHighlight>database-architectuur</KeywordHighlight> opgezet en beheerd, de gegevensverwerking voor het <KeywordHighlight>live scorebord</KeywordHighlight> geïmplementeerd, en samengewerkt aan de UI-ontwikkeling. Dit project was mijn eerste ervaring met het werken in een <KeywordHighlight>multidisciplinair team</KeywordHighlight> waar we intense feedback-sessies hielden om ons systeem te verfijnen. Door mijn rol in databaseontwerp leerde ik hoe cruciaal het is om een solide fundament te leggen voor een applicatie.
                    </p>
                  </div>
                  
                  <div className="bg-card/50 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">Technologieën</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Database Design</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">NFC Technology</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">UI/UX</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Real-time Systems</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Admin Dashboard</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <img 
                    src="/images/optimized/project-1-Voting-System.webp" 
                    alt="IT Polis Voting System" 
                    className="rounded-xl shadow-lg shadow-primary/20 max-h-[350px] object-contain"
                  />
                  
                  <div className="mt-6 bg-card/50 p-4 rounded-lg border border-primary/20 w-full">
                    <h3 className="text-lg font-semibold mb-2">Persoonlijke Groei</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Dit project heeft me geleerd hoe belangrijk het is om als team te <KeywordHighlight>communiceren</KeywordHighlight> over codestandaarden en architectuurbeslissingen.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Ik ontdekte mijn talent voor het structureren van complexe datastructuren en real-time responsiviteit.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Het werken onder tijdsdruk voor een evenement met een vaste deadline heeft mijn <KeywordHighlight>prioriteringsvaardigheden</KeywordHighlight> aangescherpt.</span>
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
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center">
                  <img 
                    src="/images/optimized/project-2-hosting-platform.webp" 
                    alt="App Hosting Platform" 
                    className="rounded-xl shadow-lg shadow-primary/20 max-h-[350px] object-contain"
                  />
                  
                  <div className="mt-6 bg-card/50 p-4 rounded-lg border border-primary/20 w-full">
                    <h3 className="text-lg font-semibold mb-2">Teamdynamiek</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>In dit project nam ik een <KeywordHighlight>leiderschapsrol</KeywordHighlight> op me binnen de infrastructuurtak, wat mijn zelfvertrouwen in technische besluitvorming versterkte.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>De complexiteit van het project vereiste nauwkeurige <KeywordHighlight>documentatie</KeywordHighlight> en kennisoverdracht tussen teamleden - een cruciale vaardigheid die ik heb ontwikkeld.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Context & Achtergrond</h3>
                    <p className="text-lg">
                      Ontwierp en implementeerde een <KeywordHighlight>hostingplatform</KeywordHighlight> voor PHP/Laravel-applicaties binnen het datacenter van Thomas More. Het platform biedt een <KeywordHighlight>geautomatiseerd deploymentproces</KeywordHighlight> voor webapplicaties, en biedt een efficiënte en schaalbare oplossing waarmee klanten meerdere applicaties veilig kunnen hosten.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mijn Bijdrage & Ervaring</h3>
                    <p className="text-lg">
                      Als <KeywordHighlight>Kubernetes-specialist</KeywordHighlight> in het team moest ik vaak <KeywordHighlight>pionieren met technologieën</KeywordHighlight> die nieuw waren voor onze opleiding. Ik heb zelfstandig veel moeten uitzoeken en vervolgens mijn kennis moeten delen met het team. Deze ervaring leerde me het belang van zowel <KeywordHighlight>autonomie</KeywordHighlight> als <KeywordHighlight>kennisdeling</KeywordHighlight> in een technisch team.
                    </p>
                    <p className="text-lg mt-2">
                      Ik organiseerde wekelijkse <KeywordHighlight>kennisoverdrachtsessies</KeywordHighlight> zodat het hele team de werking van de Kubernetes-architectuur begreep, wat cruciaal was voor het succes van het project.
                    </p>
                  </div>
                  
                  <div className="bg-card/50 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">Technologieën</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Kubernetes</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Docker</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">CI/CD</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">GitLab</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Ansible</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Ubuntu Server</span>
                    </div>
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
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Context & Achtergrond</h3>
                    <p className="text-lg">
                      Creëerde een <KeywordHighlight>educatieve film</KeywordHighlight> over <KeywordHighlight>cybersecurity awareness</KeywordHighlight>, met focus op de gevaren van gevonden USB-apparaten. De film volgt een verhaal waarin een hacker een met malware geïnfecteerde USB in een drukke ruimte plaatst, die vervolgens wordt opgepikt en gebruikt door een nietsvermoedend slachtoffer.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mijn Bijdrage & Ervaring</h3>
                    <p className="text-lg">
                      Als <KeywordHighlight>creatief directeur</KeywordHighlight> had ik de leiding over een multidisciplinair team dat technische en creatieve expertises combineerde. Ik kon hier mijn eerdere ervaring met <KeywordHighlight>videoproductie</KeywordHighlight> inzetten, maar moest ook leren hoe ik een team van mensen met verschillende achtergronden kon aansturen. 
                    </p>
                    <p className="text-lg mt-2">
                      Dit project was een uitdaging omdat we complexe <KeywordHighlight>beveiligingsconcepten begrijpelijk</KeywordHighlight> moesten maken voor een breed publiek. Ik ontdekte dat mijn vermogen om technische kennis te <KeywordHighlight>vertalen naar visuele verhalen</KeywordHighlight> een waardevolle vaardigheid is in IT-communicatie.
                    </p>
                  </div>
                  
                  <div className="bg-card/50 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">Technologieën</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Video Editing</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Cinematography</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Storytelling</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Security Awareness</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Visual Effects</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <img 
                    src="/images/optimized/project-3-video-editing-awareness-movie.webp" 
                    alt="Security Awareness Campaign Movie" 
                    className="rounded-xl shadow-lg shadow-primary/20 max-h-[350px] object-contain"
                  />
                  
                  <div className="mt-6 bg-card/50 p-4 rounded-lg border border-primary/20 w-full">
                    <h3 className="text-lg font-semibold mb-2">Creatief Leiderschap</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Dit project bracht uitdagingen met zich mee bij het <KeywordHighlight>motiveren van teamleden</KeywordHighlight> met verschillende interesses en achtergronden.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Ik leerde om <KeywordHighlight>feedback constructief te geven</KeywordHighlight> aan creatieve bijdragers zonder hun visie te ondermijnen.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Door dit project ontdekte ik hoe krachtig visuele communicatie kan zijn voor <KeywordHighlight>technische educatie</KeywordHighlight>.</span>
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
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center">
                  <img 
                    src="/images/project-4-KeyedColors-logo.png" 
                    alt="KeyedColors" 
                    className="rounded-xl shadow-lg shadow-primary/20 max-h-[200px] object-contain"
                  />
                  
                  <img 
                    src="/images/project-4-KeyedColors-profiles.png" 
                    alt="KeyedColors Profiles" 
                    className="mt-4 rounded-xl shadow-lg shadow-primary/20 max-h-[200px] object-contain"
                  />
                  
                  <div className="mt-6 bg-card/50 p-4 rounded-lg border border-primary/20 w-full">
                    <h3 className="text-lg font-semibold mb-2">Persoonlijk Initiatief</h3>
                    <p className="text-lg mb-2">
                      Dit project ontstond uit een <KeywordHighlight>persoonlijke behoefte</KeywordHighlight> die ik identificeerde: als content creator had ik verschillende beeldscherminstellingen nodig voor verschillende toepassingen, maar er bestond geen handige oplossing.
                    </p>
                    <p className="text-lg">
                      In plaats van te wachten tot iemand anders het zou bouwen, <KeywordHighlight>besloot ik het zelf te maken</KeywordHighlight> - een mentaliteit die mijn aanpak in IT typeert.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Context & Achtergrond</h3>
                    <p className="text-lg">
                      Ontwikkelde een Windows-applicatie voor het maken van <KeywordHighlight>aangepaste beeldschermprofielen</KeywordHighlight> met gamma- en contrastaanpassingen. KeyedColors stelt gebruikers in staat om meerdere beeldscherminstellingen te maken, op te slaan en snel tussen te schakelen met behulp van <KeywordHighlight>aanpasbare sneltoetsen</KeywordHighlight>.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mijn Ervaring</h3>
                    <p className="text-lg">
                      Als <KeywordHighlight>solo-ontwikkelaar</KeywordHighlight> was dit project een heel andere ervaring dan teamprojecten. Ik had volledige creatieve en technische controle, maar ook alle verantwoordelijkheid. Het was een uitdaging om alle aspecten zelf te beheren: van <KeywordHighlight>marktonderzoek</KeywordHighlight> en <KeywordHighlight>gebruikerservaring</KeywordHighlight> tot <KeywordHighlight>technische implementatie</KeywordHighlight> en <KeywordHighlight>testen</KeywordHighlight>.
                    </p>
                    <p className="text-lg mt-2">
                      Dit project heeft me geleerd hoe ik <KeywordHighlight>feedback van gebruikers</KeywordHighlight> moet verwerken in opeenvolgende iteraties van de software. Ik begon met een eenvoudig prototype en breidde het geleidelijk uit op basis van gebruikersinzichten.
                    </p>
                  </div>
                  
                  <div className="bg-card/50 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">Technologieën</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">C#</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">.NET</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Windows API</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">UI/UX</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">System Tray Integration</span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Global Hotkeys</span>
                    </div>
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
              <p className="text-lg mb-8">
                Tijdens mijn opleiding heb ik de volgende ITF-competenties ontwikkeld, elk met verschillende niveaus van groei:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">Analyseren</h3>
                      <div className="flex items-center">
                        <span className="text-primary text-sm mr-2">Sterk</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full w-[85%]"></div>
                        </div>
                      </div>
                    </div>
                    <p>
                      Verbetering in het analyseren van problemen, requirements opstellen en systeemarchitectuur evalueren. Gedemonstreerd in het ontwerp van de database voor het IT Polis Voting System.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">Realiseren</h3>
                      <div className="flex items-center">
                        <span className="text-primary text-sm mr-2">Zeer sterk</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full w-[90%]"></div>
                        </div>
                      </div>
                    </div>
                    <p>
                      Ontwikkeling van concrete oplossingen door de implementatie van code, systemen en infrastructuur, zoals het KeyedColors project en de Kubernetes-cluster.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">Beheren</h3>
                      <div className="flex items-center">
                        <span className="text-primary text-sm mr-2">Goed</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full w-[70%]"></div>
                        </div>
                      </div>
                    </div>
                    <p>
                      Ervaring met het onderhouden en monitoren van systemen, vooral in de context van het App Hosting Platform project, waar ik de Kubernetes-infrastructuur beheerde.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">Communiceren</h3>
                      <div className="flex items-center">
                        <span className="text-primary text-sm mr-2">Goed</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full w-[75%]"></div>
                        </div>
                      </div>
                    </div>
                    <p>
                      Verbeterde communicatievaardigheden door samenwerking in teams en als creatief directeur bij het Security Awareness project, waarbij ik complexe concepten moest uitleggen.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">Managen</h3>
                      <div className="flex items-center">
                        <span className="text-primary text-sm mr-2">Ontwikkelend</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full w-[60%]"></div>
                        </div>
                      </div>
                    </div>
                    <p>
                      Groeiende ervaring in projectmanagement en teamleiderschap, versterkt door de coördinatie van de Security Awareness Campaign Movie.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">Professioneel Handelen</h3>
                      <div className="flex items-center">
                        <span className="text-primary text-sm mr-2">Sterk</span>
                        <div className="w-24 bg-primary/20 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full w-[85%]"></div>
                        </div>
                      </div>
                    </div>
                    <p>
                      Consistent professioneel gedrag in teamwerk, deadlinemanagement en ethisch handelen, vooral bij het implementeren van beveiligingssystemen.
                    </p>
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
              <p className="text-lg mb-8">
                Ondanks mijn ontwikkeling zijn er nog vaardigheden die ik verder wil verbeteren:
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card/50 p-6 rounded-lg border border-primary/20 hover:shadow-lg hover:border-primary/40 transition-all">
                  <h3 className="text-xl font-semibold mb-4">Projectmanagement</h3>
                  <p className="mb-4">
                    Hoewel ik technisch sterk ben, wil ik mijn vaardigheden in het plannen, managen en opvolgen van grotere projecten verbeteren.
                  </p>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">Verbeterplan:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Certificering in Agile methodologieën</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Toepassen van projectmanagementtools in toekomstige projecten</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Meer verantwoordelijkheid nemen in team leadership rollen</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card/50 p-6 rounded-lg border border-primary/20 hover:shadow-lg hover:border-primary/40 transition-all">
                  <h3 className="text-xl font-semibold mb-4">Cloud Architectuur</h3>
                  <p className="mb-4">
                    Ik wil mijn kennis van cloud-gebaseerde oplossingen uitbreiden, met focus op multi-cloud strategieën en serverless architectuur.
                  </p>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">Verbeterplan:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>AWS en Azure certificeringen behalen</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Persoonlijke projecten migreren naar serverless architectuur</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Deelnemen aan cloud architecture workshops</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card/50 p-6 rounded-lg border border-primary/20 hover:shadow-lg hover:border-primary/40 transition-all">
                  <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
                  <p className="mb-4">
                    Verdere ontwikkeling van mijn communicatie, presentatie en samenwerkingsvaardigheden om effectiever te werken in diverse teams.
                  </p>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">Verbeterplan:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Actief deelnemen aan meer groepspresentaties</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Training in effectieve communicatie en conflictoplossing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Netwerken binnen de IT-gemeenschap om mijn contacten uit te breiden</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-lg mt-8">
                Door deze groeipunten aan te pakken, streef ik ernaar een meer afgeronde IT-professional te worden die niet alleen technisch sterk is, maar ook effectief kan functioneren in alle aspecten van IT-projecten.
              </p>
            </SlideContainer>
          </SlideAnimation>
        )}
        
        {/* Slide 10: Conclusie */}
        {currentSlide === 9 && (
          <SlideAnimation slideKey={9}>
            <SlideContainer title="Conclusie">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mijn Groeipad</h3>
                    <p className="text-lg">
                      Tijdens mijn studie ben ik geëvolueerd van een student met technische interesse naar een veelzijdige IT-professional. Ik heb vaardigheden ontwikkeld in databaseontwerp, containerisatie, beveiligingssystemen, videobewerking en applicatieontwikkeling, die samen een solide basis vormen voor mijn toekomstige carrière.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Balans Tussen Technisch & Creatief</h3>
                    <p className="text-lg">
                      Door mijn projecten heb ik een unieke balans gevonden tussen mijn technische vaardigheden en creatieve talenten. Deze combinatie stelt me in staat om innovatieve oplossingen te creëren die zowel functioneel als gebruiksvriendelijk zijn.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Toekomstvisie</h3>
                    <p className="text-lg">
                      Ik kijk ernaar uit om mijn expertise in IT verder te ontwikkelen, met een focus op cloud architectuur, containerisatie en beveiligingssystemen. Ik blijf tegelijkertijd mijn creatieve vaardigheden benutten om complexe technische concepten effectief te communiceren.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between">
                  <div className="bg-card/50 p-6 rounded-lg border border-primary/20 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Kern Verworven Vaardigheden</h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span>Databaseontwerp</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span>Containerisatie</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span>Kubernetes Management</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span>UI/UX Design</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span>Video Editing</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span>Applicatie-ontwikkeling</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span>Beveiligingssystemen</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span>Probleemoplossend denken</span>
                      </div>
                    </div>
                  </div>
                  
                  <img 
                    src="/images/optimized/profile-photo.webp" 
                    alt="Quinten De Meyer" 
                    className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-primary/30"
                    style={{ 
                      filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.7))"
                    }}
                  />
                  
                  <div className="text-center mt-6">
                    <h3 className="text-xl font-semibold mb-3">Contact</h3>
                    <div className="flex justify-center gap-4">
                      <a 
                        href="https://github.com/qlintenFX/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary/30 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary/30 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                      <a 
                        href="https://www.youtube.com/@qlintenFX" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary/30 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                      </a>
                    </div>
                    <p className="mt-2">quinten1508@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <h3 className="text-2xl font-bold">Bedankt voor uw aandacht!</h3>
                <p className="text-lg mt-2">Vragen?</p>
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