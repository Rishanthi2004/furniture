import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ChevronRight } from 'lucide-react';
import { Product, formatPrice } from '../types/furniture';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return products.slice(0, 4);
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
      p.materials.some((m) => m.toLowerCase().includes(query.toLowerCase())) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-[#FAF7F2] text-left shadow-2xl border border-[#EAE2D8]"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-[#EAE2D8] flex items-center gap-3 bg-white">
              <Search className="w-5 h-5 text-[#C86428] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search sofas, armchairs, oak tables, lamps..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-base bg-transparent border-none text-[#26211E] placeholder:text-[#A09890] focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[#786E66] hover:text-[#26211E]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Suggestions / Results */}
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#786E66] mb-2 px-2">
                {query ? `Results (${results.length})` : 'Popular Searches & Showroom Picks'}
              </div>

              {results.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#786E66]">
                  No matching furniture found for "{query}". Try "armchair", "oak", or "sofa".
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-white hover:bg-[#F4EFEB] border border-transparent hover:border-[#EAE2D8] transition-all cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FAF7F2] p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#26211E] group-hover:text-[#C86428] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#786E66] truncate">
                        {product.categoryLabel} · {product.materials[0]}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-sm font-semibold text-[#26211E] tabular-nums block">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[10px] text-[#C86428] font-medium group-hover:underline inline-flex items-center gap-0.5">
                        View <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-6 py-3 bg-[#F4EFEB] border-t border-[#EAE2D8] flex items-center justify-between text-[11px] text-[#786E66]">
              <span>Tip: Press ESC or click outside to dismiss</span>
              <span>All prices include white-glove setup</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
