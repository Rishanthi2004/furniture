import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Minus,
  Plus,
  Layers,
  Ruler
} from 'lucide-react';
import { Product, ProductColor, formatPrice } from '../types/furniture';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, quantity: number) => void;
  onBuyNow: (product: Product, color: ProductColor, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow
}) => {
  if (!product || !isOpen) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'dimensions' | 'materials' | 'room'>('overview');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [roomWallTone, setRoomWallTone] = useState<'warm-cream' | 'terracotta-soft' | 'soft-sage'>('warm-cream');

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedColor, quantity);
  };

  const wallColors = {
    'warm-cream': 'bg-[#F5EFEB]',
    'terracotta-soft': 'bg-[#F2DFD4]',
    'soft-sage': 'bg-[#E3E8E0]'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Dialog Container */}
        <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-[#FAF7F2] text-left align-middle shadow-2xl border border-[#EAE2D8]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#4A433E] hover:text-[#26211E] shadow-xs flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.8]" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
              {/* Left Column: Gallery & Room Stager (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-[#F5EFEB] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EAE2D8]">
                {/* Mode Selector (Studio Photo vs Interactive Room Simulation) */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#786E66]">
                    {product.categoryLabel}
                  </span>

                  <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl text-xs font-medium border border-[#EAE2D8]">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeTab !== 'room'
                          ? 'bg-[#26211E] text-white shadow-xs'
                          : 'text-[#786E66] hover:text-[#26211E]'
                      }`}
                    >
                      Studio View
                    </button>
                    <button
                      onClick={() => setActiveTab('room')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                        activeTab === 'room'
                          ? 'bg-[#C86428] text-white shadow-xs'
                          : 'text-[#786E66] hover:text-[#26211E]'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      Room Stager
                    </button>
                  </div>
                </div>

                {/* Main Visual Frame */}
                {activeTab !== 'room' ? (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-xs flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-all duration-300"
                    />

                    {/* Quick indicator of selected color */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-lg text-[11px] font-medium text-[#4A433E] shadow-2xs border border-[#EAE2D8]">
                      Swatch: {selectedColor.name}
                    </div>
                  </div>
                ) : (
                  /* Interactive 2D/3D Room Visualizer */
                  <div
                    className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between p-4 transition-colors duration-500 ${wallColors[roomWallTone]}`}
                  >
                    {/* Simulated Room Setting */}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[11px] font-medium text-[#786E66] bg-white/80 px-2.5 py-1 rounded-md">
                        Simulated Ambient Lighting
                      </span>

                      {/* Wall paint swatches */}
                      <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-lg shadow-2xs">
                        <span className="text-[10px] text-[#786E66] mr-1">Wall:</span>
                        <button
                          onClick={() => setRoomWallTone('warm-cream')}
                          title="Warm Cream"
                          className={`w-4 h-4 rounded-full bg-[#F5EFEB] border ${
                            roomWallTone === 'warm-cream' ? 'ring-2 ring-[#C86428]' : ''
                          }`}
                        />
                        <button
                          onClick={() => setRoomWallTone('terracotta-soft')}
                          title="Soft Terracotta"
                          className={`w-4 h-4 rounded-full bg-[#F2DFD4] border ${
                            roomWallTone === 'terracotta-soft' ? 'ring-2 ring-[#C86428]' : ''
                          }`}
                        />
                        <button
                          onClick={() => setRoomWallTone('soft-sage')}
                          title="Soft Sage"
                          className={`w-4 h-4 rounded-full bg-[#E3E8E0] border ${
                            roomWallTone === 'soft-sage' ? 'ring-2 ring-[#C86428]' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Scaled Furniture Piece inside room */}
                    <div className="relative flex-1 flex items-center justify-center">
                      {/* Architectural room floor line */}
                      <div className="absolute bottom-6 left-0 right-0 h-14 bg-gradient-to-t from-amber-900/10 to-transparent border-t border-black/5" />
                      <motion.img
                        key={selectedImage}
                        initial={{ opacity: 0.8, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={selectedImage}
                        alt="Staged furniture in room"
                        className="max-h-[75%] object-contain filter drop-shadow-xl z-10"
                      />
                    </div>

                    <div className="text-center z-10">
                      <span className="text-[11px] text-[#786E66]">
                        Proportional scale in 12×14ft living room
                      </span>
                    </div>
                  </div>
                )}

                {/* Thumbnails Gallery */}
                <div className="flex items-center gap-3 mt-4 pt-3 overflow-x-auto">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                        selectedImage === img
                          ? 'border-[#C86428] shadow-xs'
                          : 'border-[#EAE2D8] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: PDP Purchase Module (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Rating & Stock */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-[#26211E]">
                        {product.rating}
                      </span>
                      <span className="text-xs text-[#786E66]">
                        ({product.reviewsCount} reviews)
                      </span>
                    </div>

                    <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {product.stockStatus}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h1 className="font-serif text-2xl sm:text-3xl text-[#26211E] tracking-tight font-medium">
                    {product.name}
                  </h1>
                  <p className="text-sm text-[#786E66] mt-1.5 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Pricing */}
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#26211E] tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-base text-[#A09890] line-through tabular-nums">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="text-xs font-semibold text-[#C86428] bg-[#FBF0E8] px-2 py-0.5 rounded-md">
                        Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Color / Fabric Swatches */}
                  <div className="mt-6 pt-5 border-t border-[#EAE2D8]">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#26211E]">
                        Colorway / Material
                      </label>
                      <span className="text-xs text-[#786E66] font-medium">
                        {selectedColor.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative p-0.5 rounded-full transition-all ${
                            selectedColor.name === color.name
                              ? 'ring-2 ring-[#C86428] ring-offset-2 ring-offset-[#FAF7F2]'
                              : 'opacity-80 hover:opacity-100'
                          }`}
                          title={color.name}
                        >
                          <span
                            className="block w-7 h-7 rounded-full shadow-inner border border-black/10"
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specifications & Dimensions Tabs */}
                  <div className="mt-6 pt-5 border-t border-[#EAE2D8]">
                    <div className="flex items-center gap-4 border-b border-[#EAE2D8] text-xs font-medium pb-2 mb-3">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`transition-colors relative pb-1 ${
                          activeTab === 'overview'
                            ? 'text-[#C86428] font-semibold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-0.5 after:bg-[#C86428]'
                            : 'text-[#786E66] hover:text-[#26211E]'
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab('dimensions')}
                        className={`transition-colors relative pb-1 ${
                          activeTab === 'dimensions'
                            ? 'text-[#C86428] font-semibold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-0.5 after:bg-[#C86428]'
                            : 'text-[#786E66] hover:text-[#26211E]'
                        }`}
                      >
                        Dimensions
                      </button>
                      <button
                        onClick={() => setActiveTab('materials')}
                        className={`transition-colors relative pb-1 ${
                          activeTab === 'materials'
                            ? 'text-[#C86428] font-semibold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-0.5 after:bg-[#C86428]'
                            : 'text-[#786E66] hover:text-[#26211E]'
                        }`}
                      >
                        Craft & Care
                      </button>
                    </div>

                    {activeTab === 'overview' && (
                      <p className="text-xs sm:text-sm text-[#786E66] leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    {activeTab === 'dimensions' && (
                      <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-[#EAE2D8]">
                        <div>
                          <span className="text-[#A09890]">Width:</span>{' '}
                          <strong className="text-[#26211E]">{product.dimensions.width}</strong>
                        </div>
                        <div>
                          <span className="text-[#A09890]">Depth:</span>{' '}
                          <strong className="text-[#26211E]">{product.dimensions.depth}</strong>
                        </div>
                        <div>
                          <span className="text-[#A09890]">Height:</span>{' '}
                          <strong className="text-[#26211E]">{product.dimensions.height}</strong>
                        </div>
                        {product.dimensions.seatHeight && (
                          <div>
                            <span className="text-[#A09890]">Seat Height:</span>{' '}
                            <strong className="text-[#26211E]">{product.dimensions.seatHeight}</strong>
                          </div>
                        )}
                        {product.dimensions.weight && (
                          <div>
                            <span className="text-[#A09890]">Weight:</span>{' '}
                            <strong className="text-[#26211E]">{product.dimensions.weight}</strong>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'materials' && (
                      <ul className="space-y-1.5 text-xs text-[#786E66]">
                        {product.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C86428] mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Purchase Controls & Sticky CTAs */}
                <div className="mt-8 pt-5 border-t border-[#EAE2D8] space-y-4">
                  <div className="flex items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#EAE2D8] rounded-xl bg-white px-2 py-1 shadow-2xs">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="p-1 text-[#786E66] hover:text-[#26211E] disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[#26211E] font-mono tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 text-[#786E66] hover:text-[#26211E]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`p-3 rounded-xl border transition-all ${
                        isWishlisted
                          ? 'bg-[#C86428] text-white border-[#C86428]'
                          : 'bg-white text-[#786E66] border-[#EAE2D8] hover:text-[#C86428]'
                      }`}
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Add To Cart */}
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 py-3 px-5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        addedAnimation
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#26211E] hover:bg-[#3B3632] text-white shadow-xs'
                      }`}
                    >
                      {addedAnimation ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Buy Now Primary CTA */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#C86428] hover:bg-[#B2531D] text-white font-medium text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Instant Checkout — {formatPrice(product.price * quantity)}</span>
                  </button>

                  {/* Trust Micro-Badges */}
                  <div className="flex items-center justify-between text-[11px] text-[#786E66] pt-1">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#C86428]" /> Free White-Glove Setup
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C86428]" /> 10-Yr Frame Warranty
                    </span>
                    <span className="flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-[#C86428]" /> 30-Day Atelier Trial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
