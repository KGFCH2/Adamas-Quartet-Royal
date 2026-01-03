import React from 'react';
import { KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

export const HotelLoader = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-royal-100 rounded-full border-t-gold-500"
        />
        
        {/* Inner Key Icon pulsing */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
        >
          <KeyRound className="w-8 h-8 text-royal-900" />
        </motion.div>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm font-serif tracking-widest text-royal-800 uppercase"
      >
        {text}
      </motion.p>
    </div>
  );
};