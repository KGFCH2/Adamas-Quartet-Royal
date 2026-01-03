
import React from 'react';
import { motion } from 'framer-motion';

export const SectionLoader = () => {
  return (
    <div className="w-full py-24 flex flex-col items-center justify-center space-y-6 bg-slate-50 dark:bg-royal-950">
      <div className="relative h-16 w-16">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-saffron-500/20 border-t-saffron-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-indiaGreen-500 rounded-full" />
        </motion.div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse">
        Entering Royal Sanctuary
      </p>
    </div>
  );
};
