export type ProductType = 'home' | 'away' | 'third' | 'champions' | 'classic';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  player?: string;
  number?: number;
  price: number;
  originalPrice?: number;
  type: ProductType;
  image: string;
  additionalImages: string[];
  badge?: 'NEW' | 'LIMITED' | 'SALE';
  rating: number;
  reviewsCount: number;
  description: string;
  shippingInfo: string;
  careInstructions: string;
  sizes: string[];
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string; // unique cart item ID (can include product ID + size + optional custom printing)
  product: Product;
  size: string;
  quantity: number;
  customName?: string;
  customNumber?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  initials: string;
  avatarBg: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  stateRegion: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  method: 'credit-card' | 'apple-pay' | 'google-pay' | 'paypal';
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvc?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  date: string;
}
