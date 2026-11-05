import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Product } from '../types/furniture';
import { ProductCard } from './ProductCard';

interface PopularProductsProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const PopularProducts: React.FC<PopularProductsProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewAll
}) => {
  // Take the primary 4 popular products specified in reference image
  const popularList = products.filter((p) => p.isPopular).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading - Elegant Serif centered matching reference image */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#26211E] tracking-tight">
              Popular Products
            </h2>
            <div className="w-12 h-0.5 bg-[#C86428]/60 mx-auto mt-3 rounded-full" />
          </motion.div>
        </div>

        {/* 4 Product Cards Grid matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {popularList.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onClick={onSelectProduct}
            />
          ))}
        </div>

        {/* Minimal "View All >" Button matching reference image button style */}
        <div className="mt-12 text-center">
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 px-6 py-2.5 bg-[#EFE9DF] hover:bg-[#E5DDD0] text-[#4A433E] hover:text-[#26211E] text-sm font-medium rounded-xl transition-all duration-200"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 text-[#786E66] group-hover:text-[#C86428] group-hover:translate-x-0.5 transition-all" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
