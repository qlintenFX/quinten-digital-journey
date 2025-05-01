import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorShadowRef = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);
  const requestRef = useRef(null);
  const trailTimerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const isIdleRef = useRef(false);
  const lastActivityRef = useRef(Date.now());
  const isVisible = useRef(true);
  const ctxRef = useRef(null);
  // Keep track of added event listeners
  const interactiveElementsRef = useRef([]);
  
  // Ring and shadow position references
  const ringPosRef = useRef({ x: 0, y: 0 });
  const shadowPosRef = useRef({ x: 0, y: 0 });
  
  // Reduced particles for better performance
  const MAX_PARTICLES = 15;
  
  // Chrome purple colors - simplified for better performance
  const purpleColors = [
    'rgba(233, 213, 255, 0.8)', // Purple-200
    'rgba(192, 132, 252, 0.7)', // Purple-400
    'rgba(168, 85, 247, 0.6)', // Purple-500
  ];
  
  // Hover detection handlers (defined outside useEffect for cleanup)
  const handleElementMouseEnter = () => {
    isHoveringRef.current = true;
    if (cursorDotRef.current && cursorRingRef.current && cursorShadowRef.current) {
      cursorDotRef.current.classList.add('hovering');
      cursorRingRef.current.classList.add('hovering');
      cursorShadowRef.current.classList.add('hovering');
    }
  };
  
  const handleElementMouseLeave = () => {
    isHoveringRef.current = false;
    if (cursorDotRef.current && cursorRingRef.current && cursorShadowRef.current) {
      cursorDotRef.current.classList.remove('hovering');
      cursorRingRef.current.classList.remove('hovering');
      cursorShadowRef.current.classList.remove('hovering');
    }
  };
  
  // Resize handler
  const handleResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };
  
  // Initialize cursor and add event listeners
  useEffect(() => {
    let isComponentMounted = true;
    
    // If component unmounts during the timeout, we shouldn't continue
    const initializeTimeout = setTimeout(() => {
      if (!isComponentMounted) return;
      
      try {
        // Set initial position to center of screen to avoid cursor jump
        const initialX = window.innerWidth / 2;
        const initialY = window.innerHeight / 2;
        
        // Set initial position directly first
        if (cursorDotRef.current && cursorRingRef.current && cursorShadowRef.current) {
          const transform = 'translate3d(-50%, -50%, 0)';
          cursorDotRef.current.style.transform = transform;
          cursorRingRef.current.style.transform = transform;
          cursorShadowRef.current.style.transform = transform;
          
          cursorDotRef.current.style.left = `${initialX}px`;
          cursorDotRef.current.style.top = `${initialY}px`;
          cursorRingRef.current.style.left = `${initialX}px`;
          cursorRingRef.current.style.top = `${initialY}px`;
          cursorShadowRef.current.style.left = `${initialX}px`;
          cursorShadowRef.current.style.top = `${initialY}px`;
          
          // Initialize position references
          ringPosRef.current = { x: initialX, y: initialY };
          shadowPosRef.current = { x: initialX, y: initialY };
        }
        
        // Initialize canvas for particles with GPU acceleration
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          ctxRef.current = canvasRef.current.getContext('2d', { alpha: true });
          
          // Enable GPU acceleration for canvas
          canvasRef.current.style.transform = 'translate3d(0, 0, 0)';
          canvasRef.current.style.willChange = 'transform';
          canvasRef.current.style.backfaceVisibility = 'hidden';
        }
        
        window.addEventListener('resize', handleResize);
        
        // Initialize mouse position
        mousePosRef.current = { x: initialX, y: initialY };
        prevMousePosRef.current = { x: initialX, y: initialY };
        
        // Start animation loop
        startAnimationLoop();
        
        // Idle detection
        resetIdleTimer();

        // Add hover and magnetic effects to interactive elements
        try {
          const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], [role="button"], .cursor-hover');
          
          interactiveElements.forEach(el => {
            try {
              el.addEventListener('mouseenter', handleElementMouseEnter);
              el.addEventListener('mouseleave', handleElementMouseLeave);
              
              // Add magnetic effect to buttons and links
              if (el.tagName.toLowerCase() === 'button' || 
                  el.tagName.toLowerCase() === 'a' || 
                  el.getAttribute('role') === 'button' || 
                  el.classList.contains('cursor-hover')) {
                el.addEventListener('mousemove', magneticEffect);
              }
              
              // Add to ref array for cleanup
              interactiveElementsRef.current.push({
                element: el,
                listeners: {
                  mouseenter: handleElementMouseEnter,
                  mouseleave: handleElementMouseLeave,
                  mousemove: el.tagName.toLowerCase() === 'button' || 
                            el.tagName.toLowerCase() === 'a' || 
                            el.getAttribute('role') === 'button' || 
                            el.classList.contains('cursor-hover') ? magneticEffect : null
                }
              });
            } catch (err) {
              console.error("Error adding event listeners to element:", err);
            }
          });
        } catch (err) {
          console.error("Error setting up interactive elements:", err);
        }
      } catch (err) {
        console.error("Error initializing custom cursor:", err);
      }
    }, 100);
    
    // Event Listeners for cursor movement
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Add activity detection for idle state
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetIdleTimer);
    });
    
    // Cleanup function
    return () => {
      isComponentMounted = false;
      clearTimeout(initializeTimeout);
      
      // Remove window event listeners
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      
      // Clean up element event listeners
      try {
        interactiveElementsRef.current.forEach(item => {
          try {
            if (item.element) {
              if (item.listeners.mouseenter) item.element.removeEventListener('mouseenter', item.listeners.mouseenter);
              if (item.listeners.mouseleave) item.element.removeEventListener('mouseleave', item.listeners.mouseleave);
              if (item.listeners.mousemove) item.element.removeEventListener('mousemove', item.listeners.mousemove);
            }
          } catch (err) {
            console.error("Error removing event listeners from element:", err);
          }
        });
      } catch (err) {
        console.error("Error cleaning up interactive elements:", err);
      }
      
      // Clean up animation frame
      if (requestRef.current) {
        try {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        } catch (err) {
          console.error("Error canceling animation frame:", err);
        }
      }
      
      // Clean up timers
      if (trailTimerRef.current) {
        try {
          clearInterval(trailTimerRef.current);
          trailTimerRef.current = null;
        } catch (err) {
          console.error("Error clearing trail timer:", err);
        }
      }
      
      // Remove activity event listeners
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
      
      if (idleTimerRef.current) {
        try {
          clearTimeout(idleTimerRef.current);
          idleTimerRef.current = null;
        } catch (err) {
          console.error("Error clearing idle timer:", err);
        }
      }
      
      // Clear particle array to free memory
      particles.current = [];
    };
  }, []);
  
  // Create a particle with improved canvas rendering
  const createParticle = (x, y, options = {}) => {
    // Limit total particles for performance
    if (particles.current.length >= MAX_PARTICLES) {
      // Remove oldest particle if at max
      particles.current.shift();
    }
    
    const {
      velocityX = (Math.random() - 0.5) * 1.5,
      velocityY = (Math.random() - 0.5) * 1.5,
      size = Math.random() * 8 + 4, // Smaller size
      life = Math.random() * 600 + 300, // Shorter lifespan
      isTrail = false,
      color = purpleColors[Math.floor(Math.random() * purpleColors.length)],
      isBubble = false
    } = options;
    
    // Create particle object for canvas rendering
    const particleObject = {
      x,
      y,
      velocityX,
      velocityY,
      size,
      life,
      createdAt: Date.now(),
      isTrail,
      color,
      opacity: 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5, // Reduced rotation speed
      isBubble
    };
    
    particles.current.push(particleObject);
    return particleObject;
  };
  
  // Create a burst of particles when clicking
  const createParticleBurst = (x, y) => {
    // Check if it's a button click
    const isButtonClick = document.activeElement && 
      (document.activeElement.tagName === "BUTTON" || document.activeElement.getAttribute('role') === 'button');
    
    // If it's a button click, create bubbles instead of stars
    if (isButtonClick) {
      const burstCount = Math.floor(Math.random() * 5) + 5; // More bubbles for buttons
      
      // Detect if we're in dark mode
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Colors for bubbles based on mode
      let bubbleColors;
      if (isDarkMode) {
        // Purple bubbles for dark mode
        bubbleColors = [
          'rgba(233, 213, 255, 0.9)', // purple-200
          'rgba(216, 180, 254, 0.8)', // purple-300
          'rgba(192, 132, 252, 0.8)', // purple-400
          'rgba(168, 85, 247, 0.7)', // purple-500
          'rgba(147, 51, 234, 0.7)'  // purple-600
        ];
      } else {
        // Dark bubbles for light mode
        bubbleColors = [
          'rgba(88, 28, 135, 0.8)',   // purple-900
          'rgba(107, 33, 168, 0.7)',  // purple-800
          'rgba(126, 34, 206, 0.7)',  // purple-700
          'rgba(147, 51, 234, 0.6)',  // purple-600
          'rgba(67, 56, 202, 0.7)'    // indigo-700
        ];
      }
      
      for (let i = 0; i < burstCount; i++) {
        // Create bubble starting positions
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30 + 10;
        
        // Starting position
        const burstX = x + Math.cos(angle) * (distance / 8);
        const burstY = y + Math.sin(angle) * (distance / 8);
        
        // Slower upward and outward movement for bubbles
        const velocityX = Math.cos(angle) * (Math.random() * 1 + 0.2);
        const velocityY = Math.sin(angle) * (Math.random() * 1 + 0.2) - 0.8; // Upward bias
        
        // Random bubble size
        const size = Math.random() * 15 + 8;
        
        // Longer life for bubbles
        const life = Math.random() * 2000 + 1500;
        
        // Create bubble particle
        createParticle(burstX, burstY, {
          velocityX,
          velocityY,
          size,
          life,
          color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
          isBubble: true
        });
      }
    } else {
      // Regular click behavior - same as before
      const burstCount = Math.floor(Math.random() * 3) + 3;
      const angleIncrement = (Math.PI * 2) / burstCount;
      
      for (let i = 0; i < burstCount; i++) {
        const angle = i * angleIncrement;
        const speed = Math.random() * 1.5 + 0.5;
        const distance = Math.random() * 20 + 5;
        
        const burstX = x + Math.cos(angle) * (distance / 4);
        const burstY = y + Math.sin(angle) * (distance / 4);
        
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;
        
        const size = Math.random() * 10 + 5;
        const life = Math.random() * 500 + 200;
        
        createParticle(burstX, burstY, {
          velocityX,
          velocityY,
          size,
          life,
          color: purpleColors[Math.floor(Math.random() * purpleColors.length)]
        });
      }
    }
  };
  
  // Create trail particles based on cursor movement - significantly reduced
  const createTrailParticles = () => {
    const { x, y } = mousePosRef.current;
    const { x: prevX, y: prevY } = prevMousePosRef.current;
    
    // Calculate velocity magnitude
    const speed = Math.sqrt(
      Math.pow(velocityRef.current.x, 2) + 
      Math.pow(velocityRef.current.y, 2)
    );
    
    // Only create trail particles if moving at a certain speed
    if (speed > 5) { // Higher threshold
      // Limit to just 1 particle per trail for performance
      const trailX = prevX + (x - prevX) * 0.5;
      const trailY = prevY + (y - prevY) * 0.5;
      
      const offsetX = (Math.random() - 0.5) * 3;
      const offsetY = (Math.random() - 0.5) * 3;
      
      const size = Math.random() * 6 + 3; // Smaller particles
      const life = Math.random() * 300 + 150; // Shorter life
      
      // Scale down velocity
      const particleVelocityX = velocityRef.current.x * 0.05;
      const particleVelocityY = velocityRef.current.y * 0.05;
      
      createParticle(trailX + offsetX, trailY + offsetY, {
        velocityX: particleVelocityX,
        velocityY: particleVelocityY,
        size,
        life,
        isTrail: true,
        color: purpleColors[Math.floor(Math.random() * purpleColors.length)]
      });
    }
  };
  
  // Create a magnetic effect for interactive elements with less intensity
  const magneticEffect = (e) => {
    const target = e.currentTarget;
    const targetRect = target.getBoundingClientRect();
    
    // Get the center of the element
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;
    
    // Calculate distance from mouse to center
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const distanceX = mouseX - targetCenterX;
    const distanceY = mouseY - targetCenterY;
    
    // Calculate total distance
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // The maximum distance for the magnetic effect
    const maxDistance = Math.max(targetRect.width, targetRect.height) * 0.6;
    
    // If mouse is close enough, create magnetic attraction
    if (distance < maxDistance) {
      // Calculate strength based on distance (weaker attraction)
      const strength = 0.15 * (1 - distance / maxDistance);
      
      // Calculate the attraction point
      const attractX = mouseX - distanceX * strength;
      const attractY = mouseY - distanceY * strength;
      
      // Update cursor position to the attraction point
      updateCursorPosition({ clientX: attractX, clientY: attractY });
      
      // Reduced particle creation - minimal particles on magnetic effect
      if (Math.random() > 0.95) {
        createParticle(attractX, attractY, {
          size: Math.random() * 4 + 2,
          life: Math.random() * 200 + 100,
          velocityX: Math.cos(Math.random() * Math.PI * 2) * 0.2,
          velocityY: Math.sin(Math.random() * Math.PI * 2) * 0.2,
          color: purpleColors[0]
        });
      }
    }
  };
  
  // Create ripple effect when cursor is idle - reduced particles
  const createIdleRipple = () => {
    if (!isIdleRef.current || !isVisible.current) return;
    
    const { x, y } = mousePosRef.current;
    
    // Drastically reduced particles
    for (let i = 0; i < 3; i++) {
      const angle = (Math.PI * 2 * i) / 3;
      const distance = 5;
      
      // Calculate position around cursor
      const posX = x + Math.cos(angle) * distance;
      const posY = y + Math.sin(angle) * distance;
      
      // Create particle moving outward
      createParticle(posX, posY, {
        velocityX: Math.cos(angle) * 0.4,
        velocityY: Math.sin(angle) * 0.4,
        size: Math.random() * 6 + 3,
        life: Math.random() * 600 + 400,
        color: purpleColors[Math.floor(Math.random() * purpleColors.length)]
      });
    }
    
    // Schedule next ripple with longer delay
    setTimeout(createIdleRipple, 4000);
  };
  
  // Idle detection
  const resetIdleTimer = () => {
    lastActivityRef.current = Date.now();
    
    if (isIdleRef.current) {
      isIdleRef.current = false;
      
      // Simple animation to show activity resuming
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        cursorRingRef.current.style.transform = `translate(-50%, -50%) scale(1.2)`;
        
        setTimeout(() => {
          if (cursorRingRef.current) {
            cursorRingRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
            setTimeout(() => {
              if (cursorRingRef.current) {
                cursorRingRef.current.style.transition = '';
              }
            }, 300);
          }
        }, 150);
      }
    }
    
    clearTimeout(idleTimerRef.current);
    
    idleTimerRef.current = setTimeout(() => {
      isIdleRef.current = true;
      createIdleRipple();
    }, 3000); // 3 seconds of inactivity to trigger idle state
  };
  
  // Update cursor position with velocity calculation and GPU acceleration
  const updateCursorPosition = (e) => {
    if (!cursorDotRef.current || !cursorRingRef.current || !cursorShadowRef.current) return;
    
    const { clientX, clientY } = e;
    
    // Store previous position for velocity calculation
    prevMousePosRef.current = { ...mousePosRef.current };
    
    // Update current position
    mousePosRef.current = { x: clientX, y: clientY };
    
    // Calculate velocity
    velocityRef.current = {
      x: clientX - prevMousePosRef.current.x,
      y: clientY - prevMousePosRef.current.y
    };
    
    // Update positions with GPU acceleration
    const transform = `translate3d(-50%, -50%, 0)`;
    
    // Update dot immediately
    cursorDotRef.current.style.transform = transform;
    cursorDotRef.current.style.left = `${clientX}px`;
    cursorDotRef.current.style.top = `${clientY}px`;
    
    // The ring and shadow positions will be updated in the animation loop
    // using LERP for smooth transition
    
    // Clear any existing trail timer
    if (trailTimerRef.current) {
      clearInterval(trailTimerRef.current);
    }
    
    // Create trail particles much less often and only at higher speeds
    const speed = Math.sqrt(
      Math.pow(velocityRef.current.x, 2) + 
      Math.pow(velocityRef.current.y, 2)
    );
    
    if (speed > 15) { // Lowered threshold for trails
      createTrailParticles();
      
      // Create fewer trails with longer interval
      trailTimerRef.current = setInterval(() => {
        createTrailParticles();
      }, 150); // Adjusted interval
      
      // Auto-clear the interval after a short time
      setTimeout(() => {
        if (trailTimerRef.current) {
          clearInterval(trailTimerRef.current);
          trailTimerRef.current = null;
        }
      }, 150);
    }
  };
  
  // Mouse event handlers
  const handleMouseDown = (e) => {
    isClickingRef.current = true;
    
    if (cursorDotRef.current && cursorRingRef.current && cursorShadowRef.current) {
      cursorDotRef.current.classList.add('clicking');
      cursorRingRef.current.classList.add('clicking');
      cursorShadowRef.current.classList.add('clicking');
    }
    
    // Create particle burst at click position
    createParticleBurst(e.clientX, e.clientY);
  };
  
  const handleMouseUp = () => {
    isClickingRef.current = false;
    
    if (cursorDotRef.current && cursorRingRef.current && cursorShadowRef.current) {
      cursorDotRef.current.classList.remove('clicking');
      cursorRingRef.current.classList.remove('clicking');
      cursorShadowRef.current.classList.remove('clicking');
    }
  };
  
  const handleMouseEnter = (e) => {
    isVisible.current = true;
    
    if (cursorDotRef.current && cursorRingRef.current && cursorShadowRef.current) {
      cursorDotRef.current.style.opacity = '1';
      cursorRingRef.current.style.opacity = '1';
      cursorShadowRef.current.style.opacity = '0.3';
    }
    
    updateCursorPosition(e);
    resetIdleTimer();
  };
  
  const handleMouseLeave = () => {
    isVisible.current = false;
    
    if (cursorDotRef.current && cursorRingRef.current && cursorShadowRef.current) {
      cursorDotRef.current.style.opacity = '0';
      cursorRingRef.current.style.opacity = '0';
      cursorShadowRef.current.style.opacity = '0';
    }
    
    clearTimeout(idleTimerRef.current);
  };
  
  // Render a single particle on canvas with optimized rendering
  const renderParticle = (ctx, particle) => {
    const { x, y, size, color, opacity, rotation, isBubble } = particle;
    
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    
    if (isBubble) {
      // Draw bubble with different effect for button clicks
      ctx.rotate((rotation * Math.PI / 180) * 0.2); // Less rotation for bubbles
      
      // Bubble gradient
      const gradient = ctx.createRadialGradient(0, -size/5, 0, 0, 0, size/2);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, 'rgba(126, 34, 206, 0.1)');
      
      // Draw the bubble
      ctx.beginPath();
      ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight/refraction
      ctx.beginPath();
      ctx.arc(-size/5, -size/5, size/4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
      
      // Add smaller highlight
      ctx.beginPath();
      ctx.arc(size/6, size/6, size/8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      
      // Add thin bubble edge for realism
      ctx.beginPath();
      ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    } else {
      // Original particle rendering for normal clicks
      ctx.rotate(rotation * Math.PI / 180);
      
      // Draw bubble with lens glare effect
      const gradient = ctx.createRadialGradient(0, -size/4, size/10, 0, 0, size/2);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.3, color);
      gradient.addColorStop(1, 'rgba(126, 34, 206, 0.3)');
      
      ctx.beginPath();
      ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight for lens glare
      ctx.beginPath();
      ctx.arc(-size/6, -size/6, size/6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
    }
    
    ctx.restore();
  };
  
  // Animation loop for particles using canvas
  const startAnimationLoop = () => {
    const updateParticles = () => {
      if (!canvasRef.current || !ctxRef.current) {
        requestRef.current = requestAnimationFrame(updateParticles);
        return;
      }
      
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update cursor ring and shadow with LERP for smooth following
      if (cursorRingRef.current && cursorShadowRef.current) {
        // LERP factors - adjust for different trailing speeds
        const ringLerpFactor = 0.2; // Higher = faster following (0.1-0.3 range)
        const shadowLerpFactor = 0.12; // Lower = slower following
        
        // Calculate new ring position with smooth interpolation
        ringPosRef.current.x += (mousePosRef.current.x - ringPosRef.current.x) * ringLerpFactor;
        ringPosRef.current.y += (mousePosRef.current.y - ringPosRef.current.y) * ringLerpFactor;
        
        // Calculate new shadow position with smoother interpolation
        shadowPosRef.current.x += (mousePosRef.current.x - shadowPosRef.current.x) * shadowLerpFactor;
        shadowPosRef.current.y += (mousePosRef.current.y - shadowPosRef.current.y) * shadowLerpFactor;
        
        // Apply positions
        const transform = `translate3d(-50%, -50%, 0)`;
        
        cursorRingRef.current.style.transform = transform;
        cursorRingRef.current.style.left = `${ringPosRef.current.x}px`;
        cursorRingRef.current.style.top = `${ringPosRef.current.y}px`;
        
        cursorShadowRef.current.style.transform = transform;
        cursorShadowRef.current.style.left = `${shadowPosRef.current.x}px`;
        cursorShadowRef.current.style.top = `${shadowPosRef.current.y}px`;
      }
      
      const currentTime = Date.now();
      const newParticles = [];
      
      // Update particles
      for (let i = 0; i < particles.current.length; i++) {
        const particle = particles.current[i];
        const { createdAt, life, velocityX, velocityY, rotationSpeed, isTrail } = particle;
        const age = currentTime - createdAt;
        
        // Remove particles that have exceeded their lifespan
        if (age >= life) continue;
        
        // Calculate opacity based on age
        particle.opacity = 1 - (age / life);
        
        // Update position and appearance
        particle.x += velocityX;
        particle.y += velocityY;
        particle.rotation += rotationSpeed;
        
        // Apply damping to velocity
        particle.velocityX *= 0.97;
        particle.velocityY *= 0.97;
        
        // Add slight gravity effect to trail particles
        if (isTrail) {
          particle.velocityY += 0.01;
        }
        
        // Render the particle on canvas
        renderParticle(ctx, particle);
        
        // Scale down as they age
        if (age > life / 2) {
          particle.size *= 0.998;
        }
        
        newParticles.push(particle);
      }
      
      particles.current = newParticles;
      requestRef.current = requestAnimationFrame(updateParticles);
    };
    
    updateParticles();
  };
  
  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorRingRef} className="cursor-ring"></div>
      <div ref={cursorShadowRef} className="cursor-shadow"></div>
      <canvas 
        ref={canvasRef} 
        className="particles-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998
        }}
      />
    </>
  );
};

export default CustomCursor; 