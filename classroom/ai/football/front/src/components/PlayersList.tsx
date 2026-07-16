import React from 'react';
import { ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { PLAYERS_LIST } from '../data';
import { Product } from '../types';

interface PlayersListProps {
  products: Product[];
  onSelectProductWithPlayer: (product: Product, playerName: string) => void;
  setView: (view: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'favorites' | 'players') => void;
}

export default function PlayersList({
  products,
  onSelectProductWithPlayer,
  setView,
}: PlayersListProps) {
  return (
    <div className="bg-[#070b16] text-white py-12 px-4 md:px-12 lg:px-24 text-left min-h-[80vh]" id="players-view-catalog">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title Block */}
        <div className="space-y-3">
          <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-semibold block">
            OFFICIAL SQUAD PRINTS
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-white">
            Meet the Players
          </h1>
          <p className="text-gray-300 text-xs md:text-sm max-w-xl leading-relaxed">
            Choose any star from FC Barcelona’s official 2026/27 squad. Selecting a player will open their customized jersey print with authentic nameplates and original numbering.
          </p>
        </div>

        {/* Players Grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="players-grid">
          {PLAYERS_LIST.map((player) => {
            // Find a product that represents their custom display kit (default to home kit)
            const homeKit = products.find((p) => p.type === 'home') || products[0];

            return (
              <div
                key={player.name}
                onClick={() => onSelectProductWithPlayer(homeKit, player.name)}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 overflow-hidden cursor-pointer hover:border-[#edbb00]/50 hover:shadow-2xl hover:shadow-[#004d98]/10 transition-all duration-300"
                id={`player-card-${player.name.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {/* Background glow overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#004d98]/10 group-hover:bg-[#9c1d3c]/20 rounded-full blur-2xl transition-all pointer-events-none" />

                <div className="flex items-center gap-4">
                  {/* Avatar stage */}
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-tr from-[#9c1d3c] to-[#004d98] border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Descriptions details */}
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 bg-white/5 text-[#edbb00] text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                      #{player.number}
                    </span>
                    <h3 className="font-extrabold text-white text-sm md:text-base tracking-tight font-sans group-hover:text-[#edbb00] transition-colors leading-tight">
                      {player.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium font-sans uppercase tracking-wider">
                      {player.role}
                    </p>
                  </div>
                </div>

                {/* Card action callout */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-medium group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#edbb00]" /> Get Printed Kit
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#edbb00] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
