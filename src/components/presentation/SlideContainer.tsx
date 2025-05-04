import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlideContainerProps {
  children: ReactNode;
  title?: string;
  isCentered?: boolean;
  className?: string;
}

const SlideContainer: React.FC<SlideContainerProps> = ({ 
  children, 
  title, 
  isCentered = false,
  className
}) => {
  return (
    <div 
      className={cn(
        "w-full h-full flex flex-col px-16 py-12", 
        isCentered && "items-center justify-center text-center",
        className
      )}
    >
      {title && (
        <div className="w-full mb-10">
          <h2 className="text-4xl font-bold text-primary inline-block pb-2 border-b-4 border-primary/30">
            {title}
          </h2>
        </div>
      )}
      <div className={cn(
        "w-full flex-grow flex flex-col",
        isCentered ? "items-center justify-center" : "justify-center"
      )}>
        {children}
      </div>
    </div>
  );
};

export interface SlideAnimationProps {
  children: ReactNode;
  slideKey: number | string;
}

export const SlideAnimation: React.FC<SlideAnimationProps> = ({ children, slideKey }) => {
  return (
    <motion.div
      key={slideKey}
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideContainer; 