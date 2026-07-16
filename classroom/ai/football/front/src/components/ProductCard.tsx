import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, product: Product) => void;
  onSelect: (product: Product) => void;
  key?: React.Key;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: ProductCardProps) {
  const badgeColors = {
    NEW: 'bg-[#004d98] border border-white/10 text-white',
    LIMITED: 'bg-[#edbb00] text-[#070b16] font-extrabold',
    SALE: 'bg-[#9c1d3c] border border-white/10 text-white',
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#004d98]/10 to-[#9c1d3c]/10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md shadow-md ${badgeColors[product.badge] || ''}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Heart Favorite Trigger */}
        <button
          onClick={(e) => onToggleFavorite(e, product)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white transition-colors"
          aria-label="Toggle favorite"
          id={`btn-fav-${product.id}`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite ? 'text-[#e11d48] fill-[#e11d48]' : 'text-white hover:text-[#e11d48]'
            }`}
          />
        </button>
      </div>

      {/* Metadata Panel */}
      <div className="p-4 flex-grow flex flex-col justify-between text-left">
        <div>
          {/* Player name label in grey */}
          <span className="text-[11px] text-gray-400 font-medium tracking-tight block mb-0.5">
            {product.player}
          </span>
          {/* Kit Name */}
          <h4 className="text-white font-bold text-sm md:text-base leading-tight group-hover:text-[#edbb00] transition-colors font-sans">
            {product.name}
          </h4>
        </div>

        {/* Ratings and Prices */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
          {/* Star rating info */}
          <div className="flex items-center gap-1">
            <div className="flex items-center text-[#edbb00]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-[#edbb00]' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-sans font-medium mt-0.5">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Price display layout with discount */}
          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-[11px] text-gray-500 line-through font-medium font-sans">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-white font-bold text-sm md:text-base font-sans">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
