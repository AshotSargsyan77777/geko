import React, { useState } from 'react';
import { ShoppingCart, Trash2, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { PROMO_CODES } from '../data';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onContinueShopping: () => void;
  onProceedToCheckout: (appliedPromo?: { code: string; discountPercent: number }) => void;
}

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onProceedToCheckout,
}: CartProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * 0.08;
  const total = taxableAmount + shipping + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const formattedCode = promoCode.trim().toUpperCase();
    if (PROMO_CODES[formattedCode] !== undefined) {
      const discount = PROMO_CODES[formattedCode];
      setDiscountPercent(discount);
      setPromoSuccess(`Promo Code ${formattedCode} successfully applied! ${discount}% OFF your jerseys.`);
    } else {
      setPromoError('Invalid coupon code. Try VISCABARCA or BARCA15!');
      setDiscountPercent(0);
    }
  };

  const handleCheckoutClick = () => {
    onProceedToCheckout(
      discountPercent > 0 ? { code: promoCode.trim().toUpperCase(), discountPercent } : undefined
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#070b16] text-white py-16 px-6 md:px-12 text-center max-w-xl mx-auto space-y-6" id="empty-cart-state">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingCart className="w-8 h-8 text-gray-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-sans">Your Cart is Empty</h2>
          <p className="text-gray-400 text-xs md:text-sm">
            Looks like you haven't added any official FC Barcelona jerseys yet. Show your pride on the field!
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3.5 bg-gradient-to-r from-[#9c1d3c] to-[#004d98] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg cursor-pointer hover:opacity-95"
        >
          Explore Kits Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#070b16] text-white py-8 px-4 md:px-12 lg:px-24 text-left" id="cart-view-container">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold tracking-tight font-sans">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex gap-4 md:gap-6 items-center"
                id={`cart-item-row-${item.id}`}
              >
                {/* Delete button (top right of container) */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-white/5 rounded-full text-gray-400 hover:text-[#e11d48] transition-colors"
                  aria-label="Remove item"
                  id={`btn-remove-cart-${item.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Thumbnail Image */}
                <div className="w-20 h-24 md:w-24 md:h-28 rounded-xl overflow-hidden bg-white/5 border border-white/5 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Product Metadata & Actions */}
                <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 text-left">
                    <h3 className="font-bold text-sm md:text-base leading-tight font-sans text-white pr-8">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#edbb00] font-mono">
                      {item.customName ? `${item.customName} #${item.customNumber}` : `#${item.product.player}`}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      Size: <span className="text-white font-bold">{item.size}</span>
                    </p>
                  </div>

                  {/* Pricing and Counters */}
                  <div className="flex items-center gap-6">
                    {/* Quantity capsules */}
                    <div className="flex items-center bg-[#070b16] border border-white/10 rounded-xl px-1.5 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white/5 rounded-lg text-gray-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" style={{ display: item.quantity === 1 ? 'block' : 'none' }} />
                        <span style={{ display: item.quantity > 1 ? 'block' : 'none' }}>-</span>
                      </button>
                      <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white/5 rounded-lg text-gray-300 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Total item price */}
                    <span className="font-extrabold text-sm md:text-base font-sans min-w-[70px] text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Back to catalog navigation link */}
            <button
              onClick={onContinueShopping}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#edbb00] hover:underline uppercase tracking-wider cursor-pointer"
              id="btn-continue-shopping"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </button>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4" id="cart-order-summary">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-6">
              <h2 className="text-lg font-bold font-sans tracking-tight border-b border-white/5 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#edbb00]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 animate-pulse" /> Club Discount ({discountPercent}%)
                    </span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-400">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-bold text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t border-white/5 pt-4 text-base font-extrabold text-white font-sans">
                  <span>Total</span>
                  <span className="text-xl text-[#edbb00]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon inputs */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                    id="promo-code-input"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-white/10"
                    id="btn-apply-promo"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[#e11d48] text-[10px] font-medium">{promoError}</p>}
                {promoSuccess && (
                  <p className="text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> {promoSuccess}
                  </p>
                )}
              </form>

              {/* Proceed Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-gradient-to-r from-[#9c1d3c] to-[#e11d48] hover:opacity-95 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-[#9c1d3c]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                id="btn-proceed-checkout"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Secure partner badges */}
              <div className="pt-4 border-t border-white/5 flex justify-center gap-2 text-[10px] font-semibold text-gray-500 font-mono">
                <span className="border border-white/5 px-1.5 py-0.5 rounded">Visa</span>
                <span className="border border-white/5 px-1.5 py-0.5 rounded">MC</span>
                <span className="border border-white/5 px-1.5 py-0.5 rounded">PayPal</span>
                <span className="border border-white/5 px-1.5 py-0.5 rounded">Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
