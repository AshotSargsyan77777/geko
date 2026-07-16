import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface FavoritesListProps {
  favorites: Product[];
  onToggleFavorite: (e: React.MouseEvent, product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onBackToShop: () => void;
}

export default function FavoritesList({
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onBackToShop,
}: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className="bg-[#070b16] text-white py-16 px-6 md:px-12 text-center max-w-xl mx-auto space-y-6" id="empty-favorites">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-sans">No Favorites Yet</h2>
          <p className="text-gray-400 text-xs md:text-sm">
            Tap the heart icon on any 2026/27 official kits to save them here for quick customized printing!
          </p>
        </div>
        <button
          onClick={onBackToShop}
          className="px-8 py-3.5 bg-gradient-to-r from-[#9c1d3c] to-[#004d98] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg cursor-pointer hover:opacity-95"
        >
          Browse Official Kits
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#070b16] text-white py-8 px-4 md:px-12 lg:px-24 text-left min-h-[80vh]" id="favorites-view">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold tracking-tight font-sans">My Favorites</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all flex flex-col justify-between"
              id={`fav-item-${product.id}`}
            >
              {/* Image stage */}
              <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Remove button */}
                <button
                  onClick={(e) => onToggleFavorite(e, product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white transition-colors"
                  id={`btn-remove-fav-item-${product.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5 text-[#e11d48]" />
                </button>
              </div>

              {/* Detail block */}
              <div className="p-4 flex flex-col justify-between text-left flex-grow">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium uppercase tracking-wider mb-0.5">
                    {product.player}
                  </span>
                  <h4 className="text-white font-bold text-sm md:text-base leading-tight font-sans">
                    {product.name}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="font-extrabold text-sm md:text-base text-white font-sans">
                    ${product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-[#9c1d3c] to-[#004d98] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 hover:opacity-95"
                  >
                    <ShoppingBag className="w-3 h-3" /> Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
