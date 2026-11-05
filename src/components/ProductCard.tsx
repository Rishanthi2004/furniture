import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product, formatPrice } from '../types/furniture';

interface ProductCardProps {
  product: Product;
  index: number;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClick
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onClick={() => onClick(product)}
      className="group cursor-pointer flex flex-col bg-white rounded-2xl p-3 sm:p-4 border border-[#EAE2D8]/80 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1.5"
    >
      {/* Product Image Stage */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FBF9F6] flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#C86428] text-white shadow-xs'
              : 'bg-white/85 text-[#786E66] hover:text-[#C86428] hover:bg-white shadow-xs opacity-90 group-hover:opacity-100'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isWishlisted ? 'fill-current scale-110' : 'stroke-[1.8]'
            }`}
          />
        </button>

        {/* Subtle Material or Stock Tag */}
        {product.stockStatus === 'Few Units Left' && (
          <span className="absolute bottom-2 left-2 text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 bg-amber-500/10 text-amber-800 rounded">
            Few Left
          </span>
        )}
      </div>

      {/* Product Info - Clean, Minimal Layout matching reference image */}
      <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-medium text-[#26211E] text-sm sm:text-base group-hover:text-[#C86428] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#786E66] mt-0.5 line-clamp-1">
            {product.materials[0]}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#F2ECE4] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm sm:text-[15px] text-[#26211E] font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#A09890] line-through font-mono tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button with Interactive Animation */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              addedAnimation
                ? 'bg-emerald-600 text-white scale-110'
                : 'bg-[#FAF7F2] text-[#4A433E] hover:bg-[#C86428] hover:text-white border border-[#EAE2D8]'
            }`}
          >
            {addedAnimation ? (
              <Check className="w-4 h-4 stroke-[2.2]" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 stroke-[1.8]" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
