import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'home-2026',
    name: '2026/27 Home Kit',
    subtitle: 'Home Kit - 2026/27',
    player: 'Lamine Yamal',
    number: 19,
    price: 119.99,
    originalPrice: 139.99,
    type: 'home',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
      'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800'
    ],
    badge: 'NEW',
    rating: 4.9,
    reviewsCount: 342,
    description: 'The iconic Blaugrana stripes return in a bold and classic layout for the 2026/27 season. Designed with elite moisture-wicking technology, high-breathability performance mesh, and textured club details to represent Barcelona with unmatched comfort on and off the pitch. Made from 100% recycled polyester fibers.',
    shippingInfo: 'Standard international shipping takes 2-4 business days. Free shipping on all orders over $100. Express courier options available at checkout.',
    careInstructions: 'Machine wash cold inside-out. Do not bleach. Air dry preferred to preserve original premium transfer prints and sponsor branding. Cold iron if needed, avoiding printed areas.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: true
  },
  {
    id: 'away-2026',
    name: '2026/27 Away Kit',
    subtitle: 'Away Kit - 2026/27',
    player: 'Pedri',
    number: 8,
    price: 109.99,
    type: 'away',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6edd1def2d?q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1431324155629-1a6edd1def2d?q=80&w=800',
      'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=800'
    ],
    badge: 'NEW',
    rating: 4.8,
    reviewsCount: 218,
    description: 'A striking minimalist white and metallic gold palette that celebrates Catalan architectural marvels. The 2026/27 Barcelona Away Kit delivers premium comfort, featuring laser-cut ventilation zones, flatlock seams to prevent chafing, and an embroidered club crest that shines with pure prestige.',
    shippingInfo: 'Standard shipping in 2-4 days. Packaged in a sustainable Barça Store collector box with authentic tag stickers.',
    careInstructions: 'Wash at 30°C on a delicate cycle. Do not tumble dry. Use light detergent and wash separately from dark clothes.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'third-2026',
    name: '2026/27 Third Kit',
    subtitle: 'Third Kit - 2026/27',
    player: 'Gavi',
    number: 6,
    price: 114.99,
    type: 'third',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800'
    ],
    badge: 'LIMITED',
    rating: 4.7,
    reviewsCount: 156,
    description: 'Electrifying volt and deep teal accents fuse together in the highly anticipated 2026/27 Third Kit. Inspired by Barcelona’s thriving youth academy, La Masia, and the vibrant neon nightlife of the city. Engineered with lightweight, double-knit construction for ultimate thermal regulation.',
    shippingInfo: 'Ships worldwide in 2-4 days. Custom premium packaging included. Extremely limited quantities available.',
    careInstructions: 'Gentle hand wash inside out. Avoid softeners to maintain dry-fit properties. Air dry in shade.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: true
  },
  {
    id: 'champions-2026',
    name: 'Champions Edition',
    subtitle: 'Special Edition - 2026/27',
    player: 'Raphinha',
    number: 11,
    price: 149.99,
    originalPrice: 189.99,
    type: 'champions',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800'
    ],
    badge: 'LIMITED',
    rating: 4.9,
    reviewsCount: 89,
    description: 'An elite, limited-edition jersey crafted to celebrate Barça’s historic continental achievements. Highlighting gold-threaded embroidery on the collar and cuffs, a specialized champions patch on the sleeve, and a premium commemorative backprint. Features gold-foil player numbers.',
    shippingInfo: 'Ships in bespoke velvet display packaging with a certificate of authenticity signed by club officials. Ships in 2-4 days.',
    careInstructions: 'Professional dry cleaning or extremely gentle spot cleaning recommended to protect 24K gold-foil accents.',
    sizes: ['S', 'M', 'L', 'XL'],
    isBestSeller: true
  },
  {
    id: 'home-2025',
    name: '2025/26 Home Kit',
    subtitle: 'Home Kit - 2025/26',
    player: 'Robert Lewandowski',
    number: 9,
    price: 89.99,
    originalPrice: 119.99,
    type: 'classic',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800'
    ],
    badge: 'SALE',
    rating: 4.8,
    reviewsCount: 521,
    description: 'The historic Centenary layout featuring a symmetrical split Blaugrana front panel. A highly praised design commemorating the club’s global heritage with retro collars and gold-foil sponsor accents. Incredible fit and timeless collectibility.',
    shippingInfo: 'Standard shipping takes 2-4 business days. Ships in classic Barça store tissue wrap.',
    careInstructions: 'Machine wash warm with similar colors. Warm iron if needed, do not iron directly on graphics.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: true
  }
];

export const PLAYERS_LIST = [
  { name: 'Lamine Yamal', number: 19, role: 'Forward', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=200' },
  { name: 'Pedri', number: 8, role: 'Midfielder', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=200' },
  { name: 'Gavi', number: 6, role: 'Midfielder', image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=200' },
  { name: 'Raphinha', number: 11, role: 'Forward', image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=200' },
  { name: 'Robert Lewandowski', number: 9, role: 'Forward', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=200' },
  { name: 'Frenkie de Jong', number: 21, role: 'Midfielder', image: 'https://images.unsplash.com/photo-1431324155629-1a6edd1def2d?q=80&w=200' },
  { name: 'Ronald Araújo', number: 4, role: 'Defender', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=200' }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Carlos M.',
    location: 'Barcelona, Spain',
    rating: 5,
    comment: 'Absolutely stunning quality. The fabric feels premium and the fit is perfect. Wearing it to Camp Nou next week!',
    initials: 'CM',
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 'rev-2',
    name: 'Emma W.',
    location: 'London, UK',
    rating: 5,
    comment: 'Ordered the Yamal home kit and it arrived beautifully packaged. The stitching is flawless. Worth every penny.',
    initials: 'EW',
    avatarBg: 'bg-indigo-600'
  },
  {
    id: 'rev-3',
    name: 'Marco R.',
    location: 'Milan, Italy',
    rating: 5,
    comment: 'Great jersey, fast delivery. The blaugrana colors are vivid and the Dri-FIT material is comfortable for wearing all day.',
    initials: 'MR',
    avatarBg: 'bg-rose-600'
  },
  {
    id: 'rev-4',
    name: 'Yuki T.',
    location: 'Tokyo, Japan',
    rating: 5,
    comment: 'International shipping was fast. The limited Champions Edition is a masterpiece — gold details are gorgeous in person.',
    initials: 'YT',
    avatarBg: 'bg-amber-600'
  }
];

export const PROMO_CODES: { [key: string]: number } = {
  'BARCA15': 15, // 15% off
  'VISCABARCA': 20, // 20% off
  'CAMPNOU': 10 // 10% off
};
