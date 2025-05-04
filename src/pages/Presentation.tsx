import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useAnimation } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail, Youtube } from 'lucide-react';

// Import utility functions from Home page
function isDarkMode() {
  return document.documentElement.classList.contains('dark');
}

// Import visual components from Home page
const KeywordHighlight = ({ children, className = "" }) => {
  return (
    <span 
      className={`relative font-semibold text-primary ${className}`}
      style={{ 
        textShadow: "0 0 8px rgba(168, 85, 247, 0.4)"
      }}
    >
      {children}
    </span>
  );
};

const InteractiveTitleEffect = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    setIsDark(isDarkMode());
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(isDarkMode());
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (isHovered) {
      const count = Math.floor(Math.random() * 5) + 4;
      const newBubbles = Array(count).fill(0).map(() => ({
        id: Math.random(),
        x: Math.random() * 120 - 10,
        y: Math.random() * 120 - 10,
        size: Math.random() * 25 + 15,
        delay: Math.random() * 0.3,
        duration: Math.random() * 0.8 + 0.5,
        opacity: Math.random() * 0.7 + 0.3
      }));
      setBubbles(newBubbles);
    }
  }, [isHovered]);
  
  return (
    <div className="relative mb-8">
      <div 
        className={`inline-block relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-primary relative z-10"
          animate={isHovered ? {
            textShadow: [
              "0 0 7px rgba(168,85,247,0.6)",
              "0 0 15px rgba(168,85,247,0.8)",
              "0 0 7px rgba(168,85,247,0.6)"
            ],
            color: [
              "rgb(168,85,247)",
              "rgb(192,132,252)",
              "rgb(168,85,247)"
            ]
          } : {}}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {children}
        </motion.h2>
        
        <AnimatePresence>
          {isHovered && bubbles.map(bubble => (
            <motion.div
              key={bubble.id}
              className="absolute pointer-events-none"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                zIndex: 20
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, bubble.opacity, 0],
                scale: [0, 1, 0],
                y: [0, -40, -80]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: bubble.duration,
                delay: bubble.delay,
                ease: "easeOut"
              }}
            >
              <img 
                src={isDark ? "/images/dark-mode-bubble.png" : "/images/light-mode-bubble.png"}
                alt=""
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const PurpleSparkle = ({ count = 15 }) => {
  const [sparkles, setSparkles] = useState([]);
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    setIsDark(isDarkMode());
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(isDarkMode());
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const initialSparkles = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      size: Math.random() * 20 + 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.6 + 0.3,
      animationDuration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }));
    
    setSparkles(initialSparkles);
    
    const interval = setInterval(() => {
      setSparkles(prevSparkles => {
        const replacementCount = Math.floor(Math.random() * 3) + 1;
        const newSparkles = [...prevSparkles];
        
        for (let i = 0; i < replacementCount; i++) {
          const indexToReplace = Math.floor(Math.random() * prevSparkles.length);
          newSparkles[indexToReplace] = {
            id: Math.random(),
            size: Math.random() * 20 + 10,
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotation: Math.random() * 360,
            opacity: Math.random() * 0.6 + 0.3,
            animationDuration: Math.random() * 15 + 10,
            delay: 0,
          };
        }
        
        return newSparkles;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [count]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
            rotate: `${sparkle.rotation}deg`,
            zIndex: 1,
          }}
          animate={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [sparkle.opacity, sparkle.opacity * 1.2, sparkle.opacity * 0.8, sparkle.opacity],
          }}
          transition={{
            duration: sparkle.animationDuration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={isDark ? "/images/optimized/star.webp" : "/images/optimized/light-mode-star.webp"}
            alt=""
            className="w-full h-full"
            width="30"
            height="30"
          />
        </motion.div>
      ))}
    </div>
  );
};

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tilt
      className="w-full h-full"
      perspective={1200}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.03}
      transitionSpeed={800}
      tiltReverse={false}
      gyroscope={false}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="rgba(255, 255, 255, 0.25)"
      glarePosition="all"
      glareBorderRadius="12px"
      tiltEnable={true}
      trackOnWindow={false}
      reset={true}
    >
      <div className="w-full h-full transition-shadow duration-300 hover:shadow-[0_10px_25px_-5px_rgba(168,85,247,0.3)]">
        {children}
      </div>
    </Tilt>
  );
};

const LensGlare = () => {
  const [glarePositions, setGlarePositions] = useState([]);
  const [distantGlows, setDistantGlows] = useState([]);
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    setIsDark(isDarkMode());
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(isDarkMode());
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const count = Math.floor(Math.random() * 3) + 3;
    const newGlarePositions = Array(count).fill(0).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      opacity: Math.random() * 0.15 + 0.08,
      blur: Math.random() * 50 + 50,
    }));
    setGlarePositions(newGlarePositions);
    
    const distantCount = Math.floor(Math.random() * 3) + 2;
    const newDistantGlows = Array(distantCount).fill(0).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 600 + 500,
      opacity: Math.random() * 0.2 + 0.1,
      blur: Math.random() * 100 + 120,
      color: [
        'rgba(168, 85, 247, 0.35)',
        'rgba(196, 111, 255, 0.3)',
        'rgba(134, 39, 230, 0.35)',
        'rgba(224, 149, 255, 0.3)',
      ][Math.floor(Math.random() * 4)],
    }));
    setDistantGlows(newDistantGlows);
  }, []);
  
  const getLightModeAdjustedOpacity = (opacity) => {
    return !isDark ? opacity * 1.5 : opacity;
  };
  
  const getLightModeAdjustedColor = (color) => {
    if (!isDark) {
      const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (rgbaMatch) {
        const [_, r, g, b, a] = rgbaMatch;
        return `rgba(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)}, ${Math.min(1, parseFloat(a) * 1.5)})`;
      }
    }
    return color;
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      {distantGlows.map(glow => (
        <div
          key={glow.id}
          className="absolute"
          style={{
            left: `${glow.x}%`,
            top: `${glow.y}%`,
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            opacity: getLightModeAdjustedOpacity(glow.opacity),
            filter: `blur(${glow.blur}px)`,
            background: `radial-gradient(circle, ${getLightModeAdjustedColor(glow.color)} 0%, rgba(168, 85, 247, 0) 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {glarePositions.map(glare => (
        <div
          key={glare.id}
          className="absolute"
          style={{
            left: `${glare.x}%`,
            top: `${glare.y}%`,
            width: `${glare.size}px`,
            height: `${glare.size}px`,
            opacity: getLightModeAdjustedOpacity(glare.opacity),
            filter: `blur(${glare.blur}px)`,
            background: !isDark 
              ? 'radial-gradient(circle, rgba(134, 39, 230, 0.45) 0%, rgba(134, 39, 230, 0) 70%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0) 70%)',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        />
      ))}
    </div>
  );
};

// Define slide components
const TitleSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">
          Quinten De Meyer
        </h1>
        <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
          Applied Computer Science / Electronics - ICT
        </h2>
        <p className="text-xl text-foreground/80 mt-8">
          Welcome to my professional journey
        </p>
      </motion.div>
    </div>
  );
};

const AboutMeSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>Who Am I?</InteractiveTitleEffect>
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/3"
        >
          <div className="rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20 w-48 h-48 mx-auto">
            <img 
              src="/images/profile-photo.png" 
              alt="Quinten De Meyer" 
              className="w-full h-full object-cover"
              width="192"
              height="192"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-2/3 text-lg"
        >
          <p className="mb-4">
            Hi, I'm Quinten, a passionate student in Applied Computer Science / Electronics - ICT. 
            I design and develop digital experiences with creativity and technical expertise.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Create the rest of the slides according to the plan
const WhyComputerScienceSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>Why Applied Computer Science / Electronics - ICT?</InteractiveTitleEffect>
      <div className="max-w-5xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-center max-w-4xl mx-auto"
        >
          <p className="mb-8">
            I've chosen Applied Computer Science / Electronics - ICT because I'm fascinated by how technology can <KeywordHighlight>solve real-world problems</KeywordHighlight>. 
            The blend of <KeywordHighlight>theoretical knowledge</KeywordHighlight> and <KeywordHighlight>practical applications</KeywordHighlight> allows me to turn my creative ideas into functional solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const CreativePursuitsSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>My Creative Pursuits</InteractiveTitleEffect>
      <div className="max-w-5xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-center max-w-4xl mx-auto"
        >
          <p className="mb-8">
            Outside of academics, I run a <KeywordHighlight>YouTube channel</KeywordHighlight> focused on creating custom cinematics for Assetto Corsa, 
            which has sharpened my <KeywordHighlight>video editing</KeywordHighlight> and storytelling abilities. 
            I also develop <KeywordHighlight>personal software projects</KeywordHighlight> like KeyedColors, which allows me to explore innovative solutions 
            to everyday problems and continuously enhance my programming skills.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ProfessionalAmbitionsSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>Professional Ambitions</InteractiveTitleEffect>
      <div className="max-w-5xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-center max-w-4xl mx-auto"
        >
          <p className="mb-8">
            My experiences with <KeywordHighlight>containerization</KeywordHighlight>, <KeywordHighlight>security systems</KeywordHighlight>, 
            and <KeywordHighlight>application development</KeywordHighlight> have shaped my professional direction. 
            I aim to specialize in creating robust, secure technological solutions while continuing to 
            <KeywordHighlight> learn and adapt</KeywordHighlight> to emerging technologies that can positively impact users' experiences.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ProjectSlide = ({ project, image }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>{project.title}</InteractiveTitleEffect>
      <div className="max-w-6xl mx-auto mt-4">
        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div className="mb-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                  {project.semester}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Context & Background</h4>
                <p>{project.context}</p>
                
                <h4 className="text-lg font-semibold">My Contribution</h4>
                <p>{project.contribution}</p>
                
                <h4 className="text-lg font-semibold">What I Learned</h4>
                <p>{project.learnings}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <TiltCard>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img 
                    src={`/images/optimized/${image}`} 
                    alt={project.title} 
                    className="rounded-lg shadow-md max-h-[300px] object-contain"
                    width="600"
                    height="300"
                  />
                </motion.div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const YoutubeChannelSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>@qlintenFX</InteractiveTitleEffect>
      <div className="max-w-5xl mx-auto mt-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Custom cinematics for Assetto Corsa</h3>
          
          <div className="aspect-video max-w-3xl mx-auto bg-card rounded-lg overflow-hidden shadow-lg">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/LAHGY-rWtbk?controls=1&rel=0`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          
          <p className="text-lg mt-8">
            Visit my channel to see my creative work
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ContactSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>Let's Connect</InteractiveTitleEffect>
      <div className="max-w-4xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: <Github size={24} />, label: "github.com/qlintenFX", color: "bg-[#333]/20" },
            { icon: <Youtube size={24} />, label: "youtube.com/@qlintenFX", color: "bg-red-500/20" },
            { icon: <Linkedin size={24} />, label: "linkedin.com/in/quinten-de-meyer-2336282a2", color: "bg-blue-600/20" },
            { icon: <Mail size={24} />, label: "quinten1508@gmail.com", color: "bg-green-500/20" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`flex flex-col items-center p-6 rounded-xl ${item.color} backdrop-blur-sm`}
            >
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <p className="text-sm text-center">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ThankYouSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-8">
          Thank You for Your Attention
        </h1>
        <p className="text-xl text-foreground/80 mt-8 max-w-2xl mx-auto">
          Feel free to reach out with any questions or opportunities
        </p>
      </motion.div>
    </div>
  );
};

// Main Presentation Component
const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 12; // Total number of slides
  
  // Project data
  const projects = {
    project1: {
      title: "IT Polis Voting System",
      semester: "SKIL2 Project",
      context: "Developed a voting system for the IT Polis event, a student project showcase where attendees vote for their favorite projects. The system needed to ensure each visitor could only vote once, track votes in real-time, and provide event organizers with administrative control.",
      contribution: "I created and managed the database architecture, implemented data processing for the live leaderboard, and collaborated on UI development. I helped fix UI issues and contributed ideas to enhance the overall user experience of the system.",
      learnings: "Gained practical experience in secure database design, NFC technology integration, and real-time data visualization. Developed skills in creating administrative dashboards and implementing user authentication systems.",
      technologies: ["Database Design", "NFC Technology", "UI/UX", "Real-time Systems", "Admin Dashboard"],
    },
    project2: {
      title: "App Hosting Platform for Clients",
      semester: "SKIL2.2 Project",
      context: "Designed and implemented a hosting platform for PHP/Laravel applications within Thomas More's datacenter. The platform provides an automated deployment process for web applications, offering an efficient and scalable solution that allows clients to host multiple applications securely.",
      contribution: "I was responsible for creating and managing the Kubernetes cluster. My work involved setting up the infrastructure for container orchestration, ensuring high availability, and implementing automated scaling solutions for the hosted applications.",
      learnings: "Gained practical experience in containerization technologies, Kubernetes administration, and implementing CIS security controls. Developed skills in creating resilient, scalable infrastructure and automating deployment workflows.",
      technologies: ["Kubernetes", "Docker", "CI/CD", "GitLab", "Ansible", "Ubuntu Server", "Security Controls"],
    },
    project3: {
      title: "Security Awareness Campaign Movie",
      semester: "Media Project",
      context: "Created an educational movie about cybersecurity awareness, focusing on the dangers of found USB devices. The film follows a storyline where a hacker plants a malware-infected USB in a high-traffic area, which is then picked up and used by an unsuspecting victim.",
      contribution: "I served as the main editor and creative director, applying my extensive video design experience to create a cinematic look and feel. My vision shaped the storytelling approach and visual style of the entire production.",
      learnings: "Strengthened my skills in narrative storytelling through visual media, technical video production in security contexts, and effectively communicating complex security concepts through engaging content.",
      technologies: ["Video Editing", "Cinematography", "Storytelling", "Security Awareness", "Visual Effects"],
    },
    project4: {
      title: "KeyedColors",
      semester: "Personal Project",
      context: "Developed a Windows application for creating custom display profiles with gamma and contrast adjustments. KeyedColors allows users to create, save, and quickly switch between multiple display settings using customizable hotkeys.",
      contribution: "I identified a gap in the market for an application that could manage custom display profiles with hotkey support. As there wasn't an existing solution, I designed and developed this tool from scratch to address this need.",
      learnings: "Gained hands-on experience with Windows API for display settings manipulation, system tray integration, and global hotkey management. Enhanced my C# skills while creating an intuitive UI that provides both functionality and ease of use.",
      technologies: ["C#", ".NET", "Windows API", "UI/UX", "System Tray Integration", "Global Hotkeys"],
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
        if (currentSlide < totalSlides - 1) {
          setCurrentSlide(current => current + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setCurrentSlide(current => current - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides]);

  // Render the appropriate slide based on currentSlide
  const renderSlide = () => {
    switch(currentSlide) {
      case 0:
        return <TitleSlide />;
      case 1:
        return <AboutMeSlide />;
      case 2:
        return <WhyComputerScienceSlide />;
      case 3:
        return <CreativePursuitsSlide />;
      case 4:
        return <ProfessionalAmbitionsSlide />;
      case 5:
        return <ProjectSlide project={projects.project1} image="project-1-Voting-System.webp" />;
      case 6:
        return <ProjectSlide project={projects.project2} image="project-2-hosting-platform.webp" />;
      case 7:
        return <ProjectSlide project={projects.project3} image="project-3-video-editing-awareness-movie.webp" />;
      case 8:
        return <ProjectSlide project={projects.project4} image="project-4-KeyedColors-dynamic-profile.webp" />;
      case 9:
        return <YoutubeChannelSlide />;
      case 10:
        return <ContactSlide />;
      case 11:
        return <ThankYouSlide />;
      default:
        return <div className="h-full flex items-center justify-center"><p className="text-2xl">Slide {currentSlide + 1} content coming soon!</p></div>;
    }
  };

  return (
    <div className="presentation-container min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background effects */}
      <PurpleSparkle count={20} />
      <LensGlare />
      
      {/* Slide container */}
      <div className="slide-container relative h-screen">
        {/* Progress indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary w-4' : 'bg-muted'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        {currentSlide > 0 && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary/10 hover:bg-primary/20 p-3 rounded-full z-10 text-primary"
            onClick={() => setCurrentSlide(current => current - 1)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {currentSlide < totalSlides - 1 && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary/10 hover:bg-primary/20 p-3 rounded-full z-10 text-primary"
            onClick={() => setCurrentSlide(current => current + 1)}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Slide content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
        
        {/* Slide number */}
        <div className="absolute top-4 right-4 bg-card/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>
    </div>
  );
};

export default Presentation; 