
import React from 'react';
import { motion } from 'framer-motion';

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-serif font-bold text-chakra-900 dark:text-white mb-6">Restitution Guidelines</h1>
        <div className="flex justify-center items-center gap-2">
           <div className="h-1 w-12 bg-gray-400 rounded-full"></div>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-royal-800 shadow-2xl border border-gray-100 dark:border-royal-700 p-12 rounded-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300 dark:bg-royal-600"></div>
        <div className="space-y-12 text-slate-900 dark:text-slate-100">
          <section>
            <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 flex items-center gap-4">
               <span className="w-8 h-8 rounded-full bg-gray-50 dark:bg-royal-900 text-gray-500 flex items-center justify-center text-xs">01</span>
               Graceful Transitions
            </h2>
            <p className="leading-relaxed">We understand that plans can shift like the sands of Thar. Our refund structure is designed to be fair, balancing guest flexibility with operational integrity.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-6 bg-indiaGreen-50/30 dark:bg-indiaGreen-900/10 border-l-4 border-indiaGreen-500 rounded-r-md">
                  <div className="font-bold text-indiaGreen-800 dark:text-indiaGreen-400 text-sm mb-2 uppercase tracking-widest">24h+ Prior</div>
                  <div className="text-chakra-900 dark:text-white text-xl font-bold">100% Refund</div>
               </div>
               <div className="p-6 bg-saffron-50/30 dark:bg-saffron-900/10 border-l-4 border-saffron-500 rounded-r-md">
                  <div className="font-bold text-saffron-800 dark:text-saffron-400 text-sm mb-2 uppercase tracking-widest">Within 24h</div>
                  <div className="text-chakra-900 dark:text-white text-xl font-bold">50% Refund</div>
               </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 flex items-center gap-4">
               <span className="w-8 h-8 rounded-full bg-gray-50 dark:bg-royal-900 text-gray-500 flex items-center justify-center text-xs">02</span>
               Digital Settlement
            </h2>
            <p className="leading-relaxed">Approved refunds are processed instantly but may take 5 to 7 business days to materialize in your account via the original payment gateway utilized.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
