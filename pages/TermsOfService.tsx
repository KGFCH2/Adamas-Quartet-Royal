
import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-serif font-bold text-chakra-900 dark:text-white mb-6">Terms of Governance</h1>
        <div className="flex justify-center items-center gap-2">
           <div className="h-1 w-12 bg-saffron-500 rounded-full"></div>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-royal-800 shadow-2xl border border-gray-100 dark:border-royal-700 p-12 rounded-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-saffron-500"></div>
        <div className="space-y-12 text-slate-900 dark:text-slate-100">
          <section>
            <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 flex items-center gap-4">
               <span className="w-8 h-8 rounded-full bg-saffron-50 dark:bg-saffron-900/20 text-saffron-600 flex items-center justify-center text-xs">01</span>
               Contractual Bond
            </h2>
            <p className="leading-relaxed">Engagement with The Royal Indus platform constitutes a formal agreement to uphold our values of respect and integrity. These terms define the parameters of your royal tenure at our properties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 flex items-center gap-4">
               <span className="w-8 h-8 rounded-full bg-saffron-50 dark:bg-saffron-900/20 text-saffron-600 flex items-center justify-center text-xs">02</span>
               Imperial Conduct
            </h2>
            <p className="leading-relaxed">Guests are expected to maintain the decorum of the premises. Any actions resulting in property damage or public disturbance will result in the immediate termination of the stay without restitution.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 flex items-center gap-4">
               <span className="w-8 h-8 rounded-full bg-saffron-50 dark:bg-saffron-900/20 text-saffron-600 flex items-center justify-center text-xs">03</span>
               Legal Jurisdiction
            </h2>
            <p className="leading-relaxed">All disputes are subject to the exclusive jurisdiction of the Courts of Udaipur, Rajasthan, in accordance with the laws of the Republic of India.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
