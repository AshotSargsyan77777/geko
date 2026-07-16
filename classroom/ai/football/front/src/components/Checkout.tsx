import React, { useState } from 'react';
import { CreditCard, ShieldCheck, ArrowLeft, ArrowRight, Lock, CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, ShippingAddress, PaymentInfo } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  subtotal: number;
  discountPercent: number;
  onOrderComplete: () => void;
  onBackToCart: () => void;
}

export default function Checkout({
  cartItems,
  subtotal,
  discountPercent,
  onOrderComplete,
  onBackToCart,
}: CheckoutProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [orderNumber, setOrderNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form validations state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: 'Carlos',
    lastName: 'García',
    email: 'carlos@email.com',
    phone: '+34 600 000 000',
    streetAddress: 'Carrer de Mallorca, 401',
    city: 'Barcelona',
    stateRegion: 'Catalonia',
    zipCode: '08013',
    country: 'Spain',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'credit-card',
    cardNumber: '',
    cardholderName: 'Carlos García',
    expiryDate: '',
    cvc: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = taxableAmount * 0.08;
  const total = taxableAmount + shipping + tax;

  const validateShipping = () => {
    const errs: { [key: string]: string } = {};
    if (!shippingAddress.firstName.trim()) errs.firstName = 'Required';
    if (!shippingAddress.lastName.trim()) errs.lastName = 'Required';
    if (!shippingAddress.email.trim() || !/\S+@\S+\.\S+/.test(shippingAddress.email)) {
      errs.email = 'Invalid email';
    }
    if (!shippingAddress.phone.trim()) errs.phone = 'Required';
    if (!shippingAddress.streetAddress.trim()) errs.streetAddress = 'Required';
    if (!shippingAddress.city.trim()) errs.city = 'Required';
    if (!shippingAddress.stateRegion.trim()) errs.stateRegion = 'Required';
    if (!shippingAddress.zipCode.trim()) errs.zipCode = 'Required';
    if (!shippingAddress.country.trim()) errs.country = 'Required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs: { [key: string]: string } = {};
    if (paymentInfo.method === 'credit-card') {
      const cardClean = paymentInfo.cardNumber?.replace(/\s+/g, '');
      if (!cardClean || cardClean.length < 16) {
        errs.cardNumber = 'Invalid credit card number';
      }
      if (!paymentInfo.cardholderName?.trim()) {
        errs.cardholderName = 'Cardholder name is required';
      }
      if (!paymentInfo.expiryDate?.trim() || !/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
        errs.expiryDate = 'Format MM/YY required';
      }
      if (!paymentInfo.cvc?.trim() || paymentInfo.cvc.length < 3) {
        errs.cvc = 'Required';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateShipping()) {
        setStep(2);
      }
    }
  };

  const handlePlaceOrder = () => {
    if (validatePayment()) {
      // Generate standard Barça Store order number
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomId = '';
      for (let i = 0; i < 10; i++) {
        randomId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setOrderNumber(`FCB-${randomId}`);
      setShowSuccessModal(true);
    }
  };

  const handleFinishCheckout = () => {
    setShowSuccessModal(false);
    onOrderComplete();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="bg-[#070b16] text-white py-8 px-4 md:px-12 lg:px-24 text-left relative min-h-[85vh]" id="checkout-view-stage">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={step === 2 ? () => setStep(1) : onBackToCart}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-2xl font-extrabold tracking-tight font-sans">Checkout</h1>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-wider">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#edbb00]' : 'text-gray-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 1 ? 'bg-[#edbb00] text-[#070b16]' : 'bg-gray-800 text-gray-500'
              }`}>1</span>
              <span>Shipping Info</span>
            </div>
            <div className="w-8 h-[1px] bg-white/10" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#edbb00]' : 'text-gray-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 2 ? 'bg-[#edbb00] text-[#070b16]' : 'bg-gray-800 text-gray-500'
              }`}>2</span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Forms */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="shipping-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleNextStep}
                  className="space-y-6"
                  id="form-shipping-info"
                >
                  {/* Contact Information block */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                    <h2 className="text-base font-bold tracking-tight text-white mb-2 font-sans">
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.firstName}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                          className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.lastName}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                          className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                        className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                      />
                      {errors.email && <p className="text-[#e11d48] text-[10px] font-medium">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                      />
                    </div>
                  </div>

                  {/* Shipping Address block */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                    <h2 className="text-base font-bold tracking-tight text-white mb-2 font-sans">
                      Shipping Address
                    </h2>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.streetAddress}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, streetAddress: e.target.value })}
                        className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                          State / Region
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.stateRegion}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, stateRegion: e.target.value })}
                          className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                          className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                          Country
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                          className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#9c1d3c] to-[#e11d48] hover:opacity-95 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-shipping-submit"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="payment-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                  id="form-payment-info"
                >
                  {/* Payment Method section */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                    <h2 className="text-base font-bold tracking-tight text-white mb-2 font-sans">
                      Payment Method
                    </h2>

                    {/* Method selector tabs */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'credit-card' as const, label: 'Credit Card' },
                        { id: 'apple-pay' as const, label: 'Apple Pay' },
                        { id: 'google-pay' as const, label: 'Google Pay' },
                        { id: 'paypal' as const, label: 'PayPal' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentInfo({ ...paymentInfo, method: m.id })}
                          className={`py-3 rounded-xl border text-[10px] md:text-xs font-bold transition-all uppercase tracking-wider text-center flex items-center justify-center ${
                            paymentInfo.method === m.id
                              ? 'bg-gradient-to-r from-[#9c1d3c] to-[#004d98] text-white border-transparent'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {paymentInfo.method === 'credit-card' ? (
                        <motion.div
                          key="credit-card-fields"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="space-y-4 pt-2"
                        >
                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                              Card Number
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                maxLength={19}
                                placeholder="4242 4242 4242 4242"
                                value={paymentInfo.cardNumber}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: formatCardNumber(e.target.value) })}
                                className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00] pr-10 font-mono"
                              />
                              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                            {errors.cardNumber && <p className="text-[#e11d48] text-[10px] font-medium">{errors.cardNumber}</p>}
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              required
                              value={paymentInfo.cardholderName}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                              className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00]"
                            />
                            {errors.cardholderName && <p className="text-[#e11d48] text-[10px] font-medium">{errors.cardholderName}</p>}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                required
                                maxLength={5}
                                placeholder="MM / YY"
                                value={paymentInfo.expiryDate}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: formatExpiryDate(e.target.value) })}
                                className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00] text-center font-mono"
                              />
                              {errors.expiryDate && <p className="text-[#e11d48] text-[10px] font-medium">{errors.expiryDate}</p>}
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold block">
                                CVC
                              </label>
                              <input
                                type="password"
                                required
                                maxLength={3}
                                placeholder="123"
                                value={paymentInfo.cvc}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value.replace(/[^0-9]/gi, '') })}
                                className="w-full bg-[#070b16] text-white text-xs px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#edbb00] text-center font-mono"
                              />
                              {errors.cvc && <p className="text-[#e11d48] text-[10px] font-medium">{errors.cvc}</p>}
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="wallet-pay-message"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-6 bg-white/5 border border-white/5 rounded-2xl text-center space-y-2 text-xs"
                        >
                          <CheckCircle2 className="w-8 h-8 text-[#edbb00] mx-auto" />
                          <h4 className="font-bold">Instant Secure Authorization</h4>
                          <p className="text-gray-400">
                            You will complete your payment securely via the selected mobile gateway or PayPal wallet once you click place order.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="flex-grow py-4 bg-gradient-to-r from-[#9c1d3c] to-[#e11d48] hover:opacity-95 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-[#9c1d3c]/20 text-center cursor-pointer"
                      id="btn-place-order"
                    >
                      Place Order &bull; ${total.toFixed(2)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary Panel */}
          <div className="lg:col-span-4" id="checkout-order-summary">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-6">
              <h2 className="text-base font-bold font-sans tracking-tight border-b border-white/5 pb-4 text-white">
                Order Summary
              </h2>

              {/* Items row */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2" id="checkout-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-12 h-14 bg-white/5 border border-white/10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow text-xs space-y-0.5">
                      <h4 className="font-bold text-white leading-tight line-clamp-1">{item.product.name}</h4>
                      <p className="text-gray-400">Size {item.size}</p>
                      {item.customName && (
                        <p className="text-[10px] text-[#edbb00] font-mono leading-none">{item.customName} #{item.customNumber}</p>
                      )}
                    </div>
                    <span className="text-xs font-bold text-white font-sans">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost specifications */}
              <div className="space-y-3.5 text-xs text-gray-300 border-t border-white/5 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#edbb00]">
                    <span>Discount ({discountPercent}%)</span>
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

                <div className="flex justify-between border-t border-white/5 pt-4 text-sm font-extrabold text-white font-sans">
                  <span>Total</span>
                  <span className="text-lg text-[#edbb00]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* SSL Security Reassurance */}
              <div className="p-3 bg-[#0a152d]/40 rounded-xl border border-[#004d98]/30 flex items-center gap-2.5 text-[10px] text-gray-400 leading-normal">
                <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Secured by 256-bit SSL encryption. Your financial data remains encrypted and private.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Order Placed Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 bg-[#070b16]/95 backdrop-blur-sm flex items-center justify-center p-4" id="success-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0d1527] border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative side banners */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#9c1d3c] via-[#edbb00] to-[#004d98]" />

              {/* Large checkmark logo */}
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              </div>

              {/* Order specifics messages */}
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-white font-sans">Order Placed!</h2>
                <p className="text-gray-300 text-xs leading-relaxed px-4">
                  Thank you for your order. We've sent a detailed confirmation invoice to your email address.
                </p>
                <div className="inline-block mt-2 bg-[#004d98]/30 border border-[#004d98]/50 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-[#edbb00]">
                  Order {orderNumber}
                </div>
              </div>

              {/* Expected dispatch delivery times */}
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider block">
                  Estimated Delivery
                </span>
                <span className="font-extrabold text-sm text-white">
                  July 18 – July 21, 2026
                </span>
              </div>

              {/* Navigation button action */}
              <button
                onClick={handleFinishCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-[#9c1d3c] to-[#e11d48] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-lg cursor-pointer hover:opacity-95"
                id="btn-success-continue"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
