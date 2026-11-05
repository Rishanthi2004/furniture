import { Product } from '../types/furniture';

export const PRODUCTS: Product[] = [
  {
    id: 'cozy-armchair',
    name: 'Cozy Armchair',
    tagline: 'Deep cushioned serenity enveloped in organic wool bouclé',
    category: 'seating',
    categoryLabel: 'Armchairs & Seating',
    price: 32500,
    originalPrice: 38000,
    image: '/assets/images/cozy_armchair_1793872988150.jpg',
    gallery: [
      '/assets/images/cozy_armchair_1793872988150.jpg',
      '/assets/images/hero_living_room_1793872982731.jpg',
      '/assets/images/rattan_lounge_1793872986287.jpg'
    ],
    description:
      'Engineered for quiet contemplative moments, the Cozy Armchair features an arched ergonomic backrest, dense feather-wrapped core cushioning, and tapered kiln-dried white oak legs. Handcrafted with bespoke textured Belgian bouclé fabric.',
    details: [
      'Solid kiln-dried white oak frame with mortise-and-tenon joints',
      'Dual-density high resilience foam with down feather envelope',
      'Removable, dry-cleanable textured bouclé slipcovers',
      'Non-marking felt glide pads for hardwood floors'
    ],
    materials: ['Belgian Wool Bouclé', 'FSC-Certified Solid White Oak', 'Down & High-Resilience Core'],
    colors: [
      { name: 'Oat Cream', hex: '#EBE5DC' },
      { name: 'Burnt Terracotta', hex: '#C86428' },
      { name: 'Charcoal Slag', hex: '#3B3632' },
      { name: 'Pebble Sand', hex: '#D2C7B9' }
    ],
    dimensions: {
      width: '84 cm',
      depth: '86 cm',
      height: '82 cm',
      seatHeight: '44 cm',
      weight: '24 kg'
    },
    rating: 4.9,
    reviewsCount: 42,
    isPopular: true,
    stockStatus: 'In Stock',
    leadTime: 'Delivered in 3–5 business days'
  },
  {
    id: 'modern-sofa',
    name: 'Modern Sofa',
    tagline: 'Architectural minimalism tailored in warm linen blend',
    category: 'sofas',
    categoryLabel: 'Living & Sofas',
    price: 78900,
    originalPrice: 89000,
    image: '/assets/images/modern_sofa_1793872983382.jpg',
    gallery: [
      '/assets/images/modern_sofa_1793872983382.jpg',
      '/assets/images/hero_living_room_1793872982731.jpg'
    ],
    description:
      'A masterclass in proportions. The Modern Sofa balances a low architectural silhouette with generous seat depth and solid natural oak cylindrical feet. Built to anchor modern light-filled living spaces.',
    details: [
      'Reinforced double-doweled birch timber interior structure',
      'No-sag steel sinuous spring suspension for enduring comfort',
      'Stain-resistant performance linen-weave fabric',
      'Includes two coordinated accent scatter cushions'
    ],
    materials: ['Natural Textured Linen', 'Kiln-Dried Birch Wood', 'Sinuous Spring Core'],
    colors: [
      { name: 'Warm Ivory', hex: '#F3EFE9' },
      { name: 'Earthy Sand', hex: '#DFD7CB' },
      { name: 'Tuscan Ochre', hex: '#D38D3C' },
      { name: 'Slate Umber', hex: '#443F3B' }
    ],
    dimensions: {
      width: '210 cm',
      depth: '94 cm',
      height: '76 cm',
      seatHeight: '43 cm',
      weight: '58 kg'
    },
    rating: 4.95,
    reviewsCount: 78,
    isPopular: true,
    stockStatus: 'In Stock',
    leadTime: 'Delivered in 4–7 business days'
  },
  {
    id: 'wooden-table',
    name: 'Wooden Table',
    tagline: 'Solid European oak with softened chamfered joinery',
    category: 'tables',
    categoryLabel: 'Tables & Dining',
    price: 46200,
    originalPrice: 52000,
    image: '/assets/images/wooden_table_1793872984458.jpg',
    gallery: [
      '/assets/images/wooden_table_1793872984458.jpg',
      '/assets/images/hero_living_room_1793872982731.jpg'
    ],
    description:
      'Honoring honest carpentry, this dining and workspace table highlights continuous natural timber grain, gently rounded bullnose edges, and tapered legs that optimize seating comfort.',
    details: [
      '100% Solid European white oak treated with matte hardwax oil',
      'Water-repellent, food-safe organic protective finish',
      'Chamfered edge profile prevents arm fatigue',
      'Easily seats 4 to 6 chairs with generous elbow room'
    ],
    materials: ['Solid European White Oak', 'Natural Hardwax Matte Oil Finish'],
    colors: [
      { name: 'Natural Oak', hex: '#D2B48C' },
      { name: 'Smoked Oak', hex: '#8C7456' },
      { name: 'Bleached Ash', hex: '#E7DDD1' }
    ],
    dimensions: {
      width: '160 cm',
      depth: '85 cm',
      height: '75 cm',
      weight: '41 kg'
    },
    rating: 4.88,
    reviewsCount: 35,
    isPopular: true,
    stockStatus: 'In Stock',
    leadTime: 'Delivered in 3–5 business days'
  },
  {
    id: 'stylish-lamp',
    name: 'Stylish Lamp',
    tagline: 'Warm ambient glow beneath a satin mushroom dome',
    category: 'lighting',
    categoryLabel: 'Lamps & Ambient Lighting',
    price: 14800,
    originalPrice: 17500,
    image: '/assets/images/stylish_lamp_1793872984469.jpg',
    gallery: [
      '/assets/images/stylish_lamp_1793872984469.jpg',
      '/assets/images/hero_living_room_1793872982731.jpg'
    ],
    description:
      'An iconic accent lighting silhouette. The Stylish Lamp marries a spun aluminium parabolic shade in warm mustard satin with a solid cylindrical travertine stone pedestal base and brushed brass hardware.',
    details: [
      'Touch-sensitive capacitive dimmer embedded in solid brass collar',
      'Cast solid travertine stone column base with brushed brass accents',
      'Integrated 2700K warm diffused LED module (25,000 hrs lifespan)',
      'Braided golden-sand fabric power cord with in-line switch'
    ],
    materials: ['Spun Aluminium Shade', 'Solid Travertine Stone', 'Brushed Solid Brass'],
    colors: [
      { name: 'Mustard Satin', hex: '#E5A93B' },
      { name: 'Terracotta Matte', hex: '#C86428' },
      { name: 'Warm Bone', hex: '#F0ECE4' },
      { name: 'Deep Espresso', hex: '#2A2421' }
    ],
    dimensions: {
      width: '32 cm',
      depth: '32 cm',
      height: '42 cm',
      weight: '3.8 kg'
    },
    rating: 4.92,
    reviewsCount: 61,
    isPopular: true,
    stockStatus: 'In Stock',
    leadTime: 'Delivered in 2–4 business days'
  },
  {
    id: 'rattan-curve-lounge',
    name: 'Rattan Curve Lounge',
    tagline: 'Handwoven natural cane frame with plush linen cushion',
    category: 'seating',
    categoryLabel: 'New Arrivals',
    price: 29500,
    originalPrice: 34000,
    image: '/assets/images/rattan_lounge_1793872986287.jpg',
    gallery: [
      '/assets/images/rattan_lounge_1793872986287.jpg',
      '/assets/images/hero_living_room_1793872982731.jpg'
    ],
    description:
      'Celebrating artisanal weaving traditions. Sustainably sourced natural cane is steam-bent into an embracing curved barrel silhouette, anchored by solid teak legs and a thick washable off-white linen seat cushion.',
    details: [
      'Hand-selected natural rattan cane with reinforced split weaving',
      'Solid plantation teak framework',
      'Waterproof interior liner beneath organic linen casing',
      'Perfect for sunrooms, reading corners, and covered verandas'
    ],
    materials: ['Natural Cane Rattan', 'Solid Teak', 'Unbleached Organic Linen'],
    colors: [
      { name: 'Natural Cane', hex: '#D8B887' },
      { name: 'Bleached Rattan', hex: '#EBDDC9' },
      { name: 'Charcoal Wash', hex: '#423D3A' }
    ],
    dimensions: {
      width: '78 cm',
      depth: '74 cm',
      height: '76 cm',
      seatHeight: '41 cm',
      weight: '16 kg'
    },
    rating: 4.86,
    reviewsCount: 29,
    isNewArrival: true,
    stockStatus: 'In Stock',
    leadTime: 'Delivered in 3–5 business days'
  },
  {
    id: 'minimalist-display-shelf',
    name: 'Atelier Console & Shelf',
    tagline: 'Sculptural staggered shelving in matte chalk lacquer',
    category: 'storage',
    categoryLabel: 'Minimalist Storage',
    price: 39000,
    originalPrice: 45000,
    image: '/assets/images/minimalist_shelf_1793872986427.jpg',
    gallery: [
      '/assets/images/minimalist_shelf_1793872986427.jpg',
      '/assets/images/hero_living_room_1793872982731.jpg'
    ],
    description:
      'Clean architectural planes intersect to create dynamic display pockets for art monographs, ceramics, and personal keepsakes. Designed to maintain an airy aesthetic without visual heaviness.',
    details: [
      'Reinforced internal timber core with engineered architectural veneer',
      'Velvety smooth multi-coat low-VOC chalk white lacquer finish',
      'Includes anti-tip concealed wall safety anchoring kit',
      'Asymmetric geometry creating natural staging for sculptural decor'
    ],
    materials: ['Engineered Architectural Board', 'Chalk Matte Lacquer', 'Concealed Steel Cleats'],
    colors: [
      { name: 'Chalk White', hex: '#F7F6F2' },
      { name: 'Warm Travertine', hex: '#EBE4D8' },
      { name: 'Smoked Ash', hex: '#3E3834' }
    ],
    dimensions: {
      width: '140 cm',
      depth: '36 cm',
      height: '84 cm',
      weight: '32 kg'
    },
    rating: 4.89,
    reviewsCount: 31,
    isPopular: false,
    stockStatus: 'In Stock',
    leadTime: 'Delivered in 4–6 business days'
  },
  {
    id: 'velvet-round-ottoman',
    name: 'Solace Round Ottoman',
    tagline: 'Generous circular pouf in rich burnt orange weave',
    category: 'seating',
    categoryLabel: 'Special Offers',
    price: 18400,
    originalPrice: 23500,
    image: '/assets/images/orange_ottoman_1793872986083.jpg',
    gallery: [
      '/assets/images/orange_ottoman_1793872986083.jpg',
      '/assets/images/hero_living_room_1793872982731.jpg'
    ],
    description:
      'Versatile comfort piece functioning as a footrest, extra seating, or informal low table when paired with a wooden tray. Built with high-density layered core that never loses its refined circular geometry.',
    details: [
      'Double-stitched welt seam around perimeter',
      'Non-slip textured underside with concealed glides',
      'High-resilience foam core retains crisp geometry',
      'Special edition seasonal burnt-orange wool weave'
    ],
    materials: ['Textured Wool Weave', 'High-Resilience Cold Foam Core', 'Solid Timber Base Plate'],
    colors: [
      { name: 'Burnt Terracotta', hex: '#C86428' },
      { name: 'Cream Oat', hex: '#EBE5DC' },
      { name: 'Moss Green', hex: '#4E5A44' }
    ],
    dimensions: {
      width: '68 cm',
      depth: '68 cm',
      height: '38 cm',
      weight: '11 kg'
    },
    rating: 4.94,
    reviewsCount: 47,
    isSpecialOffer: true,
    stockStatus: 'In Stock',
    leadTime: 'Delivered in 2–4 business days'
  },
  {
    id: 'hero-burnt-chair',
    name: 'Burnt Orange Accent Chair',
    tagline: 'Signature sculpted tub silhouette in artisanal burnt orange wool',
    category: 'seating',
    categoryLabel: 'Armchairs & Seating',
    price: 34500,
    originalPrice: 42000,
    image: '/assets/images/burnt_orange_chair_1793874893473.jpg',
    gallery: [
      '/assets/images/burnt_orange_chair_1793874893473.jpg',
      '/assets/images/hero_living_room_1793872982731.jpg',
      '/assets/images/cozy_armchair_1793872988150.jpg'
    ],
    description:
      'The defining focal piece of modern interior design. Featuring an embracing curved barrel backrest, high-density ergonomic pocket cushioning, and tapered natural white oak legs. Hand-upholstered in an earthy, tactile terracotta-orange wool bouclé blend.',
    details: [
      'Ergonomic wraparound tub backrest provides relaxed lumbar support',
      'Solid kiln-dried white oak legs with protective floor glides',
      'Dual-density high resilience foam with down feather envelope',
      'Stain-resistant performance textured bouclé wool upholstery',
      'Reinforced corner-blocked hardwood interior frame'
    ],
    materials: [
      'Terracotta Orange Wool Bouclé Blend',
      'FSC-Certified Solid European White Oak',
      'High-Resilience Cold-Cure Foam & Sinuous Steel Suspension'
    ],
    colors: [
      { name: 'Burnt Terracotta', hex: '#C86428' },
      { name: 'Warm Ivory', hex: '#F3EFE9' },
      { name: 'Earthy Sand', hex: '#DFD7CB' },
      { name: 'Charcoal Slag', hex: '#3B3632' }
    ],
    dimensions: {
      width: '82 cm',
      depth: '84 cm',
      height: '80 cm',
      seatHeight: '43 cm',
      weight: '22 kg'
    },
    rating: 4.98,
    reviewsCount: 56,
    isPopular: false,
    stockStatus: 'In Stock',
    leadTime: 'Delivered in 3–5 business days'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Collection' },
  { id: 'seating', name: 'Armchairs & Seating' },
  { id: 'sofas', name: 'Sofas & Couches' },
  { id: 'tables', name: 'Tables & Desks' },
  { id: 'lighting', name: 'Lamps & Lighting' },
  { id: 'storage', name: 'Storage & Shelving' }
];

export const formatPrice = (amount: number): string => {
  return '₹' + amount.toLocaleString('en-IN');
};
