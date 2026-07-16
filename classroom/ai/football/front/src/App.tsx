import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ShopCatalog from './components/ShopCatalog';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import FavoritesList from './components/FavoritesList';
import PlayersList from './components/PlayersList';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

import { PRODUCTS } from './data';
import { Product, CartItem } from './types';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'favorites' | 'players'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialCatalogFilter, setInitialCatalogFilter] = useState('all');

  // Cart and Favorites loaded from LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('barca_store_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('barca_store_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | undefined>(undefined);

  // Sync state with LocalStorage
  useEffect(() => {
    localStorage.setItem('barca_store_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('barca_store_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Favorite toggle handler
  const handleToggleFavorite = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Add to Cart handler with key aggregation
  const handleAddToCart = (
    product: Product,
    size: string,
    quantity: number,
    customName?: string,
    customNumber?: string
  ) => {
    setCart((prev) => {
      // Unique item composite ID based on size & custom print
      const compositeId = `${product.id}-${size}-${customName || 'none'}-${customNumber || 'none'}`;
      const existingIndex = prev.findIndex((item) => item.id === compositeId);

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: compositeId,
            product,
            size,
            quantity,
            customName,
            customNumber,
          },
        ];
      }
    });
  };

  // Immediate single checkout (Buy Now)
  const handleBuyNow = (
    product: Product,
    size: string,
    quantity: number,
    customName?: string,
    customNumber?: string
  ) => {
    handleAddToCart(product, size, quantity, customName, customNumber);
    setView('checkout');
  };

  // Cart item removal
  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Cart item qty increment/decrement
  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  // Direct search action
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setInitialCatalogFilter('all');
    setView('shop');
  };

  // Select player printed item action
  const handleSelectProductWithPlayer = (product: Product, playerName: string) => {
    const updatedProduct = { ...product, player: playerName };
    setSelectedProduct(updatedProduct);
    setView('product');
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
  };

  const handleOrderComplete = () => {
    setCart([]);
    setAppliedPromo(undefined);
    setView('home');
  };

  // Calculate cart counts
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Home Page sub-lists
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const featuredSeasonKits = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#070b16] text-white">
      {/* Header element rendered globally */}
      <Header
        currentView={currentView}
        setView={(view) => {
          setInitialCatalogFilter('all');
          setSearchQuery('');
          setView(view);
        }}
        cartCount={totalCartCount}
        favoritesCount={favorites.length}
        onSearch={handleSearchSubmit}
      />

      {/* Router views switch stage */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="space-y-0" id="home-view-stage">
            {/* Hero Section */}
            <Hero
              featuredProduct={PRODUCTS[0]}
              onViewProduct={handleSelectProduct}
              onShopNow={() => {
                setInitialCatalogFilter('all');
                setView('shop');
              }}
            />

            {/* Featured Jerseys Slider Section */}
            <section className="bg-[#070b16] py-16 px-6 md:px-12 lg:px-24 border-t border-white/5" id="featured-jerseys-section">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="flex justify-between items-end">
                  <div className="space-y-3 text-left">
                    <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-semibold block">
                      2026/27 SEASON
                    </span>
                    <h2 className="text-3xl font-extrabold tracking-tight font-sans text-white">
                      Featured Jerseys
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setInitialCatalogFilter('all');
                      setView('shop');
                    }}
                    className="text-xs font-bold text-[#edbb00] hover:underline flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredSeasonKits.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.some((f) => f.id === product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelect={handleSelectProduct}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Best Sellers Sections */}
            <section className="bg-[#070b16]/60 py-16 px-6 md:px-12 lg:px-24 border-t border-white/5" id="best-sellers-section">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="space-y-3 text-center">
                  <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-semibold block">
                    FAN FAVORITES
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight font-sans text-white">
                    Best Sellers
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {bestSellers.slice(0, 3).map((product) => (
                    <ProductCard
                      key={`bestseller-${product.id}`}
                      product={product}
                      isFavorite={favorites.some((f) => f.id === product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelect={handleSelectProduct}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Customer Reviews Section */}
            <Reviews />
          </div>
        )}

        {currentView === 'shop' && (
          <ShopCatalog
            products={PRODUCTS}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProduct={handleSelectProduct}
            initialFilter={initialCatalogFilter}
            searchQuery={searchQuery}
          />
        )}

        {currentView === 'product' && (
          <ProductDetails
            product={selectedProduct}
            onBackToShop={() => setView('shop')}
            isFavorite={favorites.some((f) => f.id === selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onContinueShopping={() => setView('shop')}
            onProceedToCheckout={(promo) => {
              setAppliedPromo(promo);
              setView('checkout');
            }}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            cartItems={cart}
            subtotal={cartSubtotal}
            discountPercent={appliedPromo ? appliedPromo.discountPercent : 0}
            onOrderComplete={handleOrderComplete}
            onBackToCart={() => setView('cart')}
          />
        )}

        {currentView === 'favorites' && (
          <FavoritesList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProduct={handleSelectProduct}
            onBackToShop={() => setView('shop')}
          />
        )}

        {currentView === 'players' && (
          <PlayersList
            products={PRODUCTS}
            onSelectProductWithPlayer={handleSelectProductWithPlayer}
            setView={setView}
          />
        )}
      </main>

      {/* Global Newsletter Sub Footer */}
      <Footer setView={setView} />
    </div>
  );
}
