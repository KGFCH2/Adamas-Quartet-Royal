
import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-serif font-bold text-chakra-900 dark:text-white mb-6">Privacy Charter</h1>
        <div className="flex justify-center items-center gap-2">
           <div className="h-1 w-12 bg-indiaGreen-500 rounded-full"></div>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-royal-800 shadow-2xl border border-gray-100 dark:border-royal-700 p-12 rounded-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-indiaGreen-500"></div>
        <div className="space-y-12 text-slate-900 dark:text-slate-100">
          <section>
            <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 flex items-center gap-4">
               <span className="w-8 h-8 rounded-full bg-indiaGreen-50 dark:bg-indiaGreen-900/20 text-indiaGreen-600 flex items-center justify-center text-xs">01</span>
               Stewardship of Information
            </h2>
            <p className="leading-relaxed">At The Royal Indus, your digital privacy is treated with the same reverence as your physical comfort. We collect essential booking metadata solely to facilitate your stay and maintain our high standards of service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 flex items-center gap-4">
               <span className="w-8 h-8 rounded-full bg-indiaGreen-50 dark:bg-indiaGreen-900/20 text-indiaGreen-600 flex items-center justify-center text-xs">02</span>
               Purpose & Utilization
            </h2>
            <p className="leading-relaxed">Data processing occurs strictly within the confines of Indian Jurisdictional laws. We utilize encryption for all stored records and never share your identity with unauthorized third-party marketing entities.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 flex items-center gap-4">
               <span className="w-8 h-8 rounded-full bg-indiaGreen-50 dark:bg-indiaGreen-900/20 text-indiaGreen-600 flex items-center justify-center text-xs">03</span>
               Fortress-Grade Security
            </h2>
            <p className="leading-relaxed">Our infrastructure employs multi-factor authentication and real-time monitoring to safeguard your transaction history and personal identifiers.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
