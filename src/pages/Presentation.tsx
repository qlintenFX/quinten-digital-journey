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

// Main Presentation Component
const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10; // Reduced to fit in 6 minutes
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Project data
  const projects = {
    project1: {
      title: "IT Polis Voting System",
      semester: "SKIL2 Project",
      context: "Developed a voting system for the IT Polis event, a student project showcase where attendees vote for their favorite projects. The system needed to ensure each visitor could only vote once, track votes in real-time, and provide event organizers with administrative control.",
      contribution: "I created and managed the database architecture, implemented data processing for the live leaderboard, and collaborated on UI development. I helped fix UI issues and contributed ideas to enhance the overall user experience of the system.",
      learnings: "Gained practical experience in secure database design, NFC technology integration, and real-time data visualization. Developed skills in creating administrative dashboards and implementing user authentication systems.",
      technologies: ["Database Design", "NFC Technology", "UI/UX", "Real-time Systems", "Admin Dashboard"],
      growth: "This project helped me develop my analytical thinking and technical database skills, but more importantly, it taught me the value of collaboration and iterative improvement."
    },
    project2: {
      title: "App Hosting Platform for Clients",
      semester: "SKIL2.2 Project",
      context: "Designed and implemented a hosting platform for PHP/Laravel applications within Thomas More's datacenter. The platform provides an automated deployment process for web applications, offering an efficient and scalable solution that allows clients to host multiple applications securely.",
      contribution: "I was responsible for creating and managing the Kubernetes cluster. My work involved setting up the infrastructure for container orchestration, ensuring high availability, and implementing automated scaling solutions for the hosted applications.",
      learnings: "Gained practical experience in containerization technologies, Kubernetes administration, and implementing CIS security controls. Developed skills in creating resilient, scalable infrastructure and automating deployment workflows.",
      technologies: ["Kubernetes", "Docker", "CI/CD", "GitLab", "Ansible", "Ubuntu Server", "Security Controls"],
      growth: "Through this project, I developed strong infrastructure management skills and deepened my understanding of security best practices in enterprise environments."
    },
    project3: {
      title: "Security Awareness Campaign Movie",
      semester: "Media Project",
      context: "Created an educational movie about cybersecurity awareness, focusing on the dangers of found USB devices. The film follows a storyline where a hacker plants a malware-infected USB in a high-traffic area, which is then picked up and used by an unsuspecting victim.",
      contribution: "I served as the main editor and creative director, applying my extensive video design experience to create a cinematic look and feel. My vision shaped the storytelling approach and visual style of the entire production.",
      learnings: "Strengthened my skills in narrative storytelling through visual media, technical video production in security contexts, and effectively communicating complex security concepts through engaging content.",
      technologies: ["Video Editing", "Cinematography", "Storytelling", "Security Awareness", "Visual Effects"],
      growth: "This project allowed me to combine technical knowledge with creative expression, developing my communication skills and ability to convey complex ideas through engaging visual media."
    },
    project4: {
      title: "KeyedColors",
      semester: "Personal Project",
      context: "Developed a Windows application for creating custom display profiles with gamma and contrast adjustments. KeyedColors allows users to create, save, and quickly switch between multiple display settings using customizable hotkeys.",
      contribution: "I identified a gap in the market for an application that could manage custom display profiles with hotkey support. As there wasn't an existing solution, I designed and developed this tool from scratch to address this need.",
      learnings: "Gained hands-on experience with Windows API for display settings manipulation, system tray integration, and global hotkey management. Enhanced my C# skills while creating an intuitive UI that provides both functionality and ease of use.",
      technologies: ["C#", ".NET", "Windows API", "UI/UX", "System Tray Integration", "Global Hotkeys"],
      growth: "This personal project demonstrates my entrepreneurial mindset, identifying needs and developing solutions independently, while also showcasing my ability to learn new technologies outside the classroom."
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
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
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides]);

  // Define the new slides specifically for the jury presentation
  const IntroductionSlide = () => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
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
        <div className="flex items-center justify-center mt-8 gap-4">
          <div className="rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20 w-28 h-28">
            <img 
              src="/images/profile-photo.png" 
              alt="Quinten De Meyer" 
              className="w-full h-full object-cover"
              width="112"
              height="112"
            />
          </div>
          <p className="text-xl text-foreground/80 mt-4 max-w-xl text-left">
            "Blending technical expertise with creative vision to build solutions that make a difference."
          </p>
        </div>
      </motion.div>
    </div>
  );

  const MyJourneySlide = () => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>My Journey</InteractiveTitleEffect>
      <div className="max-w-5xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2 text-primary">Where I Started</h3>
              <p>Fascinated by technology but limited to basic knowledge. Eager to understand both hardware and software systems.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2 text-primary">Where I Am</h3>
              <p>Developed strong technical foundations while discovering my passion for combining technical and creative skills.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2 text-primary">Where I'm Going</h3>
              <p>Aiming to specialize in secure, scalable systems development while continuing to grow my creative technical skillset.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const ProjectGrowthSlide = ({ project, image, index }) => {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-8">
        <InteractiveTitleEffect>Key Project {index}: {project.title}</InteractiveTitleEffect>
        <div className="max-w-6xl mx-auto mt-4">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div className="mb-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                    {project.semester}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    {project.context.substring(0, 100)}...
                  </p>
                  
                  <h4 className="text-lg font-semibold">Skills Developed</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 5).map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="text-lg font-semibold">Personal Growth</h4>
                  <p className="text-foreground/90">
                    {project.growth}
                  </p>
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
                      className="rounded-lg shadow-md max-h-[240px] object-contain"
                      width="500"
                      height="240"
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

  const SkillsGrowthSlide = () => {
    const skillsGroups = [
      {
        title: "Technical Skills",
        skills: [
          { name: "Infrastructure Management", level: 90 },
          { name: "Database Design", level: 85 },
          { name: "Security Implementation", level: 80 },
          { name: "UI/UX Development", level: 75 }
        ]
      },
      {
        title: "Creative Skills",
        skills: [
          { name: "Video Editing", level: 95 },
          { name: "Visual Storytelling", level: 85 },
          { name: "UI Design", level: 75 },
          { name: "Creative Problem Solving", level: 85 }
        ]
      },
      {
        title: "Soft Skills",
        skills: [
          { name: "Project Collaboration", level: 85 },
          { name: "Technical Communication", level: 80 },
          { name: "Time Management", level: 75 },
          { name: "Leadership", level: 70 }
        ]
      }
    ];

    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-8">
        <InteractiveTitleEffect>Skills Development</InteractiveTitleEffect>
        <div className="max-w-5xl mx-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillsGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{group.title}</h3>
                <div className="space-y-4">
                  {group.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 + (groupIndex * 0.1) + (skillIndex * 0.1) }}
                          className="bg-primary h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const FutureGrowthSlide = () => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>Areas for Growth</InteractiveTitleEffect>
      <div className="max-w-5xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4 text-primary">What I Need to Improve</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><KeywordHighlight>Advanced Cloud Architecture</KeywordHighlight>: Deepen knowledge of multi-cloud environments and serverless architectures</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><KeywordHighlight>Leadership Skills</KeywordHighlight>: Take more initiative in group settings and develop team leadership abilities</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><KeywordHighlight>Mobile Development</KeywordHighlight>: Expand skillset to include native mobile application development</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4 text-primary">How I Plan to Improve</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Complete AWS/Azure certification path to deepen cloud expertise</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Join technical communities and volunteer for leadership roles</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Build a cross-platform mobile application for KeyedColors as next project phase</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Continue combining technical and creative skills in future projects</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const BeyondCurriculumSlide = () => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <InteractiveTitleEffect>Beyond the Curriculum</InteractiveTitleEffect>
      <div className="max-w-5xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card p-6 rounded-lg shadow-md"
          >
            <h3 className="font-bold text-xl mb-4 text-primary">Creative Media Production</h3>
            <p className="mb-4">Applied technical knowledge to creative fields:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>YouTube channel with 15+ cinematic videos</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Advanced video editing and post-production</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Educational security awareness content</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-6 rounded-lg shadow-md"
          >
            <h3 className="font-bold text-xl mb-4 text-primary">Entrepreneurial Initiative</h3>
            <p className="mb-4">Self-driven projects and skills:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Developed KeyedColors to fill market gap</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Self-taught UI/UX design principles</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Continuous learning through personal projects</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const ThankYouSlide = () => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-8">
          Thank You
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          My journey in Applied Computer Science / Electronics - ICT has been about combining technical excellence with creative vision.
        </p>
        <p className="text-lg text-primary">
          Questions?
        </p>
      </motion.div>
    </div>
  );

  // Render the appropriate slide based on currentSlide
  const renderSlide = () => {
    switch(currentSlide) {
      case 0:
        return <IntroductionSlide />;
      case 1:
        return <MyJourneySlide />;
      case 2:
        return <ProjectGrowthSlide project={projects.project1} image="project-1-Voting-System.webp" index={1} />;
      case 3:
        return <ProjectGrowthSlide project={projects.project3} image="project-3-video-editing-awareness-movie.webp" index={2} />;
      case 4:
        return <ProjectGrowthSlide project={projects.project2} image="project-2-hosting-platform.webp" index={3} />;
      case 5:
        return <SkillsGrowthSlide />;
      case 6:
        return <BeyondCurriculumSlide />;
      case 7:
        return <FutureGrowthSlide />;
      case 8:
        return <ThankYouSlide />;
      default:
        return <div className="h-full flex items-center justify-center"><p className="text-2xl">Slide {currentSlide + 1}</p></div>;
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

        {/* Fullscreen button */}
        <button
          className="absolute top-4 left-4 bg-card/70 backdrop-blur-sm p-2 rounded-full text-foreground/70 hover:text-foreground transition-colors z-10"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8V5a2 2 0 0 1 2-2h3m9 0h3a2 2 0 0 1 2 2v3m0 9v3a2 2 0 0 1-2 2h-3m-9 0H5a2 2 0 0 1-2-2v-3"></path>
            </svg>
          )}
        </button>

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