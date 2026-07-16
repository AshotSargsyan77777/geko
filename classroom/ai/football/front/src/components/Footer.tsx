import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setView: (view: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'favorites' | 'players') => void;
}

export default function Footer({ setView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#070b16] pt-12 pb-16 px-6 md:px-12 lg:px-24 border-t border-white/5 text-left" id="footer-section">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Newsletter Subscription Box (Join the Barça Family) */}
        <div 
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#9c1d3c] via-[#5c1363] to-[#004d98] p-8 md:p-12 lg:p-16 text-center shadow-2xl"
          id="newsletter-banner"
        >
          {/* Decorative glow overlays */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#edbb00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-bold">
              EXCLUSIVE ACCESS
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
              Join the Barça Family
            </h3>
            <p className="text-gray-200 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
              Subscribe and get <span className="text-[#edbb00] font-bold">15% off</span> your first order, early access to limited drops, and exclusive fan content.
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 items-center max-w-md mx-auto mt-6"
                >
                  <div className="relative w-full">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#070b16]/40 backdrop-blur-md text-white text-xs py-3.5 px-5 rounded-full border border-white/10 focus:outline-none focus:border-[#edbb00] transition-colors pr-12"
                      id="newsletter-email-input"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#edbb00] hover:bg-[#d4a800] text-[#070b16] font-extrabold text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer shadow-lg shadow-black/20 hover:scale-[1.02]"
                    id="btn-subscribe-submit"
                  >
                    Subscribe
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2 mt-4 text-white"
                  id="newsletter-success"
                >
                  <CheckCircle2 className="w-10 h-10 text-[#edbb00]" />
                  <h4 className="font-bold text-lg">Welcome to the Club!</h4>
                  <p className="text-xs text-gray-200">
                    Check your inbox. We've sent you a 15% discount code: <strong className="text-[#edbb00]">BARCAFAMILY15</strong>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Brand footer details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/5" id="footer-directory">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9c1d3c] to-[#004d98] flex items-center justify-center font-bold text-xs border border-[#edbb00]/30">
                <span className="text-[#edbb00]">FCB</span>
              </div>
              <span className="font-bold text-sm tracking-tight">Barça Store</span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Experience the unmatched grandeur of Barcelona. This is a premium merchandise interface showcasing current and vintage club colors.
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3">Shop</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Home Kits</button></li>
                <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Away Kits</button></li>
                <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Third Kits</button></li>
                <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Limited Editions</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3">Support</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Size Guide</li>
                <li className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</li>
                <li className="hover:text-white cursor-pointer transition-colors">Order Tracking</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3">Compliance</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              This applet is built for premium presentation in AI Studio. All media is strictly intended for aesthetic evaluation.
            </p>
            <div className="text-[10px] text-gray-500">
              &copy; 2026 FC Barcelona Official Merch Clone. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
