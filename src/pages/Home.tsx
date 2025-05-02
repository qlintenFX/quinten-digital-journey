import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useAnimation, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  ChevronDown, 
  Code, 
  Brush, 
  Layout, 
  FileText, 
  Download,
  ExternalLink,
  Youtube,
  Star,
  Circle,
  Triangle,
  Square,
  Plus,
  ArrowUpLeft
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReactFullpage from '@fullpage/react-fullpage';

/**
 * Function to check if the page is in dark mode by looking at the document element
 */
function isDarkMode() {
  // Check for .dark class on html element (standard for many themes including Tailwind)
  return document.documentElement.classList.contains('dark');
}

/**
 * InteractiveTitleEffect Component
 * Creates a title with hover effects using bubble PNGs
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Title text content
 * @param {string} props.className - Additional CSS classes
 */
const InteractiveTitleEffect = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Check initial theme
    setIsDark(isDarkMode());
    
    // Setup observer to watch for class changes on html element
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
      // Generate 4-8 random bubble positions
      const count = Math.floor(Math.random() * 5) + 4;
      const newBubbles = Array(count).fill(0).map(() => ({
        id: Math.random(),
        x: Math.random() * 120 - 10, // -10% to 110% of element width
        y: Math.random() * 120 - 10, // -10% to 110% of element height
        size: Math.random() * 25 + 15, // 15-40px
        delay: Math.random() * 0.3,
        duration: Math.random() * 0.8 + 0.5,
        opacity: Math.random() * 0.7 + 0.3
      }));
      setBubbles(newBubbles);
    }
  }, [isHovered]);
  
  return (
    <div className="relative mb-16">
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

/**
 * PurpleSparkle Component
 * Creates floating sparkle effects across the screen
 * @param {number} count - Number of sparkles to display
 */
const PurpleSparkle = ({ count = 15 }) => {
  const [sparkles, setSparkles] = useState([]);
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Check initial theme
    setIsDark(isDarkMode());
    
    // Setup observer to watch for class changes on html element
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
    // Create initial sparkles
    const initialSparkles = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      size: Math.random() * 20 + 10, // 10-30px
      x: Math.random() * 100, // position across width (%)
      y: Math.random() * 100, // position across height (%)
      rotation: Math.random() * 360, // random rotation
      opacity: Math.random() * 0.6 + 0.3, // Increased from 0.2-0.7 to 0.3-0.9
      animationDuration: Math.random() * 15 + 10, // 10-25s
      delay: Math.random() * 10,
    }));
    
    setSparkles(initialSparkles);
    
    // Periodically refresh sparkles
    const interval = setInterval(() => {
      setSparkles(prevSparkles => {
        // Replace 1-3 sparkles randomly
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
            delay: 0, // No delay for replacements
          };
        }
        
        return newSparkles;
      });
    }, 3000); // Refresh some sparkles every 3 seconds
    
    return () => clearInterval(interval);
  }, [count]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            opacity: [0, sparkle.opacity, sparkle.opacity, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, sparkle.rotation, sparkle.rotation + 180],
            y: [0, -30, -60]
          }}
          transition={{
            duration: sparkle.animationDuration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 5, // 5-10s between repeats
          }}
        >
          <img 
            src={isDark ? "/images/dark-mode-star.png" : "/images/light-mode-star.png"} 
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
};

/**
 * FloatingElement Component
 * Creates decorative floating elements with animations
 * @param {Object} props - Component properties
 * @param {Icon} props.icon - Lucide icon to display
 * @param {number} props.size - Size of the icon
 * @param {Object} props.position - Position coordinates
 * @param {string} props.color - Color of the icon
 * @param {number} props.delay - Animation delay
 * @param {number} props.duration - Animation duration
 */
const FloatingElement = ({ icon, size, position, color, delay, duration }) => {
  const Icon = icon;
  return (
    <motion.div 
      className="absolute opacity-20 pointer-events-none"
      style={{ ...position }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <Icon size={size} className={`text-${color}`} />
    </motion.div>
  );
};

/**
 * SparkleText Component
 * Creates text with sparkle effects on hover
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Text content
 * @param {string} props.className - Additional CSS classes
 */
const SparkleText = ({ children, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparklePositions, setSparklePositions] = useState([]);
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Check initial theme
    setIsDark(isDarkMode());
    
    // Setup observer to watch for class changes on html element
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
      // Generate 6-10 random sparkle positions
      const count = Math.floor(Math.random() * 5) + 6;
      const newPositions = Array(count).fill(0).map(() => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 5,
        delay: Math.random() * 0.3,
        duration: Math.random() * 0.8 + 0.5,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.7 + 0.3 // Increased from default for better visibility
      }));
      setSparklePositions(newPositions);
    }
  }, [isHovered]);
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      <AnimatePresence>
        {isHovered && sparklePositions.map(sparkle => (
          <motion.div
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              zIndex: 10
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, sparkle.rotation],
              y: [0, -20]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              ease: "easeOut"
            }}
          >
            <img 
              src={isDark ? "/images/dark-mode-star.png" : "/images/light-mode-star.png"}
              alt=""
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * SparkleButton Component
 * Creates a button with sparkle effects on click
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 */
const SparkleButton = ({ children, className, onClick, ...props }) => {
  const [sparkles, setSparkles] = useState([]);
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Check initial theme
    setIsDark(isDarkMode());
    
    // Setup observer to watch for class changes on html element
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
  
  const handleClick = (e) => {
    // Create 8-12 sparkles from the button on click
    const count = Math.floor(Math.random() * 5) + 8;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newSparkles = Array(count).fill(0).map(() => ({
      id: Math.random(),
      x: centerX + (Math.random() * rect.width * 0.8 - rect.width * 0.4),
      y: centerY + (Math.random() * rect.height * 0.8 - rect.height * 0.4),
      size: Math.random() * 25 + 10,
      duration: Math.random() * 0.8 + 0.5,
      delay: Math.random() * 0.2,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.7 + 0.3 // Increased from default for better visibility
    }));
    
    setSparkles(newSparkles);
    
    // Call the original onClick handler if provided
    if (onClick) onClick(e);
  };
  
  return (
    <div className="relative inline-block">
      <Button 
        {...props} 
        className={className} 
        onClick={handleClick}
      >
        {children}
      </Button>
      
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${sparkle.x}px`,
              top: `${sparkle.y}px`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              zIndex: 20
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, sparkle.rotation],
              x: [0, (Math.random() * 100 - 50)],
              y: [0, (Math.random() * -100 - 20)]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              ease: "easeOut"
            }}
          >
            <img 
              src={isDark ? "/images/dark-mode-star.png" : "/images/light-mode-star.png"}
              alt=""
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * LensGlare Component
 * Creates lens flare and distant glow effects in the background
 * Uses randomized positions and properties for natural-looking effects
 */
const LensGlare = () => {
  const [glarePositions, setGlarePositions] = useState([]);
  const [distantGlows, setDistantGlows] = useState([]);
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Check initial theme
    setIsDark(isDarkMode());
    
    // Setup observer to watch for class changes on html element
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
    // Create 3-5 random lens glares
    const count = Math.floor(Math.random() * 3) + 3;
    const newGlarePositions = Array(count).fill(0).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100, // 100-300px
      opacity: Math.random() * 0.15 + 0.08, // Increased from 0.05-0.15 to 0.08-0.23
      blur: Math.random() * 50 + 50, // 50-100px blur
    }));
    setGlarePositions(newGlarePositions);
    
    // Create 2-4 larger distant background glows
    const distantCount = Math.floor(Math.random() * 3) + 2;
    const newDistantGlows = Array(distantCount).fill(0).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 600 + 500, // 500-1100px
      opacity: Math.random() * 0.2 + 0.1, // Increased from 0.05-0.2 to 0.1-0.3
      blur: Math.random() * 100 + 120, // 120-220px blur
      color: [
        'rgba(168, 85, 247, 0.35)', // Increased from 0.25
        'rgba(196, 111, 255, 0.3)', // Increased from 0.2
        'rgba(134, 39, 230, 0.35)', // Increased from 0.25
        'rgba(224, 149, 255, 0.3)', // Increased from 0.2
      ][Math.floor(Math.random() * 4)],
    }));
    setDistantGlows(newDistantGlows);
  }, []);
  
  // Adjust opacity and color for light mode
  const getLightModeAdjustedOpacity = (opacity) => {
    return !isDark ? opacity * 1.5 : opacity;
  };
  
  const getLightModeAdjustedColor = (color) => {
    if (!isDark) {
      // Extract values from rgba color string
      const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (rgbaMatch) {
        const [_, r, g, b, a] = rgbaMatch;
        // Darken the color for light mode by reducing brightness and increasing opacity
        return `rgba(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)}, ${Math.min(1, parseFloat(a) * 1.5)})`;
      }
    }
    return color;
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      {/* Distant large background glows */}
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
      
      {/* Original lens glares */}
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

/**
 * GridDeformation Component
 * Creates an interactive grid that deforms based on cursor position
 * Features:
 * - 30px grid spacing
 * - Enhanced cloth-like deformation effect
 * - More pronounced "ball under covers" effect
 * - Smooth physics-based movement
 * - Performance optimized with GPU acceleration
 */
const GridDeformation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const lastMousePosition = useRef({ x: -1000, y: -1000 });
  const lastUpdateTime = useRef(0);
  const gridPoints = useRef([]);
  const [isDark, setIsDark] = useState(true);
  
  // Throttle mouse position updates
  const handleMouseMove = useCallback((e) => {
    const now = performance.now();
    if (now - lastUpdateTime.current > 16) { // ~60fps
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      lastUpdateTime.current = now;
    }
  }, []);

  // Setup canvas and create grid
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = document.documentElement;
        setDimensions({
          width: clientWidth,
          height: clientHeight
        });
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
      }
    };
    
    // Initialize
    updateDimensions();
    
    // Generate grid points
    const createGrid = () => {
      const spacing = 60; // Increased from 30px to 60px for larger squares
      const newGridPoints = [];
      
      const columns = Math.ceil(dimensions.width / spacing) + 1;
      const rows = Math.ceil(dimensions.height / spacing) + 1;
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          newGridPoints.push({
            x: j * spacing,
            y: i * spacing,
            originalX: j * spacing,
            originalY: i * spacing,
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
            mass: 1 + Math.random() * 0.5 // Add slight mass variation for more natural movement
          });
        }
      }
      
      gridPoints.current = newGridPoints;
    };
    
    createGrid();
    
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions.width, dimensions.height, handleMouseMove]);
  
  useEffect(() => {
    // Check initial theme
    setIsDark(isDarkMode());
    
    // Setup observer to watch for class changes on html element
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
  
  // Animation and rendering
  useEffect(() => {
    if (!canvasRef.current || gridPoints.current.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const maxDistance = 250; // Increased from 200 for larger deformation area
    const repulsionForce = 0.8; // Increased from 0.3 for stronger deformation
    const friction = 0.85; // Reduced from 0.93 for more fluid movement
    const stiffness = 0.05; // Reduced from 0.1 for slower return to original position
    const maxDisplacement = 100; // Increased from 50 for more pronounced effect
    const ballRadius = 150; // Size of the "ball" effect
    
    const animate = () => {
      // Update mouse position from throttled value
      setMousePosition(lastMousePosition.current);
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update grid points with enhanced physics
      gridPoints.current.forEach(point => {
        // Calculate distance to cursor
        const dx = mousePosition.x - point.x;
        const dy = mousePosition.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Reset acceleration
        point.acceleration = { x: 0, y: 0 };
        
        if (distance < maxDistance) {
          // Enhanced deformation force with inverse square law
          const normalizedDistance = distance / maxDistance;
          const force = (1 - normalizedDistance) * repulsionForce;
          
          // Add a "ball" effect by modifying the force based on distance
          const ballEffect = Math.max(0, 1 - (distance / ballRadius));
          const enhancedForce = force * (1 + ballEffect * 2); // Amplify force near the center
          
          const angle = Math.atan2(dy, dx);
          
          // Apply deformation force with mass consideration
          point.acceleration.x -= (Math.cos(angle) * enhancedForce) / point.mass;
          point.acceleration.y -= (Math.sin(angle) * enhancedForce) / point.mass;
        }
        
        // Add spring force to return to original position
        point.acceleration.x += (point.originalX - point.x) * stiffness;
        point.acceleration.y += (point.originalY - point.y) * stiffness;
        
        // Update velocity and position with mass consideration
        point.velocity.x = (point.velocity.x + point.acceleration.x) * friction;
        point.velocity.y = (point.velocity.y + point.acceleration.y) * friction;
        point.x += point.velocity.x;
        point.y += point.velocity.y;
        
        // Limit maximum displacement
        const currentDisplacementX = point.x - point.originalX;
        const currentDisplacementY = point.y - point.originalY;
        const currentDisplacement = Math.sqrt(currentDisplacementX * currentDisplacementX + currentDisplacementY * currentDisplacementY);
        
        if (currentDisplacement > maxDisplacement) {
          const scale = maxDisplacement / currentDisplacement;
          point.x = point.originalX + currentDisplacementX * scale;
          point.y = point.originalY + currentDisplacementY * scale;
          point.velocity.x *= 0.5;
          point.velocity.y *= 0.5;
        }
      });
      
      // Draw grid lines with enhanced visual effects
      ctx.strokeStyle = !isDark
        ? 'rgba(134, 39, 230, 0.4)' // Darker and more opaque for light mode
        : 'rgba(168, 85, 247, 0.25)';
      ctx.lineWidth = !isDark ? 1 : 0.8;
      
      // Draw horizontal lines
      const columns = Math.ceil(dimensions.width / 60) + 1; // Updated to match new spacing
      const rows = Math.ceil(dimensions.height / 60) + 1; // Updated to match new spacing
      
      for (let i = 0; i < rows; i++) {
        ctx.beginPath();
        for (let j = 0; j < columns - 1; j++) {
          const index = i * columns + j;
          const nextIndex = i * columns + j + 1;
          
          if (index < gridPoints.current.length && nextIndex < gridPoints.current.length) {
            const point = gridPoints.current[index];
            const nextPoint = gridPoints.current[nextIndex];
            
            if (j === 0) {
              ctx.moveTo(point.x, point.y);
            }
            ctx.lineTo(nextPoint.x, nextPoint.y);
          }
        }
        ctx.stroke();
      }
      
      // Draw vertical lines
      for (let j = 0; j < columns; j++) {
        ctx.beginPath();
        for (let i = 0; i < rows - 1; i++) {
          const index = i * columns + j;
          const nextIndex = (i + 1) * columns + j;
          
          if (index < gridPoints.current.length && nextIndex < gridPoints.current.length) {
            const point = gridPoints.current[index];
            const nextPoint = gridPoints.current[nextIndex];
            
            if (i === 0) {
              ctx.moveTo(point.x, point.y);
            }
            ctx.lineTo(nextPoint.x, nextPoint.y);
          }
        }
        ctx.stroke();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, mousePosition, isDark]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-10]"
      style={{ opacity: !isDark ? 0.85 : 0.7 }}
    />
  );
};

/**
 * KeywordHighlight Component
 * Creates a subtle glow effect for important keywords
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Text content
 * @param {string} props.className - Additional CSS classes
 */
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

// Replace the entire TiltCard component implementation with this improved version using react-parallax-tilt
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tilt
      className="w-full h-full"
      perspective={1200}
      tiltMaxAngleX={8}  // Reduced tilt angle for subtler effect
      tiltMaxAngleY={8}  // Reduced tilt angle for subtler effect
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
      reset={true}  // Reset tilt when mouse leaves
    >
      <div className="w-full h-full transition-shadow duration-300 hover:shadow-[0_10px_25px_-5px_rgba(168,85,247,0.3)]">
        {children}
      </div>
    </Tilt>
  );
};

/**
 * Home Component
 * Main page component containing all sections:
 * - Hero section with welcome message
 * - About section with profile and CV
 * - Projects section with project cards
 * - YouTube section with video carousel
 * - Contact section with form and links
 */
const Home = () => {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const [emailVisible, setEmailVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [showCVDialog, setShowCVDialog] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  
  // Profile images for cycling
  const profileImages = [
    "/images/profile-photo.png",
    "/images/pfp-2.png"
  ];

  // Function to cycle to next profile image
  const nextProfileImage = useCallback(() => {
    setCurrentProfileIndex((prev) => (prev + 1) % profileImages.length);
  }, [profileImages.length]);

  // Auto cycle profile images
  useEffect(() => {
    const interval = setInterval(() => {
      nextProfileImage();
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [nextProfileImage]);

  // YouTube video IDs for the carousel - using direct embed only, no API
  const videos = [
    "LAHGY-rWtbk",
    "K7J6DIJPVew",
    "MGYgqgDiEVg"
  ];

  // Video carousel navigation functions
  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Scroll-based section detection for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Get all sections
      const sections = ['home', 'about', 'projects', 'youtube', 'contact'];
      
      // Check which section is currently in view
      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in view (top of section is above the middle of viewport and bottom is below)
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
            break;
          }
        }
      }
      
      // Update active section in navbar
      if (currentSection) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${currentSection}`) {
            link.setAttribute('data-active', 'true');
          } else {
            link.setAttribute('data-active', 'false');
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Email reveal functionality with bot protection
  const revealEmail = () => {
    setEmailVisible(true);
  };

  // Email obfuscation for security
  const emailParts = ['quinten1508', 'gmail.com'];
  const obfuscatedEmail = emailVisible ? `${emailParts[0]}@${emailParts[1]}` : "Click to reveal email";

  // Project data
  const projects = {
    project1: {
      title: "IT Polis Voting System",
      semester: "SKIL2 Project",
      context: "Developed a voting system for the IT Polis event, a student project showcase where attendees vote for their favorite projects. The system needed to ensure each visitor could only vote once, track votes in real-time, and provide event organizers with administrative control.",
      contribution: "I created and managed the database architecture, implemented data processing for the live leaderboard, and collaborated on UI development. I helped fix UI issues and contributed ideas to enhance the overall user experience of the system.",
      learnings: "Gained practical experience in secure database design, NFC technology integration, and real-time data visualization. Developed skills in creating administrative dashboards and implementing user authentication systems.",
      technologies: ["Database Design", "NFC Technology", "UI/UX", "Real-time Systems", "Admin Dashboard"],
      image: "/images/project-1-Voting-System.png",
      images: [
        "/images/project-1-Voting-System.png",
        "/images/project-1-group-picture.png"
      ]
    },
    project2: {
      title: "App Hosting Platform for Clients",
      semester: "SKIL2.2 Project",
      context: "Designed and implemented a hosting platform for PHP/Laravel applications within Thomas More's datacenter. The platform provides an automated deployment process for web applications, offering an efficient and scalable solution that allows clients to host multiple applications securely.",
      contribution: "I was responsible for creating and managing the Kubernetes cluster. My work involved setting up the infrastructure for container orchestration, ensuring high availability, and implementing automated scaling solutions for the hosted applications.",
      learnings: "Gained practical experience in containerization technologies, Kubernetes administration, and implementing CIS security controls. Developed skills in creating resilient, scalable infrastructure and automating deployment workflows.",
      technologies: ["Kubernetes", "Docker", "CI/CD", "GitLab", "Ansible", "Ubuntu Server", "Security Controls"],
      image: "/images/project-2-hosting-platform.png",
      images: [
        "/images/project-2-hosting-platform.png",
        "/images/project-2-hosting-platform-repository.png",
        "/images/project-2-software-diagram.png",
        "/images/project-2-hardware-diagram.png"
      ]
    },
    project3: {
      title: "Security Awareness Campaign Movie",
      semester: "Media Project",
      context: "Created an educational movie about cybersecurity awareness, focusing on the dangers of found USB devices. The film follows a storyline where a hacker plants a malware-infected USB in a high-traffic area, which is then picked up and used by an unsuspecting victim.",
      contribution: "I served as the main editor and creative director, applying my extensive video design experience to create a cinematic look and feel. My vision shaped the storytelling approach and visual style of the entire production.",
      learnings: "Strengthened my skills in narrative storytelling through visual media, technical video production in security contexts, and effectively communicating complex security concepts through engaging content.",
      technologies: ["Video Editing", "Cinematography", "Storytelling", "Security Awareness", "Visual Effects"],
      image: "/images/project-3-video-editing-awareness-movie.png",
      images: [
        "/images/project-3-video-editing-awareness-movie.png",
        "/images/project-3-video-editiing-awareness-movie-2.png"
      ]
    },
    project4: {
      title: "KeyedColors",
      semester: "Personal Project",
      context: "Developed a Windows application for creating custom display profiles with gamma and contrast adjustments. KeyedColors allows users to create, save, and quickly switch between multiple display settings using customizable hotkeys.",
      contribution: "I identified a gap in the market for an application that could manage custom display profiles with hotkey support. As there wasn't an existing solution, I designed and developed this tool from scratch to address this need.",
      learnings: "Gained hands-on experience with Windows API for display settings manipulation, system tray integration, and global hotkey management. Enhanced my C# skills while creating an intuitive UI that provides both functionality and ease of use.",
      technologies: ["C#", ".NET", "Windows API", "UI/UX", "System Tray Integration", "Global Hotkeys"],
      image: "/images/project-4-KeyedColors-logo.png",
      images: [
        "/images/project-4-KeyedColors-profiles.png",
        "/images/project-4-KeyedColors-dynamic-profile.png"
      ]
    }
  };

  // Add cursor styles for light/dark mode
  useEffect(() => {
    try {
      // Check initial theme
      setIsDark(isDarkMode());
      
      // Setup observer to watch for class changes on html element
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
      
      const cursorStyles = `
        body.has-custom-cursor .cursor-follower {
          background: ${!isDark
            ? 'rgba(134, 39, 230, 0.3)'  // More visible in light mode
            : 'rgba(168, 85, 247, 0.15)'};
          border: 1px solid ${!isDark
            ? 'rgba(134, 39, 230, 0.5)'  // More visible in light mode
            : 'rgba(168, 85, 247, 0.3)'};
          box-shadow: 0 0 20px ${!isDark
            ? 'rgba(134, 39, 230, 0.4)'  // More visible in light mode
            : 'rgba(168, 85, 247, 0.2)'};
        }
        
        body.has-custom-cursor .cursor-follower::before {
          background: ${!isDark
            ? 'rgba(134, 39, 230, 0.25)'  // More visible in light mode
            : 'rgba(168, 85, 247, 0.1)'};
          border: 1px solid ${!isDark
            ? 'rgba(134, 39, 230, 0.4)'  // More visible in light mode
            : 'rgba(168, 85, 247, 0.2)'};
        }
        
        body.has-custom-cursor .cursor-follower::after {
          background: ${!isDark
            ? 'rgba(134, 39, 230, 0.2)'  // More visible in light mode
            : 'rgba(168, 85, 247, 0.05)'};
          border: 1px solid ${!isDark
            ? 'rgba(134, 39, 230, 0.35)'  // More visible in light mode
            : 'rgba(168, 85, 247, 0.15)'};
        }
      `;
      
      // Create and append style element
      try {
        const styleElement = document.createElement('style');
        styleElement.textContent = cursorStyles;
        document.head.appendChild(styleElement);
        
        // Clean up function
        return () => {
          try {
            document.head.removeChild(styleElement);
            observer.disconnect();
          } catch (err) {
            console.error("Error cleaning up cursor styles:", err);
          }
        };
      } catch (err) {
        console.error("Error applying cursor styles:", err);
        // Ensure observer is disconnected even if style application fails
        return () => observer.disconnect();
      }
    } catch (err) {
      console.error("Error setting up cursor style effect:", err);
      return () => {}; // Empty cleanup function
    }
  }, [isDark]);

  return (
    <ReactFullpage
      licenseKey={''}
      credits={{
        enabled: true,
        label: 'Made with fullPage.js',
        position: 'right'
      }}
      scrollingSpeed={800}
      navigation={true}
      navigationPosition={'right'}
      navigationTooltips={['Home', 'About', 'Projects', 'YouTube', 'Contact']}
      showActiveTooltip={true}
      anchors={['home', 'about', 'projects', 'youtube', 'contact']}
      scrollOverflow={true}
      normalScrollElements={'.dialog-content'}
      responsiveWidth={800}
      afterLoad={(origin, destination, direction) => {
        console.log("Section loaded:", destination.index);
      }}
      render={({ state, fullpageApi }) => {
        return (
          <>
            <div className="section" data-anchor="home">
              <header className="container relative z-[2]" id="home">
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative">
                  {/* Background tints layer */}
                  <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-background to-cyber-light/10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_50%)]" />
                  </div>

                  {/* Interactive grid background */}
                  <GridDeformation />
                  
                  {/* Purple Sparkle Effects */}
                  <PurpleSparkle count={10} />
                  
                  {/* Lens glares */}
                  <LensGlare />
                  
                  <div className="max-w-3xl text-center">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl md:text-7xl font-bold mb-8"
                    >
                      Welcome to my <SparkleText className="text-primary">E-Portfolio</SparkleText> 👋
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-xl md:text-2xl"
                    >
                      Hi, I'm <span className="font-semibold text-primary">Quinten</span>, a passionate student in Applied Computer Science / Electronics - ICT.
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-xl md:text-2xl mt-4 mb-8"
                    >
                      I design and develop digital experiences with creativity and technical expertise. Welcome to my professional journey!
                    </motion.p>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                    onClick={() => fullpageApi.moveSectionDown()}
                  >
                    <p className="italic mb-2">learn more ✨</p>
                    <ChevronDown className="mx-auto animate-bounce" size={24} />
                  </motion.div>
                </div>
              </header>
            </div>

            <div className="section" data-anchor="about">
              <section className="py-24 relative z-[2] before:content-[''] before:absolute before:inset-0 before:bg-gray-200/50 dark:before:bg-muted/30 before:-z-[1]" id="about">
                <div className="container relative">
                  <InteractiveTitleEffect>About Me</InteractiveTitleEffect>
                  {/* About section content - keeping existing content */}
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* ... existing about section content ... */}
                  </div>

                  {/* Curriculum Vitae Section - keeping existing content */}
                  <div className="mt-16">
                    {/* ... existing CV section content ... */}
                  </div>
                </div>
              </section>
            </div>

            <div className="section" data-anchor="projects">
              <section className="py-24 relative z-[2]" id="projects">
                <div className="container">
                  <InteractiveTitleEffect>Projects / Achievements</InteractiveTitleEffect>
                  {/* Projects content - keeping existing content */}
                  {/* Project 1 */}
                  {/* ... existing Project 1 content ... */}
                  
                  {/* Project 2 */}
                  {/* ... existing Project 2 content ... */}
                  
                  {/* Project 3 */}
                  {/* ... existing Project 3 content ... */}
                  
                  {/* Project 4 */}
                  {/* ... existing Project 4 content ... */}
                </div>
              </section>
            </div>

            <div className="section" data-anchor="youtube">
              <section className="py-24 relative z-[2] before:content-[''] before:absolute before:inset-0 before:bg-gray-200/50 dark:before:bg-muted/30 before:-z-[1]" id="youtube">
                <div className="container relative">
                  <InteractiveTitleEffect>YouTube Channel</InteractiveTitleEffect>
                  {/* YouTube content - keeping existing content */}
                  <div className="max-w-3xl mx-auto">
                    {/* ... existing YouTube section content ... */}
                  </div>
                </div>
              </section>
            </div>

            <div className="section" data-anchor="contact">
              <section className="py-24 relative z-[2]" id="contact">
                <div className="container">
                  <InteractiveTitleEffect>Socials</InteractiveTitleEffect>
                  {/* Contact content - keeping existing content */}
                  <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
                    {/* ... existing socials section content ... */}
                  </div>
                </div>
                
                {/* Project Details Modal - keeping existing modal */}
                <Modal
                  isOpen={selectedProject !== null}
                  onClose={() => setSelectedProject(null)}
                  title={selectedProject ? projects[selectedProject].title : ''}
                >
                  {selectedProject && (
                    <div>
                      <div className="bg-card p-6 rounded-lg">
                        {(selectedProject === 'project1' || selectedProject === 'project2' || selectedProject === 'project3' || selectedProject === 'project4') ? (
                          <div className="space-y-8">
                            {projects[selectedProject].images.map((img, index) => (
                              <motion.div 
                                key={index} 
                                className="mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                  duration: 0.5, 
                                  delay: index * 0.2,
                                  ease: "easeOut" 
                                }}
                              >
                                <div 
                                  className="relative overflow-hidden rounded-xl shadow-lg group"
                                >
                                  <img 
                                    src={img} 
                                    alt={`${projects[selectedProject].title} - Photo ${index + 1}`}
                                    className={`w-full rounded-xl shadow-md object-contain max-h-[70vh] ${img.includes('diagram') ? 'bg-white' : ''} transition-transform duration-300 group-hover:scale-[1.015]`}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = "https://placehold.co/800x600?text=Project+Screenshot";
                                    }}
                                  />
                                  <div 
                                    className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  >
                                    <div className="p-4 text-white">
                                      <h4 className="font-semibold">{projects[selectedProject].title}</h4>
                                      <p className="text-sm opacity-90">Image {index + 1} of {projects[selectedProject].images.length}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <img 
                              src={projects[selectedProject].image} 
                              alt={projects[selectedProject].title}
                              className="w-full rounded-lg shadow-md object-contain max-h-[70vh]"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://placehold.co/800x600?text=Project+Screenshot";
                              }}
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}
                </Modal>
                
                {/* CV Dialog for viewing PDF - keeping existing dialog */}
                <Dialog open={showCVDialog} onOpenChange={setShowCVDialog}>
                  <DialogContent className="max-w-7xl w-full p-0 h-[98vh] flex flex-col dialog-content">
                    <DialogHeader className="p-2 pb-0 min-h-[32px] shrink-0">
                      <DialogTitle>Curriculum Vitae</DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-[calc(100%-32px)] grow overflow-hidden">
                      <object
                        data="/files/CV_Quinten.pdf"
                        type="application/pdf"
                        className="w-full h-full"
                        style={{ margin: 0, padding: 0, border: 0 }}
                      >
                        <p>Your browser does not support PDFs. 
                          <a href="/files/CV_Quinten.pdf" download>Download the PDF</a> instead.
                        </p>
                      </object>
                    </div>
                  </DialogContent>
                </Dialog>
              </section>
            </div>
          </>
        );
      }}
    />
  );
};

export default Home;
