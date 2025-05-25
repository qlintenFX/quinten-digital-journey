import React from 'react';
import { motion } from 'framer-motion';

interface PortfolioSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string; // For scrolling to the section
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ children, className = "", id }) => {
  return (
    <motion.section
      id={id}
      className={`py-16 md:py-24 relative ${className}`} // Standard padding, adjust as needed
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% is in view
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-6"> {/* Standard container */} 
        {children}
      </div>
    </motion.section>
  );
};

export default PortfolioSection; 