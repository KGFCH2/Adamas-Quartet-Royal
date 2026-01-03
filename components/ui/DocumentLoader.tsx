
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

export const DocumentLoader = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-chakra-900/90 backdrop-blur-xl"
        >
          <div className="text-center">
            <div className="relative flex items-center justify-center mb-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 border-2 border-saffron-500/20 border-t-saffron-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-white/10 p-5 rounded-full"
              >
                <FileText className="w-8 h-8 text-saffron-500" />
              </motion.div>
            </div>
            <motion.h3
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white font-serif text-2xl mb-2"
            >
              Transcribing Imperial Artifact
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-xs text-saffron-400 font-bold uppercase tracking-[0.3em]"
            >
              Finalizing Sovereign Encryption...
            </motion.p>
            
            <div className="mt-8 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1.5 h-1.5 rounded-full bg-saffron-500"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
