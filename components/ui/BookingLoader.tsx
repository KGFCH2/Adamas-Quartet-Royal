import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const MESSAGES = [
  "Securing your royal sanctuary...",
  "आपकी शाही विश्रामस्थली सुरक्षित की जा रही है...",
  "Tailoring your premium experience...",
  "आपके प्रीमियम अनुभव को तैयार किया जा रहा है...",
  "Almost there, Maharaja.",
  "बस कुछ ही क्षण और, महाराजा।"
];

export const BookingLoader = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-royal-900/95 backdrop-blur-md">
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indiaGreen-500/10 blur-[120px] rounded-full animate-pulse"></div>

      <div className="relative text-center max-w-md px-6">
        {/* Central Animation: Ashoka Chakra / Mandala Inspired */}
        <div className="relative flex items-center justify-center mb-12">
          {/* Outer Saffron Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-32 h-32 border-b-2 border-saffron-500 rounded-full opacity-40"
          />
          {/* Inner Green Ring */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute w-24 h-24 border-t-2 border-indiaGreen-500 rounded-full opacity-40"
          />
          {/* Core Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-16 h-16 bg-white dark:bg-royal-800 rounded-full flex items-center justify-center shadow-2xl shadow-saffron-500/20"
          >
            <ShieldCheck className="w-8 h-8 text-chakra-900 dark:text-saffron-500" />
          </motion.div>
        </div>

        {/* Text Area */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <p className="text-xl font-serif font-bold text-white tracking-wide">
                {MESSAGES[msgIndex]}
              </p>
              <div className="flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-saffron-500' : i === 1 ? 'bg-white' : 'bg-indiaGreen-500'}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="mt-8 w-64 mx-auto h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-transparent via-saffron-500 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};