import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentView: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'favorites' | 'players';
  setView: (view: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'favorites' | 'players') => void;
  cartCount: number;
  favoritesCount: number;
  onSearch: (query: string) => void;
}

export default function Header({
  currentView,
  setView,
  cartCount,
  favoritesCount,
  onSearch,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { label: 'Home', id: 'home' as const },
    { label: 'Shop', id: 'shop' as const },
    { label: 'Collections', id: 'shop' as const, params: { filter: 'collections' } }, // Can redirect to shop with a pre-filter
    { label: 'Players', id: 'players' as const },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070b16] border-b border-white/5 backdrop-blur-md bg-opacity-95 text-white py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Brand Logo and Title */}
      <div 
        className="flex items-center gap-3 cursor-pointer select-none group"
        onClick={() => setView('home')}
        id="header-brand-logo"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9c1d3c] to-[#004d98] flex items-center justify-center font-bold text-xs border border-[#edbb00]/50 shadow-lg shadow-[#9c1d3c]/20 group-hover:scale-105 transition-transform">
          <span className="text-[#edbb00] tracking-wider">FCB</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight font-sans leading-tight">Barça Store</span>
          <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-semibold">Official Merch</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5" id="header-nav">
        {menuItems.map((item, index) => {
          const isActive = currentView === item.id || (item.label === 'Collections' && currentView === 'shop');
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => setView(item.id)}
              className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-white/10 text-[#edbb00] shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              id={`nav-item-${item.label.toLowerCase()}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Action Icons */}
      <div className="flex items-center gap-3 md:gap-4" id="header-actions">
        {/* Search Toggle */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 hover:bg-white/5 rounded-full transition-colors relative group"
          aria-label="Search"
          id="btn-search-toggle"
        >
          <Search className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
        </button>

        {/* Favorites */}
        <button
          onClick={() => setView('favorites')}
          className="p-2 hover:bg-white/5 rounded-full transition-colors relative group"
          aria-label="Favorites"
          id="btn-favorites-toggle"
        >
          <Heart className={`w-4 h-4 transition-colors ${currentView === 'favorites' ? 'text-[#e11d48] fill-[#e11d48]' : 'text-gray-300 group-hover:text-[#e11d48]'}`} />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#e11d48] text-white font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* Shopping Cart */}
        <button
          onClick={() => setView('cart')}
          className="p-2 hover:bg-white/5 rounded-full transition-colors relative group"
          aria-label="Shopping Cart"
          id="btn-cart-toggle"
        >
          <ShoppingBag className={`w-4 h-4 transition-colors ${currentView === 'cart' ? 'text-[#edbb00]' : 'text-gray-300 group-hover:text-white'}`} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#9c1d3c] border border-[#edbb00] text-[#edbb00] font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              {cartCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white border border-white/10 shadow-inner select-none cursor-pointer hover:opacity-90 transition-opacity">
          <span>U</span>
        </div>
      </div>

      {/* Animated Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070b16]/95 backdrop-blur-md flex items-center justify-center p-6"
            id="search-overlay"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
              id="btn-close-search"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-xl"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for jerseys, players, collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white/5 text-white text-lg font-medium px-6 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-[#edbb00] focus:ring-1 focus:ring-[#edbb00] transition-all pr-14 shadow-2xl"
                  id="search-input"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#9c1d3c] to-[#004d98] rounded-xl text-white hover:opacity-90 transition-opacity"
                  id="btn-submit-search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
              <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs text-gray-400">
                <span>Popular:</span>
                {['Home Kit', 'Yamal', 'Gavi', 'Away Kit', 'Champions Edition'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      onSearch(tag);
                      setIsSearchOpen(false);
                    }}
                    className="text-gray-300 hover:text-[#edbb00] bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
