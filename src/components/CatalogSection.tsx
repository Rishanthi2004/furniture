import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Product, CATEGORIES } from '../types/furniture';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' ||
          (selectedCategory === 'new-arrivals' ? !!product.isNewArrival : false) ||
          (selectedCategory === 'special-offers' ? !!product.isSpecialOffer : false) ||
          product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.materials.some((m) =>
            m.toLowerCase().includes(searchQuery.toLowerCase())
          );
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default featured order
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice]);

  return (
    <section id="catalog-section" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#EAE2D8]/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EAE2D8]/80"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C86428] font-semibold">
              Curated Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#26211E] tracking-tight mt-1">
              Shop All Pieces
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786E66]" />
            <input
              type="text"
              placeholder="Search by piece, wood, fabric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-[#EAE2D8] text-[#26211E] placeholder:text-[#A09890] focus:outline-none focus:border-[#C86428] shadow-2xs transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#786E66] hover:text-[#26211E]"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#C86428] text-white shadow-2xs'
                    : 'bg-white hover:bg-[#F2ECE4] text-[#4A433E] border border-[#EAE2D8]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & Quick Filter */}
          <div className="flex items-center gap-3 self-end lg:self-auto text-xs text-[#4A433E]">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#EAE2D8]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#786E66]" />
              <label htmlFor="sort-select" className="text-xs text-[#786E66] whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#26211E] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#786E66] mb-6">
          <span>
            Showing <strong className="text-[#26211E]">{filteredProducts.length}</strong> pieces
          </span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="inline-flex items-center gap-1 text-[#C86428] hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {filteredProducts.map((product, index) => (
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
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EAE2D8] p-8 max-w-lg mx-auto">
            <p className="font-serif text-xl text-[#26211E] mb-2">No matching furniture pieces</p>
            <p className="text-xs text-[#786E66] mb-6">
              Try adjusting your search keywords or browse our full collection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="px-6 py-2.5 bg-[#C86428] text-white rounded-xl text-xs font-medium hover:bg-[#B2531D] transition-colors"
            >
              View All Furniture
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
