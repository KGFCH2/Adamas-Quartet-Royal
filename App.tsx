
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import MyBookings from './pages/MyBookings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import { WelcomeLoader } from './components/WelcomeLoader';
import { AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="royal-indus-theme">
      <AuthProvider>
        <AnimatePresence mode="wait">
          {showWelcome && (
            <WelcomeLoader onComplete={() => setShowWelcome(false)} />
          )}
        </AnimatePresence>
        
        {!showWelcome && (
          <HashRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-royal-950 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/refund-policy" element={<RefundPolicy />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
