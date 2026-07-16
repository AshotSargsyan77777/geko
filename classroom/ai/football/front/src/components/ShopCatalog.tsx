import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, Star } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ShopCatalogProps {
  products: Product[];
  favorites: Product[];
  onToggleFavorite: (e: React.MouseEvent, product: Product) => void;
  onSelectProduct: (product: Product) => void;
  initialFilter?: string;
  searchQuery?: string;
}

export default function ShopCatalog({
  products,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  initialFilter = 'all',
  searchQuery = '',
}: ShopCatalogProps) {
  const [selectedType, setSelectedType] = useState<string>(initialFilter);
  const [localSearch, setLocalSearch] = useState<string>(searchQuery);
  const [sortBy, setSortBy] = useState<string>('default');

  const categories = [
    { id: 'all', label: 'All Jerseys' },
    { id: 'home', label: 'Home Kits' },
    { id: 'away', label: 'Away Kits' },
    { id: 'third', label: 'Third Kits' },
    { id: 'champions', label: 'Limited Editions' },
  ];

  // Filtering & Sorting calculations
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by product type category
    if (selectedType !== 'all') {
      result = result.filter((p) => p.type === selectedType);
    }

    // Filter by search query
    const query = localSearch.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.player?.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedType, localSearch, sortBy]);

  return (
    <div className="bg-[#070b16] text-white py-12 px-4 md:px-12 lg:px-24 text-left" id="shop-catalog-stage">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Intro Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-3">
            <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-semibold block">
              2026/27 SEASON
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
              Featured Jerseys
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <span>Showing {filteredProducts.length} kits</span>
          </div>
        </div>

        {/* Filters and Controls Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-y border-white/5 py-4">
          {/* Categories Pill Scroller */}
          <div className="md:col-span-6 flex flex-wrap gap-2 justify-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedType === cat.id
                    ? 'bg-gradient-to-r from-[#9c1d3c] to-[#004d98] text-white shadow-md'
                    : 'bg-white/5 border border-white/5 hover:bg-white/10 text-gray-300'
                }`}
                id={`btn-category-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search filter inline */}
          <div className="md:col-span-3 relative">
            <input
              type="text"
              placeholder="Search jerseys..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white/5 text-xs text-white border border-white/10 rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#edbb00] placeholder-gray-500 font-sans"
              id="catalog-search-field"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* Sorter Selector */}
          <div className="md:col-span-3 flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-white w-full border-none focus:outline-none cursor-pointer"
              id="catalog-sort-selector"
            >
              <option value="default" className="bg-[#070b16] text-white">Sort By: Featured</option>
              <option value="price-asc" className="bg-[#070b16] text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-[#070b16] text-white">Price: High to Low</option>
              <option value="rating" className="bg-[#070b16] text-white">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Catalog Items Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="catalog-products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.some((f) => f.id === product.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/5 border border-white/5 rounded-3xl max-w-xl mx-auto space-y-4" id="catalog-empty-state">
            <SlidersHorizontal className="w-12 h-12 text-gray-500 mx-auto" />
            <h3 className="text-lg font-bold">No Products Found</h3>
            <p className="text-xs text-gray-400 leading-relaxed px-12">
              We couldn't find any Barcelona kits matching "{localSearch}". Try clearing your filters or testing with broad keywords like "home", "away", or player names.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setLocalSearch('');
                setSortBy('default');
              }}
              className="px-5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
