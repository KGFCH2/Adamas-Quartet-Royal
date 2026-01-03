
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-royal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-4 tracking-wider">
              ADAMAS QUARTET <span className="text-saffron-500">ROYAL</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A premium luxury hotel experience by the students of **Adamas University**.
            </p>
            <p className="text-white font-serif font-medium italic mb-2 text-lg">
              "Experience Modern Royalty"
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-gray-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 text-sm font-medium tricolor-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-300 text-sm font-medium tricolor-hover">
                  Available Rooms
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-300 text-sm font-medium tricolor-hover">
                  My Bookings History
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-gray-400">Our Policies</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms-of-service" className="text-gray-300 text-sm font-medium tricolor-hover">
                  Terms of Stay
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-300 text-sm font-medium tricolor-hover">
                  Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 text-sm font-medium tricolor-hover">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-gray-400">Our Location</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="font-bold text-white">Adamas University</li>
              <li>Barasat-Barrackpore Road</li>
              <li>Kolkata, WB 700126</li>
              <li className="pt-2 italic">Student Collaboration Project 2026</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[0.6rem] text-gray-600 uppercase tracking-widest">
            © 2026 ADAMAS QUARTET ROYAL. CREATED BY BABIN, DEBASMITA, JOITA, & MANISHA.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
