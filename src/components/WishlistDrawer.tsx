import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, formatPrice } from '../types/furniture';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#EAE2D8]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#EAE2D8] flex items-center justify-between bg-white/60">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-[#C86428] fill-[#C86428]" />
                <h2 className="font-serif text-xl font-medium text-[#26211E]">
                  Saved Wishlist
                </h2>
                <span className="text-xs bg-[#EAE2D8] text-[#4A433E] px-2 py-0.5 rounded-full font-medium">
                  {wishlistItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#786E66] hover:text-[#26211E] rounded-full hover:bg-[#F2ECE4] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center text-[#786E66] mb-4 shadow-2xs">
                    <Heart className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#26211E] mb-1">
                    Your wishlist is quiet
                  </h3>
                  <p className="text-xs text-[#786E66] max-w-xs mb-6">
                    Tap the heart icon on any piece to save your favorite silhouettes for later.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#C86428] text-white text-xs font-medium rounded-xl hover:bg-[#B2531D] transition-colors"
                  >
                    Explore Furniture Pieces
                  </button>
                </div>
              ) : (
                wishlistItems.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#EAE2D8]/80 shadow-2xs cursor-pointer hover:border-[#C86428]/40 transition-colors"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF7F2] p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-medium text-[#26211E] line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveFromWishlist(product);
                            }}
                            className="text-[#A09890] hover:text-rose-600 transition-colors p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-[#786E66] mt-0.5 line-clamp-1">
                          {product.materials[0]}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4EFEB]">
                        <span className="font-mono text-sm font-semibold text-[#26211E] tabular-nums">
                          {formatPrice(product.price)}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoveToCart(product);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#C86428] text-[#26211E] hover:text-white rounded-lg text-xs font-medium border border-[#EAE2D8] transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlistItems.length > 0 && (
              <div className="p-6 bg-white border-t border-[#EAE2D8]">
                <button
                  onClick={() => {
                    wishlistItems.forEach((p) => onMoveToCart(p));
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#26211E] hover:bg-[#3B3632] text-white text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Move All to Shopping Bag</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
