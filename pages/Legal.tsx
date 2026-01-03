import React from 'react';
import { motion } from 'framer-motion';

const Legal = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-serif font-bold text-chakra-900 dark:text-white mb-4 text-center"
      >
        Legal Information
      </motion.h1>
      <div className="h-1 w-24 mx-auto bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500 rounded-full mb-12"></div>

      <div className="space-y-8">
        {/* Terms of Service */}
        <div className="bg-white dark:bg-royal-800 shadow-sm border border-gray-200 dark:border-royal-700 p-8 rounded-lg overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-saffron-500"></div>
          <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-2">Terms of Service</h2>
          <div className="prose prose-sm text-gray-600 dark:text-gray-400 space-y-4">
            <p><strong>1. Introduction</strong><br/>Welcome to The Royal Indus. By accessing our website and making bookings, you agree to comply with these terms. We reserve the right to modify these terms at any time.</p>
            
            <p><strong>2. Booking & Payments</strong><br/>All bookings are subject to availability. Prices are listed in INR (Indian Rupees) and include applicable taxes unless stated otherwise. Payment confirmation is required to secure a reservation.</p>

            <p><strong>3. Guest Responsibilities</strong><br/>Guests are responsible for any damage caused to hotel property during their stay. Valid government-issued ID is required at check-in for all guests.</p>
          </div>
        </div>

        {/* Detailed Refund Policy */}
        <div className="bg-white dark:bg-royal-800 shadow-sm border border-gray-200 dark:border-royal-700 p-8 rounded-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-white dark:bg-gray-400"></div>
          <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-2">Refund Policy</h2>
          <div className="prose prose-sm text-gray-600 dark:text-gray-400 space-y-6">
            <section>
              <h3 className="text-lg font-bold text-chakra-800 dark:text-gray-200 mb-2">1. Cancellation Timeline</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>24 Hours or More:</strong> Cancellations made at least 24 hours prior to the standard check-in time (2:00 PM) will be eligible for a <strong>100% refund</strong>.</li>
                <li><strong>Within 24 Hours:</strong> Cancellations made within 24 hours of the check-in time will be eligible for a <strong>50% refund</strong> of the total booking value.</li>
                <li><strong>No-Show/Early Departure:</strong> No refunds will be issued for no-shows or guests departing earlier than the booked check-out date.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-chakra-800 dark:text-gray-200 mb-2">2. Refund Processing</h3>
              <p>Once a refund is approved, it will be initiated immediately. However, it may take <strong>5 to 7 business days</strong> for the amount to reflect in your account, depending on your bank's processing cycles.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-chakra-800 dark:text-gray-200 mb-2">3. Mode of Refund</h3>
              <p>All refunds will be credited back strictly to the <strong>original payment method</strong> used during the booking. We do not provide cash refunds or credit to third-party accounts.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-chakra-800 dark:text-gray-200 mb-2">4. Exceptional Circumstances</h3>
              <p>In the event of government-mandated lockdowns, natural calamities, or unforeseen flight cancellations, guests may be eligible for a <strong>Full Credit Note</strong> valid for 1 year, regardless of the cancellation timeline, subject to documentation.</p>
            </section>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white dark:bg-royal-800 shadow-sm border border-gray-200 dark:border-royal-700 p-8 rounded-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indiaGreen-500"></div>
          <h2 className="text-2xl font-serif font-bold text-chakra-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-2">Privacy Policy</h2>
          <div className="prose prose-sm text-gray-600 dark:text-gray-400 space-y-4">
            <p><strong>1. Data Collection</strong><br/>We collect personal information such as name, email, and booking details solely for the purpose of managing your reservations and improving our service.</p>
            
            <p><strong>2. Data Usage</strong><br/>Your data is used to process bookings, send confirmations, and communicate important updates. We do not sell your data to third parties.</p>

            <p><strong>3. Security</strong><br/>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;