import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MagneticElement = ({ children, strength = 40, threshold = 100, className = '', onMouseEnter, onMouseLeave }) => {
  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Calculate the distance between the cursor and the element
  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Distance between cursor and element center
      const distance = calculateDistance(e.clientX, e.clientY, centerX, centerY);
      
      // Check if cursor is within threshold
      if (distance < threshold) {
        // Calculate the pull strength based on distance (closer = stronger)
        const pull = 1 - (distance / threshold);
        
        // Calculate the direction and magnitude of the pull
        const moveX = (e.clientX - centerX) * pull * (strength / 100);
        const moveY = (e.clientY - centerY) * pull * (strength / 100);
        
        setPosition({ x: moveX, y: moveY });
        
        if (!isHovered) {
          setIsHovered(true);
          onMouseEnter && onMouseEnter();
        }
      } else if (isHovered) {
        // Reset position when cursor moves away
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
        onMouseLeave && onMouseLeave();
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
      onMouseLeave && onMouseLeave();
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element && element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [threshold, strength, isHovered, onMouseEnter, onMouseLeave]);

  return (
    <motion.div
      ref={elementRef}
      animate={{ 
        x: position.x, 
        y: position.y 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 350, 
        damping: 25, 
        mass: 0.5 
      }}
      className={`magnetic-element ${className} ${isHovered ? 'is-hovered' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticElement; 