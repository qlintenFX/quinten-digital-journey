// This file will re-export effects from Home.tsx and Presentation.tsx to be used in the Communication Skills Portfolio.
// We will adapt them for light mode as needed or ensure they have light mode variants.

// Assuming these components are in @/components/ui/effects or similar if they were extracted
// For now, we'll assume they are accessible or we define simplified versions here if not.

// Placeholder for PurpleSparkle - ideally import the one from Home.tsx if path is known
// and ensure it has a light mode variant or is adaptable.

// --- Copied and adapted from Home.tsx / Presentation.tsx --- 

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Helper to check if document.documentElement exists (for SSR compatibility if ever needed)
const isClient = typeof window !== 'undefined';

function isDarkMode() {
  if (!isClient) return false; // Default to light mode for SSR or if document is not available
  return document.documentElement.classList.contains('dark');
}

// Interface for Sparkle properties
interface Sparkle {
  id: number;
  size: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  animationDuration: number;
  delay: number;
}

interface PurpleSparkleProps {
  count?: number;
}

/**
 * PurpleSparkle Component (Adapted for Light Mode)
 * Creates floating sparkle effects across the screen
 * @param {number} count - Number of sparkles to display
 */
export const PurpleSparkle: React.FC<PurpleSparkleProps> = ({ count = 10 }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  // const [isDark, setIsDark] = useState(isClient ? isDarkMode() : false);
  const isDarkTheme = false; // Hardcoded for light mode portfolio page

  // useEffect(() => {
  //   if (!isClient) return;
  //   setIsDark(isDarkMode());
  //   const observer = new MutationObserver(() => setIsDark(isDarkMode()));
  //   observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    const initialSparkles: Sparkle[] = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      size: Math.random() * 15 + 8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.4,
      animationDuration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }));
    setSparkles(initialSparkles);

    const interval = setInterval(() => {
      setSparkles(prevSparkles => {
        const replacementCount = Math.floor(Math.random() * 2) + 1; // Replace 1-2 sparkles
        const newSparklesSet = [...prevSparkles];
        for (let i = 0; i < replacementCount; i++) {
          const indexToReplace = Math.floor(Math.random() * prevSparkles.length);
          newSparklesSet[indexToReplace] = {
            id: Math.random(),
            size: Math.random() * 15 + 8,
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotation: Math.random() * 360,
            opacity: Math.random() * 0.5 + 0.4,
            animationDuration: Math.random() * 15 + 10,
            delay: 0,
          };
        }
        return newSparklesSet;
      });
    }, 4000); // Refresh some sparkles every 4 seconds
    return () => clearInterval(interval);
  }, [count]);

  const starImage = "/images/light-mode-star.webp"; // Explicitly light mode

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"> {/* z-index from Presentation.tsx for PurpleSparkle was 10 */}
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
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, sparkle.opacity, sparkle.opacity, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, sparkle.rotation, sparkle.rotation + 180],
            y: [0, -20, -40]
          }}
          transition={{
            duration: sparkle.animationDuration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 6 + 6, // 6-12s delay
          }}
        >
          <img
            src={starImage}
            alt=""
            className="w-full h-full object-contain"
            width={sparkle.size} // Use dynamic size
            height={sparkle.size} // Use dynamic size
          />
        </motion.div>
      ))}
    </div>
  );
};

// Interfaces for Glare and Glow properties
interface Glare {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blur: number;
}

interface DistantGlow extends Glare {
  color: string;
}

/**
 * LensGlare Component (Adapted for Light Mode)
 */
export const LensFlare: React.FC = () => {
  const [glarePositions, setGlarePositions] = useState<Glare[]>([]);
  const [distantGlows, setDistantGlows] = useState<DistantGlow[]>([]);
  // const [isDark, setIsDark] = useState(isClient ? isDarkMode() : false);
  const isDarkTheme = false; // Hardcoded for light mode portfolio page

  // useEffect(() => {
  //   if (!isClient) return;
  //   setIsDark(isDarkMode());
  //   const observer = new MutationObserver(() => setIsDark(isDarkMode()));
  //   observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    const count = Math.floor(Math.random() * 2) + 1; // 1-2 glares
    const newGlarePositions: Glare[] = Array(count).fill(0).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 70, // 70-190px
      opacity: Math.random() * 0.08 + 0.04, // 0.04-0.12
      blur: Math.random() * 30 + 30, // 30-60px blur
    }));
    setGlarePositions(newGlarePositions);

    const distantCount = 1; // Consistently 1 distant glow for subtlety
    const newDistantGlows: DistantGlow[] = Array(distantCount).fill(0).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 400 + 300, // 300-700px
      opacity: Math.random() * 0.1 + 0.05, // 0.05-0.15
      blur: Math.random() * 70 + 90, // 90-160px blur
      color: [
        'rgba(190, 140, 255, 0.15)',
        'rgba(210, 160, 255, 0.1)',
      ][Math.floor(Math.random() * 2)],
    }));
    setDistantGlows(newDistantGlows);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0]"> {/* z-index from Home.tsx LensGlare was 5, PResentation.tsx had it at root, but this should be behind content */}
      {distantGlows.map(glow => (
        <div
          key={glow.id}
          className="absolute"
          style={{
            left: `${glow.x}%`,
            top: `${glow.y}%`,
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            opacity: glow.opacity,
            filter: `blur(${glow.blur}px)`,
            background: `radial-gradient(circle, ${glow.color} 0%, rgba(190, 140, 255, 0) 70%)`,
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
            opacity: glare.opacity,
            filter: `blur(${glare.blur}px)`,
            background: 'radial-gradient(circle, rgba(170, 110, 230, 0.2) 0%, rgba(170, 110, 230, 0) 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

// Interface for Grid Point properties
interface GridPoint {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  mass: number;
}

interface GridDeformationProps {}

/**
 * GridDeformation Component (Adapted for Light Mode)
 */
export const GridDeformation: React.FC<GridDeformationProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState<{width: number; height: number;}>({ width: 0, height: 0 });
  const mousePosition = useRef<{x: number; y: number;}>({ x: -1000, y: -1000 }); // Use ref for mouse position to avoid re-renders
  const lastUpdateTime = useRef<number>(0);
  const gridPoints = useRef<GridPoint[]>([]);
  // const [isDark, setIsDark] = useState(isClient ? isDarkMode() : false);
  const isDarkTheme = false; // Hardcoded for light mode

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isClient) return;
    const now = performance.now();
    if (now - lastUpdateTime.current > 16) { // ~60fps
      mousePosition.current = { x: e.clientX, y: e.clientY };
      lastUpdateTime.current = now;
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = document.documentElement;
        setDimensions({ width: clientWidth, height: clientHeight });
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [handleMouseMove]);

  // useEffect(() => {
  //   if (!isClient) return;
  //   setIsDark(isDarkMode());
  //   const observer = new MutationObserver(() => setIsDark(isDarkMode()));
  //   observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    if (!isClient || dimensions.width === 0 || dimensions.height === 0) return;

    const createGrid = () => {
      const spacing = 55; // Light mode grid spacing
      const newPoints: GridPoint[] = [];
      const columns = Math.ceil(dimensions.width / spacing) + 1;
      const rows = Math.ceil(dimensions.height / spacing) + 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          newPoints.push({
            x: j * spacing, y: i * spacing,
            originalX: j * spacing, originalY: i * spacing,
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
            mass: 1 + Math.random() * 0.4
          });
        }
      }
      gridPoints.current = newPoints;
    };
    createGrid();
  }, [dimensions]);

  useEffect(() => {
    if (!canvasRef.current || gridPoints.current.length === 0 || !isClient) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const maxDistance = 200;
    const repulsionForce = 0.6;
    const friction = 0.9;
    const stiffness = 0.03;
    const maxDisplacement = 70;
    const ballRadius = 120;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      gridPoints.current.forEach(point => {
        const dx = mousePosition.current.x - point.x;
        const dy = mousePosition.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        point.acceleration = { x: 0, y: 0 };

        if (distance < maxDistance) {
          const normalizedDistance = distance / maxDistance;
          const force = (1 - normalizedDistance) * repulsionForce;
          const ballEffect = Math.max(0, 1 - (distance / ballRadius));
          const enhancedForce = force * (1 + ballEffect * 1.2);
          const angle = Math.atan2(dy, dx);
          point.acceleration.x -= (Math.cos(angle) * enhancedForce) / point.mass;
          point.acceleration.y -= (Math.sin(angle) * enhancedForce) / point.mass;
        }

        point.acceleration.x += (point.originalX - point.x) * stiffness;
        point.acceleration.y += (point.originalY - point.y) * stiffness;
        point.velocity.x = (point.velocity.x + point.acceleration.x) * friction;
        point.velocity.y = (point.velocity.y + point.acceleration.y) * friction;
        point.x += point.velocity.x;
        point.y += point.velocity.y;

        const currentDispX = point.x - point.originalX;
        const currentDispY = point.y - point.originalY;
        const currentDisp = Math.sqrt(currentDispX * currentDispX + currentDispY * currentDispY);

        if (currentDisp > maxDisplacement) {
          const scale = maxDisplacement / currentDisp;
          point.x = point.originalX + currentDispX * scale;
          point.y = point.originalY + currentDispY * scale;
          point.velocity.x *= 0.4;
          point.velocity.y *= 0.4;
        }
      });

      ctx.strokeStyle = 'rgba(170, 110, 230, 0.3)'; // Lighter purple for grid lines
      ctx.lineWidth = 0.6;
      const spacing = 55;
      const columns = Math.ceil(dimensions.width / spacing) + 1;
      const rows = Math.ceil(dimensions.height / spacing) + 1;

      for (let i = 0; i < rows; i++) {
        ctx.beginPath();
        for (let j = 0; j < columns - 1; j++) {
          const p1 = gridPoints.current[i * columns + j];
          const p2 = gridPoints.current[i * columns + j + 1];
          if (p1 && p2) {
            if (j === 0) ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
      }

      for (let j = 0; j < columns; j++) {
        ctx.beginPath();
        for (let i = 0; i < rows - 1; i++) {
          const p1 = gridPoints.current[i * columns + j];
          const p2 = gridPoints.current[(i + 1) * columns + j];
          if (p1 && p2) {
            if (i === 0) ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]); // mousePosition.current will be read directly in animate

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]" // z-index from Home.tsx GridDeformation was -10, Presentation was also low
      style={{ opacity: 0.8 }} // Adjusted opacity for light mode
    />
  );
}; 