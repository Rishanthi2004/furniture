export interface ProductColor {
  name: string;
  hex: string;
  tailwindClass?: string;
}

export interface ProductDimensions {
  width: string;
  depth: string;
  height: string;
  seatHeight?: string;
  weight?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'all' | 'seating' | 'sofas' | 'tables' | 'lighting' | 'storage';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  description: string;
  details: string[];
  materials: string[];
  colors: ProductColor[];
  dimensions: ProductDimensions;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isNewArrival?: boolean;
  isSpecialOffer?: boolean;
  stockStatus: 'In Stock' | 'Few Units Left' | 'Made to Order';
  leadTime: string;
}

export interface CartItem {
  id: string; // unique item cart id: productId-color
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  date: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Collection' },
  { id: 'new-arrivals', name: 'New Arrivals' },
  { id: 'special-offers', name: 'Special Offers' },
  { id: 'seating', name: 'Armchairs & Seating' },
  { id: 'sofas', name: 'Sofas & Couches' },
  { id: 'tables', name: 'Tables & Desks' },
  { id: 'lighting', name: 'Lamps & Lighting' },
  { id: 'storage', name: 'Storage & Shelving' }
];

export const formatPrice = (amount: number): string => {
  return '₹' + amount.toLocaleString('en-IN');
};
