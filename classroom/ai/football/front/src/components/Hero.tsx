import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star, Globe, Users } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  featuredProduct: Product;
  onViewProduct: (product: Product) => void;
  onShopNow: () => void;
}

export default function Hero({ featuredProduct, onViewProduct, onShopNow }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#070b16] py-12 px-6 md:px-12 lg:px-24 overflow-hidden" id="hero-section">
      {/* Camp Nou light background overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25 mix-blend-screen"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1920")' 
        }}
        referrerPolicy="no-referrer"
      />
      {/* Multi-layered dark & colorful glow gradients to match image */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-[#9c1d3c]/20 blur-[100px] z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-[#004d98]/25 blur-[120px] z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-t from-[#070b16] via-transparent to-[#070b16]/80 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text and Stats */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-8 flex flex-col items-start text-left"
          id="hero-left-content"
        >
          {/* New Collection Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-[#9c1d3c]/40 rounded-full"
            id="hero-collection-badge"
          >
            <span className="w-2 h-2 rounded-full bg-[#9c1d3c] animate-pulse" />
            <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-semibold">
              NEW 2026/27 COLLECTION
            </span>
          </motion.div>

          {/* Heading with gradients */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-sans" id="hero-title">
              Wear the <br />
              <span className="bg-gradient-to-r from-[#e11d48] via-[#f43f5e] to-[#f59e0b] bg-clip-text text-transparent">
                Pride
              </span>{' '}
              <span className="text-[#edbb00]">of</span> <br />
              Barça
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-lg leading-relaxed font-sans" id="hero-subtitle">
              Official FC Barcelona jerseys. Authentic performance fabric, iconic blaugrana design. Ship worldwide in 2–4 days.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto" id="hero-buttons">
            <button
              onClick={onShopNow}
              className="px-8 py-3.5 bg-gradient-to-r from-[#9c1d3c] to-[#e11d48] text-white rounded-full font-medium text-xs tracking-wider uppercase hover:opacity-95 shadow-lg shadow-[#9c1d3c]/30 hover:scale-[1.02] transition-all cursor-pointer"
              id="hero-btn-shop"
            >
              Shop Now
            </button>
            <button
              onClick={onShopNow}
              className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-medium text-xs tracking-wider uppercase hover:scale-[1.02] transition-all cursor-pointer backdrop-blur-sm"
              id="hero-btn-new-collection"
            >
              New Collection
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5 w-full max-w-md text-left" id="hero-stats">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#edbb00]" />
                <span className="text-xl md:text-2xl font-bold text-white font-sans">50K+</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">Happy Fans</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#edbb00]" />
                <span className="text-xl md:text-2xl font-bold text-white font-sans">120+</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">Countries</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#edbb00] fill-[#edbb00]" />
                <span className="text-xl md:text-2xl font-bold text-white font-sans">4.9★</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Product Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
          id="hero-right-showcase"
        >
          <div className="relative group w-full max-w-[380px] bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md shadow-2xl hover:border-white/20 transition-all">
            {/* Image container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#004d98]/40 to-[#9c1d3c]/40 mb-6">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Overlay elements */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-[#004d98] to-[#9c1d3c] text-white text-[9px] font-mono font-bold tracking-widest px-3 py-1 rounded-full border border-white/10">
                {featuredProduct.badge || 'NEW'}
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-semibold block mb-1">
                  NEW
                </span>
                <h3 className="text-white font-bold text-xl font-sans">{featuredProduct.name}</h3>
                <span className="text-xs text-gray-400 font-medium mt-1 block">
                  #{featuredProduct.player}
                </span>
              </div>
              <div className="text-right">
                <span className="text-white font-extrabold text-xl font-sans block">
                  ${featuredProduct.price}
                </span>
                {featuredProduct.originalPrice && (
                  <span className="text-xs text-gray-500 line-through font-medium font-sans">
                    ${featuredProduct.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* View Details Button inside Card */}
            <button
              onClick={() => onViewProduct(featuredProduct)}
              className="w-full py-3 bg-gradient-to-r from-[#9c1d3c] to-[#004d98] hover:from-[#e11d48] hover:to-[#005fb8] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              id="hero-btn-view-details"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 font-medium uppercase">
          Scroll
        </span>
        <div className="w-[1.5px] h-6 bg-gradient-to-b from-white to-transparent rounded-full animate-bounce" />
      </div>
    </section>
  );
}
