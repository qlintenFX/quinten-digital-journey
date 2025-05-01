import React, { createContext, useContext, useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

// Create cursor context
const CursorContext = createContext({
  cursorType: 'default',
  cursorText: '',
  setCursorType: () => {},
  setCursorText: () => {},
  cursorEnabled: true,
  toggleCursor: () => {}
});

// Custom hook to use cursor context
export const useCursor = () => useContext(CursorContext);

const CursorEffectsProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [cursorEnabled, setCursorEnabled] = useState(() => {
    // Check localStorage for saved preference
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('cursorEnabled');
        return stored === null ? true : stored === 'true';
      }
    } catch (error) {
      console.error("Error reading cursor preference from localStorage:", error);
    }
    return true;
  });

  // Apply cursor enabled/disabled status to body
  useEffect(() => {
    try {
      if (typeof document !== 'undefined' && document.body) {
        if (cursorEnabled) {
          // Add with a slight delay to ensure proper initialization
          setTimeout(() => {
            try {
              document.body.classList.add('has-custom-cursor');
            } catch (error) {
              console.error("Error adding cursor class to body:", error);
            }
          }, 50);
        } else {
          // Remove class immediately
          document.body.classList.remove('has-custom-cursor');
        }
        
        // Save preference to localStorage
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('cursorEnabled', cursorEnabled.toString());
          } catch (error) {
            console.error("Error saving cursor preference to localStorage:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error updating cursor state:", error);
    }
  }, [cursorEnabled]);

  const toggleCursor = () => {
    try {
      setCursorEnabled(prev => !prev);
    } catch (error) {
      console.error("Error toggling cursor state:", error);
    }
  };

  const contextValue = {
    cursorType,
    cursorText,
    cursorEnabled,
    setCursorType,
    setCursorText,
    toggleCursor
  };

  return (
    <CursorContext.Provider value={contextValue}>
      {cursorEnabled && <CustomCursor key="custom-cursor" />}
      {children}
    </CursorContext.Provider>
  );
};

// Helper component to manually set cursor properties
export const CursorModifier = ({ 
  children, 
  type = 'default', 
  text = '',
  magnetic = false,
  strength = 40,
  threshold = 100
}) => {
  const { setCursorType, setCursorText, cursorEnabled } = useCursor();
  
  const handleMouseEnter = () => {
    if (cursorEnabled) {
      try {
        setCursorType(type);
        setCursorText(text);
      } catch (error) {
        console.error("Error setting cursor type on mouse enter:", error);
      }
    }
  };
  
  const handleMouseLeave = () => {
    if (cursorEnabled) {
      try {
        setCursorType('default');
        setCursorText('');
      } catch (error) {
        console.error("Error resetting cursor type on mouse leave:", error);
      }
    }
  };
  
  if (magnetic && cursorEnabled) {
    try {
      // Import MagneticElement dynamically to avoid circular dependencies
      const MagneticElement = React.lazy(() => import('./MagneticElement'));
      
      return (
        <React.Suspense fallback={children}>
          <MagneticElement 
            strength={strength} 
            threshold={threshold}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </MagneticElement>
        </React.Suspense>
      );
    } catch (error) {
      console.error("Error rendering magnetic element:", error);
      // Fallback to regular element if magnetic fails
      return (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'inline-block' }}
        >
          {children}
        </div>
      );
    }
  }
  
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  );
};

export default CursorEffectsProvider; 