import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Function to check if the page is in dark mode by looking at the document element
 */
function isDarkMode() {
  // Check for .dark class on html element (standard for many themes including Tailwind)
  return document.documentElement.classList.contains('dark');
}

/**
 * KeywordHighlight Component
 * Creates a subtle glow effect for important keywords
 */
export const KeywordHighlight = ({ children, className = "" }) => {
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
 * PurpleSparkle Component
 * Creates floating sparkle effects across the screen
 */
export const PurpleSparkle = ({ count = 15 }) => {
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
      opacity: Math.random() * 0.6 + 0.3,
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
            src={isDark ? "/images/optimized/dark-mode-star.webp" : "/images/optimized/light-mode-star.webp"}
            alt=""
            className="w-full h-full object-contain"
            width="1000" 
            height="1000"
          />
        </motion.div>
      ))}
    </div>
  );
};

/**
 * LensGlare Component
 * Creates lens flare and distant glow effects in the background
 */
export const LensGlare = () => {
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
      opacity: Math.random() * 0.15 + 0.08,
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
      opacity: Math.random() * 0.2 + 0.1,
      blur: Math.random() * 100 + 120, // 120-220px blur
      color: [
        'rgba(168, 85, 247, 0.35)',
        'rgba(196, 111, 255, 0.3)',
        'rgba(134, 39, 230, 0.35)',
        'rgba(224, 149, 255, 0.3)',
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
 */
export const GridDeformation = () => {
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
    const maxDistance = 250;
    const repulsionForce = 0.8;
    const friction = 0.85;
    const stiffness = 0.05;
    const maxDisplacement = 100;
    const ballRadius = 150;
    
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
        ? 'rgba(134, 39, 230, 0.4)'
        : 'rgba(168, 85, 247, 0.25)';
      ctx.lineWidth = !isDark ? 1 : 0.8;
      
      // Draw horizontal lines
      const columns = Math.ceil(dimensions.width / 60) + 1;
      const rows = Math.ceil(dimensions.height / 60) + 1;
      
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
 * SparkleText Component
 * Creates text with sparkle effects on hover
 */
export const SparkleText = ({ children, className }) => {
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
              src={isDark ? "/images/optimized/dark-mode-star.webp" : "/images/optimized/light-mode-star.webp"}
              alt=""
              className="w-full h-full object-contain"
              width="1000" 
              height="1000"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * TitleEffect Component
 * Creates a title with hover effects
 */
export const TitleEffect = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative mb-12">
      <div 
        className={`inline-block relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.h2 
          className="text-5xl font-bold text-primary relative z-10"
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
      </div>
    </div>
  );
}; 