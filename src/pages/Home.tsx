import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useAnimation, AnimatePresence } from 'framer-motion';
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
  Plus
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
    <div className="flex flex-col min-h-screen relative">
      {/* Background tints layer - moved behind lens flares */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-cyber-light/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_50%)]" />
      </div>

      {/* Interactive grid background */}
      <GridDeformation />
      
      {/* Purple Sparkle Effects */}
      <PurpleSparkle count={10} />
      
      {/* Lens glares - moved to top */}
      <LensGlare />
      
      {/* Hero Section */}
      <header className="container relative z-[2]" id="home">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative">
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
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <p className="italic mb-2">learn more ✨</p>
            <ChevronDown className="mx-auto animate-bounce" size={24} />
          </motion.div>
        </div>
      </header>

      {/* About Me Section - with alternating background */}
      <section className="py-24 relative z-[2] before:content-[''] before:absolute before:inset-0 before:bg-gray-200/50 dark:before:bg-muted/30 before:-z-[1]" id="about">
        <div className="container relative">
          <InteractiveTitleEffect>About Me</InteractiveTitleEffect>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="mb-8 overflow-hidden rounded-xl flex items-center justify-center h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-full"
                >
                  <img 
                    src="/images/profile-photo.png"
                    alt="Profile Photo" 
                    className="w-full h-full object-contain rounded-xl"
                    style={{ 
                      filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.7))",
                      maxHeight: "100%",
                      border: "2px solid rgba(168, 85, 247, 0.3)",
                      boxShadow: "0 0 25px 8px rgba(168, 85, 247, 0.5)"
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x600?text=Profile+Photo";
                    }}
                  />
                </motion.div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Who Am I?</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-2">Why Applied Computer Science / Electronics - ICT?</h4>
                  <p className="text-lg">
                    I've chosen Applied Computer Science / Electronics - ICT because I'm fascinated by how technology can <KeywordHighlight>solve real-world problems</KeywordHighlight>. The blend of <KeywordHighlight>theoretical knowledge</KeywordHighlight> and <KeywordHighlight>practical applications</KeywordHighlight> allows me to turn my creative ideas into functional solutions.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">My Creative Pursuits</h4>
                  <p className="text-lg">
                    Outside of academics, I run a <KeywordHighlight>YouTube channel</KeywordHighlight> focused on creating custom cinematics for Assetto Corsa, which has sharpened my <KeywordHighlight>video editing</KeywordHighlight> and storytelling abilities. I also develop <KeywordHighlight>personal software projects</KeywordHighlight> like KeyedColors, which allows me to explore innovative solutions to everyday problems and continuously enhance my programming skills.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">Professional Ambitions</h4>
                  <p className="text-lg">
                    My experiences with <KeywordHighlight>containerization</KeywordHighlight>, <KeywordHighlight>security systems</KeywordHighlight>, and <KeywordHighlight>application development</KeywordHighlight> have shaped my professional direction. I aim to specialize in creating robust, secure technological solutions while continuing to <KeywordHighlight>learn and adapt</KeywordHighlight> to emerging technologies that can positively impact users' experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Vitae Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Curriculum Vitae</h3>
            
            <div className="max-w-3xl mx-auto bg-card shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h4 className="text-xl font-bold mb-4 md:mb-0">My CV</h4>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => setShowCVDialog(true)}
                    >
                      <FileText className="h-4 w-4" />
                      Show CV
                    </Button>
                    
                    <Button variant="default" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <a href="/files/CV_Quinten.pdf" download>Download PDF</a>
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  View my complete professional background, skills, and qualifications. Click the button to view my CV or download it as a PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 relative z-[2]" id="projects">
        <div className="container">
          <InteractiveTitleEffect>Projects / Achievements</InteractiveTitleEffect>

          {/* Project 1: IT Polis Voting System */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20 relative"
          >
            {/* Decorative elements specifically for project cards */}
            <motion.div 
              className="absolute -left-6 md:-left-16 top-1/3 w-12 h-12 opacity-10 pointer-events-none"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 15, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full border-2 border-primary"></div>
            </motion.div>

            <motion.div 
              className="absolute -right-6 md:-right-16 bottom-1/3 w-10 h-10 opacity-10 pointer-events-none"
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-md border-2 border-secondary"></div>
            </motion.div>

            <div className="bg-card rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <div className="mb-6">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">SKIL2 Project</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">IT Polis Voting System</h3>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold">Context & Background</h4>
                    <p>Developed a <KeywordHighlight>voting system</KeywordHighlight> for the IT Polis event, a student project showcase where attendees vote for their favorite projects. The system needed to ensure each visitor could <KeywordHighlight>only vote once</KeywordHighlight>, track votes in <KeywordHighlight>real-time</KeywordHighlight>, and provide event organizers with administrative control.</p>
                    
                    <h4 className="text-lg font-semibold">My Contribution</h4>
                    <p>I created and managed the <KeywordHighlight>database architecture</KeywordHighlight>, implemented data processing for the <KeywordHighlight>live leaderboard</KeywordHighlight>, and collaborated on UI development. I helped fix UI issues and contributed ideas to enhance the overall user experience of the system.</p>
                    
                    <h4 className="text-lg font-semibold">What I Learned</h4>
                    <p>Gained practical experience in <KeywordHighlight>secure database design</KeywordHighlight>, <KeywordHighlight>NFC technology</KeywordHighlight> integration, and <KeywordHighlight>real-time data visualization</KeywordHighlight>. Developed skills in creating administrative dashboards and implementing user authentication systems.</p>
                  </div>
                  
                  <SparkleButton 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => setSelectedProject('project1')}
                  >
                    View Photo's <ExternalLink className="ml-2 h-4 w-4" />
                  </SparkleButton>
                </div>
                <div className="bg-muted lg:block hidden">
                  {/* Project 1 Image */}
                  <div className="relative h-full p-6 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img 
                        src="/images/project-1-Voting-System.png" 
                        alt="IT Polis Voting System" 
                        className="object-contain max-h-[90%] max-w-[90%] rounded-xl shadow-lg shadow-primary/20"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/800x600?text=Project+Screenshot";
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-20 relative"
          >
            {/* Decorative elements for project 2 */}
            <motion.div 
              className="absolute -left-10 md:-left-20 bottom-1/4 w-16 h-16 opacity-10 pointer-events-none"
              animate={{ 
                y: [0, 15, 0],
                rotate: [45, 0, 45]
              }}
              transition={{ duration: 12, repeat: Infinity }}
            >
              <div className="w-full h-full border-2 border-primary transform rotate-45"></div>
            </motion.div>

            <motion.div 
              className="absolute -right-8 md:-right-16 top-1/4 w-8 h-8 opacity-10 pointer-events-none"
              animate={{ 
                x: [0, 10, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-secondary/20"></div>
            </motion.div>

            <div className="bg-card rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-muted lg:block hidden">
                  {/* Project 2 Image */}
                  <div className="relative h-full p-6 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img 
                        src="/images/project-2-hosting-platform.png" 
                        alt="Project 2" 
                        className="object-contain max-h-[90%] max-w-[90%] rounded-xl shadow-lg shadow-primary/20"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/800x600?text=Project+Screenshot";
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">SKIL2.2 Project</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">App Hosting Platform for Clients</h3>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold">Context & Background</h4>
                    <p>Designed and implemented a <KeywordHighlight>hosting platform</KeywordHighlight> for PHP/Laravel applications within Thomas More's datacenter. The platform provides an <KeywordHighlight>automated deployment process</KeywordHighlight> for web applications, offering an efficient and scalable solution that allows clients to host multiple applications securely.</p>
                    
                    <h4 className="text-lg font-semibold">My Contribution</h4>
                    <p>I was responsible for creating and managing the <KeywordHighlight>Kubernetes cluster</KeywordHighlight>. My work involved setting up the infrastructure for <KeywordHighlight>container orchestration</KeywordHighlight>, ensuring <KeywordHighlight>high availability</KeywordHighlight>, and implementing automated scaling solutions for the hosted applications.</p>
                    
                    <h4 className="text-lg font-semibold">What I Learned</h4>
                    <p>Gained practical experience in <KeywordHighlight>containerization technologies</KeywordHighlight>, Kubernetes administration, and implementing <KeywordHighlight>CIS security controls</KeywordHighlight>. Developed skills in creating resilient, scalable infrastructure and automating deployment workflows.</p>
                  </div>
                  
                  <SparkleButton 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => setSelectedProject('project2')}
                  >
                    View Photo's <ExternalLink className="ml-2 h-4 w-4" />
                  </SparkleButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Projects */}
          {/* Project 3 */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20 relative"
          >
            {/* Decorative elements for project 3 */}
            <motion.div 
              className="absolute -left-8 md:-left-16 top-1/4 w-14 h-14 opacity-10 pointer-events-none"
              animate={{ 
                rotate: [0, 45, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 14, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-md border-2 border-primary transform rotate-45"></div>
            </motion.div>

            <motion.div 
              className="absolute -right-10 md:-right-20 bottom-1/3 w-12 h-12 opacity-10 pointer-events-none"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 18, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full border-2 border-secondary"></div>
            </motion.div>

            <div className="bg-card rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <div className="mb-6">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Media Project</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Security Awareness Campaign Movie</h3>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold">Context & Background</h4>
                    <p>Created an <KeywordHighlight>educational movie</KeywordHighlight> about <KeywordHighlight>cybersecurity awareness</KeywordHighlight>, focusing on the dangers of found USB devices. The film follows a storyline where a hacker plants a malware-infected USB in a high-traffic area, which is then picked up and used by an unsuspecting victim.</p>
                    
                    <h4 className="text-lg font-semibold">My Contribution</h4>
                    <p>I served as the <KeywordHighlight>main editor</KeywordHighlight> and <KeywordHighlight>creative director</KeywordHighlight>, applying my extensive video design experience to create a cinematic look and feel. My vision shaped the storytelling approach and visual style of the entire production.</p>
                    
                    <h4 className="text-lg font-semibold">What I Learned</h4>
                    <p>Strengthened my skills in <KeywordHighlight>narrative storytelling</KeywordHighlight> through visual media, <KeywordHighlight>technical video production</KeywordHighlight> in security contexts, and effectively communicating complex security concepts through engaging content.</p>
                  </div>
                  
                  <SparkleButton 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => setSelectedProject('project3')}
                  >
                    View Photo's <ExternalLink className="ml-2 h-4 w-4" />
                  </SparkleButton>
                </div>
                <div className="bg-muted lg:block hidden">
                  {/* Project 3 Image */}
                  <div className="relative h-full p-6 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img 
                        src="/images/project-3-video-editing-awareness-movie.png" 
                        alt="Security Awareness Campaign Movie" 
                        className="object-contain max-h-[90%] max-w-[90%] rounded-xl shadow-lg shadow-primary/20"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/800x600?text=Project+Screenshot";
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 4 */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20 relative"
          >
            {/* Decorative elements for project 4 */}
            <motion.div 
              className="absolute -left-6 md:-left-12 bottom-1/3 w-10 h-10 opacity-10 pointer-events-none"
              animate={{ 
                rotate: [0, 360],
                x: [0, 10, 0]
              }}
              transition={{ duration: 16, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-md border-2 border-secondary"></div>
            </motion.div>

            <motion.div 
              className="absolute -right-8 md:-right-16 top-1/4 w-12 h-12 opacity-10 pointer-events-none"
              animate={{ 
                scale: [1, 1.2, 1],
                y: [0, -15, 0]
              }}
              transition={{ duration: 12, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full border-2 border-primary"></div>
            </motion.div>

            <div className="bg-card rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-muted lg:block hidden">
                  {/* Project 4 Image */}
                  <div className="relative h-full p-6 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img 
                        src="/images/project-4-KeyedColors-logo.png" 
                        alt="KeyedColors" 
                        className="object-contain max-h-[90%] max-w-[90%] rounded-xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/800x600?text=Project+Screenshot";
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Personal Project</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">KeyedColors</h3>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold">Context & Background</h4>
                    <p>Developed a Windows application for creating <KeywordHighlight>custom display profiles</KeywordHighlight> with gamma and contrast adjustments. KeyedColors allows users to create, save, and quickly switch between multiple display settings using <KeywordHighlight>customizable hotkeys</KeywordHighlight>.</p>
                    
                    <h4 className="text-lg font-semibold">My Contribution</h4>
                    <p>I identified a <KeywordHighlight>gap in the market</KeywordHighlight> for an application that could manage custom display profiles with hotkey support. As there wasn't an existing solution, I designed and developed this tool from scratch to address this need.</p>
                    
                    <h4 className="text-lg font-semibold">What I Learned</h4>
                    <p>Gained hands-on experience with <KeywordHighlight>Windows API</KeywordHighlight> for display settings manipulation, <KeywordHighlight>system tray integration</KeywordHighlight>, and <KeywordHighlight>global hotkey management</KeywordHighlight>. Enhanced my C# skills while creating an intuitive UI that provides both functionality and ease of use.</p>
                  </div>
                  
                  <SparkleButton 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => setSelectedProject('project4')}
                  >
                    View Photo's <ExternalLink className="ml-2 h-4 w-4" />
                  </SparkleButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* YouTube Channel Section - with alternating background */}
      <section className="py-24 relative z-[2] before:content-[''] before:absolute before:inset-0 before:bg-gray-200/50 dark:before:bg-muted/30 before:-z-[1]" id="youtube">
        <div className="container relative">
          <InteractiveTitleEffect>YouTube Channel</InteractiveTitleEffect>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-lg overflow-hidden shadow-lg">
              {/* Banner and Profile */}
              <div className="w-full relative">
                <div className="w-full overflow-hidden" style={{ clipPath: 'inset(0 0 10% 0)' }}>
                  <img 
                    src="/images/banner.png" 
                    alt="YouTube Channel Banner" 
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/1200x300?text=YouTube+Banner";
                    }}
                  />
                </div>
                <div className="absolute -bottom-20 left-6">
                  <div className="rounded-full w-40 h-40 overflow-hidden border-4 border-card shadow-lg">
                    <img 
                      src="/images/pfp.png"
                      alt="YouTube Profile Picture" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/200x200?text=Profile";
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Channel Info */}
              <div className="p-6 pt-24">
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">@qlintenFX</h3>
                    <p className="text-muted-foreground mb-4">
                      Custom cinematics for Assetto Corsa.
                    </p>
                    <SparkleButton 
                      onClick={() => window.open('https://www.youtube.com/@qlintenFX', '_blank')}
                      className="flex items-center"
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      Visit Channel
                    </SparkleButton>
                  </div>
                </div>
                
                {/* Video Embed */}
                <div className="mt-6">
                  <div className="relative">
                    {/* Video container with animation */}
                    <div className="relative rounded-lg overflow-hidden shadow-md" style={{ paddingBottom: '75%' }}>
                      {videos.map((videoId, index) => (
                        <motion.div
                          key={videoId}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: currentVideoIndex === index ? 1 : 0,
                            x: currentVideoIndex === index ? 0 : 
                                currentVideoIndex > index ? '-100%' : '100%',
                          }}
                          transition={{ 
                            duration: 0.7,
                            ease: [0.4, 0.0, 0.2, 1]
                          }}
                          className="absolute inset-0"
                          style={{ display: Math.abs(currentVideoIndex - index) <= 1 || 
                                   (currentVideoIndex === 0 && index === videos.length - 1) || 
                                   (currentVideoIndex === videos.length - 1 && index === 0) 
                                   ? 'block' : 'none' }}
                        >
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`YouTube video ${index + 1}`}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="absolute inset-0"
                          ></iframe>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Dot indicators */}
                    <div className="flex justify-center mt-4 gap-2">
                      {videos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentVideoIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentVideoIndex === index 
                              ? 'bg-primary scale-125' 
                              : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                          }`}
                          aria-label={`View video ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-center text-muted-foreground">
                    Featured videos from my channel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Socials Section */}
      <section className="py-24 relative z-[2]" id="contact">
        <div className="container">
          <InteractiveTitleEffect>Socials</InteractiveTitleEffect>

          <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
            <p className="text-lg mb-8 text-center">
              Connect with me on these platforms or drop me a message!
            </p>
            
            {/* iOS-style app grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
              {/* GitHub */}
                  <a 
                    href="https://github.com/qlintenFX/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                className="flex flex-col items-center group"
                  >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#333] to-[#111] flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(80,80,80,0.6)] shadow-[0_0_10px_rgba(80,80,80,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>
              
              {/* YouTube */}
                  <a 
                    href="https://www.youtube.com/@qlintenFX" 
                    target="_blank" 
                    rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#FF0000] to-[#CC0000] flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,0,0,0.7)] shadow-[0_0_10px_rgba(255,0,0,0.4)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                </div>
                <span className="text-sm font-medium">YouTube</span>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/quinten-de-meyer-2336282a2/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#0077B5] to-[#0056A3] flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,119,181,0.7)] shadow-[0_0_10px_rgba(0,119,181,0.4)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              
              {/* Email */}
              <button 
                onClick={revealEmail}
                className="flex flex-col items-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#34C759] to-[#27AE60] flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(52,199,89,0.7)] shadow-[0_0_10px_rgba(52,199,89,0.4)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </div>
                <span className="text-sm font-medium">
                  {emailVisible ? `${emailParts[0]}@${emailParts[1]}` : "Email"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
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
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <motion.img 
                          src={img} 
                          alt={`${projects[selectedProject].title} - Photo ${index + 1}`}
                          className={`w-full rounded-xl shadow-md object-contain max-h-[70vh] ${img.includes('diagram') ? 'bg-white' : ''}`}
                          initial={{ scale: 1.05 }}
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.3 }
                          }}
                          transition={{ duration: 0.5 }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://placehold.co/800x600?text=Project+Screenshot";
                          }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <div className="p-4 text-white">
                            <h4 className="font-semibold">{projects[selectedProject].title}</h4>
                            <p className="text-sm opacity-90">Image {index + 1} of {projects[selectedProject].images.length}</p>
                          </div>
                        </motion.div>
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

      {/* CV Dialog for viewing PDF */}
      <Dialog open={showCVDialog} onOpenChange={setShowCVDialog}>
        <DialogContent className="max-w-7xl w-full p-0 h-[98vh] flex flex-col">
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
    </div>
  );
};

export default Home;
