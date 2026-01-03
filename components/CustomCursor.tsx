
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, input, select, textarea, [role="button"], .interactive');
      setIsHovered(!!isClickable);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Central Point - Always visible */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-saffron-500 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(255,153,51,0.8)]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Outer Mandala Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
          opacity: isHovered ? 1 : 0.5,
          rotate: isHovered ? 180 : 0,
          scale: isActive ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderRadius: '50%',
          borderColor: isHovered ? '#FF9933' : '#138808',
          boxShadow: isHovered ? '0 0 20px rgba(255,153,51,0.3)' : 'none',
        }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] opacity-20 bg-center bg-cover rounded-full"></div>
        
        {/* Ashoka-style Spokes (Inner Detail) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-full h-[0.5px] bg-white" 
                  style={{ transform: `rotate(${i * 45}deg)` }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Particle Bloom on Click */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-10 h-10 border border-saffron-500 rounded-full pointer-events-none z-[9997]"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
