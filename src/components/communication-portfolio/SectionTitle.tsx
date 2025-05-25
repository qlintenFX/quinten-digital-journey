import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Adapted from InteractiveTitleEffect in Home.tsx for light mode
// Assumes light-mode-bubble.png is available in public/images/

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState<any[]>([]);
  const isDark = false; // Hardcoded for light mode

  useEffect(() => {
    if (isHovered) {
      const count = Math.floor(Math.random() * 5) + 4; // 4-8 bubbles
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

  // Light mode primary color (derived from Home.tsx's dark mode primary and typical light mode adjustments)
  // rgb(134, 39, 230) is a darker purple often seen in light mode versions of purple themes.
  const lightModePrimaryColor = "rgb(134, 39, 230)";
  const lightModeTextShadow = `0 0 7px rgba(134, 39, 230, 0.5)`;
  const lightModeHoverColor = "rgb(168, 85, 247)"; // Lighter purple for hover, similar to original primary

  return (
    <div className="relative mb-12 md:mb-16"> {/* Added some bottom margin consistent with titles */}
      <div
        className={`inline-block relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold relative z-10"
          style={{ color: lightModePrimaryColor }}
          animate={isHovered ? {
            textShadow: [
              lightModeTextShadow,
              `0 0 15px rgba(134, 39, 230, 0.7)`,
              lightModeTextShadow
            ],
            color: [
              lightModePrimaryColor,
              lightModeHoverColor,
              lightModePrimaryColor
            ]
          } : {
            color: lightModePrimaryColor,
            textShadow: 'none'
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            repeatType: "mirror" // Changed from reverse for a slightly different pulse
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
                zIndex: 0 // Behind text
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, bubble.opacity, 0],
                scale: [0, 1, 0],
                y: [0, -30 - Math.random() * 20, -60 - Math.random() * 40] // Adjusted y animation
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: bubble.duration,
                delay: bubble.delay,
                ease: "easeOut"
              }}
            >
              <img
                src={"/images/light-mode-bubble.png"} // Explicitly light mode
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

export default SectionTitle; 