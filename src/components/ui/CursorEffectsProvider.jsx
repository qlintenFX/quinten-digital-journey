import React, { createContext, useContext, useState } from 'react';
import CustomCursor from './CustomCursor';

// Create cursor context
const CursorContext = createContext({
  cursorType: 'default',
  cursorText: '',
  setCursorType: () => {},
  setCursorText: () => {}
});

// Custom hook to use cursor context
export const useCursor = () => useContext(CursorContext);

const CursorEffectsProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const contextValue = {
    cursorType,
    cursorText,
    setCursorType,
    setCursorText
  };

  return (
    <CursorContext.Provider value={contextValue}>
      <CustomCursor />
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
  const { setCursorType, setCursorText } = useCursor();
  
  const handleMouseEnter = () => {
    setCursorType(type);
    setCursorText(text);
  };
  
  const handleMouseLeave = () => {
    setCursorType('default');
    setCursorText('');
  };
  
  if (magnetic) {
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