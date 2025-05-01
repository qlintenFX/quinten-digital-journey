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
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cursorEnabled');
      return stored === null ? true : stored === 'true';
    }
    return true;
  });

  // Apply cursor enabled/disabled status to body
  useEffect(() => {
    if (cursorEnabled) {
      document.body.classList.add('has-custom-cursor');
    } else {
      document.body.classList.remove('has-custom-cursor');
    }
    // Save preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('cursorEnabled', cursorEnabled.toString());
    }
  }, [cursorEnabled]);

  const toggleCursor = () => {
    setCursorEnabled(prev => !prev);
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
      {cursorEnabled && <CustomCursor />}
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
      setCursorType(type);
      setCursorText(text);
    }
  };
  
  const handleMouseLeave = () => {
    if (cursorEnabled) {
      setCursorType('default');
      setCursorText('');
    }
  };
  
  if (magnetic && cursorEnabled) {
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