
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ARRIVAL_PHRASES = [
  "Opening the Imperial Gates...",
  "ঐশ্বর্যের নতুন ঠিকানা - স্বাগতম",
  "Preparing Your Royal Sanctuary...",
  "अतिथि देवो भव - राजसी अनुभव",
  "The Portals Are Open."
];

export const WelcomeLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < ARRIVAL_PHRASES.length) {
      const timer = setTimeout(() => setIndex(index + 1), 1200);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(onComplete, 1500);
      return () => clearTimeout(finishTimer);
    }
  }, [index, onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-royal-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500"></div>
        <div className="grid grid-cols-6 h-full w-full">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="border-r border-white/5"></div>
           ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center relative z-10"
      >
        <div className="mb-8 flex justify-center items-center gap-6">
           <div className="h-[1px] w-16 bg-saffron-500"></div>
           <span className="text-saffron-500 text-[0.7rem] font-bold tracking-[0.6em] uppercase">The Adamas Founders' Council</span>
           <div className="h-[1px] w-16 bg-indiaGreen-500"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-16 tracking-tighter">
          ADAMAS QUARTET <span className="italic font-light text-saffron-400">ROYAL</span>
        </h1>

        <div className="h-24 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={ARRIVAL_PHRASES[index]}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-2xl md:text-3xl font-serif italic text-white/80"
            >
              {ARRIVAL_PHRASES[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Decorative Floor Lamp Pattern */}
      <div className="absolute bottom-10 left-10 flex gap-4 opacity-30">
        <div className="w-1 h-20 bg-saffron-500/50"></div>
        <div className="w-1 h-12 bg-indiaGreen-500/50"></div>
      </div>

      <div className="absolute bottom-20 w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500"
        />
      </div>
    </motion.div>
  );
};
