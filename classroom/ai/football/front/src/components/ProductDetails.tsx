import React, { useState } from 'react';
import { Star, Heart, Plus, Minus, ArrowLeft, Ruler, ShoppingCart, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PLAYERS_LIST } from '../data';

interface ProductDetailsProps {
  product: Product;
  onBackToShop: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number, customName?: string, customNumber?: string) => void;
  onBuyNow: (product: Product, size: string, quantity: number, customName?: string, customNumber?: string) => void;
}

export default function ProductDetails({
  product,
  onBackToShop,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'shipping' | 'care'>('description');
  
  // Customization state
  const [customizationType, setCustomizationType] = useState<'standard' | 'custom' | 'none'>('standard');
  const [selectedPlayer, setSelectedPlayer] = useState(product.player || '');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  
  // UI states
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Math discount
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  const handleAddClick = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    
    let finalName: string | undefined = undefined;
    let finalNumber: string | undefined = undefined;

    if (customizationType === 'standard') {
      const foundPlayer = PLAYERS_LIST.find(p => p.name === selectedPlayer);
      finalName = selectedPlayer;
      finalNumber = foundPlayer ? foundPlayer.number.toString() : product.number?.toString();
    } else if (customizationType === 'custom') {
      finalName = customName.trim().toUpperCase() || 'BARÇA';
      finalNumber = customNumber.trim() || '10';
    }

    onAddToCart(product, selectedSize, quantity, finalName, finalNumber);
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2500);
  };

  const handleBuyNowClick = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    let finalName: string | undefined = undefined;
    let finalNumber: string | undefined = undefined;

    if (customizationType === 'standard') {
      const foundPlayer = PLAYERS_LIST.find(p => p.name === selectedPlayer);
      finalName = selectedPlayer;
      finalNumber = foundPlayer ? foundPlayer.number.toString() : product.number?.toString();
    } else if (customizationType === 'custom') {
      finalName = customName.trim().toUpperCase() || 'BARÇA';
      finalNumber = customNumber.trim() || '10';
    }

    onBuyNow(product, selectedSize, quantity, finalName, finalNumber);
  };

  return (
    <div className="bg-[#070b16] text-white py-8 px-4 md:px-12 lg:px-24 text-left" id="product-detail-view">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between text-xs text-gray-400 font-sans">
        <div className="flex items-center gap-2">
          <button onClick={onBackToShop} className="hover:text-white transition-colors cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={onBackToShop} className="hover:text-white transition-colors cursor-pointer">Shop</button>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
        <button
          onClick={onBackToShop}
          className="flex items-center gap-1.5 text-gray-300 hover:text-[#edbb00] transition-colors font-medium uppercase tracking-wider text-[10px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
        </button>
      </div>

      {/* Main product wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-[#004d98]/20 to-[#9c1d3c]/20 border border-white/10">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              id="detail-main-image"
            />
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 bg-[#9c1d3c] border border-white/10 text-white font-sans text-xs font-bold px-3 py-1 rounded-full">
                -{discountPercent}%
              </span>
            )}
            {/* NEW Badge */}
            {product.badge === 'NEW' && (
              <span className="absolute top-4 left-4 bg-[#004d98] border border-[#edbb00]/30 text-white font-sans text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase">
                NEW
              </span>
            )}
          </div>

          {/* Additional gallery thumbnails */}
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="flex gap-3" id="detail-thumbnails">
              {product.additionalImages.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-white/5 border transition-all ${
                    selectedImage === img ? 'border-[#edbb00] ring-2 ring-[#edbb00]/20' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Configurator Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header titles */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#004d98] text-[#edbb00] text-[10px] font-mono tracking-widest font-semibold uppercase rounded">
                {product.type === 'champions' ? 'Special' : 'Kit'}
              </span>
              <span className="text-xs text-gray-400 font-medium">{product.subtitle}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              {/* Stars summary */}
              <div className="flex items-center gap-1.5 text-[#edbb00]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-[#edbb00]' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-white font-bold mt-0.5">{product.rating}</span>
                <span className="text-xs text-gray-400 font-medium mt-0.5">({product.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white font-sans">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through font-sans">${product.originalPrice}</span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-xs font-bold text-[#edbb00] bg-white/5 px-2.5 py-1 rounded-full border border-[#edbb00]/20 uppercase tracking-wider font-mono">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Custom Jersey Printing Configurator */}
          <div className="space-y-3">
            <label className="text-xs text-gray-300 font-bold tracking-wider uppercase block">
              Jersey Printing Options
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'standard', label: 'Official Print' },
                { type: 'custom', label: 'Custom Name' },
                { type: 'none', label: 'Blank Back' }
              ].map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setCustomizationType(opt.type as any)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    customizationType === opt.type
                      ? 'bg-gradient-to-r from-[#9c1d3c] to-[#004d98] text-white border-transparent shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Sub-configurators */}
            <AnimatePresence mode="wait">
              {customizationType === 'standard' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3 overflow-hidden"
                  key="standard-customizer"
                >
                  <label className="text-[11px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                    Select official squad printing:
                  </label>
                  <select
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="w-full bg-[#070b16] text-white border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#edbb00]"
                  >
                    {PLAYERS_LIST.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} #{p.number} ({p.role})
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {customizationType === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4 overflow-hidden"
                  key="custom-customizer"
                >
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider block">
                        Custom Name (Max 12)
                      </label>
                      <input
                        type="text"
                        maxLength={12}
                        placeholder="e.g. ASHOT"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase())}
                        className="w-full bg-[#070b16] text-white border border-white/10 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#edbb00]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider block">
                        Number (1-99)
                      </label>
                      <input
                        type="text"
                        maxLength={2}
                        placeholder="10"
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-[#070b16] text-white border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#edbb00] text-center"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    *Custom jerseys require high precision hand-printing. Non-refundable once tailored.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sizes options */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-300 font-bold tracking-wider uppercase block">
                Select Size
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-[#edbb00] hover:underline flex items-center gap-1 font-semibold"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2" id="detail-sizes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`w-12 h-12 rounded-xl border text-xs font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-white text-[#070b16] border-white shadow-lg'
                      : 'bg-white/5 border-white/10 hover:border-white/25 text-white'
                  }`}
                  id={`btn-size-${size}`}
                >
                  {size}
                </button>
              ))}
            </div>

            {sizeError && (
              <p className="text-[#e11d48] text-xs font-medium" id="size-selection-error">
                Please select a size before proceeding.
              </p>
            )}
          </div>

          {/* Quantity selector and primary buttons */}
          <div className="pt-4 border-t border-white/5 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-2 py-1.5">
                <button
                  onClick={() => handleQuantityChange('dec')}
                  className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold font-sans text-sm">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('inc')}
                  className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddClick}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#9c1d3c] to-[#004d98] hover:from-[#e11d48] hover:to-[#005fb8] text-white rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.01] cursor-pointer"
                id="btn-add-to-cart"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>

              {/* Toggle favorite */}
              <button
                onClick={(e) => onToggleFavorite(e, product)}
                className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer"
                id="btn-favorite-detail"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'text-[#e11d48] fill-[#e11d48]' : 'text-gray-300'}`} />
              </button>
            </div>

            {/* Buy Now button */}
            <button
              onClick={handleBuyNowClick}
              className="w-full py-3.5 bg-gradient-to-r from-[#edbb00] to-[#bca300] text-[#070b16] rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all shadow-md hover:scale-[1.01] cursor-pointer"
              id="btn-buy-now"
            >
              Buy It Now
            </button>
          </div>

          {/* Inline alert after successful cart add */}
          <AnimatePresence>
            {showAddSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3 bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2.5"
                id="add-to-cart-success"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Successfully added to your shopping cart!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Description / Shipping / Care tabs */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="flex border-b border-white/5">
              {[
                { id: 'description' as const, label: 'Description' },
                { id: 'shipping' as const, label: 'Shipping' },
                { id: 'care' as const, label: 'Care' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-[#edbb00] text-[#edbb00]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-xs md:text-sm text-gray-300 leading-relaxed min-h-[80px]">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'shipping' && <p>{product.shippingInfo}</p>}
              {activeTab === 'care' && <p>{product.careInstructions}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal/Overlay */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0d1527] border border-white/10 rounded-2xl p-6 text-left relative"
            >
              <h3 className="text-lg font-bold mb-4 font-sans text-[#edbb00] flex items-center gap-2">
                <Info className="w-5 h-5" /> FC Barcelona Jersey Size Guide
              </h3>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Our athletic performance jerseys are cut for speed and agility. If you prefer a loose, casual fan fit, we recommend ordering one size larger than your usual size.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-gray-300 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Chest (in)</th>
                      <th className="py-2.5 px-3">Waist (in)</th>
                      <th className="py-2.5 px-3">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 px-3 font-bold">S</td>
                      <td className="py-2.5 px-3">34 - 37</td>
                      <td className="py-2.5 px-3">29 - 32</td>
                      <td className="py-2.5 px-3">28.5</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 px-3 font-bold">M</td>
                      <td className="py-2.5 px-3">37 - 40</td>
                      <td className="py-2.5 px-3">32 - 35</td>
                      <td className="py-2.5 px-3">29.5</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 px-3 font-bold">L</td>
                      <td className="py-2.5 px-3">40 - 44</td>
                      <td className="py-2.5 px-3">35 - 38</td>
                      <td className="py-2.5 px-3">30.5</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 px-3 font-bold">XL</td>
                      <td className="py-2.5 px-3">44 - 48</td>
                      <td className="py-2.5 px-3">38 - 43</td>
                      <td className="py-2.5 px-3">31.5</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 px-3 font-bold">XXL</td>
                      <td className="py-2.5 px-3">48 - 52</td>
                      <td className="py-2.5 px-3">43 - 47</td>
                      <td className="py-2.5 px-3">32.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="px-5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
